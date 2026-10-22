// Acquires and pins YouTube Studio (studio.youtube.com), the separate client
// YouTube's upload dialog and creator pages belong to.
//
//   bun scripts/fetch-studio.ts --page <file> [--dark-page <file>]
//                                               pin the build of a Studio page saved by a
//                                               signed-in browser capture (e.g.
//                                               captures/studio-light/bodies/001-_.resp),
//                                               and the same build's dark-theme page
//                                               (captured with Appearance set to dark)
//   bun scripts/fetch-studio.ts                 download whatever the pin lists and is missing
//   bun scripts/fetch-studio.ts --check         verify the archive against the pin
//   bun scripts/fetch-studio.ts --observed <f>  also pin extra asset URLs (one per line)
//
// Studio only answers signed in, so its page shell comes from a capture and
// is sanitized before it is written: the account's ytcfg values, the
// prefetched channel data and the attestation token are removed, and the
// result is checked for every account value the capture carried. The
// scripts, stylesheets and images are public and fetched without cookies.

import { existsSync, readFileSync } from "node:fs";
import { jsonEnd } from "../src/client/json";
import {
	ORIGINAL_DIR,
	STUDIO_PIN_FILE,
	type PinnedAsset,
	type StudioPin,
	archivePath,
	closure,
	loadStudioPin,
	parseGraph,
	saveStudioPin,
	sha256,
	studioModulePath,
	studioPagePath,
	writeArchived,
} from "../src/client/store";

const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
const ORIGIN = "https://studio.youtube.com";

const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const pageFile = args.includes("--page") ? args[args.indexOf("--page") + 1] : undefined;
const darkPageFile = args.includes("--dark-page") ? args[args.indexOf("--dark-page") + 1] : undefined;
const observedFile = args.includes("--observed") ? args[args.indexOf("--observed") + 1] : undefined;

// ytcfg keys that describe the signed-in account or the request; the server
// sets its own (src/studio/page.ts)
const ACCOUNT_KEYS = [
	"EVENT_ID",
	"VISITOR_DATA",
	"XSRF_TOKEN",
	"DATASYNC_ID",
	"SERIALIZED_CLIENT_CONFIG_DATA",
	"INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT",
	"LOGIN_INFO",
	"EATS",
	"USER_SESSION_ID",
	"CHANNEL_ID",
	"DELEGATION_CONTEXT",
	"SIGNIN_URL",
	"SESSION_INDEX",
	"TIME_CREATED_MS",
	"SERVER_MILLIS_SINCE_EPOCH",
	"UPLOAD_CONFIG",
	"GAPI_HINT_PARAMS",
	"GAPI_HOST",
	"LIVE_CHAT_BASE_TANGO_CONFIG",
	"INNERTUBE_API_KEY",
	"PERSIST_IDENTITY_IFRAME_URL",
	"YPC_MB_URL",
	"ONEPICK_URL",
];

async function get(url: string, tries = 4): Promise<Response> {
	for (let i = 0; ; i++) {
		try {
			const r = await fetch(url, { headers: { "user-agent": UA, "accept-language": "en-US,en;q=0.9" } });
			if (r.status >= 500 && i < tries) throw new Error(`status ${r.status}`);
			return r;
		} catch (e) {
			if (i >= tries) throw e;
			await Bun.sleep(1000 * 2 ** i);
		}
	}
}

async function pool<T>(items: T[], n: number, fn: (x: T) => Promise<void>) {
	const queue = [...items];
	await Promise.all(Array.from({ length: n }, async () => {
		for (let x = queue.shift(); x !== undefined; x = queue.shift()) await fn(x);
	}));
}

const assets = new Map<string, PinnedAsset>();
let failures = 0;

async function archive(url: string, kind: string, expect?: PinnedAsset, maxSize = Number.POSITIVE_INFINITY): Promise<Buffer | undefined> {
	const path = archivePath(url);
	let data: Buffer | undefined = existsSync(path) ? readFileSync(path) : undefined;
	if (data && expect && sha256(data) !== expect.sha256) data = undefined;
	if (data && !expect && data.byteLength > maxSize) return undefined;
	if (!data) {
		if (CHECK) {
			console.log(`missing: ${url}`);
			failures++;
			return undefined;
		}
		const r = await get(url);
		if (!r.ok) {
			console.log(`failed ${r.status}: ${url}`);
			failures++;
			return undefined;
		}
		data = Buffer.from(await r.arrayBuffer());
		if (!expect && data.byteLength > maxSize) return undefined;
		if (expect && sha256(data) !== expect.sha256) {
			console.log(`upstream bytes differ from the pin: ${url}`);
			failures++;
			return undefined;
		}
		writeArchived(path, data);
	}
	assets.set(url, { url, sha256: expect?.sha256 ?? sha256(data), size: data.byteLength, kind });
	return data;
}

// ---- the page shell ----

function ytcfgRange(html: string): [number, number] {
	const start = html.indexOf("ytcfg.set({") + "ytcfg.set(".length;
	if (start < "ytcfg.set(".length) throw new Error("page has no ytcfg");
	return [start, jsonEnd(html, start)];
}

// Removes the account from a captured Studio page. Returns the page and the
// account values it had, which must not survive anywhere in the result.
function sanitize(html: string): { page: string; cfg: Record<string, any> } {
	const [s, e] = ytcfgRange(html);
	const cfg = JSON.parse(html.slice(s, e));
	const personal = new Set<string>();
	const add = (v: unknown) => {
		if (typeof v === "string" && v.length >= 4) personal.add(v);
		else if (v && typeof v === "object") for (const x of Object.values(v)) add(x);
	};
	for (const k of ACCOUNT_KEYS) add(cfg[k]);
	const email = /[?&]Email=([^&]+)/.exec(cfg.SIGNIN_URL ?? "")?.[1];
	if (email) personal.add(decodeURIComponent(email)), personal.add(email);
	if (cfg.DATASYNC_ID) personal.add(cfg.DATASYNC_ID.split("||")[0]);
	const prefetch = /window\.chunkedPrefetchResolvers\['id-0'\]\.resolve\((\{[\s\S]*?\})\);<\/script>/.exec(html);
	if (prefetch) {
		const ch = JSON.parse(prefetch[1]);
		add(ch.channelId);
		if (typeof ch.title === "string") personal.add(`"${ch.title}"`);
		for (const t of ch.thumbnailDetails?.thumbnails ?? []) add(t.url);
	}
	const sanitizedCfg = structuredClone(cfg);
	for (const k of ACCOUNT_KEYS) delete sanitizedCfg[k];
	const client = sanitizedCfg.INNERTUBE_CONTEXT.client;
	for (const k of ["remoteHost", "visitorData", "configInfo", "deviceExperimentId", "rolloutToken", "originalUrl"]) {
		// a page opened at the root has the bare origin, which every Studio URL starts with
		if (k !== "originalUrl" || new URL(client[k] ?? "https://x/").pathname.length > 1) add(client[k]);
		delete client[k];
	}
	sanitizedCfg.INNERTUBE_CONTEXT.clickTracking = { clickTrackingParams: "" };
	for (const ctx of Object.values(sanitizedCfg.WEB_PLAYER_CONTEXT_CONFIGS ?? {}) as any[]) {
		for (const k of ["datasyncId", "serializedForcedExperimentIds", "cspNonce", "innertubeApiKey"]) {
			add(ctx[k]);
			delete ctx[k];
		}
	}
	let page = html.slice(0, s) + JSON.stringify(sanitizedCfg) + html.slice(e);
	const rules: [string, RegExp, string][] = [
		["attestation", /\(function\(\) \{if \(window\.ytAtN\) \{window\.ytAtN\(\{[\s\S]*?\}\);\}\}\)\(\);/g, ""],
		["prefetch-entity", /"entity_id": "[^"]*"/g, '"entity_id": ""'],
		["prefetch-data", /window\.chunkedPrefetchResolvers\['id-0'\]\.resolve\(\{[\s\S]*?\}\);<\/script>/g, "window.chunkedPrefetchResolvers['id-0'].resolve(null);</script>"],
		["nonce", /nonce="[^"]*"/g, 'nonce=""'],
		["server-time", /serverTimeMs:\s*[\d.]+/g, "serverTimeMs: 0"],
	];
	for (const [name, re, to] of rules) {
		if (!re.test(page)) throw new Error(`sanitize rule did not match: ${name}`);
		page = page.replace(re, to);
	}
	const left = [...personal].filter((v) => page.includes(v) || page.includes(encodeURIComponent(v)));
	if (left.length) throw new Error(`account values survive sanitizing (${left.length}), after: ${left.map((v) => JSON.stringify(page.slice(Math.max(0, page.indexOf(v) - 60), page.indexOf(v)))).join(", ")}`);
	if (/yt3\.ggpht\.com|googleusercontent\.com|authuser=\d/.test(page)) throw new Error("sanitized page still names account images or an authuser");
	return { page, cfg };
}

// the app bundle a page loads
function bundleOf(page: string) {
	const jsUrl = /<script id="base-js" src="([^"]+)"/.exec(page)?.[1]?.replace(/&amp;/g, "&");
	const cssUrl = /<link id="base-css" rel="stylesheet" href="([^"]+)"/.exec(page)?.[1]?.replace(/&amp;/g, "&");
	const signature = /_F_combinedSignature = '([^']+)'/.exec(page)?.[1];
	const cssKey = /_F_cssRowKey = '([^']+)'/.exec(page)?.[1];
	if (!jsUrl || !cssUrl || !signature || !cssKey) throw new Error("page has no Studio app bundle");
	return { key: /k=([^/]+)/.exec(jsUrl)![1], cssKey, am: /\/am=([^/]+)/.exec(jsUrl)?.[1] ?? "", signature, jsUrl, cssUrl };
}

let pin = loadStudioPin();
// images seen loading are kept across builds
const observedBefore = (pin?.assets ?? []).filter((a) => a.kind === "observed").map((a) => a.url);
let page: string;
if (pageFile) {
	const raw = readFileSync(pageFile, "utf8");
	const { page: clean, cfg } = sanitize(raw);
	page = clean;
	writeArchived(studioPagePath(), Buffer.from(page));
	pin = {
		fetchedAt: new Date().toISOString(),
		pageBuildLabel: cfg.PAGE_BUILD_LABEL,
		clientVersion: cfg.INNERTUBE_CLIENT_VERSION,
		staticVersion: /\/s\/(\w{8})\/scheduler\.js/.exec(page)?.[1] ?? "",
		app: { ...bundleOf(page), graph: "", initial: [], modules: {} },
		page: { sha256: sha256(page), size: page.length },
		assets: [],
	};
	console.log(`pinning Studio ${pin.pageBuildLabel}`);
	if (darkPageFile) {
		const { page: dark } = sanitize(readFileSync(darkPageFile, "utf8"));
		const b = bundleOf(dark);
		if (b.key !== pin.app.key || b.cssKey !== pin.app.cssKey) throw new Error("the dark page is from another build than --page");
		if (!/<html[^>]*\sserver-dark[\s>]/.test(dark)) throw new Error("the dark page is not dark (no <html server-dark>)");
		writeArchived(studioPagePath(true), Buffer.from(dark));
		pin.dark = { am: b.am, signature: b.signature, jsUrl: b.jsUrl, cssUrl: b.cssUrl, page: { sha256: sha256(dark), size: dark.length }, modules: {} };
	}
} else {
	if (!pin) throw new Error(`no ${STUDIO_PIN_FILE}; pin a build with --page <captured Studio page>`);
	if (!existsSync(studioPagePath())) throw new Error(`missing ${studioPagePath()}; re-pin with --page`);
	page = readFileSync(studioPagePath(), "utf8");
	if (sha256(page) !== pin.page.sha256) {
		console.log("Studio page differs from the pin");
		failures++;
	}
	if (pin.dark && (!existsSync(studioPagePath(true)) || sha256(readFileSync(studioPagePath(true))) !== pin.dark.page.sha256)) {
		console.log("Studio dark page missing or differs from the pin");
		failures++;
	}
}
const pinned = new Map((pin.assets ?? []).map((a) => [a.url, a]));

// ---- static scripts, favicons, the bundle and its stylesheet ----
const wanted = new Map<string, string>();
for (const m of page.matchAll(/<(?:script|link)\b[^>]*?(?:src|href)="(https:\/\/[^"]+)"/g)) {
	const u = m[1].replace(/&amp;/g, "&");
	if (u.includes("/s/_/creatorstudio/")) continue;
	if (/^https:\/\/(studio\.youtube\.com\/s\/|www\.gstatic\.com\/youtube\/img\/|fonts\.googleapis\.com\/)/.test(u)) wanted.set(u, "studio");
}
// static files named in ytcfg (trusted resource URLs) and their companions
for (const m of page.matchAll(/"(https:\/\/studio\.youtube\.com\/s\/\w{8}\/[\w.-]+)"/g)) wanted.set(m[1], "studio");
for (const a of pin.assets) if (a.kind === "studio" || a.kind === "observed") wanted.set(a.url, a.kind);
for (const u of observedBefore) wanted.set(u, "observed");
if (observedFile)
	for (const line of readFileSync(observedFile, "utf8").split("\n")) {
		const u = line.trim();
		if (/^https:\/\/(studio\.youtube\.com\/s\/|fonts\.gstatic\.com\/s\/i\/|www\.gstatic\.com\/youtube\/img\/|fonts\.googleapis\.com\/|fonts\.gstatic\.com\/s\/)/.test(u)) wanted.set(u, "observed");
	}
await pool([...wanted], 8, async ([u, kind]) => void (await archive(u, kind, pinned.get(u))));

const mainJs = await archive(pin.app.jsUrl, "studio-app", pinned.get(pin.app.jsUrl));
await archive(pin.app.cssUrl, "studio-app", pinned.get(pin.app.cssUrl));
if (!mainJs) throw new Error("Studio app bundle unavailable");
if (pin.dark) {
	await archive(pin.dark.jsUrl, "studio-app", pinned.get(pin.dark.jsUrl));
	await archive(pin.dark.cssUrl, "studio-app", pinned.get(pin.dark.cssUrl));
}
const mm = /_ModuleManager_initialize\('([^']*)',\[([^\]]*)\]\)/.exec(mainJs.toString());
if (!mm) throw new Error("Studio bundle has no module graph");
pin.app.graph = mm[1];
pin.app.initial = mm[2].split(",").map((x) => x.trim().replace(/^'|'$/g, ""));

// ---- lazily loaded modules, one per request ----
// The module server requires the page's signature (rs=) and the CSS key
// (ck=); exm names every other module so the answer is exactly this one's
// stylesheet (_F_installCss) and code.
const graph = parseGraph(pin.app.graph);
const loaded = closure(graph, pin.app.initial);
const lazy = graph.names.filter((n) => !loaded.has(n));
const initialTop = pin.app.initial.filter((n) => !n.startsWith("sy")).sort().join(",");
const prefix = pin.app.jsUrl.slice(0, pin.app.jsUrl.indexOf("/am="));
// exm counts as loaded together with everything it depends on, so it may
// only name modules that do not depend on this one (else this one would be
// counted as loaded and the answer would be empty)
const dependents = (name: string) => new Set(graph.names.filter((n) => n !== name && closure(graph, [n]).has(name)));
const moduleUrl = (name: string, v: { am: string; signature: string } = pin!.app) => {
	const skip = dependents(name);
	const exm = graph.names.filter((n) => n !== name && !skip.has(n)).sort().join(",");
	return `${prefix}/ck=${pin!.app.cssKey}/am=${v.am}/d=1/exm=${exm}/excm=${initialTop}/ed=1/rs=${v.signature}/m=${name}`;
};
let done = 0;
await pool(lazy, 6, async (name) => {
	const path = studioModulePath(name);
	const expect = pin!.app.modules[name];
	// a new build's modules are fetched, not taken from the previous build's files
	if (existsSync(path) && (expect || !pageFile)) {
		const data = readFileSync(path);
		if (!expect || sha256(data) === expect.sha256) {
			pin!.app.modules[name] = { sha256: sha256(data), size: data.byteLength };
			return;
		}
	}
	if (CHECK) {
		console.log(`missing module: ${name}`);
		failures++;
		return;
	}
	const r = await get(moduleUrl(name));
	if (!r.ok) {
		console.log(`module ${name}: ${r.status}`);
		failures++;
		return;
	}
	const data = Buffer.from(await r.arrayBuffer());
	// with dependents left out of exm, an empty wrapper is the module's real
	// content (some groupings carry no code)
	if (expect && sha256(data) !== expect.sha256) {
		console.log(`module ${name} differs from the pin`);
		failures++;
		return;
	}
	writeArchived(path, data);
	pin!.app.modules[name] = { sha256: sha256(data), size: data.byteLength };
	if (++done % 100 === 0) console.log(`${done} modules`);
});

// ---- the dark build's modules, kept only where they differ ----
if (pin.dark) {
	const dark = pin.dark;
	const known = dark.modules;
	dark.modules = {};
	let differ = 0;
	await pool(lazy, 6, async (name) => {
		const path = studioModulePath(name, true);
		const expect = known[name];
		if (expect && existsSync(path) && sha256(readFileSync(path)) === expect.sha256) {
			dark.modules[name] = expect;
			return;
		}
		if (CHECK) {
			if (expect) {
				console.log(`missing dark module: ${name}`);
				failures++;
			}
			return;
		}
		const r = await get(moduleUrl(name, dark));
		if (!r.ok) {
			console.log(`dark module ${name}: ${r.status}`);
			failures++;
			return;
		}
		const data = Buffer.from(await r.arrayBuffer());
		if (sha256(data) === pin!.app.modules[name]?.sha256) return;
		writeArchived(path, data);
		dark.modules[name] = { sha256: sha256(data), size: data.byteLength };
		differ++;
	});
	console.log(`dark build: ${Object.keys(dark.modules).length} modules differ from the light build${differ ? ` (${differ} fetched)` : ""}`);
}

// ---- images and fonts the bundle names literally ----
// Small images only (icons, illustrations); large promotional artwork and
// the photos of real creators in the brand-deal pages are left out. Images
// a page is seen to load are pinned with --observed.
const IMAGE_MAX = 64 * 1024;
const texts = [mainJs.toString(), ...lazy.map((n) => (existsSync(studioModulePath(n)) ? readFileSync(studioModulePath(n), "utf8") : ""))];
const images = new Set<string>();
const fontCss = new Set<string>();
for (const t of texts) {
	for (const m of t.matchAll(/"(https:\/\/www\.gstatic\.com\/youtube\/img\/[^"\s]+\.(?:json|svg|png|jpg|gif|webp))"/g)) if (!m[1].includes("/famebit/")) images.add(m[1]);
	for (const m of t.matchAll(/"(https:\/\/fonts\.googleapis\.com\/css2?\?family=[^"&]+[^"]*)"/g)) fontCss.add(m[1]);
}
await pool([...images], 8, async (u) => void (await archive(u, "image", pinned.get(u), IMAGE_MAX)));
for (const a of pin.assets) if (a.kind === "font-css") fontCss.add(a.url);
for (const u of [...wanted.keys()]) if (u.startsWith("https://fonts.googleapis.com/")) fontCss.add(u);
// the page's own @font-face rules
for (const m of page.matchAll(/url\((?:https:)?(\/\/fonts\.gstatic\.com\/[^)]+)\)/g)) wanted.set(`https:${m[1]}`, "font");
await pool([...wanted].filter(([, k]) => k === "font"), 8, async ([u]) => void (await archive(u, "font", pinned.get(u))));
for (const u of fontCss) {
	const css = await archive(u, "font-css", pinned.get(u));
	if (!css) continue;
	const files = [...css.toString().matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((m) => m[1]);
	await pool([...new Set(files)], 8, async (f) => void (await archive(f, "font", pinned.get(f))));
}

pin.assets = [...assets.values()].sort((a, b) => a.url.localeCompare(b.url));
if (!CHECK) saveStudioPin(pin);
const total = pin.assets.reduce((n, a) => n + a.size, 0) + Object.values(pin.app.modules).reduce((n, m) => n + m.size, 0);
console.log(
	`Studio ${pin.pageBuildLabel} (client ${pin.clientVersion}): ${pin.assets.length} assets, ${Object.keys(pin.app.modules).length} lazy modules, ` +
		`${(total / 1e6).toFixed(1)} MB in ${ORIGINAL_DIR}; pin ${STUDIO_PIN_FILE}`,
);
if (failures) {
	console.log(`${failures} problems`);
	process.exit(1);
}
