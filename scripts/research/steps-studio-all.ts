// Studio: walks every page of the signed-in channel without changing
// anything (capture.ts blocks writes): dashboard, each content tab, a
// video's edit/analytics/comments pages when the channel has videos,
// channel analytics, comments, subtitles, copyright, earn, customization,
// audio library and the settings dialog.
//   STEPS=$PWD/scripts/research/steps-studio-all.ts bun scripts/research/capture.ts studio-all https://studio.youtube.com/ --cookies <file>
export default async (page: any, out: string) => {
	const base = /^(https:\/\/studio\.youtube\.com\/channel\/UC[\w-]{22})/.exec(page.url())?.[1];
	console.log("channel page:", base ? "found" : page.url());
	if (!base) return;
	let i = 1;
	const visit = async (path: string, wait = 7000) => {
		await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 60000 });
		await page.waitForTimeout(wait);
		await page.screenshot({ path: `${out}/${String(++i).padStart(2, "0")}-${path.replace(/[^\w]+/g, "_").slice(0, 40)}.png` });
	};
	for (const tab of ["videos/upload", "videos/short", "videos/live", "videos/posts", "videos/playlists", "videos/podcasts", "videos/promotions", "videos/collaborations", "videos/ideas"]) await visit(`/${tab}`);
	// one of the channel's own videos, if it has any
	await visit("/videos/upload");
	const href = await page.locator("ytcp-video-row a#thumbnail-anchor, ytcp-video-row a.ytcp-video-list-cell-video").first().getAttribute("href").catch(() => null);
	const video = href && /\/video\/([\w-]{11})/.exec(href)?.[1];
	console.log("own video:", video ? "yes" : "none");
	if (video) {
		for (const p of ["edit", "analytics/tab-overview/period-default", "comments/inbox", "translations", "editor", "copyright"]) {
			await page.goto(`https://studio.youtube.com/video/${video}/${p}`, { waitUntil: "domcontentloaded", timeout: 60000 });
			await page.waitForTimeout(8000);
			await page.screenshot({ path: `${out}/${String(++i).padStart(2, "0")}-video-${p.replace(/[^\w]+/g, "_")}.png` });
		}
	}
	for (const p of ["/analytics/tab-overview/period-default", "/analytics/tab-content/period-default", "/analytics/tab-build_audience/period-default", "/analytics/tab-research/period-default", "/comments/inbox", "/translations", "/copyright", "/monetization", "/monetization/overview", "/editing/profile", "/editing/sections", "/music", "/content_detection"]) await visit(p, 8000);
	// settings dialog: open, step through its tabs, close without saving
	await visit("");
	await page.locator("#settings-item, a#settings-item, tp-yt-paper-icon-item:has-text('Settings')").first().click().catch(() => {});
	await page.waitForTimeout(4000);
	for (const tab of ["General", "Channel", "Upload defaults", "Permissions", "Community", "Agreements"]) {
		await page.locator(`ytcp-settings-dialog #settings-sidebar :text-is("${tab}"), ytcp-settings-dialog tp-yt-paper-item:has-text("${tab}")`).first().click().catch(() => {});
		await page.waitForTimeout(3000);
		await page.screenshot({ path: `${out}/${String(++i).padStart(2, "0")}-settings-${tab.replace(/\W+/g, "_")}.png` });
	}
};
