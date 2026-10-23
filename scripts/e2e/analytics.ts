// Studio's analytics pages through the official Studio client, checked
// against the database: the overview's headline, key metrics, top content and
// realtime card; the Content tab's Videos section; the Audience tab; the
// Lifetime period; and that the API answers only the channel's owner.
//
//   bun scripts/e2e/analytics.ts [--login bob:yewtube-demo] [--shots dir]
//
// Needs the server running with Studio on STUDIO_ORIGIN; with views recorded
// before today (bun scripts/seed.ts, then play some videos) it also checks the
// top content table.

import { mkdirSync } from "node:fs";
import type { Page } from "playwright-core";
import { isShort } from "../../src/data";
import { sql } from "../../src/db";
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
const DAY = 86_400_000;

// the figures, from the database: periods end with yesterday, as YouTube's do
const [me] = (await sql`select c.id from channels c join users u on u.id = c.user_id where u.login = ${login}`) as { id: string }[];
const today = new Date(Math.floor(Date.now() / DAY) * DAY);
const since = new Date(+today - 28 * DAY);
const perVideo = (await sql`select v.id, v.title, v.width, v.height, v.duration_ms, coalesce(sum(s.views), 0)::int as views
	from videos v left join video_stats_hourly s on s.video_id = v.id and s.hour >= ${since} and s.hour < ${today}
	where v.channel_id = ${me.id} and v.deleted_at is null group by v.id order by views desc, v.id`) as { id: string; title: string; width: number; height: number; duration_ms: number; views: number }[];
const views = perVideo.reduce((s, v) => s + v.views, 0);
const videoViews = perVideo.filter((v) => !isShort(v)).reduce((s, v) => s + v.views, 0);
const [{ n: subscribers }] = await sql`select count(*)::int as n from subscriptions where channel_id = ${me.id}`;
const top = perVideo[0];

const { browser, ctx } = await launch();
const errors: string[] = [];
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push(e.message.slice(0, 200)));
await signIn(page, login, password, ORIGIN);
const text = async () => (await page.evaluate(() => document.body.innerText)).replace(/\s+/g, " ");
const until = async (pred: (t: string) => boolean, ms = 15000) => {
	const end = Date.now() + ms;
	let t = "";
	do {
		t = await text();
		if (pred(t)) return t;
		await page.waitForTimeout(500);
	} while (Date.now() < end);
	return t;
};
// Studio's tabs are buttons in a tab bar; click by label
const tab = (label: string) => page.locator("tp-yt-paper-tab, [role=tab]").filter({ hasText: new RegExp(`^\\s*${label}\\s*$`) }).first();

// ---- overview ----
await page.goto(`${STUDIO}/channel/${me.id}/analytics/tab-overview/period-default`, { waitUntil: "domcontentloaded" });
const headline = views ? `Your channel got ${views.toLocaleString("en-US")} ${views === 1 ? "view" : "views"} in the last 28 days` : "Your channel didn’t get any views in the last 28 days";
let t = await until((t) => t.includes(headline));
check("the overview's headline counts the channel's views", t.includes(headline), headline);
if (views) check("the top content table names the most viewed video", (await until((t) => t.includes("Your top content in this period") && t.includes(top.title))).includes(top.title), top.title);
t = await until((t) => t.includes("Realtime") && !t.includes("Unknown"));
check("the realtime card shows the subscriber count", new RegExp(`Realtime .*?${subscribers} Subscribers`).test(t), subscribers);
check("…and titles, not Unknown", !t.includes("Unknown"));
await shot(page, "01-overview");

// ---- Content tab, Videos section ----
await tab("Content").click();
t = await until((t) => /Views \d/.test(t) && (!videoViews || t.includes("Top videos")));
check("Content opens on the Videos section", /Videos Shorts/.test(t));
check("its views count the videos only (not Shorts)", t.includes(`Views ${videoViews.toLocaleString("en-US")} `), videoViews);
check("impression figures this instance doesn't keep are left out", !t.includes("Impressions click-through rate"));
await shot(page, "02-content");

// ---- Audience tab ----
await tab("Audience").click();
t = await until((t) => t.includes("Age and gender"));
check("Audience shows YouTube's no-data states for demographics", t.includes("Not enough demographic data to show this report"));
await shot(page, "03-audience");

// ---- Lifetime ----
await tab("Overview").click();
await page.goto(`${STUDIO}/channel/${me.id}/analytics/tab-overview/period-lifetime`, { waitUntil: "domcontentloaded" });
t = await until((t) => t.includes("since your first upload"));
check("Lifetime covers everything since the first upload", t.includes("since your first upload") && t.includes("Lifetime"));

// ---- the API answers the channel's owner only ----
const call = (channelId: string) =>
	page.evaluate(async (channelId) => {
		const cfg = (window as any).ytcfg;
		const r = await fetch("/youtubei/v1/yta_web/get_screen?alt=json", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ context: cfg.get("INNERTUBE_CONTEXT"), screenConfig: { entity: { channelId } }, desktopState: { tabId: "ANALYTICS_TAB_ID_OVERVIEW" } }) });
		return r.status;
	}, channelId);
const [other] = await sql`select id from channels where id <> ${me.id} limit 1`;
check("another channel's analytics are refused", (await call(other.id)) === 403);
const anon = await browser.newContext();
const r = await anon.request.post(`${STUDIO}/youtubei/v1/yta_web/get_screen`, { data: { context: { client: { clientName: "WEB_CREATOR", clientVersion: "1.0" } }, screenConfig: { entity: { channelId: me.id } } } });
check("signed out, analytics are refused", r.status() === 401, r.status());

check("no page errors", errors.length === 0, errors.slice(0, 5));
await browser.close();
console.log(failed ? `${failed} failed` : "all passed");
process.exit(failed ? 1 : 0);
