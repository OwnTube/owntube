// Drives the official player on a local video: autoplay, pause, resume,
// seek, run to the end, reload, quality switch. Fails on any player error,
// off-instance request or media request that did not come from this instance.
//
//   bun scripts/e2e/playback.ts [videoId] [--shots dir] [--video dir]

import { mkdirSync } from "node:fs";
import { launch, playerState, watchPage } from "../probe";

const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
const args = process.argv.slice(2);
const opt = (n: string) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const id = args.find((a) => /^[A-Za-z0-9_-]{11}$/.test(a)) ?? (await (await fetch(`${ORIGIN}/youtubei/v1/search`, { method: "POST", body: JSON.stringify({ query: "" }) })).json().catch(() => null))?.firstVideo;
if (!id) throw new Error("pass a video id");
const shots = opt("--shots");
if (shots) mkdirSync(shots, { recursive: true });

const { browser, ctx } = await launch({ video: opt("--video"), narrow: args.includes("--narrow") });
const page = await ctx.newPage();
const report = watchPage(page);
const media: string[] = [];
const qoeErrors: string[] = [];
page.on("request", (r) => {
	const u = new URL(r.url());
	if (u.pathname === "/videoplayback") media.push(`${u.host} itag=${u.searchParams.get("itag")} range=${u.searchParams.get("range")}`);
	if (u.pathname.endsWith("/api/stats/qoe")) for (const k of ["error", "qoealert", "ec", "errorcode"]) if (u.searchParams.get(k)) qoeErrors.push(`${k}=${u.searchParams.get(k)} ${u.searchParams.get("details") ?? ""}`);
});

const checks: [string, boolean, string][] = [];
const check = (name: string, ok: boolean, detail: unknown) => {
	checks.push([name, ok, JSON.stringify(detail)]);
	console.log(`${ok ? "ok  " : "FAIL"} ${name}: ${JSON.stringify(detail)}`);
};
const player = (fn: string, ...a: unknown[]) => page.evaluate(([f, x]) => (document.querySelector("#movie_player") as any)?.[f as string]?.(...(x as unknown[])), [fn, a] as const);
const shot = async (name: string) => shots && (await page.screenshot({ path: `${shots}/${name}.png` }));
const until = async (pred: (s: Awaited<ReturnType<typeof playerState>>) => boolean, ms = 15000) => {
	const end = Date.now() + ms;
	let s = await playerState(page);
	while (!pred(s) && Date.now() < end) {
		await page.waitForTimeout(250);
		s = await playerState(page);
	}
	return s;
};

await page.goto(`${ORIGIN}/watch?v=${id}`, { waitUntil: "domcontentloaded" });
let s = await until((x) => x.state === 1 && (x.time ?? 0) > 1);
check("autoplay starts and time advances", s.state === 1 && (s.time ?? 0) > 1, s);
await shot("01-playing");
check("title shown", (await page.textContent("ytd-watch-metadata h1, h1.ytd-watch-metadata").catch(() => ""))?.trim() === s.title, s.title);

await player("pauseVideo");
await page.waitForTimeout(800);
const pausedAt = (await playerState(page)).time ?? 0;
await page.waitForTimeout(1500);
s = await playerState(page);
check("pause holds position", s.state === 2 && Math.abs((s.time ?? 0) - pausedAt) < 0.05, s);
await shot("02-paused");

await player("playVideo");
s = await until((x) => x.state === 1 && (x.time ?? 0) > pausedAt + 0.5);
check("resume", s.state === 1, s);

const dur = s.duration ?? 0;
const target = Math.max(2, Math.floor(dur * 0.6));
await player("seekTo", target, true);
s = await until((x) => x.state === 1 && (x.time ?? 0) >= target && (x.time ?? 0) < target + 4);
check(`seek to ${target}s`, s.state === 1 && (s.time ?? 0) >= target, s);
await shot("03-seeked");

await player("seekTo", Math.max(0, dur - 2), true);
s = await until((x) => x.state === 0, Math.max(10000, 6000));
check("plays to the end", s.state === 0, s);
await shot("04-ended");

const levels = (await player("getAvailableQualityLevels")) as string[];
check("several quality levels", (levels?.length ?? 0) >= 2, levels);

await page.reload({ waitUntil: "domcontentloaded" });
s = await until((x) => x.state === 1 && (x.time ?? 0) > 1);
check("reload plays again", s.state === 1, s);
if (levels?.length > 2) {
	const low = levels[levels.length - 2];
	await player("setPlaybackQualityRange", low, low);
	await page.waitForTimeout(4000);
	s = await playerState(page);
	check(`quality switch to ${low}`, s.state === 1 || s.state === 3, { ...s, asked: low });
}
await shot("05-reloaded");

check("player shows no error", !(await playerState(page)).error, (await playerState(page)).error ?? null);
check("media only from this instance", media.length > 0 && media.every((m) => m.startsWith(new URL(ORIGIN).host)), [...new Set(media.map((m) => m.split(" ")[0]))]);
check("no requests to other hosts", report.external.length === 0, [...new Set(report.external)].slice(0, 10));
check("no player error reports", qoeErrors.length === 0, qoeErrors.slice(0, 5));
check("no page errors", report.pageErrors.length === 0, report.pageErrors.slice(0, 5));
console.log(`media requests: ${media.length}, itags: ${[...new Set(media.map((m) => m.split(" ")[1]))].join(" ")}`);
await ctx.close();
await browser.close();
const failed = checks.filter((c) => !c[1]).length;
console.log(failed ? `${failed} of ${checks.length} checks failed` : `all ${checks.length} checks passed`);
process.exit(failed ? 1 : 0);
