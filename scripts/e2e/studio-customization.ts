// Studio's Customization > Profile through the official Studio client,
// checked against the database and the main site: the channel changes its
// name, handle (a taken one is refused first), description, links, contact
// email, picture and banner, publishes, and the channel page shows them. The API
// answers the channel's owner only. The channel is put back at the end.
//
//   bun scripts/e2e/studio-customization.ts [--login bob:yewtube-demo] [--shots dir]

import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import type { Page } from "playwright-core";
import { MEDIA_DIR } from "../../src/config";
import { sql } from "../../src/db";
import { launch, signIn } from "../probe";

const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
const STUDIO = process.env.STUDIO_ORIGIN ?? "http://localhost:8081";
const args = process.argv.slice(2);
const opt = (n: string) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const [login, password] = (opt("--login") ?? "bob:yewtube-demo").split(":");
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

type Row = { id: string; title: string; handle: string; description: string; links: { title: string; url: string }[]; business_email: string | null; avatar_path: string | null; banner_path: string | null };
const load = async (id: string) => (await sql`select id, title, handle, description, links, business_email, avatar_path, banner_path from channels where id = ${id}`)[0] as Row;
const [{ id: channelId }] = await sql`select c.id from channels c join users u on u.id = c.user_id where u.login = ${login}`;
const before = await load(channelId);
const [{ handle: takenHandle }] = await sql`select handle from channels where id <> ${channelId} order by created_at limit 1`;
const stamp = String(Date.now()).slice(-5);
const want = { title: `${before.title} ${stamp}`, handle: `${before.handle}-${stamp}`, description: `Customization e2e ${stamp}`, linkTitle: `Site ${stamp}`, linkUrl: `example.org/e2e-${stamp}`, email: `e2e-${stamp}@example.org` };

// a picture to upload
const dir = join("data", "e2e-customization");
mkdirSync(dir, { recursive: true });
const picture = join(dir, "picture.png");
const bannerFile = join(dir, "banner.jpg");
for (const [src, out] of [["testsrc2=size=400x400", picture], ["smptehdbars=size=2560x1440", bannerFile]]) {
	const ff = Bun.spawnSync(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", src, "-frames:v", "1", out]);
	if (ff.exitCode !== 0) throw new Error(`ffmpeg: ${ff.stderr}`);
}
// Studio's dialogs for an image: crop, then Done
const cropDone = async (page: Page, name: string) => {
	const done = page.getByRole("button", { name: "Done" }).locator("visible=true").first();
	await done.waitFor({ timeout: 10000 }).catch(() => {});
	await shot(page, name);
	await done.click().catch(() => {});
	await page.waitForTimeout(800);
};

const { browser, ctx } = await launch();
const errors: string[] = [];
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push(e.message.slice(0, 200)));

try {
	await signIn(page, login, password, ORIGIN);
	await page.goto(`${STUDIO}/channel/${channelId}/editing/profile`, { waitUntil: "domcontentloaded" });
	const name = page.locator("ytcp-channel-editing-channel-name input").first();
	await name.waitFor({ timeout: 20000 });
	await page.waitForTimeout(1500);
	check("the form shows the channel's name", (await name.inputValue()) === before.title, await name.inputValue());
	const handle = page.locator("ytcp-channel-editing-channel-handle input").first();
	check("…and handle", (await handle.inputValue()) === before.handle, await handle.inputValue());

	await name.fill(want.title);
	// a taken handle is refused with a suggestion
	await handle.fill(takenHandle);
	check("a taken handle is refused", await until(async () => /isn.t available/i.test(await page.locator("ytcp-channel-editing-channel-handle").innerText())), await page.locator("ytcp-channel-editing-channel-handle").innerText());
	await handle.fill(want.handle);
	// an accepted handle shows the channel's new address
	check("a free handle is accepted", await until(async () => { const t = await page.locator("ytcp-channel-editing-channel-handle").innerText(); return t.includes(`/@${want.handle}`) && !/isn.t available/i.test(t); }), await page.locator("ytcp-channel-editing-channel-handle").innerText());

	const description = page.locator("ytcp-social-suggestion-input #textbox").first();
	await description.click();
	await page.keyboard.press("Control+A");
	await page.keyboard.type(want.description);

	await page.locator("ytcp-channel-links").getByRole("button", { name: /Add link/ }).first().click();
	const linkInputs = page.locator("ytcp-channel-links input");
	await linkInputs.first().waitFor({ timeout: 5000 });
	await linkInputs.nth(0).fill(want.linkTitle);
	await linkInputs.nth(1).fill(want.linkUrl);
	await page.locator("#business-email input").fill(want.email);

	await page.locator("ytcp-profile-image-upload input#file-selector").setInputFiles(picture);
	await cropDone(page, "01-crop");
	await page.locator("ytcp-banner-upload input#file-selector").setInputFiles(bannerFile);
	await cropDone(page, "01-crop-banner");
	await shot(page, "02-edited");

	await page.getByRole("button", { name: "Publish" }).first().click();
	const after = async () => load(channelId);
	check("Publish saves the name", await until(async () => (await after()).title === want.title, 15000), (await after()).title);
	const saved = await after();
	check("…the handle", saved.handle === want.handle, saved.handle);
	check("…the description", saved.description === want.description, saved.description);
	check("…the link", saved.links.length === 1 && saved.links[0].title === want.linkTitle && saved.links[0].url === `https://${want.linkUrl}`, saved.links);
	check("…the contact email", saved.business_email === want.email, saved.business_email);
	check("…the picture", await until(async () => !!(await after()).avatar_path, 10000));
	check("…and the banner", await until(async () => !!(await after()).banner_path, 10000));
	await shot(page, "03-published");

	// the main site
	const main = await ctx.newPage();
	main.on("pageerror", (e) => errors.push(e.message.slice(0, 200)));
	await main.goto(`${ORIGIN}/@${want.handle}`, { waitUntil: "domcontentloaded" });
	const header = main.locator("yt-page-header-renderer, #page-header").first();
	await header.waitFor({ timeout: 15000 }).catch(() => {});
	await main.waitForTimeout(2000);
	const headerText = await header.innerText().catch(() => "");
	check("the channel page has the new name", headerText.includes(want.title), headerText.slice(0, 200));
	check("…the description", headerText.includes(want.description));
	check("…and the link", headerText.includes(`example.org/e2e-${stamp}`));
	await shot(main, "04-channel");
	const img = await main.request.get(`${ORIGIN}/ggpht/${channelId}/avatar=s88-c-k-c0x00ffffff-no-rj`);
	check("the picture is served", img.status() === 200 && (img.headers()["content-type"] ?? "").startsWith("image/png"), img.headers()["content-type"]);
	const banner = await main.request.get(`${ORIGIN}/ggpht/${channelId}/banner=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`);
	check("the banner is served", banner.status() === 200 && (banner.headers()["content-type"] ?? "").startsWith("image/jpeg"), banner.headers()["content-type"]);
	const shown = await main.evaluate(() => Array.from(document.querySelectorAll("img")).map((i) => i.currentSrc).filter((u) => u.includes("/ggpht/")));
	check("the channel page shows the banner and picture", shown.some((u) => u.includes("/banner")) && shown.some((u) => u.includes("/avatar")), shown);
	await main.locator("yt-page-header-renderer yt-description-preview-view-model, yt-page-header-renderer .truncated-text-wiz").first().click().catch(() => {});
	const about = main.locator("ytd-about-channel-renderer").first();
	if (await about.waitFor({ timeout: 8000 }).then(() => true).catch(() => false)) {
		await main.waitForTimeout(1000);
		check("the About panel lists the link", (await about.innerText()).includes(want.linkTitle), (await about.innerText()).slice(0, 300));
		await shot(main, "05-about");
	} else check("the About panel opens", false);
	await main.close();

	// the API answers the channel's owner only
	const status = (path: string, body: object) =>
		page.evaluate(
			async ([path, body]) => {
				const cfg = (window as any).ytcfg;
				const r = await fetch(`/youtubei/v1/${path}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ context: cfg.get("INNERTUBE_CONTEXT"), ...(body as object) }) });
				return r.status;
			},
			[path, body] as const,
		);
	const [other] = await sql`select id from channels where id <> ${channelId} limit 1`;
	check("another channel's settings are refused", (await status("channel_edit/get_channel_page_settings", { externalChannelId: other.id })) === 403);
	const anon = await browser.newContext();
	const r = await anon.request.post(`${STUDIO}/youtubei/v1/channel_edit/get_channel_page_settings`, { data: { context: { client: { clientName: "WEB_CREATOR", clientVersion: "1.0" } }, externalChannelId: channelId } });
	check("signed out, settings are refused", r.status() === 401, r.status());
	const up = await anon.request.post(`${STUDIO}/channel_image_upload/profile`, { data: Buffer.from("x") });
	check("signed out, image uploads are refused", up.status() === 401, up.status());
	check("no page errors", errors.length === 0, errors.slice(0, 5));
} finally {
	const now = await load(channelId);
	for (const p of [now.avatar_path, now.banner_path]) if (p && p !== before.avatar_path && p !== before.banner_path) rmSync(join(MEDIA_DIR, p), { force: true });
	await sql`update channels set title = ${before.title}, handle = ${before.handle}, description = ${before.description}, links = ${JSON.stringify(before.links)}::text::jsonb,
		business_email = ${before.business_email}, avatar_path = ${before.avatar_path}, banner_path = ${before.banner_path} where id = ${channelId}`;
	await sql`delete from channel_identity_changes where channel_id = ${channelId} and changed_at > now() - interval '1 hour' and (new_value like ${`%${stamp}`} or old_value like ${`%${stamp}`})`;
	rmSync(dir, { recursive: true, force: true });
	await browser.close();
}
console.log(failed ? `${failed} failed` : "all passed");
process.exit(failed ? 1 : 0);
