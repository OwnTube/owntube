// The Shorts player through the official client: direct /shorts/<id> loads
// with its sequence, the guide's Shorts entry (seedless), scrolling to the
// next Short, refresh, non-Shorts and missing ids, and signed in: like,
// subscribe, the comments panel (post a comment), the description panel and
// the share link. What it changes is put back before it ends.
//
//   bun scripts/e2e/shorts.ts [--login carol:yewtube-demo] [--shots dir]
//
// Needs at least two Shorts (public, ready, vertical or square, up to three
// minutes) from a channel other than the login's; bun scripts/seed.ts makes them.

import { mkdirSync } from "node:fs";
import type { Page } from "playwright-core";
import { sql } from "../../src/db";
import { recordSubscription } from "../../src/stats";
import { launch, signIn } from "../probe";

const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
const args = process.argv.slice(2);
const opt = (n: string) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const [login, password] = (opt("--login") ?? "carol:yewtube-demo").split(":");
const shots = opt("--shots");
if (shots) mkdirSync(shots, { recursive: true });

let failed = 0;
const check = (name: string, ok: boolean, detail: unknown = "") => {
	if (!ok) failed++;
	console.log(`${ok ? "ok  " : "FAIL"} ${name}${detail === "" ? "" : `: ${JSON.stringify(detail)}`}`);
};
const errors: string[] = [];
const api: string[] = [];
const { browser, ctx } = await launch();
async function open(): Promise<Page> {
	const page = await ctx.newPage();
	const host = new URL(ORIGIN).host;
	await page.route("**/*", (route) => {
		const u = new URL(route.request().url());
		if (u.protocol === "data:" || u.protocol === "blob:" || u.host === host) return route.continue();
		return route.abort("blockedbyclient");
	});
	page.on("pageerror", (e) => errors.push(e.message.slice(0, 200)));
	page.on("response", (r) => r.url().includes("/youtubei/v1/") && api.push(`${r.status()} ${new URL(r.url()).pathname.slice(13)}`));
	return page;
}
const shot = async (page: Page, name: string) => shots && (await page.screenshot({ path: `${shots}/${name}.png` }));
const reel = (page: Page) => page.locator("ytd-reel-video-renderer").first();
// the Short on screen is the one whose player plays
const playing = async (page: Page) => {
	const end = Date.now() + 8000;
	let s: any;
	do {
		await page.waitForTimeout(400);
		s = await page.evaluate(() => {
			const v = document.querySelector("#shorts-player video") as HTMLVideoElement | null;
			return { time: v?.currentTime ?? 0, paused: v?.paused ?? true };
		});
	} while (!(s.time > 0.5) && Date.now() < end);
	return s.time > 0.5;
};

const me = (await sql`select c.id from channels c join users u on u.id = c.user_id where u.login = ${login}`)[0] as { id: string };
const shorts = (await sql`select v.id, v.title, v.channel_id from videos v where v.status = 'ready' and v.visibility = 'public' and v.deleted_at is null
	and v.height >= v.width and v.width > 0 and v.duration_ms <= 180000 and v.channel_id <> ${me.id} order by v.published_at desc, v.id`) as { id: string; title: string; channel_id: string }[];
const [landscape] = await sql`select id from videos where status = 'ready' and visibility = 'public' and deleted_at is null and width > height limit 1`;
if (shorts.length < 2) throw new Error("needs two Shorts from another channel: bun scripts/seed.ts");
const [first] = shorts;

// ---- signed out ----
{
	const page = await open();
	api.length = 0;
	await page.goto(`${ORIGIN}/shorts/${first.id}`, { waitUntil: "domcontentloaded" });
	await reel(page).waitFor({ timeout: 15000 });
	check("direct /shorts/<id> renders the Shorts player", (await page.locator("ytd-shorts").count()) === 1);
	await reel(page).getByText(first.title).first().waitFor({ timeout: 8000 }).catch(() => {});
	check("its title is shown", (await reel(page).innerText()).includes(first.title));
	check("it plays", await playing(page));
	await shot(page, "01-shorts-out");
	await page.keyboard.press("ArrowDown");
	await page.waitForURL((u) => !u.pathname.endsWith(first.id), { timeout: 8000 }).catch(() => {});
	await page.waitForTimeout(2500);
	const next = new URL(page.url()).pathname.slice(8);
	check("the next Short comes from the page's sequence", next !== first.id && shorts.some((s) => s.id === next), next);
	check("no sequence request was needed", !api.some((a) => a.endsWith("reel/reel_watch_sequence")));
	await page.reload({ waitUntil: "domcontentloaded" });
	await reel(page).waitFor({ timeout: 15000 });
	check("refresh keeps the Short", page.url().endsWith(`/shorts/${next}`));
	// the guide's Shorts entry: seedless, the client is sent to the newest Short
	api.length = 0;
	await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
	await page.locator("ytd-guide-entry-renderer a[title='Shorts']").first().click();
	await page.waitForURL(/\/shorts\/[\w-]{11}$/, { timeout: 10000 }).catch(() => {});
	await page.waitForResponse((r) => r.url().includes("/reel/reel_watch_sequence"), { timeout: 8000 }).catch(() => {});
	check("the guide's Shorts entry opens a Short", /\/shorts\/[\w-]{11}$/.test(page.url()), page.url());
	check("…and loads the sequence", api.includes("200 reel/reel_watch_sequence"), api);
	await page.goBack();
	await page.waitForTimeout(1500);
	check("back returns home", new URL(page.url()).pathname === "/", page.url());
	const bare = await page.goto(`${ORIGIN}/shorts/`);
	await page.waitForTimeout(3000);
	check("/shorts/ opens the newest Short", bare?.status() === 200 && /\/shorts\/[\w-]{11}$/.test(page.url()), page.url());
	if (landscape) {
		await page.goto(`${ORIGIN}/shorts/${landscape.id}`);
		check("a video that isn't a Short goes to the watch page", page.url().endsWith(`/watch?v=${landscape.id}`));
	}
	const missing = await page.goto(`${ORIGIN}/shorts/zzzzzzzzzzz`);
	check("a missing Short is a 404", missing?.status() === 404);
	await page.goto(`${ORIGIN}/shorts/${first.id}`, { waitUntil: "domcontentloaded" });
	await reel(page).waitFor();
	const sub = reel(page).locator("button", { hasText: "Subscribe" }).first();
	await sub.click();
	await page.waitForTimeout(800);
	check("signed out, Subscribe asks to sign in", (await page.locator("tp-yt-paper-dialog, yt-dialog-view-model, ytd-modal-with-title-and-button-renderer").filter({ hasText: "Sign in" }).count()) > 0);
	await page.close();
}

// ---- signed in ----
const before = {
	reaction: (await sql`select kind from video_reactions r join users u on u.id = r.user_id where u.login = ${login} and r.video_id = ${first.id}`)[0]?.kind ?? null,
	subscribed: (await sql`select 1 from subscriptions s join users u on u.id = s.user_id where u.login = ${login} and s.channel_id = ${first.channel_id}`).length > 0,
};
{
	const page = await open();
	await signIn(page, login, password);
	await sql`delete from video_reactions r using users u where u.id = r.user_id and u.login = ${login} and r.video_id = ${first.id}`;
	// leaving is recorded as the client would (Studio's subscriber figures)
	if (before.subscribed) await recordSubscription(first.channel_id, false);
	await sql`delete from subscriptions s using users u where u.id = s.user_id and u.login = ${login} and s.channel_id = ${first.channel_id}`;
	await page.goto(`${ORIGIN}/shorts/${first.id}`, { waitUntil: "domcontentloaded" });
	await reel(page).waitFor({ timeout: 15000 });
	await page.waitForTimeout(1500);
	const r = reel(page);
	await r.locator("toggle-button-view-model button").first().click();
	await page.waitForTimeout(1200);
	const liked = await sql`select kind from video_reactions r join users u on u.id = r.user_id where u.login = ${login} and r.video_id = ${first.id}`;
	check("Like is stored", liked[0]?.kind === "like");
	await r.locator("button[aria-label^='Subscribe to']").first().click();
	await page.waitForTimeout(1200);
	check("Subscribe is stored", (await sql`select 1 from subscriptions s join users u on u.id = s.user_id where u.login = ${login} and s.channel_id = ${first.channel_id}`).length === 1);
	await page.reload({ waitUntil: "domcontentloaded" });
	await reel(page).waitFor();
	await page.waitForTimeout(1500);
	check("after reload the like shows", (await reel(page).locator("toggle-button-view-model button").first().getAttribute("aria-pressed")) === "true");
	check("after reload the channel shows as subscribed", (await reel(page).locator("button", { hasText: "Subscribed" }).count()) > 0);
	// comments panel
	await reel(page).locator("reel-action-bar-view-model button[aria-label^='View']").first().click();
	const panel = page.locator("ytd-engagement-panel-section-list-renderer[target-id='engagement-panel-comments-section']");
	await panel.locator("#simplebox-placeholder").first().waitFor({ timeout: 8000 });
	const text = `Shorts e2e ${Date.now()}`;
	await panel.locator("#simplebox-placeholder").first().click();
	const editor = panel.locator("#contenteditable-root").first();
	await editor.waitFor({ state: "visible", timeout: 5000 });
	await editor.fill(text);
	await panel.locator("#submit-button button").first().click();
	await panel.getByText(text).first().waitFor({ timeout: 8000 }).catch(() => {});
	check("a comment posted from the Shorts panel is stored", (await sql`select 1 from comments where video_id = ${first.id} and text = ${text} and deleted_at is null`).length === 1);
	check("…and shows in the panel", (await panel.innerText()).includes(text));
	await shot(page, "02-shorts-comments");
	await panel.locator("button[aria-label='Close']").first().click().catch(() => {});
	// description panel, from the title
	await reel(page).locator("yt-shorts-video-title-view-model").first().click();
	const desc = page.locator("ytd-engagement-panel-section-list-renderer[target-id='engagement-panel-structured-description']");
	await desc.waitFor({ state: "visible", timeout: 5000 }).catch(() => {});
	// the panel opens before its contents arrive
	await desc.getByText(first.title).first().waitFor({ timeout: 8000 }).catch(() => {});
	check("the description panel shows the title", (await desc.innerText().catch(() => "")).includes(first.title));
	await shot(page, "03-shorts-description");
	// share
	const share = await page.evaluate(async (id) => {
		const cfg = (window as any).ytcfg;
		const ek = btoa(String.fromCharCode(10, 11, ...Array.from(id as string, (c) => c.charCodeAt(0))));
		const r = await fetch("/youtubei/v1/share/get_share_panel", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ context: cfg.get("INNERTUBE_CONTEXT"), serializedShareEntity: ek }) });
		return JSON.stringify(await r.json());
	}, first.id);
	check("Share links to /shorts/<id>", share.includes(`/shorts/${first.id}`));
	// put back
	await sql`delete from comments where video_id = ${first.id} and text = ${text}`;
	await sql`update videos set comment_count = (select count(*) from comments c where c.video_id = ${first.id} and c.deleted_at is null) where id = ${first.id}`;
	await page.close();
}
await sql`delete from video_reactions r using users u where u.id = r.user_id and u.login = ${login} and r.video_id = ${first.id}`;
if (before.reaction) await sql`insert into video_reactions (user_id, video_id, kind) select id, ${first.id}, ${before.reaction} from users where login = ${login}`;
await sql`update videos set like_count = (select count(*) from video_reactions r where r.video_id = ${first.id} and r.kind = 'like') where id = ${first.id}`;
if (!before.subscribed) {
	await sql`delete from subscriptions s using users u where u.id = s.user_id and u.login = ${login} and s.channel_id = ${first.channel_id}`;
	await recordSubscription(first.channel_id, false);
}

check("no page errors", errors.length === 0, errors.slice(0, 5));
await browser.close();
console.log(failed ? `${failed} failed` : "all passed");
process.exit(failed ? 1 : 0);
