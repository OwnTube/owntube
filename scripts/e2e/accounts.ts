// Account pages through the official clients: the settings pages (direct
// load, sidebar navigation, a switch that persists, the signed-out sign-in
// gate), the account menu, Switch account on the main site and in Studio
// (two accounts on one browser, switching keeps the page, Sign out signs
// both out) and Send feedback. What it changes is put back before it ends:
// the privacy setting, the feedback row and its sessions.
//
//   bun scripts/e2e/accounts.ts [--login bob:yewtube-demo] [--second carol:yewtube-demo] [--shots dir]
//
// The second account is created when it doesn't exist.

import { mkdirSync } from "node:fs";
import type { Page } from "playwright-core";
import { register } from "../../src/auth";
import { sql } from "../../src/db";
import { launch, signIn } from "../probe";

const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
const STUDIO = process.env.STUDIO_ORIGIN ?? ORIGIN.replace(/:(\d+)$/, (_, p) => `:${Number(p) + 1}`);
const args = process.argv.slice(2);
const opt = (n: string) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const [login, password] = (opt("--login") ?? "bob:yewtube-demo").split(":");
const [second, secondPassword] = (opt("--second") ?? "carol:yewtube-demo").split(":");
const shots = opt("--shots");
if (shots) mkdirSync(shots, { recursive: true });

let failed = 0;
const check = (name: string, ok: boolean, detail: unknown = "") => {
	if (!ok) failed++;
	console.log(`${ok ? "ok  " : "FAIL"} ${name}${detail === "" ? "" : `: ${JSON.stringify(detail)}`}`);
};
const errors: string[] = [];
// both instance origins load; anything else is blocked and reported
async function open(): Promise<Page> {
	const page = await ctx.newPage();
	const hosts = new Set([new URL(ORIGIN).host, new URL(STUDIO).host]);
	await page.route("**/*", (route) => {
		const u = new URL(route.request().url());
		if (u.protocol === "data:" || u.protocol === "blob:" || hosts.has(u.host)) return route.continue();
		return route.abort("blockedbyclient");
	});
	page.on("pageerror", (e) => errors.push(e.message.slice(0, 200)));
	return page;
}
const shot = async (page: Page, name: string) => shots && (await page.screenshot({ path: `${shots}/${name}.png` }));
const visibleTexts = (page: Page, selector: string) =>
	page.evaluate((s) => [...document.querySelectorAll(s)].filter((e) => (e as HTMLElement).offsetParent).map((e) => (e as HTMLElement).innerText.replace(/\s+/g, " ").trim()), selector);
const datasync = (page: Page) => page.evaluate(() => (window as any).ytcfg?.get("DATASYNC_ID") as string | undefined);
const menuItem = (page: Page, text: string) => page.locator("ytd-multi-page-menu-renderer ytd-compact-link-renderer", { hasText: text }).first();
async function addAccount(page: Page, l: string, p: string) {
	await page.goto(`${ORIGIN}/signin?add=1&next=%2F`);
	await page.fill("#f-login", l);
	await Promise.all([page.waitForSelector("#f-password"), page.click("button[type=submit]")]);
	await page.fill("#f-password", p);
	await Promise.all([page.waitForURL(`${ORIGIN}/`), page.click("button[type=submit]")]);
}

await register(second, secondPassword, `${second[0].toUpperCase()}${second.slice(1)} Tests`).catch(() => {});
const [{ id: userId }] = await sql`select id from users where login = ${login}`;
const channelOf = async (l: string) => (await sql`select c.id, c.title from channels c join users u on u.id = c.user_id where u.login = ${l}`)[0] as { id: string; title: string };
const [me, them] = [await channelOf(login), await channelOf(second)];
const [mine, theirs] = [me.id, them.id];
const privacyBefore = (await sql`select value from account_settings where user_id = ${userId} and item = '19'`)[0]?.value;

const { browser, ctx } = await launch();

// ---- settings
{
	const page = await open();
	await page.goto(`${ORIGIN}/account`);
	check("signed-out /account goes to sign-in", /\/signin\?next=%2Faccount/.test(page.url()), page.url());
	await signIn(page, login, password);
	const pages = ["/account", "/account_notifications", "/account_playback", "/account_privacy", "/account_sharing", "/account_billing", "/account_advanced", "/account_downloads"];
	for (const p of pages) {
		await page.goto(ORIGIN + p, { waitUntil: "domcontentloaded" });
		const sidebar = page.locator("ytd-settings-sidebar-renderer").first();
		const ok = await sidebar.waitFor({ timeout: 15000 }).then(() => true, () => false);
		const type = await page.evaluate(() => (document.querySelector("ytd-app") as any)?.data?.page);
		check(`${p} renders as a settings page`, ok && page.url() === ORIGIN + p, { url: page.url().replace(ORIGIN, ""), type });
	}
	await page.goto(`${ORIGIN}/account`, { waitUntil: "domcontentloaded" });
	await page.locator("ytd-settings-sidebar-renderer ytd-compact-link-renderer", { hasText: "Privacy" }).click();
	await page.waitForURL(`${ORIGIN}/account_privacy`);
	check("sidebar navigates in the app", true);
	const toggle = () => page.locator("ytd-browse:not([hidden]) tp-yt-paper-toggle-button").first();
	await toggle().waitFor();
	const before = await toggle().getAttribute("aria-pressed");
	await toggle().click();
	await page.waitForTimeout(1500);
	await page.reload({ waitUntil: "domcontentloaded" });
	await toggle().waitFor();
	const after = await toggle().getAttribute("aria-pressed");
	check("privacy switch persists across reload", before !== after, { before, after });
	await shot(page, "settings-privacy");
	await page.goBack();
	await page.waitForURL(`${ORIGIN}/account`);
	check("history back returns to Account", true);
	await page.goto(`${ORIGIN}/logout`);
	await page.close();
}

// ---- account menu and Switch account on the main site
{
	const page = await open();
	await signIn(page, login, password);
	await page.click("#avatar-btn");
	await menuItem(page, "Switch account").waitFor();
	const items = await visibleTexts(page, "ytd-multi-page-menu-renderer ytd-compact-link-renderer");
	for (const want of ["account", "Switch account", "Sign out", "YouTube Studio", "Your data in YouTube", "Settings", "Send feedback"])
		check(`account menu lists ${want}`, items.some((t) => t.includes(want)));
	check("account menu has no Purchases entry", !items.some((t) => t.includes("Purchases")));
	await addAccount(page, second, secondPassword);
	check("added account is active", (await datasync(page))?.startsWith(theirs) === true);
	await page.goto(`${ORIGIN}/playlist?list=WL`, { waitUntil: "domcontentloaded" });
	await page.waitForTimeout(2000);
	await page.click("#avatar-btn");
	await menuItem(page, "Switch account").click();
	const accounts = page.locator("ytd-account-item-renderer");
	await accounts.first().waitFor();
	const listed = await visibleTexts(page, "ytd-account-item-renderer");
	check("switcher lists both accounts", listed.length === 2, listed);
	await shot(page, "switcher");
	await accounts.filter({ hasText: me.title }).first().click();
	await page.waitForTimeout(3500);
	check("switching keeps the page", page.url() === `${ORIGIN}/playlist?list=WL`, page.url().replace(ORIGIN, ""));
	check("switching changes the active account", (await datasync(page))?.startsWith(mine) === true, await datasync(page));

	// ---- Studio's own menu and switcher, same browser
	await page.goto(`${STUDIO}/`, { waitUntil: "domcontentloaded" });
	await page.locator("#avatar-btn").waitFor({ timeout: 30000 });
	await page.waitForTimeout(3000);
	await page.click("#avatar-btn");
	await menuItem(page, "Switch account").waitFor();
	const studioItems = await visibleTexts(page, "ytd-multi-page-menu-renderer ytd-compact-link-renderer");
	check("Studio menu is Studio's", ["Your channel", "YouTube", "Switch account", "Sign out", "Send feedback"].every((w) => studioItems.includes(w)), studioItems);
	await shot(page, "studio-menu");
	await menuItem(page, "Switch account").click();
	await accounts.first().waitFor();
	check("Studio switcher lists both accounts", (await visibleTexts(page, "ytd-account-item-renderer")).length === 2);
	await shot(page, "studio-switcher");
	await accounts.filter({ hasText: them.title }).first().click();
	await page.waitForURL(new RegExp(`^${STUDIO}/channel/${theirs}`), { timeout: 20000 }).catch(() => {});
	check("Studio switches to the other channel", page.url().startsWith(`${STUDIO}/channel/${theirs}`), page.url());
	await page.locator("#avatar-btn").waitFor({ timeout: 30000 });
	await page.waitForTimeout(3000);
	await page.click("#avatar-btn");
	await menuItem(page, "Sign out").click();
	await page.waitForURL(`${ORIGIN}/`, { timeout: 20000 }).catch(() => {});
	check("Sign out from Studio signs every account out", (await page.evaluate(() => (window as any).ytcfg?.get("LOGGED_IN"))) === false, page.url());
	await page.close();
}

// ---- Send feedback
{
	const page = await open();
	await signIn(page, login, password);
	await page.click("#avatar-btn");
	await menuItem(page, "Send feedback").click();
	await page.waitForURL(/\/feedback/);
	const marker = `accounts-e2e-${Date.now().toString(36)}`;
	await page.fill("textarea", `Feedback check ${marker}`);
	await Promise.all([page.waitForURL(/done=sent/), page.click("main button")]);
	const rows = await sql`select id, user_id from feedback where body = ${`Feedback check ${marker}`}`;
	check("feedback is stored for the operators", rows.length === 1 && String(rows[0].user_id) === String(userId));
	await sql`delete from feedback where body = ${`Feedback check ${marker}`}`;
	await page.goto(`${ORIGIN}/logout`);
	await page.close();
}

if (privacyBefore === undefined) await sql`delete from account_settings where user_id = ${userId} and item = '19'`;
else await sql`update account_settings set value = ${JSON.stringify(privacyBefore)}::text::jsonb where user_id = ${userId} and item = '19'`;
check("no page errors", errors.length === 0, errors.slice(0, 3));
await browser.close();
console.log(failed ? `${failed} check(s) failed` : "all passed");
process.exit(failed ? 1 : 0);
