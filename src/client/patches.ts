// Serve-time edits to the pinned client. Every patch names the asset it
// applies to, the exact upstream text it expects and how many times. A count
// other than `expect` is an error: the patch is not applied, the asset is
// served unpatched, the failure is recorded for /admin/diagnostics, and
// `bun run check-patches` exits non-zero. docs/client-patches.md is the
// inventory; keep it in sync with this list.

import { PUBLIC_ORIGIN } from "../config";

export type PatchContext = { origin: string; localOrigin: boolean };
export type Patch = {
	id: string;
	// which archived asset: "app" (main bundle and lazy modules), "player"
	// (base.js), or a regex on the upstream URL
	asset: "app" | "player" | RegExp;
	find: string | RegExp;
	replace: (ctx: PatchContext, ...groups: string[]) => string;
	expect: number;
	when?: (ctx: PatchContext) => boolean;
	why: string;
};

const quote = (s: string) => JSON.stringify(s);
// the instance hostname as it must appear inside a RegExp("...") string literal
const regexHost = (c: PatchContext) => new URL(c.origin).hostname.replace(/\./g, "\\\\.");

export const PATCHES: Patch[] = [
	{
		id: "icons-material-host",
		asset: "app",
		find: '"https://fonts.gstatic.com/s/i/"',
		replace: (c) => quote(`${c.origin}/_up/fonts.gstatic.com/s/i/`),
		expect: 2,
		why: "The icon manager builds SVG icon URLs from this literal prefix (functions MM9/A_9 in this build). Points them at the instance's archived copies instead of fonts.gstatic.com.",
	},
	{
		id: "gstatic-youtube-img-host",
		asset: "app",
		find: '"https://www.gstatic.com/youtube/img/',
		replace: (c) => `"${c.origin}/_up/www.gstatic.com/youtube/img/`,
		expect: 60,
		why: "Every www.gstatic.com/youtube/img/ URL the app names, across the main bundle and lazy modules: the second icon family (icons/web/, function euN), Lottie animations (like, subscribe, loading), and illustrations. Points them at the archived copies under /_up/.",
	},
	{
		id: "icons-allowed-hosts",
		asset: "app",
		find: '["https://fonts.gstatic.com","https://tv.youtube.com","https://www.gstatic.com","https://www.youtube.com"]',
		replace: (c) => `["https://fonts.gstatic.com","https://tv.youtube.com","https://www.gstatic.com","https://www.youtube.com",${quote(c.origin)}]`,
		expect: 1,
		why: "The icon manager only fetches and inlines .svg icons whose URL starts with one of these origins (pUs). Adds the instance origin so the relocated icons above are inlined like upstream ones.",
	},
	{
		id: "player-trusted-stream-host",
		asset: "player",
		// the Trusted Stream URL allowlist (uva): ^https?://(sub.)*(host|host|...)(:port)?/
		find: String.raw`googlevideo\\.com|prod\\.google\\.com`,
		replace: (c) => String.raw`googlevideo\\.com|` + regexHost(c) + String.raw`|prod\\.google\\.com`,
		expect: 1,
		when: (c) => !c.localOrigin,
		why: "The player refuses media URLs ('Untrusted URL') unless they match its stream allowlist or start with http://local / https://local. A localhost instance needs nothing; any other host is added to the allowlist's host alternation.",
	},
	{
		id: "player-trusted-image-host",
		asset: "player",
		// the Trusted Image URL allowlist (wva); the ad-domain list (yva) also
		// names ytimg.com but not chat.google.com right after it
		find: String.raw`|ytimg\\.com|ytimg\\.sandbox\\.google\\.com|chat\\.google\\.com)`,
		replace: (c) => String.raw`|ytimg\\.com|` + regexHost(c) + String.raw`|ytimg\\.sandbox\\.google\\.com|chat\\.google\\.com)`,
		expect: 1,
		why: "The player keeps only thumbnail URLs on its trusted image hosts (videoDetails.thumbnail -> poster, miniplayer, end screen); for anything else it builds http(s)://i1.ytimg.com/vi/<id>/... itself. Adds the instance host so it uses this instance's thumbnails.",
	},
	{
		id: "player-base-host",
		asset: "player",
		// the allowlist (sva) for the player's own base URL: corp proxies and
		// youtube.com hosts; anything else falls back to www.youtube.com
		find: 'sva=RegExp("',
		replace: (c) => 'sva=RegExp("^https?://' + regexHost(c) + String.raw`(:[0-9]+)?/|`,
		expect: 1,
		why: "The player derives its base URL from the page location only if the host is on this allowlist, else uses www.youtube.com. That base URL hosts the QoE stats (/api/stats/qoe) and ptracking beacons. Adds the instance host so those go to this instance.",
	},
	{
		id: "fonts-stylesheet-host",
		asset: "app",
		find: '"https://fonts.googleapis.com/css',
		replace: (c) => `"${c.origin}/_up/fonts.googleapis.com/css`,
		expect: 5,
		why: "The app inserts five font stylesheets (italic Roboto, Roboto Mono, a games font) at run time from fonts.googleapis.com. Points them at the archived copies; the page's own stylesheet link is rewritten by the page renderer.",
	},
	{
		id: "no-redirect-prefetch",
		asset: "app",
		find: 'this.redirectsToPreload=["https://youtube.com"]',
		replace: () => "this.redirectsToPreload=[]",
		expect: 1,
		why: "On every load the app fetches https://youtube.com once to warm the youtube.com -> www redirect. Nothing to warm here; the list is emptied.",
	},
];

export const patchContext = (): PatchContext => ({ origin: PUBLIC_ORIGIN, localOrigin: /^https?:\/\/local/.test(PUBLIC_ORIGIN) });

export type PatchResult = { id: string; matches: number; expect: number; applied: boolean };

function count(text: string, find: string | RegExp): number {
	if (typeof find === "string") {
		let n = 0;
		for (let i = text.indexOf(find); i >= 0; i = text.indexOf(find, i + find.length)) n++;
		return n;
	}
	return [...text.matchAll(new RegExp(find.source, find.flags.includes("g") ? find.flags : `${find.flags}g`))].length;
}

export function patchesFor(kind: "app" | "player" | "other", url: string): Patch[] {
	const ctx = patchContext();
	return PATCHES.filter((p) => (p.when ? p.when(ctx) : true) && (p.asset === kind || (p.asset instanceof RegExp && p.asset.test(url))));
}

// applies to one asset; a patch for the app may match in any one of its
// pieces, so per-piece results are summed by the caller
export function applyPatches(text: string, patches: Patch[]): { text: string; results: PatchResult[] } {
	const ctx = patchContext();
	const results: PatchResult[] = [];
	for (const p of patches) {
		const n = count(text, p.find);
		const applied = n > 0;
		if (applied) {
			if (typeof p.find === "string") text = text.split(p.find).join(p.replace(ctx));
			else text = text.replace(new RegExp(p.find.source, p.find.flags.includes("g") ? p.find.flags : `${p.find.flags}g`), (...m) => p.replace(ctx, ...m.slice(1, -2)));
		}
		results.push({ id: p.id, matches: n, expect: p.expect, applied });
	}
	return { text, results };
}

export const patchSetHash = () => Bun.hash(JSON.stringify(PATCHES.map((p) => [p.id, String(p.find), p.replace(patchContext()), p.expect])) + PUBLIC_ORIGIN).toString(36);
