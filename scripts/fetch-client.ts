// Acquires and pins the official YouTube desktop web client.
//
//   bun scripts/fetch-client.ts            download whatever the pin lists and is missing,
//                                          verify every digest (first run: pins the current build)
//   bun scripts/fetch-client.ts --update   re-pin to the build youtube.com serves now
//   bun scripts/fetch-client.ts --check    verify the archive against the pin, download nothing
//   bun scripts/fetch-client.ts --update --pages captures
//                                          take page HTML from browser captures (captures/<kind>/bodies/001-*.resp)
//                                          when youtube.com answers plain requests with its 429 "sorry" page
//   bun scripts/fetch-client.ts --observed captures/observed.txt
//                                          also pin extra asset URLs (one per line) that a
//                                          browser session asked for (icons, lazy images)
//
// Pages are fetched signed out. Only the page structure and build configuration
// are used; their ytInitialData (other people's videos) is never served.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";
import { jsonEnd } from "../src/client/json";
import {
	ORIGINAL_DIR,
	PIN_FILE,
	type Pin,
	type PinnedAsset,
	archivePath,
	closure,
	loadPin,
	modulePath,
	pagePath,
	parseGraph,
	savePin,
	sha256,
	writeArchived,
} from "../src/client/store";

const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
const HEADERS = { "user-agent": UA, "accept-language": "en-US,en;q=0.9", cookie: "SOCS=CAI; PREF=hl=en&gl=US" };
const ORIGIN = "https://www.youtube.com";

// pages whose structure the server reuses; any public content works, it is discarded
const PAGES: Record<string, string> = {
	watch: "/watch?v=aqz-KE-bpKQ",
	home: "/",
	results: "/results?search_query=blender",
	channel: "/@BlenderStudio",
	playlist: "/playlist?list=PLav47HAVZMjnTFVZL-aImCQIC0uLZtNCz",
	shorts: "/shorts",
};

// lazy player modules the player can request (case list of its module registry)
const PLAYER_MODULES = ["annotations_module", "asmjs", "captions", "creatorendscreen", "embed", "endscreen", "heartbeat", "kids", "miniplayer", "offline", "remote", "unplugged", "ux", "webgl", "ypc"];

const args = process.argv.slice(2);
const UPDATE = args.includes("--update");
const CHECK = args.includes("--check");
const pagesDir = args.includes("--pages") ? args[args.indexOf("--pages") + 1] : undefined;
const observedFile = args.includes("--observed") ? args[args.indexOf("--observed") + 1] : undefined;

async function get(url: string, tries = 4): Promise<Response> {
	for (let i = 0; ; i++) {
		try {
			const r = await fetch(url, { headers: HEADERS, redirect: "follow" });
			if (r.status >= 500 && i < tries) throw new Error(`status ${r.status}`);
			return r;
		} catch (e) {
			if (i >= tries) throw e;
			await Bun.sleep(1000 * 2 ** i);
		}
	}
}

function scriptBlocks(html: string) {
	return [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)].map((m) => ({ attrs: m[1], body: m[2] }));
}

export function extractYtcfg(html: string): Record<string, any> {
	const cfg: Record<string, any> = {};
	for (const { body } of scriptBlocks(html)) {
		let pos = 0;
		for (;;) {
			const i = body.indexOf("ytcfg.set({", pos);
			if (i < 0) break;
			const start = i + "ytcfg.set(".length;
			const end = jsonEnd(body, start);
			try {
				Object.assign(cfg, JSON.parse(body.slice(start, end)));
			} catch {}
			pos = end;
		}
	}
	return cfg;
}

function absolute(u: string): string {
	return new URL(u.replace(/&amp;/g, "&"), `${ORIGIN}/`).toString();
}

// every static asset a page references directly
function pageAssets(html: string): string[] {
	const out = new Set<string>();
	for (const m of html.matchAll(/<(?:script|link)\b[^>]*?(?:src|href)="([^"]+)"/g)) {
		const u = absolute(m[1]);
		if (/^https:\/\/(www\.youtube\.com\/s\/|fonts\.googleapis\.com\/)/.test(u)) out.add(u);
	}
	return [...out];
}

function trustedUrls(cfg: Record<string, any>): string[] {
	const out: string[] = [];
	const walk = (v: any) => {
		if (typeof v === "string" && /^(https:\/\/www\.youtube\.com)?\/s\/desktop\//.test(v)) out.push(absolute(v));
		else if (v && typeof v === "object") for (const x of Object.values(v)) walk(x);
	};
	for (const k of ["LOTTIE_URL", "WORKER_SERIALIZATION_URL", "WORKER_PERFORMANCE_URL", "RIVE_WASM_URLS"]) walk(cfg[k]);
	return out;
}

const assets = new Map<string, PinnedAsset>();
let failures = 0;

async function archive(url: string, kind: string, expect?: PinnedAsset): Promise<Buffer | undefined> {
	const path = archivePath(url);
	let data: Buffer | undefined = existsSync(path) ? readFileSync(path) : undefined;
	if (data && expect && sha256(data) !== expect.sha256) {
		console.log(`digest mismatch, re-downloading: ${url}`);
		data = undefined;
	}
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

async function pool<T>(items: T[], n: number, fn: (x: T) => Promise<void>) {
	const queue = [...items];
	await Promise.all(Array.from({ length: n }, async () => {
		for (let x = queue.shift(); x !== undefined; x = queue.shift()) await fn(x);
	}));
}

// fonts.googleapis.com stylesheets and the font files they name
async function archiveFonts(cssUrls: string[]) {
	for (const u of cssUrls) {
		const css = await archive(u, "font-css");
		if (!css) continue;
		const files = [...css.toString().matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((m) => m[1]);
		await pool([...new Set(files)], 8, async (f) => void (await archive(f, "font")));
	}
}

function capturedPage(kind: string): string {
	const dir = `${pagesDir}/${kind}/bodies`;
	const first = existsSync(dir) ? readdirSync(dir).sort().find((f) => f.endsWith(".resp")) : undefined;
	if (!first) throw new Error(`no capture for ${kind} in ${dir}`);
	return readFileSync(`${dir}/${first}`, "utf8");
}

// ---- pin or load pin ----
let pin = loadPin();
const pages: Record<string, string> = {};

if (UPDATE || !pin) {
	console.log(`pinning the current build from ${ORIGIN}`);
	for (const [kind, path] of Object.entries(PAGES)) {
		const html = pagesDir ? capturedPage(kind) : await (await get(ORIGIN + path)).text();
		if (!html.includes("ytcfg.set(")) throw new Error(`${path} did not return the desktop app page; try --pages <captures>`);
		pages[kind] = html;
		writeArchived(pagePath(kind), Buffer.from(html));
	}
	const cfg = extractYtcfg(pages.watch);
	const baseJs = /<script id="base-js"[^>]*src="([^"]+)"/.exec(pages.watch)?.[1];
	const baseCss = /href="([^"]*\/s\/_\/ytmainappweb\/_\/ss\/[^"]+)"/.exec(pages.watch)?.[1];
	if (!baseJs || !baseCss) throw new Error("watch page has no app bundle");
	const playerJs = cfg.PLAYER_JS_URL as string;
	const playerId = /\/s\/player\/(\w+)\//.exec(playerJs)?.[1];
	if (!playerId) throw new Error("watch page names no player");
	pin = {
		fetchedAt: new Date().toISOString(),
		pageBuildLabel: cfg.PAGE_BUILD_LABEL,
		clientVersion: cfg.INNERTUBE_CLIENT_VERSION,
		desktopVersion: /\/s\/desktop\/(\w+)\//.exec(pages.watch)?.[1] ?? "",
		player: { id: playerId, jsUrl: absolute(playerJs), cssUrl: absolute(cfg.PLAYER_CSS_URL), version: cfg.PLAYER_CLIENT_VERSION, modules: [] },
		app: { key: /k=([^/]+)/.exec(baseJs)![1], jsUrl: absolute(baseJs), cssUrl: absolute(baseCss), graph: "", initial: [], modules: {} },
		pages: {},
		assets: [],
	};
} else {
	for (const kind of Object.keys(pin.pages)) {
		const p = pagePath(kind);
		if (existsSync(p)) {
			const html = readFileSync(p, "utf8");
			if (sha256(html) !== pin.pages[kind].sha256) console.log(`page ${kind} differs from the pin (kept: pages carry per-request tokens)`);
			pages[kind] = html;
			continue;
		}
		if (CHECK) {
			console.log(`missing page: ${kind}`);
			failures++;
			continue;
		}
		// pages are not stable URLs; take the current one if it is still the same build
		const html = await (await get(pin.pages[kind].url)).text();
		const desktop = /\/s\/desktop\/(\w+)\//.exec(html)?.[1];
		if (desktop !== pin.desktopVersion) throw new Error(`youtube.com now serves desktop build ${desktop}, the pin is ${pin.desktopVersion}. Run with --update to re-pin.`);
		writeArchived(pagePath(kind), Buffer.from(html));
		pages[kind] = html;
	}
}

const pinned = new Map((pin.assets ?? []).map((a) => [a.url, a]));
for (const [kind, html] of Object.entries(pages)) {
	pin.pages[kind] = { url: pin.pages[kind]?.url ?? ORIGIN + PAGES[kind], sha256: pin.pages[kind]?.sha256 ?? sha256(html), size: html.length };
	if (UPDATE) pin.pages[kind].sha256 = sha256(html);
}

// ---- static assets referenced by the pages ----
const wanted = new Map<string, string>();
const fontCss = new Set<string>();
for (const html of Object.values(pages)) {
	for (const u of pageAssets(html)) {
		if (u.includes("/s/player/") || u.includes("/s/_/ytmainappweb/")) continue; // pinned separately
		if (u.startsWith("https://fonts.googleapis.com/")) fontCss.add(u);
		else wanted.set(u, "desktop");
	}
	for (const u of trustedUrls(extractYtcfg(html))) wanted.set(u, "desktop");
}
for (const f of ["favicon.ico", "favicon_32x32.png", "favicon_48x48.png", "favicon_96x96.png", "favicon_144x144.png"]) wanted.set(`${ORIGIN}/s/desktop/${pin.desktopVersion}/img/${f}`, "desktop");
for (const s of ["failure", "no_input", "open", "success"]) wanted.set(`${ORIGIN}/s/search/audio/${s}.mp3`, "desktop");
for (const a of pin.assets ?? []) if (a.kind === "observed" || a.kind === "desktop") wanted.set(a.url, a.kind);
if (observedFile)
	for (const line of readFileSync(observedFile, "utf8").split("\n")) {
		const u = line.trim();
		if (/^https:\/\/(www\.youtube\.com\/s\/|fonts\.gstatic\.com\/s\/i\/|www\.gstatic\.com\/youtube\/img\/)/.test(u)) wanted.set(u, "observed");
	}

console.log(`desktop and observed assets: ${wanted.size}`);
await pool([...wanted], 8, async ([u, kind]) => void (await archive(u, kind, pinned.get(u))));

// ---- player ----
const playerDir = pin.player.jsUrl.replace(/base\.js$/, "");
await archive(pin.player.jsUrl, "player", pinned.get(pin.player.jsUrl));
await archive(pin.player.cssUrl, "player", pinned.get(pin.player.cssUrl));
if (UPDATE || !pin.player.modules.length) {
	pin.player.modules = [];
	for (const m of PLAYER_MODULES) {
		const r = await get(`${playerDir}${m}.js`);
		if (r.ok) pin.player.modules.push(m);
	}
}
for (const m of pin.player.modules) await archive(`${playerDir}${m}.js`, "player", pinned.get(`${playerDir}${m}.js`));

// ---- app bundle and its lazily loaded modules ----
const mainJs = await archive(pin.app.jsUrl, "app", pinned.get(pin.app.jsUrl));
await archive(pin.app.cssUrl, "app", pinned.get(pin.app.cssUrl));
if (!mainJs) throw new Error("main app bundle unavailable");
const mm = /_ModuleManager_initialize\('([^']*)',\[([^\]]*)\]\)/.exec(mainJs.toString());
if (!mm) throw new Error("main bundle has no module graph");
pin.app.graph = mm[1];
pin.app.initial = mm[2].split(",").map((x) => x.trim().replace(/^'|'$/g, ""));
const graph = parseGraph(pin.app.graph);
const loaded = closure(graph, pin.app.initial);
const lazy = graph.names.filter((n) => !loaded.has(n));
// one module per request: exclude every other module so the module server
// returns exactly this module's code
const moduleUrl = (name: string) =>
	pin!.app.jsUrl.replace(/\/m=[^/]*$/, "").replace(/\/d=1\//, `/d=1/exm=${graph.names.filter((n) => n !== name).sort().join(",")}/ed=1/`) + `/m=${name}`;
let moduleFailures = 0;
await pool(lazy, 6, async (name) => {
	const path = modulePath(name);
	const expect = pin!.app.modules[name];
	if (existsSync(path)) {
		const data = readFileSync(path);
		if (!expect || sha256(data) === expect.sha256) {
			pin!.app.modules[name] = { sha256: sha256(data), size: data.byteLength };
			return;
		}
	}
	if (CHECK) {
		console.log(`missing module: ${name}`);
		moduleFailures++;
		return;
	}
	const r = await get(moduleUrl(name));
	if (!r.ok) {
		console.log(`module ${name}: ${r.status}`);
		moduleFailures++;
		return;
	}
	const data = Buffer.from(await r.arrayBuffer());
	if (expect && sha256(data) !== expect.sha256) {
		console.log(`module ${name} differs from the pin`);
		moduleFailures++;
		return;
	}
	writeArchived(path, data);
	pin!.app.modules[name] = { sha256: sha256(data), size: data.byteLength };
});
failures += moduleFailures;

// ---- icons ----
// Every icon the client can request: the resolver tables (name ->
// [[styleIndex, version, size, mirror], ...]) and the URL builders they are
// paired with, found by their call sites rather than minified names.
function iconUrls(main: string): string[] {
	const literal = (start: number) => {
		const open = main.indexOf(main[start] === "[" ? "[" : "{", start);
		return main.slice(open, jsonEnd(main, open));
	};
	const evalLiteral = (src: string) => vm.runInNewContext(`(${src})`, Object.create(null), { timeout: 2000 });
	const builder = /([\w$]+)=function\(T,P,y,c\)\{return T\+\(""\+([\w$]+)\[y\[0\]\]\+\(\(c===void 0\?0:c\)\?"_experimental":""\)\+"\/"\+P\+"\/v"\+y\[1\]\+"\/"\)\+\(y\[2\]\+"px\.svg"\)\}/.exec(main);
	if (!builder) {
		console.log("icon URL builder not found; icons will not be pinned");
		return [];
	}
	const styles: string[] = evalLiteral(literal(main.indexOf(`${builder[2]}=[`) + builder[2].length + 1));
	const urls = new Set<string>();
	for (const m of main.matchAll(/([\w$]+)\(([\w$]+),\w+,\(\(\w+=this\.(?:iconUrlProvider|urlProvider)\)==null\?void 0:\w+\.(?:getYtStandardUrl|getUrl)\)\|\|([\w$]+),\w+\)/g)) {
		const [, , table, fn] = m;
		const def = new RegExp(`${fn.replace(/\$/g, "\\$")}=function\\(T,P\\)\\{return ${builder[1].replace(/\$/g, "\\$")}\\("([^"]+)",T,P(,!0)?\\)\\}`).exec(main);
		const at = main.indexOf(`${table}={`);
		if (!def || at < 0) continue;
		const entries: Record<string, [number, number, number][]> = evalLiteral(literal(at + table.length + 1));
		for (const [name, variants] of Object.entries(entries))
			for (const [style, version, size] of variants) urls.add(`${def[1]}${styles[style]}${def[2] ? "_experimental" : ""}/${name}/v${version}/${size}px.svg`);
	}
	return [...urls];
}
const icons = iconUrls(mainJs.toString());
console.log(`icons named by the client: ${icons.length}`);
await pool(icons, 16, async (u) => void (await archive(u, "icon", pinned.get(u))));

// ---- images and animations under www.gstatic.com/youtube/img/ ----
// Complete file URLs written literally in the app (Lottie JSON, illustrations).
// URLs the client assembles from a literal prefix plus a theme/version suffix
// are only known once requested: run with UPSTREAM_ASSET_FETCH=1 and pin them
// with --observed client/observed.txt.
const imgUrls = new Set<string>();
for (const text of [mainJs.toString(), ...Object.keys(pin.app.modules).map((n) => (existsSync(modulePath(n)) ? readFileSync(modulePath(n), "utf8") : ""))]) {
	for (const m of text.matchAll(/"(https:\/\/www\.gstatic\.com\/youtube\/img\/[^"]+\.(?:json|svg|png|jpg|gif|webp))"/g)) imgUrls.add(m[1]);
	// prefix + (dark ? "dark" : "light") + "_v5.json"
	for (const m of text.matchAll(/"(https:\/\/www\.gstatic\.com\/youtube\/img\/[^"]+_)"\+[^;"]{0,120}\?"dark":"light"\)\+"(_v\d+\.json)"/g))
		for (const theme of ["dark", "light"]) imgUrls.add(`${m[1]}${theme}${m[2]}`);
}
console.log(`images and animations named by the client: ${imgUrls.size}`);
await pool([...imgUrls], 8, async (u) => void (await archive(u, "image", pinned.get(u))));

// ---- fonts ----
for (const m of mainJs.toString().matchAll(/"((?:https:)?\/\/fonts\.googleapis\.com\/css2?\?[^"]+)"/g)) fontCss.add(absolute(m[1]));
for (const a of pin.assets ?? []) if (a.kind === "font-css") fontCss.add(a.url);
await archiveFonts([...fontCss]);

pin.assets = [...assets.values()].sort((a, b) => a.url.localeCompare(b.url));
if (!CHECK) savePin(pin);
const total = pin.assets.reduce((n, a) => n + a.size, 0) + Object.values(pin.app.modules).reduce((n, m) => n + m.size, 0);
console.log(
	`build ${pin.pageBuildLabel} (client ${pin.clientVersion}, desktop ${pin.desktopVersion}, player ${pin.player.id}): ` +
		`${pin.assets.length} assets, ${Object.keys(pin.app.modules).length} lazy app modules, ${pin.player.modules.length} player modules, ` +
		`${(total / 1e6).toFixed(1)} MB in ${ORIGINAL_DIR}; pin ${PIN_FILE}`,
);
if (failures) {
	console.log(`${failures} problems`);
	process.exit(1);
}
