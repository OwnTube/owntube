// Walks this instance's Studio as a local account, page by page, and lists
// for each page the InnerTube methods it called that the instance doesn't
// handle (from compat_misses), page errors and failed requests, with a
// screenshot per page. A survey for Studio work, not a test.
//
//   bun scripts/research/studio-walk.ts [--login bob:owntube-demo] [--out dir] [--only path,...]

import { mkdirSync } from "node:fs";
import { sql } from "../../src/db";
import { launch, signIn } from "../probe";

const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
const STUDIO = process.env.STUDIO_ORIGIN ?? ORIGIN.replace(/:(\d+)$/, (_, p) => `:${Number(p) + 1}`);
const args = process.argv.slice(2);
const opt = (n: string) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const [login, password] = (opt("--login") ?? "bob:owntube-demo").split(":");
const out = opt("--out") ?? "data/studio-walk";
mkdirSync(out, { recursive: true });

const { browser, ctx } = await launch();
const page = await ctx.newPage();
await signIn(page, login, password);
const errors: string[] = [];
const failed: string[] = [];
page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 200)));
page.on("requestfailed", (r) => !r.failure()?.errorText.includes("ERR_ABORTED") && failed.push(`${r.url().slice(0, 120)} ${r.failure()?.errorText}`));
page.on("response", (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url().slice(0, 120)}`));

await page.goto(`${STUDIO}/`, { waitUntil: "domcontentloaded" });
await page.waitForURL(/\/channel\/UC[\w-]{22}/, { timeout: 20000 });
const base = /^(.*\/channel\/UC[\w-]{22})/.exec(page.url())![1];
const [video] = await sql`select v.id from videos v join channels c on c.id = v.channel_id join users u on u.id = c.user_id where u.login = ${login} order by v.created_at limit 1`;

const all = [
	"", "/videos/upload", "/videos/short", "/videos/live", "/videos/posts", "/videos/playlists", "/videos/podcasts", "/videos/promotions", "/videos/collaborations", "/videos/ideas",
	"/analytics/tab-overview/period-default", "/analytics/tab-content/period-default", "/analytics/tab-build_audience/period-default", "/analytics/tab-research/period-default",
	"/comments/inbox", "/translations", "/copyright", "/monetization", "/monetization/overview", "/editing/profile", "/editing/sections", "/music", "/content_detection",
	...(video ? ["edit", "analytics/tab-overview/period-default", "comments/inbox", "translations", "editor", "copyright"].map((p) => `video:${p}`) : []),
];
const only = opt("--only")?.split(",");
const paths = only ?? all;

const misses = async () => new Map((await sql`select key, count from compat_misses`).map((r: any) => [r.key, Number(r.count)]));
let i = 0;
for (const p of paths) {
	const before = await misses();
	errors.length = 0;
	failed.length = 0;
	const url = p.startsWith("video:") ? `${STUDIO}/video/${video.id}/${p.slice(6)}` : base + p;
	await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 }).catch((e) => errors.push(String(e)));
	await page.waitForTimeout(6000);
	await page.screenshot({ path: `${out}/${String(++i).padStart(2, "0")}-${(p || "dashboard").replace(/[^\w]+/g, "_").slice(0, 40)}.png` });
	await new Promise((r) => setTimeout(r, 3500)); // misses flush every 3 s
	const after = await misses();
	const added = [...after].filter(([k, n]) => (n as number) > ((before.get(k) as number | undefined) ?? 0)).map(([k]) => k);
	console.log(`\n== ${p || "dashboard"}  ${page.url().replace(STUDIO, "")}`);
	if (added.length) console.log("  unhandled:", added.join(", "));
	if (errors.length) console.log("  errors:", [...new Set(errors)].slice(0, 4).join(" | "));
	if (failed.length) console.log("  failed:", [...new Set(failed)].slice(0, 4).join(" | "));
}
await browser.close();
process.exit(0);
