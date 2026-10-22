// GIF comments (src/gifs.ts, assets/gifs.js) through the official client: the
// GIF button in the comment box, search, favorites, a text+GIF comment, a
// GIF-only comment and a reply with a GIF, each shown by the client after a
// reload. Every comment and favorite it adds is removed before it ends.
//
//   bun scripts/e2e/gifs.ts [--login bob:owntube-demo] [--video <id>] [--shots dir]
//
// Needs the server running with KLIPY_API_KEY set.

import { mkdirSync } from "node:fs";
import { sql } from "../../src/db";
import { launch, signIn, watchPage } from "../probe";

const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
const args = process.argv.slice(2);
const opt = (n: string) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const [login, password] = (opt("--login") ?? "bob:owntube-demo").split(":");
const shots = opt("--shots");
if (shots) mkdirSync(shots, { recursive: true });
const videoId = opt("--video") ?? (await sql`select id from videos where privacy = 'public' order by created_at limit 1`)[0]?.id;

const { browser, ctx } = await launch();
const page = await ctx.newPage();
const report = watchPage(page);
let failed = 0;
const check = (name: string, ok: boolean, detail: unknown = "") => {
	if (!ok) failed++;
	console.log(`${ok ? "ok  " : "FAIL"} ${name}${detail === "" ? "" : `: ${JSON.stringify(detail)}`}`);
};
const shot = async (name: string) => shots && (await page.screenshot({ path: `${shots}/${name}.png` }));
const marker = `gif-e2e-${Date.now().toString(36)}`;

await signIn(page, login, password);
const [{ id: userId }] = await sql`select id from users where login = ${login}`;
const favoritesBefore = (await sql`select gif_id from gif_favorites where user_id = ${userId}`).map((r: any) => r.gif_id);

const open = async () => {
	await page.goto(`${ORIGIN}/watch?v=${videoId}`, { waitUntil: "domcontentloaded" });
	await page.evaluate(() => scrollTo(0, 600));
	await page.locator("ytd-comments #simplebox-placeholder").first().waitFor({ timeout: 20000 });
};
const picker = page.locator(".otg-picker");
const pick = async (q: string, n = 0) => {
	await picker.locator("input").fill(q);
	await picker.locator(".otg-tile img").nth(n).waitFor({ timeout: 15000 });
	await picker.locator(".otg-pick").nth(n).click();
};

await open();
await page.locator("ytd-comments #simplebox-placeholder").first().click();
const box = page.locator("ytd-comments ytd-comment-simplebox-renderer ytd-commentbox").first();
const gifButton = box.locator(".otg-button");
await gifButton.waitFor({ timeout: 10000 });
const order = await box.locator("#footer").evaluate((f) => Array.from(f.querySelectorAll("#emoji-button, .otg-button, #submit-button")).map((e) => e.id || e.className));
check("GIF button follows the emoji button", order.indexOf("otg-button") >= 0 && (order[0] !== "otg-button" || !order.includes("emoji-button")), order);

await gifButton.click();
await picker.locator(".otg-tile img").first().waitFor({ timeout: 15000 });
check("picker opens with trending GIFs", (await picker.locator(".otg-tile").count()) > 0);
const [pr, br] = [await picker.boundingBox(), await gifButton.boundingBox()];
check("picker sits above the box", !!pr && !!br && pr.y + pr.height <= br.y, { pr, br });
await shot("01-picker");

// favorites: star one, see it under the star button, unstar it later
await picker.locator(".otg-tile").first().hover();
await picker.locator(".otg-star").first().click();
await page.waitForTimeout(500);
await picker.locator(".otg-stars").click();
await picker.locator(".otg-tile img").first().waitFor({ timeout: 10000 });
check("starred GIF is in favorites", (await picker.locator(".otg-star[aria-pressed=true]").count()) >= 1);
await shot("02-favorites");
await picker.locator(".otg-stars").click();

await picker.locator("input").fill("cat");
await page.waitForTimeout(800);
await picker.locator(".otg-tile img").first().waitFor({ timeout: 15000 });
check("search finds GIFs", (await picker.locator(".otg-tile").count()) > 0);
await shot("03-search");
await picker.locator(".otg-pick").first().click();
check("picked GIF is attached", (await box.locator(".otg-attachment img").count()) === 1);
await box.locator("#contenteditable-root").click();
await page.keyboard.type(`${marker} text and gif`);
await shot("04-attached");
await box.locator("#submit-button button, #submit-button").first().click();
const posted = page.locator("ytd-comment-thread-renderer", { hasText: marker }).first();
await posted.waitFor({ timeout: 15000 });
check("text+GIF comment shows its GIF", (await posted.locator("img[src*='/_ot/gifs/media/']").count()) > 0);

// a GIF-only comment
await page.locator("ytd-comments #simplebox-placeholder").first().click();
await gifButton.click();
await pick("dog");
await box.locator("#submit-button button, #submit-button").first().click();
await page.waitForTimeout(2500);
const [gifOnly] = await sql`select id, text, gif from comments where video_id = ${videoId} and gif is not null order by created_at desc limit 1`;
check("GIF-only comment is stored without text", !!gifOnly && gifOnly.text === "" && !!gifOnly.gif, gifOnly && { text: gifOnly.text });

// a reply with a GIF
await posted.locator("#reply-button-end button, ytd-button-renderer#reply-button-end").first().click();
const replyBox = posted.locator("ytd-commentbox").first();
await replyBox.locator(".otg-button").waitFor({ timeout: 10000 });
await replyBox.locator(".otg-button").click();
await pick("thanks");
await replyBox.locator("#contenteditable-root").click();
await page.keyboard.type(`${marker} reply`);
await replyBox.locator("#submit-button button, #submit-button").first().click();
await page.waitForTimeout(2500);
const [reply] = await sql`select id, gif from comments where video_id = ${videoId} and parent_id is not null and text like ${`${marker}%`} limit 1`;
check("reply is stored with its GIF", !!reply?.gif);

// after a reload, the client builds them from the server's response
await open();
const thread = page.locator("ytd-comment-thread-renderer", { hasText: marker }).first();
await thread.waitFor({ timeout: 20000 });
check("GIF shows after reload", (await thread.locator("img[src*='/_ot/gifs/media/']").count()) > 0);
await thread.scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
await shot("05-comment");
const gifOnlyThread = page.locator(`ytd-comment-thread-renderer:has(img[src*='/_ot/gifs/media/${gifOnly?.gif?.id}/'])`).first();
check("GIF-only comment shows after reload", (await gifOnlyThread.count()) > 0);

// clean up: comments and the favorite this run added
const ids = (await sql`select id from comments where video_id = ${videoId} and (text like ${`${marker}%`} or id = ${gifOnly?.id ?? ""})`).map((r: any) => r.id);
await sql`delete from comments where id in ${sql(ids.length ? ids : [""])} or parent_id in ${sql(ids.length ? ids : [""])}`;
await sql`update videos set comment_count = (select count(*) from comments where video_id = ${videoId} and deleted_at is null) where id = ${videoId}`;
await sql`delete from gif_favorites where user_id = ${userId} and gif_id not in ${sql(favoritesBefore.length ? favoritesBefore : [""])}`;
check("test comments removed", ids.length >= 2, ids.length);

check("no page errors", report.pageErrors.length === 0, [...new Set(report.pageErrors)].slice(0, 5));
check("no requests to other hosts", report.external.length === 0, [...new Set(report.external)].slice(0, 5));
const failures = report.failed.filter((f) => !f.endsWith("net::ERR_ABORTED"));
check("no failed instance requests", failures.length === 0, [...new Set(failures)].slice(0, 5));
await browser.close();
console.log(failed ? `${failed} failed` : "all passed");
process.exit(failed ? 1 : 0);
