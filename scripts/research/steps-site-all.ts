// Main site: visits every page the guide, the account menu, the settings
// navigation and the client's own route table lead to, signed in or out,
// without changing anything (capture.ts blocks writes). Writes index.txt
// (screenshot -> final URL, page type) next to the screenshots.
//   STEPS=$PWD/scripts/research/steps-site-all.ts bun scripts/research/capture.ts site-in https://www.youtube.com/ --cookies <file>
//   STEPS=$PWD/scripts/research/steps-site-all.ts bun scripts/research/capture.ts site-out https://www.youtube.com/
import { appendFileSync } from "node:fs";

const PAGES = [
	"/shorts/",
	"/feed/subscriptions",
	"/feed/you",
	"/feed/history",
	"/feed/history?view=search",
	"/feed/playlists",
	"/playlist?list=WL",
	"/playlist?list=LL",
	"/feed/channels",
	"/feed/downloads",
	"/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ",
	"/channel/UC4R8DWoMoI7CAwX8_LjQHig",
	"/gaming",
	"/podcasts",
	"/playables",
	"/channel_memberships",
	"/reporthistory",
	"/feed/trending",
	"/feed/explore",
	"/feed/news_destination",
	"/feed/sports",
	"/feed/courses",
	"/feed/fashion_destination",
	"/feed/storefront",
	"/feed/purchases",
	"/paid_memberships",
	"/premium",
	"/hashtag/music",
	"/account",
	"/account_notifications",
	"/account_playback",
	"/account_performance",
	"/account_privacy",
	"/account_sharing",
	"/account_billing",
	"/account_advanced",
	"/account_downloads",
	"/@YouTube",
	"/@YouTube/videos",
	"/@YouTube/shorts",
	"/@YouTube/streams",
	"/@YouTube/playlists",
	"/@YouTube/posts",
	"/@YouTube/about",
	"/@YouTube/search?query=music",
	"/@YouTube/featured",
];

export default async (page: any, out: string) => {
	let i = 1;
	appendFileSync(`${out}/index.txt`, `01 ${page.url()}\n`);
	for (const p of PAGES) {
		await page.goto(`https://www.youtube.com${p}`, { waitUntil: "domcontentloaded", timeout: 60000 }).catch((e: Error) => appendFileSync(`${out}/index.txt`, `!! ${p} ${e.message.slice(0, 80)}\n`));
		await page.waitForTimeout(6000);
		const n = String(++i).padStart(2, "0");
		await page.screenshot({ path: `${out}/${n}-${p.replace(/[^\w]+/g, "_").slice(0, 40)}.png` });
		const type = await page.evaluate(() => (window as any).ytcfg?.get?.("PAGE_NAME") ?? document.querySelector("ytd-app")?.getAttribute("page-subtype") ?? "").catch(() => "");
		appendFileSync(`${out}/index.txt`, `${n} ${p} -> ${page.url()} ${type}\n`);
	}
	// guide states: mini guide, then the drawer at a narrow width
	await page.goto("https://www.youtube.com/", { waitUntil: "domcontentloaded" });
	await page.waitForTimeout(5000);
	await page.click("#guide-button").catch(() => {});
	await page.waitForTimeout(1500);
	await page.screenshot({ path: `${out}/90-guide-mini.png` });
	await page.setViewportSize({ width: 800, height: 900 });
	await page.waitForTimeout(1500);
	await page.click("#guide-button").catch(() => {});
	await page.waitForTimeout(1500);
	await page.screenshot({ path: `${out}/91-guide-drawer.png` });
};
