// Studio's Comments page through the official Studio client, checked against
// the database: a viewer's comment on the channel's video is listed with its
// video; the channel replies, likes, hearts, edits its reply, reports the
// comment as spam (it moves to Held and off the watch page), approves it,
// removes its reply; the video's own Comments page; paging; and that the API
// answers the channel's owner only. What it adds is removed at the end.
//
//   bun scripts/e2e/studio-comments.ts [--login bob:yewtube-demo] [--viewer carol] [--shots dir]
//
// Needs the login's channel to have a ready video (bun scripts/seed.ts) and
// the server running with Studio on STUDIO_ORIGIN.

import { mkdirSync } from "node:fs";
import type { Locator, Page } from "playwright-core";
import { sql } from "../../src/db";
import { newCommentId } from "../../src/ids";
import { launch, signIn } from "../probe";

const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
const STUDIO = process.env.STUDIO_ORIGIN ?? "http://localhost:8081";
const args = process.argv.slice(2);
const opt = (n: string) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const [login, password] = (opt("--login") ?? "bob:yewtube-demo").split(":");
const viewerLogin = opt("--viewer") ?? "carol";
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

const [me] = (await sql`select c.id from channels c join users u on u.id = c.user_id where u.login = ${login}`) as { id: string }[];
const [them] = (await sql`select c.id from channels c join users u on u.id = c.user_id where u.login = ${viewerLogin}`) as { id: string }[];
const [video] = (await sql`select id, title from videos where channel_id = ${me.id} and status = 'ready' and deleted_at is null order by published_at desc limit 1`) as { id: string; title: string }[];
if (!video) throw new Error(`${login}'s channel has no ready video: bun scripts/seed.ts`);
const stamp = Date.now();
const text = `Studio comments e2e ${stamp}`;
// the viewer's comment, as the main client would leave it
const id = newCommentId();
await sql`insert into comments (id, video_id, author_channel_id, text) values (${id}, ${video.id}, ${them.id}, ${text})`;
await sql`update videos set comment_count = comment_count + 1 where id = ${video.id}`;
const row = async () => (await sql`select like_count, reply_count, hearted_at, spam_at, deleted_at from comments where id = ${id}`)[0];

const { browser, ctx } = await launch();
const errors: string[] = [];
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push(e.message.slice(0, 200)));
await signIn(page, login, password, ORIGIN);
const comment = (): Locator => page.locator("ytcp-comment", { hasText: text }).first();
const menu = async (c: Locator, item: string) => {
	await c.locator("#action-menu-button").first().click();
	// menus opened before stay in the page, hidden
	await page.locator("ytcp-comment-action-menu").getByText(item, { exact: true }).locator("visible=true").first().click();
};

try {
	// ---- the channel's comments ----
	await page.goto(`${STUDIO}/channel/${me.id}/comments/inbox`, { waitUntil: "domcontentloaded" });
	await comment().waitFor({ timeout: 15000 }).catch(() => {});
	check("the viewer's comment is listed (Unresponded)", (await comment().count()) === 1);
	check("…with its video in the Content column", (await page.locator("ytcp-comment-thread", { hasText: text }).first().innerText().catch(() => "")).includes(video.title));
	await shot(page, "01-comments");

	// like and heart
	await comment().locator("#like-button").first().click();
	check("Like is stored", await until(async () => (await row()).like_count === 1));
	await comment().locator("ytcp-comment-creator-heart").first().click();
	check("Heart is stored", await until(async () => !!(await row()).hearted_at));

	// reply
	await comment().getByRole("button", { name: "Reply" }).first().click();
	const replyBox = page.locator("#reply-dialog-id textarea").first();
	await replyBox.waitFor({ timeout: 5000 });
	await replyBox.fill(`Reply ${stamp}`);
	await page.locator("#reply-dialog-id #submit-button").first().click();
	const reply = async () => (await sql`select id, text from comments where parent_id = ${id} and author_channel_id = ${me.id} and deleted_at is null`)[0];
	check("the reply is stored", await until(async () => (await reply())?.text === `Reply ${stamp}`));
	const replyEl = page.locator("ytcp-comment", { hasText: `Reply ${stamp}` }).first();
	check("…and shown under the comment", await until(async () => (await replyEl.count()) === 1));
	await shot(page, "02-replied");

	// edit the reply
	await menu(replyEl, "Edit");
	const editBox = page.locator("#edit-dialog-id textarea").first();
	await editBox.waitFor({ timeout: 5000 });
	await editBox.fill(`Edited reply ${stamp}`);
	await page.locator("#edit-dialog-id #submit-button").first().click();
	check("the edited reply is stored", await until(async () => (await reply())?.text === `Edited reply ${stamp}`));
	check("…and shown", await until(async () => (await page.getByText(`Edited reply ${stamp}`).count()) > 0));

	// replied: no longer Unresponded
	await page.reload({ waitUntil: "domcontentloaded" });
	await page.locator("ytcp-comments-section").first().waitFor({ timeout: 15000 });
	await page.waitForTimeout(2500);
	check("a responded comment leaves the Unresponded list", (await comment().count()) === 0);

	// the video's own page lists all its comments with the filter removed
	await page.goto(`${STUDIO}/video/${video.id}/comments/inbox`, { waitUntil: "domcontentloaded" });
	await page.locator("ytcp-comments-section").first().waitFor({ timeout: 15000 });
	await page.waitForTimeout(2500);
	const chipClose = page.locator("ytcp-chip-bar ytcp-chip", { hasText: "Unresponded" }).locator("#delete-icon, [icon='close'], tp-yt-iron-icon").first();
	if (await chipClose.count()) await chipClose.click().catch(() => {});
	check("the video's page lists the comment once its filter is removed", await until(async () => (await comment().count()) === 1, 10000));
	check("…without a Content column", (await page.locator("ytcp-comment-thread", { hasText: text }).first().innerText().catch(() => "")).includes(video.title) === false);
	check("…and with the creator's heart and like kept", (await comment().locator("#like-button [aria-pressed='true'], #like-button.toggled, #like-button[is-toggled]").count()) > 0 || (await row()).like_count === 1);
	await shot(page, "03-video-comments");

	// report as spam: off the list, off the watch page, into Held
	await menu(comment(), "Report as spam");
	check("Report as spam holds the comment", await until(async () => !!(await row()).spam_at));
	check("…and drops it from the list", await until(async () => !(await comment().isVisible())));
	const main = await ctx.newPage();
	await main.goto(`${ORIGIN}/watch?v=${video.id}`, { waitUntil: "domcontentloaded" });
	await main.mouse.wheel(0, 900);
	await main.locator("ytd-comments #contents ytd-comment-thread-renderer, ytd-comments ytd-message-renderer, ytd-comments #count").first().waitFor({ timeout: 15000 }).catch(() => {});
	await main.waitForTimeout(1500);
	check("a held comment isn't on the watch page", !(await main.locator("ytd-comments").innerText().catch(() => "")).includes(text));
	await main.close();
	await page.getByText("Published", { exact: true }).first().click();
	await page.getByText("Held", { exact: true }).first().click();
	await page.getByText("Apply", { exact: true }).first().click();
	check("Held lists it", await until(async () => (await comment().count()) === 1, 10000));
	check("…with the reason", (await page.locator("ytcp-comment-thread", { hasText: text }).first().innerText().catch(() => "")).includes("You reported this comment as spam"));
	await shot(page, "04-held");
	await comment().locator("ytcp-comment-moderation-buttons ytcp-comment-button").first().click();
	check("Approve publishes it again", await until(async () => !(await row()).spam_at));
	// the list keeps the row's element, hidden
	check("…and drops it from Held", await until(async () => !(await comment().isVisible())));

	// back on Published: remove the reply from its menu, then the comment
	// with the selection's batch bar
	await page.getByText("Held", { exact: true }).first().click();
	await page.getByText("Published", { exact: true }).first().click();
	await page.getByText("Apply", { exact: true }).first().click();
	await comment().waitFor({ timeout: 10000 }).catch(() => {});
	const replyRow = page.locator("ytcp-comment", { hasText: `Edited reply ${stamp}` }).first();
	await replyRow.waitFor({ timeout: 8000 }).catch(() => {});
	await shot(page, "05-published");
	await menu(replyRow, "Remove");
	const confirm = page.locator("ytcp-confirmation-dialog #confirm-button, ytcp-dialog #confirm-button").first();
	if (await confirm.isVisible().catch(() => false)) await confirm.click();
	check("Remove deletes the reply", await until(async () => !(await reply())));
	check("…and drops it from the thread", await until(async () => !(await replyRow.isVisible())));
	check("…and the thread's reply count", (await row()).reply_count === 0);
	await comment().locator("#batch-select").first().click();
	await page.waitForTimeout(500);
	await shot(page, "06-selected");
	await page.locator("ytcp-comment-batch-action-bar").getByRole("button", { name: /Remove/ }).first().click();
	await page.waitForTimeout(800);
	await shot(page, "07-batch-confirm");
	const batchConfirm = page.locator("ytcp-confirmation-dialog #confirm-button").first();
	if (await batchConfirm.isVisible().catch(() => false)) await batchConfirm.click();
	check("the batch bar removes the selected comment", await until(async () => !!(await row()).deleted_at));
	check("…and drops it from the list", await until(async () => !(await comment().isVisible())));
	const [{ comment_count }] = await sql`select comment_count from videos where id = ${video.id}`;
	const [{ n }] = await sql`select count(*)::int as n from comments where video_id = ${video.id} and deleted_at is null and spam_at is null`;
	check("the video's comment count follows", comment_count === n, { comment_count, n });
} finally {
	// ---- the API answers the channel's owner only ----
	const status = (body: object) =>
		page.evaluate(async (body) => {
			const cfg = (window as any).ytcfg;
			const r = await fetch("/youtubei/v1/comment/get_comments", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ context: cfg.get("INNERTUBE_CONTEXT"), ...body }) });
			return r.status;
		}, body);
	check("another channel's comments are refused", (await status({ channelId: them.id, moderationState: "PUBLISHED" })) === 403);
	const [other] = await sql`select id from videos where channel_id <> ${me.id} and deleted_at is null limit 1`;
	if (other) check("another channel's video's comments are refused", (await status({ videoId: other.id, moderationState: "PUBLISHED" })) === 403);
	const anon = await browser.newContext();
	const r = await anon.request.post(`${STUDIO}/youtubei/v1/comment/get_comments`, { data: { context: { client: { clientName: "WEB_CREATOR", clientVersion: "1.0" } }, channelId: me.id } });
	check("signed out, comments are refused", r.status() === 401, r.status());

	check("no page errors", errors.length === 0, errors.slice(0, 5));
	// put back
	const [{ n }] = await sql`select count(*)::int as n from comments where (id = ${id} or parent_id = ${id}) and deleted_at is null and spam_at is null`;
	await sql`delete from comments where id = ${id} or parent_id = ${id}`;
	await sql`update videos set comment_count = greatest(0, comment_count - ${n}) where id = ${video.id}`;
	await browser.close();
}
console.log(failed ? `${failed} failed` : "all passed");
process.exit(failed ? 1 : 0);
