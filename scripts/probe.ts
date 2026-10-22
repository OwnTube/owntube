// Opens instance pages in Chromium and reports what the official client did:
// console errors, failed requests, requests to any other host, and the
// player's state. Every non-instance host is blocked unless --allow-external.
//
//   bun scripts/probe.ts /watch?v=ID [--shot out.png] [--play] [--login alice:pw] [--narrow] [--wait 8000]
//
// Exit code 1 when an off-instance request was attempted or a page error occurred.

import { chromium, type Page } from "playwright-core";

const args = process.argv.slice(2);
const opt = (name: string) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
const path = args.find((a) => a.startsWith("/")) ?? "/";
const allowExternal = args.includes("--allow-external");
const wait = Number(opt("--wait") ?? 8000);

export async function launch(opts: { narrow?: boolean; video?: string; bypassCSP?: boolean } = {}) {
	const browser = await chromium.launch({
		executablePath: process.env.CHROME_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
		args: ["--autoplay-policy=no-user-gesture-required", ...(process.env.HOST_RULES ? [`--host-resolver-rules=${process.env.HOST_RULES}`] : [])],
	});
	const ctx = await browser.newContext({
		viewport: opts.narrow ? { width: 412, height: 860 } : { width: 1400, height: 900 },
		locale: "en-US",
		bypassCSP: !!opts.bypassCSP,
		...(opts.video ? { recordVideo: { dir: opts.video, size: opts.narrow ? { width: 412, height: 860 } : { width: 1400, height: 900 } } } : {}),
	});
	return { browser, ctx };
}

export type Report = { consoleErrors: string[]; pageErrors: string[]; failed: string[]; external: string[]; api: string[] };

export function watchPage(page: Page, origin = ORIGIN, allowExt = allowExternal): Report {
	const r: Report = { consoleErrors: [], pageErrors: [], failed: [], external: [], api: [] };
	const host = new URL(origin).host;
	void page.route("**/*", (route) => {
		const u = new URL(route.request().url());
		if (u.protocol === "data:" || u.protocol === "blob:" || u.host === host) return route.continue();
		r.external.push(`${route.request().method()} ${u.origin}${u.pathname}`);
		return allowExt ? route.continue() : route.abort("blockedbyclient");
	});
	page.on("console", (m) => {
		if (m.type() === "error") r.consoleErrors.push(m.text().slice(0, 300));
	});
	page.on("pageerror", (e) => r.pageErrors.push(String(e.message).slice(0, 300)));
	page.on("requestfailed", (q) => {
		const u = new URL(q.url());
		if (u.host === host) r.failed.push(`${q.method()} ${u.pathname}${u.search.slice(0, 80)} ${q.failure()?.errorText}`);
	});
	page.on("response", (res) => {
		const u = new URL(res.url());
		if (u.host !== host) return;
		if (u.pathname.startsWith("/youtubei/")) r.api.push(`${res.status()} ${u.pathname}`);
		else if (res.status() >= 400) r.failed.push(`${res.status()} ${u.pathname}${u.search.slice(0, 80)}`);
	});
	return r;
}

export async function signIn(page: Page, login: string, password: string, origin = ORIGIN) {
	// two steps, as on Google's sign-in: the username, then the password
	await page.goto(`${origin}/signin?next=/`);
	await page.fill("#f-login", login);
	await Promise.all([page.waitForSelector("#f-password"), page.click("button[type=submit]")]);
	await page.fill("#f-password", password);
	await Promise.all([page.waitForURL(`${origin}/`), page.click("button[type=submit]")]);
}

export async function playerState(page: Page) {
	return page.evaluate(() => {
		const p: any = document.querySelector("#movie_player");
		const v = document.querySelector("video") as HTMLVideoElement | null;
		return {
			state: p?.getPlayerState?.(),
			time: v?.currentTime,
			duration: v?.duration,
			paused: v?.paused,
			readyState: v?.readyState,
			src: v?.src?.slice(0, 60),
			qualities: p?.getAvailableQualityLevels?.(),
			quality: p?.getPlaybackQuality?.(),
			videoId: p?.getVideoData?.()?.video_id,
			title: p?.getVideoData?.()?.title,
			error: document.querySelector(".ytp-error-content-wrap-reason")?.textContent?.trim(),
		};
	});
}

if (import.meta.main) {
	const { browser, ctx } = await launch({ narrow: args.includes("--narrow") });
	const page = await ctx.newPage();
	const report = watchPage(page);
	const login = opt("--login");
	if (login) {
		const [u, p] = login.split(":");
		await signIn(page, u, p);
	}
	await page.goto(ORIGIN + path, { waitUntil: "domcontentloaded" });
	await page.waitForTimeout(wait);
	if (args.includes("--play")) {
		console.log("player before:", JSON.stringify(await playerState(page)));
		await page.evaluate(() => (document.querySelector("#movie_player") as any)?.playVideo?.());
		await page.waitForTimeout(5000);
		console.log("player playing:", JSON.stringify(await playerState(page)));
		await page.evaluate(() => (document.querySelector("#movie_player") as any)?.seekTo?.(20, true));
		await page.waitForTimeout(3000);
		console.log("player seeked:", JSON.stringify(await playerState(page)));
	}
	const shot = opt("--shot");
	if (shot) await page.screenshot({ path: shot });
	const text = (await page.evaluate(() => document.querySelector("ytd-app")?.textContent ?? "")).replace(/\s+/g, " ").trim();
	console.log(`text: ${text.slice(0, 600)}`);
	console.log(`api: ${[...new Set(report.api)].join(", ")}`);
	for (const k of ["pageErrors", "consoleErrors", "failed", "external"] as const) if (report[k].length) console.log(`${k} (${report[k].length}):\n  ${[...new Set(report[k])].slice(0, 40).join("\n  ")}`);
	await browser.close();
	process.exit(report.external.length || report.pageErrors.length ? 1 : 0);
}
