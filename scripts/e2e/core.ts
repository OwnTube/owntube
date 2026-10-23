// Core flows through the official client on a seeded instance: home, search,
// in-app navigation to a watch page and playback, channel page, sign-in, like,
// subscribe, comment, Save to Watch later, history, appearance, Studio's
// content list and the admin panel's authorization. Every change it makes as
// the seeded account is undone before it ends. Fails on page errors, failed
// requests and requests to any other host.
//
//   bun scripts/e2e/core.ts [--login bob:yewtube-demo] [--query "Test pattern"] [--shots dir]
//
// Needs `bun scripts/seed.ts` data (or an account and another channel's public
// video matching --query) and the server running with Studio on STUDIO_ORIGIN.

import { mkdirSync } from "node:fs";
import type { Page } from "playwright-core";
import { launch, playerState, signIn, watchPage } from "../probe";

const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
const STUDIO = process.env.STUDIO_ORIGIN ?? ORIGIN.replace(/:(\d+)$/, (_, p) => `:${Number(p) + 1}`);
const args = process.argv.slice(2);
const opt = (n: string) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const [login, password] = (opt("--login") ?? "bob:yewtube-demo").split(":");
const query = opt("--query") ?? "Test pattern";
const shots = opt("--shots");
if (shots) mkdirSync(shots, { recursive: true });

const { browser, ctx } = await launch();
const page = await ctx.newPage();
const report = watchPage(page);

let failed = 0;
const check = (name: string, ok: boolean, detail: unknown = "") => {
	if (!ok) failed++;
	console.log(`${ok ? "ok  " : "FAIL"} ${name}${detail === "" ? "" : `: ${JSON.stringify(detail)}`}`);
};
const shot = async (name: string, p: Page = page) => shots && (await p.screenshot({ path: `${shots}/${name}.png` }));
const until = async <T>(fn: () => Promise<T>, ok: (v: T) => boolean, ms = 10000) => {
	const end = Date.now() + ms;
	let v = await fn();
	while (!ok(v) && Date.now() < end) {
		await page.waitForTimeout(250);
		v = await fn();
	}
	return v;
};
const text = (sel: string) => page.locator(sel).first().textContent({ timeout: 5000 }).then((t) => t?.replace(/\s+/g, " ").trim() ?? "").catch(() => "");

// ---- signed out ----
await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
const lockups = await until(() => page.locator("ytd-rich-item-renderer").count(), (n) => n > 0);
check("home lists videos", lockups > 0, lockups);
await shot("01-home");

// search through the masthead box, then open the first result in-page
await page.locator("input[name=search_query]").first().fill(query);
await page.keyboard.press("Enter");
await page.waitForURL(/\/results\?search_query=/);
const results = await until(() => page.locator("ytd-video-renderer").count(), (n) => n > 0);
check("search finds the video", results > 0, { query, results });
await shot("02-search");
const title = await text("ytd-video-renderer #video-title");
await page.locator("ytd-video-renderer #video-title").first().click();
await page.waitForURL(/\/watch\?v=/);
const videoId = new URL(page.url()).searchParams.get("v")!;
const playing = await until(() => playerState(page), (s) => s.state === 1 && (s.time ?? 0) > 1, 15000);
check("result opens in-page and plays", playing.state === 1 && (playing.time ?? 0) > 1, { videoId, state: playing.state, time: playing.time });
check("watch title matches", (await text("ytd-watch-metadata h1")) === title, title);
await shot("03-watch");

await page.locator("ytd-watch-metadata #owner ytd-channel-name a").first().click();
await page.waitForURL(/\/@|\/channel\//);
const channelName = await until(() => text("yt-page-header-renderer h1, #page-header h1"), (t) => t.length > 0);
check("channel page opens from the watch page", channelName.length > 0, { url: page.url(), channelName });
await shot("04-channel");

// ---- signed in ----
await signIn(page, login, password);
const watchUrl = `${ORIGIN}/watch?v=${videoId}`;
const openWatch = async () => {
	await page.goto(watchUrl, { waitUntil: "domcontentloaded" });
	await likeButton().waitFor({ timeout: 15000 });
	await page.waitForTimeout(1000);
};
const likeButton = () => page.locator("ytd-watch-metadata like-button-view-model button:visible").first();
const liked = () => likeButton().getAttribute("aria-pressed");
// the owner's subscribe button reads "Subscribe to X."; once subscribed it is
// relabelled "Unsubscribe from X." and hidden behind the notification-bell
// "Subscribed" button, whose menu has Unsubscribe
const subscribeButton = () => page.locator('#owner button[aria-label^="Subscribe to"], #owner button[aria-label^="Unsubscribe from"]').first();
const subscribed = async () => {
	await subscribeButton().waitFor({ state: "attached", timeout: 10000 });
	return (await page.locator('#owner button[aria-label^="Unsubscribe from"]').count()) > 0;
};

await openWatch();
const likedBefore = await liked();
const subscribedBefore = await subscribed();
if (likedBefore === "true" || subscribedBefore) console.log(`note: ${login} already ${likedBefore === "true" ? "likes the video" : ""} ${subscribedBefore ? "subscribes to the channel" : ""}; checks toggle from there`);

// like, reload, unlike
await likeButton().click();
await page.waitForTimeout(1500);
await openWatch();
check("like persists across reload", (await liked()) !== likedBefore, await liked());
await likeButton().click();
await page.waitForTimeout(1500);

// subscribe, reload, unsubscribe (through the bell menu and a confirm dialog)
const toggleSubscription = async () => {
	if (!(await subscribed())) await page.locator('#owner button[aria-label^="Subscribe to"]:visible').first().click();
	else {
		await page.locator('#owner button[aria-label^="Current setting is"]:visible').first().click();
		await page.locator('tp-yt-iron-dropdown:visible yt-list-item-view-model:has-text("Unsubscribe"), tp-yt-iron-dropdown:visible ytd-menu-service-item-renderer:has-text("Unsubscribe")').first().click();
		await page.locator("yt-confirm-dialog-renderer #confirm-button button:visible, yt-dialog-view-model button:visible:has-text('Unsubscribe')").first().click();
	}
	await page.waitForTimeout(1500);
};
await toggleSubscription();
await openWatch();
check("subscription persists across reload", (await subscribed()) !== subscribedBefore, await subscribeButton().getAttribute("aria-label"));
await toggleSubscription();
await openWatch();
check("like and subscription restored", (await liked()) === likedBefore && (await subscribed()) === subscribedBefore);
await shot("05-watch-signed-in");

// comment: post, reload, delete
const comment = `e2e comment ${Date.now()}`;
const toComments = async () => {
	for (const y of [700, 1400, 2100]) {
		await page.evaluate((v) => window.scrollTo(0, v), y);
		await page.waitForTimeout(1000);
	}
	await page.locator("ytd-comments-header-renderer").first().waitFor({ timeout: 10000 });
};
const ownComment = () => page.locator("ytd-comment-thread-renderer", { hasText: comment });
await toComments();
await page.locator("ytd-comments-header-renderer #placeholder-area").first().click();
await page.keyboard.type(comment);
await page.locator("ytd-comments-header-renderer #submit-button button").first().click();
await page.waitForTimeout(2000);
await openWatch();
await toComments();
check("comment persists across reload", (await until(() => ownComment().count(), (n) => n > 0)) > 0, comment);
await shot("06-comment");
await ownComment().first().locator("#action-menu button").first().click();
await page.locator('tp-yt-iron-dropdown:visible yt-list-item-view-model:has-text("Delete"), tp-yt-iron-dropdown:visible ytd-menu-service-item-renderer:has-text("Delete")').first().click();
const confirmDelete = page.locator("yt-confirm-dialog-renderer #confirm-button button:visible, yt-dialog-view-model button:visible:has-text('Delete')");
if (await confirmDelete.first().isVisible({ timeout: 2000 }).catch(() => false)) await confirmDelete.first().click();
await page.waitForTimeout(1500);
await openWatch();
await toComments();
check("comment deleted", (await ownComment().count()) === 0);

// Save to Watch later through the Save sheet, then remove it the same way
const toggleWatchLater = async () => {
	const save = page.locator('ytd-watch-metadata button[aria-label="Save to playlist"]').first();
	if (await save.isVisible().catch(() => false)) await save.click();
	else {
		await page.locator('ytd-watch-metadata button[aria-label="More actions"]').last().click();
		await page.locator('yt-list-item-view-model:has-text("Save"), ytd-menu-service-item-renderer:has-text("Save")').first().click();
	}
	await page.locator('yt-list-item-view-model:has-text("Watch later")').last().click();
	await page.waitForTimeout(1500);
	await page.keyboard.press("Escape");
};
const inWatchLater = async () => {
	await page.goto(`${ORIGIN}/playlist?list=WL`, { waitUntil: "domcontentloaded" });
	await page.waitForTimeout(3000);
	return page.locator(`ytd-playlist-video-renderer a#video-title[href*="${videoId}"]`).count();
};
await openWatch();
const wlBefore = await inWatchLater();
await openWatch();
await toggleWatchLater();
const wlAfter = await inWatchLater();
check("Save sheet toggles Watch later", (wlAfter > 0) !== (wlBefore > 0), { before: wlBefore, after: wlAfter });
await shot("07-watch-later");
await openWatch();
await toggleWatchLater();
check("Watch later restored", ((await inWatchLater()) > 0) === wlBefore > 0);

// history lists the watched video
await page.goto(`${ORIGIN}/feed/history`, { waitUntil: "domcontentloaded" });
const inHistory = await until(() => page.locator(`a#video-title[href*="${videoId}"], a[href*="${videoId}"]`).count(), (n) => n > 0);
check("history lists the video", inHistory > 0);
await shot("08-history");

// appearance: Dark theme from the account menu persists; back to the previous choice after
const pickAppearance = async (label: string) => {
	await page.locator("#avatar-btn").click();
	await page.getByText(/^Appearance/).first().click();
	await Promise.all([page.waitForURL(/themeRefresh=1|\/$/, { timeout: 10000 }).catch(() => {}), page.getByText(label, { exact: true }).first().click()]);
	await page.waitForTimeout(2500);
};
await page.goto(`${ORIGIN}/`, { waitUntil: "load" });
const prefBefore = (await ctx.cookies()).find((c) => c.name === "PREF")?.value ?? "";
// the client's Appearance flags (src/appearance.ts): 0x400 dark, 0x80000 light
const flags = Number.parseInt(/(?:^|&)f6=([0-9a-fA-F]+)/.exec(prefBefore)?.[1] ?? "0", 16);
const wasDark = !!(flags & 0x400);
await pickAppearance(wasDark ? "Light theme" : "Dark theme");
await page.reload({ waitUntil: "load" });
check("appearance persists across reload", (await page.evaluate(() => document.documentElement.hasAttribute("dark"))) === !wasDark);
await page.locator("ytd-rich-item-renderer img[src]").first().waitFor({ timeout: 10000 }).catch(() => {});
await page.waitForTimeout(1000);
await shot("09-appearance");
await pickAppearance(flags & 0x400 ? "Dark theme" : flags & 0x80000 ? "Light theme" : "Use device theme");

// Studio: the content list
const studio = await ctx.newPage();
const studioReport = watchPage(studio, STUDIO);
// Studio loads thumbnails and avatars from the main origin, which is this
// instance too (this handler runs before watchPage's, which records the rest)
void studio.route(`${ORIGIN}/**`, (r) => r.continue());
await studio.goto(`${STUDIO}/`, { waitUntil: "domcontentloaded" });
await studio.waitForURL(/\/channel\/UC[\w-]{22}/, { timeout: 15000 });
await studio.goto(`${studio.url().replace(/(\/channel\/UC[\w-]{22}).*/, "$1")}/videos/upload`, { waitUntil: "domcontentloaded" });
const rows = await until(() => studio.locator("ytcp-video-row").count(), (n) => n > 0, 20000);
check("Studio content list shows the channel's videos", rows > 0, rows);
await shot("10-studio", studio);

// admin: a non-operator gets a 404 for pages and actions
const adminGet = await page.request.get(`${ORIGIN}/admin`, { maxRedirects: 0 });
const adminPost = await page.request.post(`${ORIGIN}/admin/settings`, { form: { registration: "closed" }, headers: { origin: ORIGIN }, maxRedirects: 0 });
check(`admin is hidden from ${login}`, adminGet.status() === 404 && adminPost.status() === 404, { get: adminGet.status(), post: adminPost.status() });

for (const [name, r] of [
	["main", report],
	["studio", studioReport],
] as const) {
	check(`${name}: no page errors`, r.pageErrors.length === 0, [...new Set(r.pageErrors)].slice(0, 5));
	check(`${name}: no requests to other hosts`, r.external.length === 0, [...new Set(r.external)].slice(0, 5));
	// requests cut off by navigating away are not failures
	const failures = r.failed.filter((f) => !f.endsWith("net::ERR_ABORTED"));
	check(`${name}: no failed instance requests`, failures.length === 0, [...new Set(failures)].slice(0, 5));
}

await browser.close();
console.log(failed ? `${failed} check(s) failed` : "all checks passed");
process.exit(failed ? 1 : 0);
