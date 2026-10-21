export default async (page: any, out: string) => {
	await page.waitForTimeout(4000);
	await page.screenshot({ path: out + "/02-watch.png" });
	const st = await page.evaluate(() => { const v = document.querySelector("video") as HTMLVideoElement; return v ? { src: v.src, t: v.currentTime, paused: v.paused, dur: v.duration, rs: v.readyState } : null; });
	console.log("video", JSON.stringify(st));
	await page.evaluate(() => window.scrollTo(0, 900));
	await page.waitForTimeout(5000);
	await page.screenshot({ path: out + "/03-comments.png" });
	await page.evaluate(() => window.scrollTo(0, 3000));
	await page.waitForTimeout(4000);
	await page.evaluate(() => window.scrollTo(0, 0));
	await page.keyboard.press("k").catch(() => {});
	await page.waitForTimeout(500);
	const pl = await page.evaluate(() => { const p: any = document.querySelector("#movie_player"); return p && p.getAvailableQualityLevels ? { q: p.getAvailableQualityLevels(), state: p.getPlayerState(), t: p.getCurrentTime() } : null; });
	console.log("player", JSON.stringify(pl));
	await page.evaluate(() => { const p: any = document.querySelector("#movie_player"); p?.seekTo?.(60, true); });
	await page.waitForTimeout(4000);
	await page.screenshot({ path: out + "/04-seek.png" });
	await page.reload({ waitUntil: "domcontentloaded" });
	await page.waitForTimeout(6000);
	// in-app navigation to a suggested video
	const a = await page.$("ytd-watch-next-secondary-results-renderer a[href^='/watch'], yt-lockup-view-model a[href^='/watch']");
	if (a) { await a.click(); await page.waitForTimeout(6000); await page.screenshot({ path: out + "/05-nav.png" }); }
};
