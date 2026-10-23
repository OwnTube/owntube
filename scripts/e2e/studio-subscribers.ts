// Studio's Recent subscribers card and its Subscribers dialog through the
// official clients, checked against the database: a viewer who subscribes
// with private subscriptions isn't named; once they turn "Keep all my
// subscriptions private" off on the main site's Privacy settings, the
// channel's dashboard lists them, the dialog shows when they subscribed, and
// Subscribe back subscribes the channel to theirs (and undoes it). The API
// answers the channel's owner only. What it changes is put back at the end.
//
//   bun scripts/e2e/studio-subscribers.ts [--login bob:yewtube-demo] [--viewer carol:yewtube-demo] [--shots dir]

import { mkdirSync } from "node:fs";
import type { Page } from "playwright-core";
import { sql } from "../../src/db";
import { launch, signIn } from "../probe";

const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
const STUDIO = process.env.STUDIO_ORIGIN ?? "http://localhost:8081";
const args = process.argv.slice(2);
const opt = (n: string) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const [login, password] = (opt("--login") ?? "bob:yewtube-demo").split(":");
const [viewerLogin, viewerPassword] = (opt("--viewer") ?? "carol:yewtube-demo").split(":");
const shots = opt("--shots");
if (shots) mkdirSync(shots, { recursive: true });

let failed = 0;
const check = (name: string, ok: boolean, detail: unknown = "") => {
	if (!ok) failed++;
	console.log(`${ok ? "ok  " : "FAIL"} ${name}${detail === "" ? "" : `: ${JSON.stringify(detail)}`}`);
};
const shot = async (page: Page, name: string) => shots && (await page.screenshot({ path: `${shots}/${name}.png` }));
const until = async (f: () => Promise<boolean>, ms = 8000) => {
	const end = Date.now() + ms;
	while (Date.now() < end) {
		if (await f()) return true;
		await new Promise((r) => setTimeout(r, 300));
	}
	return f();
};

const who = async (l: string) => (await sql`select u.id as user_id, c.id, c.title from channels c join users u on u.id = c.user_id where u.login = ${l} order by c.created_at limit 1`)[0] as { user_id: string; id: string; title: string };
const me = await who(login);
const them = await who(viewerLogin);
// what's put back at the end
const privacyBefore = (await sql`select value from account_settings where user_id = ${them.user_id} and item = '19'`)[0]?.value;
const subscribedBefore = (await sql`select created_at from subscriptions where user_id = ${them.user_id} and channel_id = ${me.id}`)[0]?.created_at;
const backBefore = (await sql`select 1 from subscriptions where user_id = ${me.user_id} and channel_id = ${them.id}`).length > 0;
const back = async () => (await sql`select 1 from subscriptions where user_id = ${me.user_id} and channel_id = ${them.id}`).length > 0;
// the viewer subscribes (now, so it's within the card's 90 days), with private subscriptions
await sql`insert into subscriptions (user_id, channel_id) values (${them.user_id}, ${me.id}) on conflict (user_id, channel_id) do update set created_at = now()`;
await sql`delete from account_settings where user_id = ${them.user_id} and item = '19'`;
await sql`delete from subscriptions where user_id = ${me.user_id} and channel_id = ${them.id}`;

const { browser, ctx } = await launch();
const errors: string[] = [];
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push(e.message.slice(0, 200)));
const card = () => page.locator("ytcd-card", { hasText: "Recent subscribers" }).first();
const dashboard = async () => {
	await page.goto(`${STUDIO}/channel/${me.id}`, { waitUntil: "domcontentloaded" });
	await card().waitFor({ timeout: 20000 }).catch(() => {});
	await page.waitForTimeout(1500);
};

try {
	await signIn(page, login, password, ORIGIN);
	await dashboard();
	check("private subscriptions aren't named on the card", (await card().innerText().catch(() => "")).includes("None to display"), await card().innerText().catch(() => ""));

	// the viewer turns "Keep all my subscriptions private" off in Settings
	const viewerCtx = await browser.newContext();
	const vp = await viewerCtx.newPage();
	vp.on("pageerror", (e) => errors.push(e.message.slice(0, 200)));
	await signIn(vp, viewerLogin, viewerPassword, ORIGIN);
	await vp.goto(`${ORIGIN}/account_privacy`, { waitUntil: "domcontentloaded" });
	const toggle = vp.locator("ytd-browse:not([hidden]) tp-yt-paper-toggle-button").first();
	await toggle.waitFor({ timeout: 15000 });
	check("the switch starts on", (await toggle.getAttribute("aria-pressed")) === "true");
	await toggle.click();
	check("turning it off is stored", await until(async () => (await sql`select value from account_settings where user_id = ${them.user_id} and item = '19'`)[0]?.value === true));
	await viewerCtx.close();

	await dashboard();
	check("the card names the public subscriber", await until(async () => (await card().innerText().catch(() => "")).includes(them.title)));
	await shot(page, "01-card");
	await card().getByText(/See all/).first().click();
	const row = page.locator("ytcp-subscribers-table-row", { hasText: them.title }).first();
	check("the dialog lists them", await until(async () => (await row.count()) === 1, 10000));
	const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
	check("…with the day they subscribed", (await row.innerText().catch(() => "")).includes(today), await row.innerText().catch(() => ""));
	await shot(page, "02-dialog");
	await row.locator("ytcp-subscribe-button ytcp-button").click();
	check("Subscribe back is stored", await until(back));
	check("…and the button turns to Unsubscribe", await until(async () => (await row.locator("ytcp-subscribe-button").innerText()).includes("Unsubscribe")));
	await row.locator("ytcp-subscribe-button ytcp-button").click();
	check("Unsubscribe undoes it", await until(async () => !(await back())));

	// the API answers the channel's owner only
	const status = (body: object) =>
		page.evaluate(async (body) => {
			const cfg = (window as any).ytcfg;
			const r = await fetch("/youtubei/v1/creator/list_creator_public_subscribers", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ context: cfg.get("INNERTUBE_CONTEXT"), ...body }) });
			return r.status;
		}, body);
	check("another channel's subscribers are refused", (await status({ query: { externalChannelId: them.id } })) === 403);
	const anon = await browser.newContext();
	const r = await anon.request.post(`${STUDIO}/youtubei/v1/creator/list_creator_public_subscribers`, { data: { context: { client: { clientName: "WEB_CREATOR", clientVersion: "1.0" } }, query: { externalChannelId: me.id } } });
	check("signed out, subscribers are refused", r.status() === 401, r.status());
	check("no page errors", errors.length === 0, errors.slice(0, 5));
} finally {
	if (privacyBefore === undefined) await sql`delete from account_settings where user_id = ${them.user_id} and item = '19'`;
	else await sql`update account_settings set value = ${JSON.stringify(privacyBefore)}::text::jsonb where user_id = ${them.user_id} and item = '19'`;
	if (subscribedBefore) await sql`update subscriptions set created_at = ${subscribedBefore} where user_id = ${them.user_id} and channel_id = ${me.id}`;
	else await sql`delete from subscriptions where user_id = ${them.user_id} and channel_id = ${me.id}`;
	if (backBefore) await sql`insert into subscriptions (user_id, channel_id) values (${me.user_id}, ${them.id}) on conflict do nothing`;
	else await sql`delete from subscriptions where user_id = ${me.user_id} and channel_id = ${them.id}`;
	await browser.close();
}
console.log(failed ? `${failed} failed` : "all passed");
process.exit(failed ? 1 : 0);
