// A video's thumbnail through Studio's own thumbnail picker, checked against
// the database and the served images: Reselect picks another of the three
// stills, Upload file sends a custom image (the resumable upload to
// /upload/studiothumbnail), and each Save changes what /vi/<id>/hqdefault.jpg
// serves on the main site. The upload route answers signed-in Studio pages
// only. The video's thumbnail is put back at the end.
//
//   bun scripts/e2e/studio-thumbnail.ts [--login bob:yewtube-demo] [--shots dir]

import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import type { Page } from "playwright-core";
import { MEDIA_DIR } from "../../src/config";
import { sql } from "../../src/db";
import { CUSTOM_THUMBNAIL, applyThumbnail } from "../../src/media/process";
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
const until = async (f: () => Promise<boolean>, ms = 10000) => {
	const end = Date.now() + ms;
	while (Date.now() < end) {
		if (await f()) return true;
		await new Promise((r) => setTimeout(r, 300));
	}
	return f();
};

const [video] = (await sql`select v.id, v.thumbnail_choice, v.made_for_kids from videos v join channels c on c.id = v.channel_id join users u on u.id = c.user_id
	where u.login = ${login} and v.playable and v.deleted_at is null and v.width > v.height order by v.created_at limit 1`) as { id: string; thumbnail_choice: string; made_for_kids: boolean | null }[];
if (!video) throw new Error(`${login} has no playable landscape video`);
const choice = async () => ((await sql`select thumbnail_choice from videos where id = ${video.id}`)[0] as { thumbnail_choice: string }).thumbnail_choice;
// what the main site serves, signed out
const served = async () => {
	const r = await fetch(`${ORIGIN}/vi/${video.id}/hqdefault.jpg`);
	return { status: r.status, etag: r.headers.get("etag") ?? "", bytes: (await r.arrayBuffer()).byteLength };
};

// a custom image to upload
const dir = join("data", "e2e-thumbnail");
mkdirSync(dir, { recursive: true });
const picture = join(dir, "custom.png");
const ff = Bun.spawnSync(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "smptehdbars=size=1280x720", "-frames:v", "1", picture]);
if (ff.exitCode !== 0) throw new Error(`ffmpeg: ${ff.stderr}`);

const { browser, ctx } = await launch();
const errors: string[] = [];
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push(e.message.slice(0, 200)));
const editor = () => page.locator("ytcp-video-thumbnail-editor").first();
const open = async () => {
	await page.goto(`${STUDIO}/video/${video.id}/edit`, { waitUntil: "domcontentloaded" });
	await page.locator("ytcp-video-thumbnail-editor ytcp-img-with-fallback[image-ready]").first().waitFor({ timeout: 30000 });
	await page.waitForTimeout(1000);
};
const menu = async (item: string) => {
	const ed = editor();
	await ed.hover();
	await ed.locator("button[aria-label=Options]").locator("visible=true").first().click({ force: true });
	await page.locator("tp-yt-paper-item, yt-list-item-view-model, [role=menuitem], [role=option]", { hasText: item }).locator("visible=true").first().click();
};
const save = async () => {
	// Studio saves nothing until the audience is set
	if ((await sql`select made_for_kids from videos where id = ${video.id}`)[0].made_for_kids === null) await page.locator("tp-yt-paper-radio-button[name=VIDEO_MADE_FOR_KIDS_NOT_MFK]").click();
	const button = page.locator("ytcp-button#save, #save").locator("visible=true").first();
	await button.click();
};

try {
	await signIn(page, login, password, ORIGIN);
	await open();
	const before = await served();
	const pickerSrc = () => editor().locator("ytcp-img-with-fallback[image-ready] img").locator("visible=true").first().getAttribute("src");
	const firstSrc = await pickerSrc();
	check("the picker shows the current still", (await editor().locator("ytcp-img-with-fallback[image-ready]").count()) > 0);
	await shot(page, "01-editor");

	// Reselect: another still
	const target = video.thumbnail_choice === "still3" ? "still2" : "still3";
	await menu("Reselect");
	const dialog = page.locator("ytcp-dialog, tp-yt-paper-dialog").filter({ has: page.locator(`#still-${target === "still3" ? 2 : 1}`) }).locator("visible=true").first();
	await dialog.waitFor({ timeout: 10000 });
	await page.waitForTimeout(800);
	await shot(page, "02-stills");
	check("the dialog lists three stills", (await dialog.locator("ytcp-img-with-fallback").count()) >= 3, await dialog.locator("ytcp-img-with-fallback").count());
	await dialog.locator(`#still-${target === "still3" ? 2 : 1}`).click();
	await dialog.getByRole("button", { name: /^(Done|Select|Save)$/ }).first().click();
	await page.waitForTimeout(500);
	await save();
	check(`Save stores ${target}`, await until(async () => (await choice()) === target), await choice());
	const afterStill = await served();
	check("…and the main site serves it", afterStill.status === 200 && afterStill.etag !== before.etag, { before: before.etag, after: afterStill.etag });
	await shot(page, "03-still-saved");

	// Upload file: a custom image
	await open();
	const chooser = page.waitForEvent("filechooser", { timeout: 10000 });
	await menu("Upload file");
	await (await chooser).setFiles(picture);
	await page.waitForTimeout(2500);
	await shot(page, "04-uploaded");
	await save();
	check("Save stores the custom image", await until(async () => (await choice()) === "custom", 15000), await choice());
	check("…kept with the video", existsSync(join(MEDIA_DIR, video.id, CUSTOM_THUMBNAIL)));
	const afterCustom = await served();
	check("…and the main site serves it", afterCustom.status === 200 && afterCustom.etag !== afterStill.etag, { before: afterStill.etag, after: afterCustom.etag });
	await open();
	await shot(page, "05-custom-reloaded");
	// the picker shows the saved choice: the thumbnail's URL version follows it
	const lastSrc = await pickerSrc();
	check("the picker shows the custom image after a reload", !!lastSrc && lastSrc !== firstSrc && lastSrc.includes(`/vi/${video.id}/`), { firstSrc, lastSrc });

	// the upload answers signed-in Studio pages only
	const anon = await browser.newContext();
	const r = await anon.request.post(`${STUDIO}/upload/studiothumbnail`, { headers: { "x-goog-upload-command": "start", "x-goog-upload-protocol": "resumable" }, data: "{}" });
	check("signed out, the upload is refused", r.status() === 401, r.status());
	const foreign = await page.evaluate(async (studio) => (await fetch(`${studio}/upload/studiothumbnail`, { method: "POST", headers: { "x-goog-upload-command": "start", "x-goog-upload-protocol": "resumable" }, body: "{}", credentials: "include" })).status, STUDIO);
	check("Studio's own page may upload", foreign === 200, foreign);
	check("no page errors", errors.length === 0, errors.slice(0, 5));
} finally {
	rmSync(join(MEDIA_DIR, video.id, CUSTOM_THUMBNAIL), { force: true });
	await sql`update videos set made_for_kids = ${video.made_for_kids} where id = ${video.id}`;
	await applyThumbnail(video.id, video.thumbnail_choice === "custom" ? "auto" : video.thumbnail_choice).catch((e) => console.log(`restore: ${e}`));
	rmSync(dir, { recursive: true, force: true });
	await browser.close();
}
console.log(failed ? `${failed} failed` : "all passed");
process.exit(failed ? 1 : 0);
