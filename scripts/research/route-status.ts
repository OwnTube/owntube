// Opens every main-site route in this instance, signed out and signed in,
// and records what the page actually is: where it ended up, the page data's
// shape (contents renderer, header, tabs, selected tab's sections), alerts,
// the client's error page, page errors, failed requests and the InnerTube
// methods the instance did not handle (compat_misses). A screenshot alone
// says nothing about whether a page works; this output does.
//   bun scripts/research/route-status.ts [--login bob:yewtube-demo] [--out data/route-status] [--only /a,/b]

import { mkdirSync, writeFileSync } from "node:fs";
import { sql } from "../../src/db";
import { launch, signIn } from "../probe";

const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
const args = process.argv.slice(2);
const opt = (n: string) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const [login, password] = (opt("--login") ?? "bob:yewtube-demo").split(":");
const out = opt("--out") ?? "data/route-status";
mkdirSync(out, { recursive: true });

export const ROUTES = [
	"/", "/shorts/", "/feed/subscriptions", "/feed/you", "/feed/history", "/feed/history?view=search", "/feed/playlists",
	"/playlist?list=WL", "/playlist?list=LL", "/feed/channels", "/feed/downloads", "/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ",
	"/channel/UC4R8DWoMoI7CAwX8_LjQHig", "/gaming", "/podcasts", "/playables", "/channel_memberships", "/reporthistory",
	"/feed/trending", "/feed/explore", "/feed/news_destination", "/feed/sports", "/feed/courses", "/feed/fashion_destination",
	"/feed/storefront", "/feed/purchases", "/paid_memberships", "/premium", "/hashtag/music", "/account",
	"/account_notifications", "/account_playback", "/account_performance", "/account_privacy", "/account_sharing",
	"/account_billing", "/account_advanced", "/account_downloads", "/results?search_query=life",
];

const only = opt("--only")?.split(",");
const routes = only ?? ROUTES;

type Row = { route: string; state: string; final: string; shape: string; alerts: string[]; errors: string[]; misses: string[] };

async function survey(signedIn: boolean): Promise<Row[]> {
	const { browser, ctx } = await launch();
	const page = await ctx.newPage();
	if (signedIn) await signIn(page, login, password);
	const rows: Row[] = [];
	for (const r of routes) {
		const errors: string[] = [];
		const onErr = (e: Error) => errors.push(`pageerror ${e.message.slice(0, 120)}`);
		const onResp = (res: any) => {
			const u = new URL(res.url());
			if (u.origin === ORIGIN && res.status() >= 400) errors.push(`${res.status()} ${u.pathname}`);
		};
		page.on("pageerror", onErr);
		page.on("response", onResp);
		const since = new Date();
		await page.goto(ORIGIN + r, { waitUntil: "domcontentloaded", timeout: 30000 }).catch((e: Error) => errors.push(`goto ${e.message.slice(0, 80)}`));
		await page.waitForTimeout(3500);
		const info = await page.evaluate(() => {
			const app: any = document.querySelector("ytd-app");
			const data: any = app?.data?.response ?? (window as any).ytInitialData;
			const text = (t: any) => t?.simpleText ?? (t?.runs ?? []).map((x: any) => x.text).join("") ?? "";
			const contents = data?.contents ? Object.keys(data.contents) : [];
			const first: any = data?.contents ? Object.values(data.contents)[0] : undefined;
			const tabs = (first?.tabs ?? []).map((t: any) => (t.tabRenderer?.title ?? "") + (t.tabRenderer?.selected ? "*" : ""));
			const sel = (first?.tabs ?? []).find((t: any) => t.tabRenderer?.selected)?.tabRenderer?.content;
			const inner = sel ? Object.keys(sel)[0] : "";
			const items = sel ? ((Object.values(sel)[0] as any)?.contents ?? []).slice(0, 3).map((x: any) => Object.keys(x)[0]) : [];
			const alerts = (data?.alerts ?? []).map((a: any) => text((Object.values(a)[0] as any).text));
			// a background promo with a sign-in button is the signed-out state of
			// a signed-in page (Subscriptions, You), not an error
			const json = JSON.stringify(data?.contents ?? {});
			const signinPromo = json.includes('"backgroundPromoRenderer"') && /accounts\/ServiceLogin|\/signin/.test(json);
			const errorPage = !signinPromo && !!document.querySelector("ytd-background-promo-renderer, yt-page-error-view-model, #error-page, ytd-browse[page-subtype] #alerts ytd-alert-with-button-renderer");
			return { contents, signinPromo, header: data?.header ? Object.keys(data.header)[0] : "", tabs, inner, items, alerts, errorPage, url: location.href, subtype: document.querySelector("ytd-browse:not([hidden])")?.getAttribute("page-subtype") ?? "" };
		}).catch((e: Error) => ({ contents: [], header: "", tabs: [], inner: "", items: [], alerts: [], errorPage: false, url: page.url(), signinPromo: false, subtype: `eval ${e.message.slice(0, 60)}` }));
		page.off("pageerror", onErr);
		page.off("response", onResp);
		const misses = (await sql`select key from compat_misses where last_seen >= ${since}`).map((m: any) => m.key);
		const final = info.url.replace(ORIGIN, "");
		let state = "page";
		if (/\/signin/.test(final)) state = "sign-in gate";
		else if (final.split("?")[0] !== r.split("?")[0]) state = `redirect`;
		else if (!info.contents.length) state = "no page data";
		else if (info.signinPromo) state = "sign-in promo";
		else if (info.errorPage) state = "error state";
		else if (!info.inner && !info.items.length && !(info.contents as string[]).includes("twoColumnSearchResultsRenderer")) state = "empty shell";
		rows.push({ route: r, state, final, shape: `${info.contents.join(",")} hdr=${info.header} tabs=[${info.tabs.join("|")}] ${info.inner}:${info.items.join(",")} ${info.subtype}`, alerts: info.alerts, errors, misses });
		await page.screenshot({ path: `${out}/${signedIn ? "in" : "out"}-${r.replace(/[^\w]+/g, "_").slice(0, 40)}.png` });
	}
	await browser.close();
	return rows;
}

const result = { out: await survey(false), in: await survey(true) };
writeFileSync(`${out}/status.json`, JSON.stringify(result, null, 1));
for (const k of ["out", "in"] as const) {
	console.log(`\n## signed ${k}`);
	for (const r of result[k]) console.log(`${r.state.padEnd(13)} ${r.route.padEnd(34)} -> ${r.final.slice(0, 40).padEnd(40)} ${r.shape.slice(0, 110)} ${r.alerts.join("; ")} ${r.misses.join(" ")} ${r.errors.slice(0, 2).join(" ")}`);
}
process.exit(0);
