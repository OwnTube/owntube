// End-to-end upload through Studio's own upload dialog: pick a local file,
// transfer, process, title it, publish, then find it in Studio's content
// list and the channel's Videos tab and play it on the main site. Runs once
// per generated source (with and without an audio track, and a 53 s
// 1080p60 H.264/AAC clip, which is remuxed: it must be playable within 30 s
// of being picked, and play while the rest is still processing). Removes
// the videos it made.
//   bun scripts/e2e/upload.ts [--quick]   (dev server on ORIGIN / STUDIO_ORIGIN; --quick skips the long clip)

import { mkdirSync, readFileSync, rmSync, statSync, writeSync } from "node:fs";
import { join } from "node:path";
import { sql } from "../../src/db";
import { deleteMedia } from "../../src/media/process";
import { launch, signIn } from "../probe";

const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
const STUDIO = process.env.STUDIO_ORIGIN ?? ORIGIN.replace(/:(\d+)$/, (_, p) => `:${Number(p) + 1}`);
const LOGIN = "bob";
const dir = join("data", "e2e-upload");
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });

async function make(name: string, args: string[]) {
	const p = Bun.spawn(["ffmpeg", "-v", "error", "-y", ...args, join(dir, name)], { stderr: "pipe" });
	if ((await p.exited) !== 0) throw new Error(`ffmpeg ${name}: ${await new Response(p.stderr).text()}`);
	return join(dir, name);
}
const sources = [
	await make("with-audio.mp4", ["-f", "lavfi", "-i", "testsrc2=size=1280x720:rate=30", "-f", "lavfi", "-i", "sine=frequency=330", "-t", "5", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac"]),
	await make("no-audio.webm", ["-f", "lavfi", "-i", "testsrc2=size=640x360:rate=25", "-t", "4", "-c:v", "libvpx-vp9", "-deadline", "realtime", "-cpu-used", "8"]),
];
const LONG = "1080p60-53s.mp4";
if (!process.argv.includes("--quick")) {
	sources.push(await make(LONG, ["-f", "lavfi", "-i", "testsrc2=size=1920x1080:rate=60", "-f", "lavfi", "-i", "sine=frequency=440:sample_rate=48000", "-t", "53",
		"-c:v", "libx264", "-preset", "ultrafast", "-b:v", "8M", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart"]));
}
const plays = (main: import("playwright-core").Page) =>
	main.evaluate(async () => {
		const video = document.querySelector("video") as HTMLVideoElement | null;
		if (!video) return -1;
		video.muted = true;
		await video.play().catch(() => {});
		await new Promise((r) => setTimeout(r, 2500));
		return video.currentTime;
	});

// requests that fail on the server are logged there
const LOG = "data/server.log";
const logStart = statSync(LOG).size;
let failures = 0;
const check = (name: string, ok: boolean, detail = "") => {
	// written at once, so a run cut short still shows how far it got
	writeSync(1, `${ok ? "ok  " : "FAIL"} ${name}${detail ? `: ${detail}` : ""}\n`);
	if (!ok) failures++;
};

const { browser, ctx } = await launch();
const page = await ctx.newPage();
const pageErrors: string[] = [];
page.on("pageerror", (e) => pageErrors.push(e.message.slice(0, 200)));
await signIn(page, LOGIN, "yewtube-demo");
const [{ channel }] = await sql`select c.id as channel from channels c join users u on u.id = c.user_id where u.login = ${LOGIN}`;
const made: string[] = [];

for (const file of sources) {
	const title = `Upload e2e ${file.split("/").pop()} ${Date.now()}`;
	await page.goto(`${STUDIO}/channel/${channel}/videos/upload?d=ud`, { waitUntil: "domcontentloaded" });
	const input = page.locator("ytcp-uploads-file-picker input[type=file]");
	await input.waitFor({ state: "attached", timeout: 30000 });
	await input.setInputFiles(file);
	const picked = Date.now();
	const long = file.endsWith(LONG);
	// the details step: the title box is filled with the file name first
	const titleBox = page.locator("ytcp-video-title #textbox").first();
	await titleBox.waitFor({ timeout: 30000 });
	// the dialog shows the details step before createvideo has answered
	let v: { id: string } | undefined;
	for (const end = Date.now() + 15000; !v && Date.now() < end; await page.waitForTimeout(500)) {
		[v] = (await sql`select id from videos where channel_id = ${channel} and original_filename = ${file.split("/").pop()!} and created_at > ${new Date(Date.now() - 120000)} order by created_at desc limit 1`) as { id: string }[];
	}
	check(`${file}: createvideo registered the upload`, !!v);
	if (!v) continue;
	made.push(v.id);
	await titleBox.click();
	await page.keyboard.press("Control+A");
	await page.keyboard.type(title);
	await page.locator("tp-yt-paper-radio-button[name=VIDEO_MADE_FOR_KIDS_NOT_MFK]").click();
	for (let i = 0; i < 3; i++) {
		await page.locator("#next-button").click();
		await page.waitForTimeout(800);
	}
	await page.locator("tp-yt-paper-radio-button[name=PUBLIC]").click();
	// playable from a first format within seconds; the rest follows in the background
	let row: any;
	while (Date.now() - picked < 120_000) {
		[row] = await sql`select status, playable, error from videos where id = ${v.id}`;
		if (row.playable || row.status === "failed") break;
		await Bun.sleep(250);
	}
	const toPlayable = (Date.now() - picked) / 1000;
	check(`${file}: playable`, row.playable, `${row.status}${row.error ? ` ${row.error}` : ""} after ${toPlayable.toFixed(1)}s`);
	if (long) {
		check(`${file}: playable within 30 s of picking the file`, toPlayable < 30, `${toPlayable.toFixed(1)}s`);
		const [f] = await sql`select itag, height, mime_type from video_formats where video_id = ${v.id} and kind = 'muxed'`;
		check(`${file}: remuxed, not re-encoded`, f?.itag === 37 && f?.height === 1080, JSON.stringify(f));
	}
	await page.locator("#done-button").click();
	if (long) {
		// watched while the ladder is still being made
		const early = await ctx.newPage();
		await early.goto(`${ORIGIN}/watch?v=${v.id}`, { waitUntil: "domcontentloaded" });
		await early.waitForTimeout(4000);
		const [{ status }] = await sql`select status from videos where id = ${v.id}`;
		const t = await plays(early);
		check(`${file}: plays while ${status}`, t > 0.5, `currentTime ${t}`);
		await early.close();
	}
	const t0 = Date.now();
	while (Date.now() - t0 < (long ? 1_200_000 : 180_000)) {
		[row] = await sql`select status, error from videos where id = ${v.id}`;
		if (row.status === "ready" || row.status === "failed") break;
		await Bun.sleep(1000);
	}
	check(`${file}: processed`, row.status === "ready" && !row.error, `${row.status}${row.error ? ` ${row.error}` : ""} after ${((Date.now() - picked) / 1000).toFixed(0)}s`);
	const [{ n }] = await sql`select count(*)::int as n from video_formats where video_id = ${v.id} and kind <> 'muxed'`;
	check(`${file}: the adaptive formats were added`, n >= 4, `${n}`);
	let after: any;
	for (const end = Date.now() + 15000; Date.now() < end; await page.waitForTimeout(500)) {
		[after] = await sql`select title, visibility, draft, published_at from videos where id = ${v.id}`;
		if (after.visibility === "public" && after.title === title) break;
	}
	check(`${file}: published with the title`, after.title === title && after.visibility === "public" && !after.draft && !!after.published_at, JSON.stringify(after));

	// Studio's content list
	await page.goto(`${STUDIO}/channel/${channel}/videos/upload`, { waitUntil: "domcontentloaded" });
	await page.locator("ytcp-video-row", { hasText: title }).first().waitFor({ timeout: 15000 }).catch(() => {});
	check(`${file}: listed in Studio content`, (await page.locator("ytcp-video-row", { hasText: title }).count()) > 0);
	// the channel's Videos tab on the main site
	const main = await ctx.newPage();
	await main.goto(`${ORIGIN}/channel/${channel}/videos`, { waitUntil: "domcontentloaded" });
	await main.waitForTimeout(5000);
	check(`${file}: on the channel's Videos tab`, (await main.locator("ytd-rich-item-renderer, yt-lockup-view-model", { hasText: title }).count()) > 0);
	// playback
	await main.goto(`${ORIGIN}/watch?v=${v.id}`, { waitUntil: "domcontentloaded" });
	await main.waitForTimeout(4000);
	const played = await plays(main);
	check(`${file}: plays on the watch page`, played > 0.5, `currentTime ${played}`);
	await main.close();
}

check("studio: no page errors", pageErrors.length === 0, pageErrors.slice(0, 3).join(" | "));
const serverErrors = readFileSync(LOG, "utf8").slice(logStart).split("\n").filter((l) => / failed /.test(l));
check("no server errors during the uploads", serverErrors.length === 0, serverErrors.slice(0, 3).join(" | "));
await browser.close();
for (const id of made) {
	await sql`delete from videos where id = ${id}`;
	deleteMedia(id);
}
rmSync(dir, { recursive: true, force: true });
console.log(failures ? `${failures} checks failed` : "all checks passed");
process.exit(failures ? 1 : 0);
