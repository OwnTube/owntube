// Builds src/innertube/templates/*.json from private captures of youtube.com
// (captures/, gitignored; see scripts/research/capture.ts).
//
// Each template is a real response, or part of one, reduced to what the
// builders need: tracking fields dropped, lists cut to one sample per kind,
// and the sample's own values (ids, names, counts, images, links) replaced by
// {{TOKENS}} that src/innertube/tpl.ts fills. The run fails if a sample value,
// a Google media/image/account URL, or a personal value from a signed-in
// capture survives, so templates are safe to commit.
//
//   bun scripts/make-templates.ts

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { decode, fromBase64, str } from "../src/innertube/proto";

const CAP = "captures";
const OUT = "src/innertube/templates";
mkdirSync(OUT, { recursive: true });

// ---------- loading ----------
function body(dir: string, match: RegExp): string {
	const d = join(CAP, dir, "bodies");
	const f = readdirSync(d)
		.filter((n) => n.endsWith(".resp") && match.test(n))
		.sort()[0];
	if (!f) throw new Error(`no ${match} in ${d}`);
	return readFileSync(join(d, f), "utf8");
}
// every response in a capture whose request matches; [request, response]
function bodies(dir: string, match: RegExp): [any, any][] {
	const d = join(CAP, dir, "bodies");
	return readdirSync(d)
		.filter((n) => n.endsWith(".resp") && match.test(n))
		.sort()
		.map((n) => [JSON.parse(readFileSync(join(d, n.replace(/\.resp$/, ".req.json")), "utf8")), JSON.parse(readFileSync(join(d, n), "utf8"))]);
}
function pageVar(html: string, name = "ytInitialData"): any {
	const at = html.indexOf(`var ${name} = `);
	if (at < 0) throw new Error(`no ${name}`);
	const start = at + `var ${name} = `.length;
	// the JSON ends where the statement does
	let depth = 0;
	let inStr = false;
	for (let i = start; i < html.length; i++) {
		const c = html[i];
		if (inStr) {
			if (c === "\\") i++;
			else if (c === '"') inStr = false;
		} else if (c === '"') inStr = true;
		else if (c === "{" || c === "[") depth++;
		else if (c === "}" || c === "]") {
			if (--depth === 0) return JSON.parse(html.slice(start, i + 1));
		}
	}
	throw new Error("unterminated");
}

// ---------- reduction ----------
const DROP = new Set(["trackingParams", "clickTrackingParams", "loggingDirectives", "visitorData", "watchEndpointSupportedOnesieConfig", "serviceTrackingParams", "adSignalsInfo", "responseContext"]);
export function clean(o: any): any {
	if (Array.isArray(o)) return o.map(clean);
	if (o && typeof o === "object") return Object.fromEntries(Object.entries(o).filter(([k]) => !DROP.has(k)).map(([k, v]) => [k, clean(v)]));
	return o;
}
export function strings(o: any, fn: (s: string) => string): any {
	if (typeof o === "string") return fn(o);
	if (Array.isArray(o)) return o.map((x) => strings(x, fn));
	if (o && typeof o === "object") return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, strings(v, fn)]));
	return o;
}
export function holder(o: any, key: string, pred: (v: any) => boolean = () => true): any {
	if (!o || typeof o !== "object") return undefined;
	if (!Array.isArray(o) && key in o && pred(o[key])) return o;
	for (const v of Array.isArray(o) ? o : Object.values(o)) {
		const h = holder(v, key, pred);
		if (h) return h;
	}
	return undefined;
}
export const find = (o: any, key: string, pred?: (v: any) => boolean) => holder(o, key, pred)?.[key];
export function findAll(o: any, key: string, out: any[] = []): any[] {
	if (!o || typeof o !== "object") return out;
	if (!Array.isArray(o) && key in o) out.push(o[key]);
	for (const v of Array.isArray(o) ? o : Object.values(o)) findAll(v, key, out);
	return out;
}
// removes every object property `key` (deep)
export function dropKey(o: any, key: string): any {
	if (Array.isArray(o)) return o.map((x) => dropKey(x, key));
	if (o && typeof o === "object") return Object.fromEntries(Object.entries(o).filter(([k]) => k !== key).map(([k, v]) => [k, dropKey(v, key)]));
	return o;
}
// removes array elements matching pred (deep)
export function dropItems(o: any, pred: (x: any) => boolean): any {
	if (Array.isArray(o)) return o.filter((x) => !pred(x)).map((x) => dropItems(x, pred));
	if (o && typeof o === "object") return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, dropItems(v, pred)]));
	return o;
}

// values every template gets rid of
const GLOBAL: [RegExp, string][] = [
	[/https:\/\/accounts\.google\.com\/ServiceLogin\?[^"\s]*/g, "{{SIGNIN_URL}}"],
	[/https?:\/\/www\.gstatic\.com\//g, "{{ORIGIN}}/_up/www.gstatic.com/"],
	[/https:\/\/studio\.youtube\.com/g, "{{STUDIO_ORIGIN}}"],
	[/https?:\/\/www\.youtube\.com(?=[/"?]|$)/g, "{{ORIGIN}}"],
];
const assets = new Set<string>();

// Replace sample values by tokens. `ids` are ids whose entity keys may appear
// (base64 protobuf with the id in field 2) -> {{ek:TOKEN:type}}.
export function tokenize(o: any, pairs: [string, string][], ids: [string, string][] = []): any {
	const sorted = pairs.filter(([from]) => from).sort((a, b) => b[0].length - a[0].length);
	return strings(o, (s) => {
		for (const m of s.matchAll(/https:\/\/www\.gstatic\.com\/[^"\s]+/g)) assets.add(m[0]);
		if (ids.length && /^[A-Za-z0-9+/_-]{16,}(%3D|=){0,2}$/.test(s)) {
			try {
				const f = decode(fromBase64(s));
				const id = str(f.get(2)?.[0]);
				const type = f.get(4)?.[0];
				const hit = ids.find(([v]) => v === id);
				if (hit && typeof type === "number" && f.get(5)?.[0] === 1 && f.size === 3) return `{{ek:${hit[1]}:${type}}}`;
			} catch {}
		}
		// ids inside other base64 protobuf blobs (panel params, share entities,
		// notification preferences): blank the id with '~' and let fill() put
		// ours back (ids have fixed lengths)
		if (ids.length && /^[A-Za-z0-9+/_-]{12,}(%3D|=){0,2}$/.test(s)) {
			const b = b64bytes(s);
			if (b) {
				let latin = Buffer.from(b).toString("latin1");
				const hits = ids.filter(([v]) => latin.includes(v));
				if (hits.length === 1) {
					const [v, name] = hits[0];
					latin = latin.split(v).join("~".repeat(v.length));
					return `{{b64:${name}:${b64style(s, Buffer.from(latin, "latin1"))}}}`;
				}
			}
		}
		if (sorted.some(([from]) => s === from)) return `{{${sorted.find(([from]) => s === from)![1]}}}`;
		for (const [from, to] of sorted) s = s.split(from).join(`{{${to}}}`);
		for (const [re, to] of GLOBAL) s = s.replace(re, to);
		return s;
	});
}
function b64bytes(s: string): Uint8Array | undefined {
	try {
		const b = fromBase64(s);
		return b.length >= 8 ? b : undefined;
	} catch {
		return undefined;
	}
}
// re-encode in the same style as the original string (url-safe or not, %3D or = padding)
export function b64style(orig: string, bytes: Uint8Array): string {
	let out = Buffer.from(bytes).toString("base64");
	if (/[-_]/.test(orig)) out = out.replace(/\+/g, "-").replace(/\//g, "_");
	if (/%3D/.test(orig)) out = out.replace(/=/g, "%3D");
	else if (!/=$/.test(orig)) out = out.replace(/=+$/, "");
	return out;
}
// sets a whole-value token at every `key` (e.g. image "sources") under node
export function wholeToken(node: any, key: string, token: string, pred: (holderObj: any) => boolean = () => true) {
	const walk = (o: any) => {
		if (!o || typeof o !== "object") return;
		if (!Array.isArray(o) && key in o && pred(o)) o[key] = `{{${token}}}`;
		for (const v of Array.isArray(o) ? o : Object.values(o)) walk(v);
	};
	walk(node);
	return node;
}

// ---------- safety ----------
const FORBIDDEN_HOSTS = /googlevideo\.com|ytimg\.com|ggpht\.com|googleusercontent\.com|encrypted-tbn\d?\.gstatic\.com|accounts\.google\.com|doubleclick\.net|\/\/www\.youtube\.com|\/\/youtube\.com|studio\.youtube\.com/;
const personal: string[] = [];
const written: string[] = [];
function save(name: string, data: unknown, samples: string[] = []) {
	const text = JSON.stringify(data);
	const bad: string[] = [];
	const host = FORBIDDEN_HOSTS.exec(text);
	if (host) bad.push(`host ${host[0]} near ${text.slice(Math.max(0, host.index - 120), host.index + 80)}`);
	const decoded = [...text.matchAll(/"([A-Za-z0-9+/_-]{12,}(?:%3D|=){0,2})"/g)].map((m) => {
		const b = b64bytes(m[1]);
		return b ? Buffer.from(b).toString("latin1") : "";
	}).join("\n");
	for (const s of samples) if (s && s.length >= 8 && decoded.includes(s)) bad.push(`value ${JSON.stringify(s)} inside a base64 blob`);
	// personal values are reported by position only
	for (const s of personal) if (s && (text.includes(s) || (s.length >= 8 && decoded.includes(s)))) bad.push(`a personal value from the signed-in capture at offset ${text.indexOf(s)}`);
	const email = /[\w.+-]+@[\w-]+(\.[\w-]+)*\.[a-z]{2,}/i.exec(text);
	if (email) bad.push(`an email address at offset ${email.index}`);
	for (const s of samples) if (s && text.includes(s)) bad.push(`value ${JSON.stringify(s)} near ${text.slice(Math.max(0, text.indexOf(s) - 120), text.indexOf(s) + 60)}`);
	if (bad.length) throw new Error(`template ${name} not clean:\n  ${bad.join("\n  ")}`);
	const file = join(OUT, `${name}.json`);
	mkdirSync(join(file, ".."), { recursive: true });
	writeFileSync(file, JSON.stringify(data, null, "\t") + "\n");
	written.push(`${name} (${(text.length / 1024).toFixed(1)} KB)`);
}

// ---------- shared item tokenizers ----------
const contentOf = (t: any): string => t?.content ?? t?.simpleText ?? (t?.runs ?? []).map((r: any) => r.text).join("") ?? "";

// a video lockupViewModel (grid, shelf, related, home); returns the template
// and the sample values it replaced
export function videoLockup(sample: any) {
	const lv = find(sample, "lockupViewModel");
	const id: string = lv.contentId;
	const meta = lv.metadata.lockupMetadataViewModel;
	const title = contentOf(meta.title);
	const badge = find(lv.contentImage, "thumbnailBadgeViewModel");
	const parts: any[] = findAll(meta.metadata, "metadataParts").flat();
	const pairs: [string, string][] = [
		[id, "VIDEO_ID"],
		[title, "TITLE"],
		[badge?.text, "DURATION"],
		[badge?.rendererContext?.accessibilityContext?.label, "DURATION_LABEL"],
	];
	const samples = [id, title];
	let item = clean(sample);
	// channel row (absent on a channel's own grid)
	const chanEndpoint = find(lv, "browseEndpoint", (b) => /^UC/.test(b.browseId ?? ""));
	if (chanEndpoint) {
		pairs.push([chanEndpoint.browseId, "CHANNEL_ID"], [chanEndpoint.canonicalBaseUrl, "CHANNEL_URL"]);
		samples.push(chanEndpoint.browseId);
	}
	const goTo = /^Go to channel (.+)$/.exec(find(lv, "a11yLabel", (v) => /^Go to channel /.test(v)) ?? "");
	if (goTo) {
		pairs.push([goTo[1], "CHANNEL_NAME"]);
		samples.push(goTo[1]);
	}
	for (const p of parts) {
		const t = contentOf(p.text);
		const l: string = p.accessibilityLabel ?? "";
		if (/ views?$/.test(l) || / views?$/.test(t) || p.leadingIcon?.name === "PLAY_ARROW_OUTLINED") pairs.push([t, "VIEWS"], [l, "VIEWS_LABEL"]);
		else if (/ ago$/.test(t)) pairs.push([t, "PUBLISHED"], [l, "PUBLISHED_LABEL"]);
		else if (t && !pairs.some(([, k]) => k === "CHANNEL_NAME")) {
			pairs.push([t, "CHANNEL_NAME"]);
			samples.push(t);
		}
	}
	// no animated previews here; verified marks belong to YouTube's channels
	item = dropKey(item, "animatedThumbnailOverlayViewModel");
	item = dropItems(item, (x) => x && typeof x === "object" && "animatedThumbnailOverlayViewModel" in x);
	item = strings(item, (s) => s);
	const fixParts = (o: any) => {
		for (const ps of findAll(o, "metadataParts")) for (const p of ps) if (p.icon?.name === "CHECK_CIRCLE_FILLED") delete p.icon;
	};
	fixParts(item);
	// badges (CC, New, 4K) describe the sample video, not ours
	for (const rows of findAll(item, "metadataRows")) for (let i = rows.length - 1; i >= 0; i--) if (rows[i].badges) rows.splice(i, 1);
	const thumb = find(item, "contentImage");
	wholeToken(thumb, "sources", "THUMBS", (h) => Array.isArray(h.sources) && h.sources.some((s: any) => /ytimg/.test(s.url ?? "")));
	wholeToken(find(item, "decoratedAvatarViewModel") ?? {}, "sources", "AVATAR");
	const idList: [string, string][] = [[id, "VIDEO_ID"]];
	if (chanEndpoint) idList.push([chanEndpoint.browseId, "CHANNEL_ID"]);
	return { item: tokenize(item, pairs, idList), samples };
}

// the first array element under `listKey` that contains `key`
const sampleOf = (o: any, key: string, pred: (x: any) => boolean = () => true) => holder(o, key, pred);

// ======================================================================
// channel
// ======================================================================
function channel() {
	const page = pageVar(body("channel2", /^001-/));
	const header = page.header.pageHeaderRenderer;
	const ph = header.content.pageHeaderViewModel;
	const id: string = page.metadata.channelMetadataRenderer.externalId;
	const name: string = page.metadata.channelMetadataRenderer.title;
	const handle: string = page.metadata.channelMetadataRenderer.vanityChannelUrl.split("/@")[1];
	const desc: string = page.metadata.channelMetadataRenderer.description;
	const rows = ph.metadata.contentMetadataViewModel.metadataRows;
	const subs = rows[1].metadataParts[0];
	const vids = rows[1].metadataParts[1];
	const samples = [id, name, handle, "Blender", desc.slice(0, 40)];
	const ids: [string, string][] = [[id, "CHANNEL_ID"]];
	const channelPairs = (): [string, string][] => [
		[id, "CHANNEL_ID"],
		[`@${handle}`, "AT_HANDLE"],
		[handle, "HANDLE"],
		[name, "CHANNEL_NAME"],
		[desc, "DESCRIPTION"],
		[desc.trim(), "DESCRIPTION"],
		[contentOf(subs.text), "SUBSCRIBERS"],
		[subs.accessibilityLabel, "SUBSCRIBERS_LABEL"],
		[contentOf(vids.text), "VIDEO_COUNT"],
	];

	// --- header (signed out) ---
	let h = clean(header);
	const t = h.content.pageHeaderViewModel.title.dynamicTextViewModel;
	delete t.text.styleRuns;
	delete t.text.attachmentRuns; // the verified mark
	t.rendererContext.accessibilityContext.label = name;
	const d = h.content.pageHeaderViewModel.description.descriptionPreviewViewModel;
	d.rendererContext.accessibilityContext.label = "{{DESCRIPTION_LABEL}}";
	h.content.pageHeaderViewModel.metadata.contentMetadataViewModel.metadataRows[1].metadataParts[1].text.styleRuns[0].length = "{{VIDEO_COUNT_LENGTH}}";
	// the About panel loads through a continuation
	const aboutCont = find(d, "continuationCommand");
	aboutCont.token = "{{ABOUT_CONTINUATION}}";
	// header link: first custom link of the channel
	const attr = h.content.pageHeaderViewModel.attribution.attributionViewModel;
	attr.text.content = " {{LINK_TEXT}}";
	attr.text.commandRuns[0].length = "{{LINK_TEXT_LENGTH}}";
	const linkCmd = attr.text.commandRuns[0].onTap.innertubeCommand;
	linkCmd.commandMetadata.webCommandMetadata.url = "{{LINK_URL}}";
	linkCmd.urlEndpoint.url = "{{LINK_URL}}";
	// subscribe (signed out): sign-in modal
	const signIn = find(h, "signInEndpoint");
	delete signIn.continueAction;
	delete signIn.idamTag;
	wholeToken(h.content.pageHeaderViewModel.image, "sources", "AVATAR");
	wholeToken(h.content.pageHeaderViewModel.banner, "sources", "BANNER");
	save("channel/header", tokenize(h, channelPairs(), ids), samples);

	// --- page skeleton: tabs, metadata, microformat ---
	const tabs = page.contents.twoColumnBrowseResultsRenderer.tabs;
	const tabTpl: Record<string, any> = {};
	for (const tab of tabs) {
		const k = Object.keys(tab)[0];
		const r = clean(tab[k]);
		delete r.content;
		delete r.selected;
		const tabName = r.endpoint.commandMetadata.webCommandMetadata.url.split("/").pop();
		tabTpl[tabName] = tokenize({ [k]: r }, channelPairs(), ids);
	}
	const metadata = clean(page.metadata);
	const md = metadata.channelMetadataRenderer;
	md.keywords = "{{KEYWORDS}}";
	md.avatar.thumbnails = "{{AVATAR_900}}";
	md.availableCountryCodes = [];
	delete md.androidDeepLink;
	delete md.androidAppindexingLink;
	delete md.iosAppindexingLink;
	md.ownerUrls = ["{{ORIGIN}}/@{{HANDLE}}"];
	const micro = clean(page.microformat);
	const mf = micro.microformatDataRenderer;
	mf.thumbnail.thumbnails = "{{AVATAR_200}}";
	delete mf.appName;
	delete mf.androidPackage;
	delete mf.iosAppStoreId;
	delete mf.iosAppArguments;
	delete mf.ogType;
	for (const k of Object.keys(mf)) if (/^(urlApplinks|urlTwitter|twitter|linkAlternates|unlisted)/.test(k)) delete mf[k];
	mf.tags = [];
	mf.availableCountries = [];
	if (mf.linkAlternates) delete mf.linkAlternates;
	const microT = strings(micro, (s) => (/googleusercontent\.com|ggpht\.com/.test(s) ? "{{AVATAR_URL}}" : s));
	save("channel/page", tokenize({ tabs: tabTpl, metadata, microformat: microT }, [...channelPairs(), [mf.description, "DESCRIPTION_SHORT"]], ids), samples);

	// --- videos tab: grid with Latest/Popular/Oldest chips ---
	const videosTab = tabs.find((x: any) => x.tabRenderer?.selected).tabRenderer;
	const grid = clean(videosTab.content.richGridRenderer);
	const chips = find(grid.header, "chipBarViewModel").chips;
	for (const c of chips) {
		const label = c.chipViewModel.text.toUpperCase();
		find(c, "continuationCommand").token = `{{SORT_${label}}}`;
		c.chipViewModel.selected = `{{SELECTED_${label}}}`;
	}
	const firstItem = grid.contents.find((x: any) => x.richItemRenderer && findAll(x, "metadataParts").flat().length <= 2);
	const lockup = videoLockup(firstItem);
	save("item/video_lockup_channel", lockup.item, [...lockup.samples, ...samples]);
	const contItem = grid.contents.find((x: any) => x.continuationItemRenderer);
	find(contItem, "continuationCommand").token = "{{CONTINUATION}}";
	save("item/continuation", tokenize(contItem, []), samples);
	grid.contents = "{{ITEMS}}";
	grid.targetId = "{{TARGET_ID}}";
	save("channel/videos_grid", tokenize(grid, channelPairs(), ids), samples);

	// --- continuation envelopes for the grid ---
	const [[, reload]] = bodies("channel2", /browse/).filter(([req, res]) => req.post?.continuation && res.onResponseReceivedActions?.[0]?.reloadContinuationItemsCommand);
	const env = clean(reload);
	const header0 = env.onResponseReceivedActions[0].reloadContinuationItemsCommand;
	const chipsR = find(header0, "chipBarViewModel").chips;
	for (const c of chipsR) {
		const label = c.chipViewModel.text.toUpperCase();
		find(c, "continuationCommand").token = `{{SORT_${label}}}`;
		c.chipViewModel.selected = `{{SELECTED_${label}}}`;
	}
	header0.targetId = "{{TARGET_ID}}";
	env.onResponseReceivedActions[1].reloadContinuationItemsCommand.continuationItems = "{{ITEMS}}";
	env.onResponseReceivedActions[1].reloadContinuationItemsCommand.targetId = "{{TARGET_ID}}";
	save("channel/videos_reload", tokenize(env, channelPairs(), ids), samples);

	// --- home tab: shelves ---
	const [[, home]] = bodies("channel2", /browse/).filter(([req]) => req.post?.params?.startsWith("EghmZWF0dXJlZ"));
	const homeTab = home.contents.twoColumnBrowseResultsRenderer.tabs.find((x: any) => x.tabRenderer?.selected).tabRenderer;
	const sections = clean(homeTab.content.sectionListRenderer);
	const shelfSection = sections.contents.find((s: any) => find(s, "shelfRenderer") && find(s, "lockupViewModel") && !find(s, "shortsLockupViewModel"));
	const shelf = find(shelfSection, "shelfRenderer");
	const shelfItems = find(shelf, "horizontalListRenderer").items;
	const shelfLockup = videoLockup(shelfItems[0]);
	save("item/video_lockup_shelf", shelfLockup.item, [...shelfLockup.samples, ...samples]);
	find(shelf, "horizontalListRenderer").items = "{{ITEMS}}";
	const shelfTitle = contentOf(shelf.title);
	const shelfPairs: [string, string][] = [[shelfTitle, "SHELF_TITLE"]];
	// shelf title links to the tab it summarises
	const shelfEp = find(shelf.title, "browseEndpoint");
	if (shelfEp) shelfEp.params = "{{SHELF_PARAMS}}";
	delete shelf.playAllButton;
	save("channel/home_shelf", tokenize(shelfSection, [...shelfPairs, ...channelPairs()], ids), samples);
	sections.contents = "{{SECTIONS}}";
	sections.targetId = "{{TARGET_ID}}";
	save("channel/home_sections", tokenize(sections, channelPairs(), ids), samples);

	// --- playlists tab ---
	const [[, pls]] = bodies("channel2", /browse/).filter(([req]) => req.post?.params?.startsWith("EglwbGF5bGlzdHP"));
	const plTab = pls.contents.twoColumnBrowseResultsRenderer.tabs.find((x: any) => x.tabRenderer?.selected).tabRenderer;
	const plSections = clean(plTab.content.sectionListRenderer);
	const gridR = find(plSections, "gridRenderer");
	const plSample = gridR.items.find((x: any) => x.lockupViewModel);
	save("item/playlist_lockup", playlistLockup(plSample, channelPairs(), ids), samples);
	gridR.items = "{{ITEMS}}";
	delete plSections.subMenu;
	const subMenu = find(plSections, "channelSubMenuRenderer");
	if (subMenu) {
		const holderSub = holder(plSections, "channelSubMenuRenderer");
		delete holderSub.channelSubMenuRenderer;
	}
	plSections.targetId = "{{TARGET_ID}}";
	save("channel/playlists_sections", tokenize(dropItems(plSections, (x) => x && typeof x === "object" && Object.keys(x).length === 0), channelPairs(), ids), samples);

	// --- About panel ---
	const about = clean(JSON.parse(body("channel-about", /007-.*browse/)));
	const avm = find(about, "aboutChannelViewModel");
	const aboutPairs: [string, string][] = [
		...channelPairs(),
		[avm.country, "COUNTRY"],
		[avm.viewCountText, "VIEW_COUNT"],
		[contentOf(avm.joinedDateText), "JOINED"],
		[avm.subscriberCountText, "SUBSCRIBERS"],
		[avm.videoCountText, "VIDEO_COUNT"],
	];
	avm.description = "{{DESCRIPTION}}";
	avm.joinedDateText.styleRuns[0].length = "{{JOINED_LENGTH}}";
	const link = avm.links[0];
	const lvm = link.channelExternalLinkViewModel;
	lvm.title.content = "{{LINK_TITLE}}";
	lvm.link.content = "{{LINK_TEXT}}";
	lvm.link.commandRuns[0].length = "{{LINK_TEXT_LENGTH}}";
	const lc = lvm.link.commandRuns[0].onTap.innertubeCommand;
	lc.commandMetadata.webCommandMetadata.url = "{{LINK_URL}}";
	lc.urlEndpoint.url = "{{LINK_URL}}";
	delete lvm.favicon;
	save("item/channel_link", tokenize(link, aboutPairs, ids), samples);
	avm.links = "{{LINKS}}";
	if (avm.signInForBusinessEmail) delete avm.signInForBusinessEmail;
	delete avm.country;
	avm.country = "{{COUNTRY}}";
	save("channel/about", tokenize(about, aboutPairs, ids), samples);
}

// collection lockup (playlist) on a channel's Playlists tab
function playlistLockup(sample: any, extra: [string, string][] = [], extraIds: [string, string][] = []) {
	const lv = find(sample, "lockupViewModel");
	const pid: string = lv.contentId;
	const title = contentOf(lv.metadata.lockupMetadataViewModel.title);
	const badge = find(lv, "thumbnailBadgeViewModel");
	const firstVideo = find(lv, "watchEndpoint")?.videoId;
	let item = clean(sample);
	wholeToken(item, "sources", "THUMBS", (h) => Array.isArray(h.sources) && h.sources.some((s: any) => /ytimg/.test(s.url ?? "")));
	const pairs: [string, string][] = [
		[pid, "PLAYLIST_ID"],
		[title, "TITLE"],
		[badge?.text, "VIDEO_COUNT"],
		[firstVideo, "FIRST_VIDEO_ID"],
	];
	for (const p of findAll(lv.metadata, "metadataParts").flat()) {
		const t = contentOf(p.text);
		if (/^Updated /.test(t)) pairs.push([t, "UPDATED"]);
	}
	return tokenize(item, [...pairs, ...extra], [[pid, "PLAYLIST_ID"], ...extraIds]);
}

// ======================================================================
// signed-in captures: what belongs to the account that made them must not
// end up in a template
function personalValues() {
	const own = readdirSync(join(CAP, "in-own-channel", "bodies")).find((n) => n.startsWith("001-") && n.endsWith(".resp"));
	if (!own) return;
	const p = pageVar(readFileSync(join(CAP, "in-own-channel", "bodies", own), "utf8"));
	const m = p.metadata.channelMetadataRenderer;
	personal.push(m.externalId, m.title, m.vanityChannelUrl.split("/@")[1] ?? "");
	const html = readFileSync(join(CAP, "in-home", "bodies", readdirSync(join(CAP, "in-home", "bodies")).find((n) => n.startsWith("001-") && n.endsWith(".resp"))!), "utf8");
	for (const k of ["DATASYNC_ID", "DELEGATED_SESSION_ID", "SESSION_INDEX", "ID_TOKEN"]) {
		const v = new RegExp(`"${k}":"([^"]+)"`).exec(html)?.[1];
		if (v && v.length > 6) personal.push(v.split("||")[0]);
	}
}

function channelSignedIn() {
	const html = body("in-channel", /^001-/);
	const page = pageVar(html);
	const md = page.metadata.channelMetadataRenderer;
	const id: string = md.externalId;
	const name: string = md.title;
	const samples = [id, name];
	const ph = page.header.pageHeaderRenderer.content.pageHeaderViewModel;
	const sub = clean(ph.actions.flexibleActionsViewModel.actionsRows[0].actions[0]);
	const sbvm = sub.subscribeButtonViewModel;
	sbvm.subscribeButtonContent.subscribeState.subscribed = false;
	sbvm.unsubscribeButtonContent.subscribeState.subscribed = true;
	// notification bell choices: "Personalized" is selected for a new subscription
	const pairs: [string, string][] = [[id, "CHANNEL_ID"], [name, "CHANNEL_NAME"]];
	save("channel/subscribe_button", tokenize(sub, pairs, [[id, "CHANNEL_ID"]]), samples);
	const muts = clean(page.frameworkUpdates.entityBatchUpdate.mutations);
	const subState = muts.find((m: any) => m.payload.subscriptionStateEntity);
	subState.payload.subscriptionStateEntity.subscribed = "{{SUBSCRIBED}}";
	const bell = muts.find((m: any) => m.payload.subscriptionNotificationStateEntity);
	bell.payload.subscriptionNotificationStateEntity.state = "{{BELL_STATE}}";
	save("channel/subscribe_entities", tokenize([subState, bell], pairs, [[id, "CHANNEL_ID"]]), samples);

	const own = pageVar(body("in-own-channel", /^001-/));
	const ownActions = clean(own.header.pageHeaderRenderer.content.pageHeaderViewModel.actions.flexibleActionsViewModel.actionsRows[0].actions);
	const om = own.metadata.channelMetadataRenderer;
	save("channel/owner_actions", tokenize(ownActions, [[om.externalId, "CHANNEL_ID"]], [[om.externalId, "CHANNEL_ID"]]), [om.externalId]);
}

// ======================================================================
// guide (left navigation)
// entries for products this instance doesn't have are left out
const guideTitle = (x: any) => contentOf(x?.formattedTitle ?? x?.title);
const UNSUPPORTED_GUIDE = new Set(["Shorts", "Explore", "More from YouTube", "Report history", "Downloads"]);
function pruneGuide(g: any) {
	g.items = g.items.filter((sec: any) => {
		const s = Object.values(sec)[0] as any;
		if (UNSUPPORTED_GUIDE.has(guideTitle(s))) return false;
		if (s.items) s.items = s.items.filter((it: any) => !UNSUPPORTED_GUIDE.has(guideTitle(Object.values(it)[0])) && !it.guideDownloadsEntryRenderer);
		const col = find(s, "guideCollapsibleSectionEntryRenderer");
		if (col?.sectionItems) col.sectionItems = col.sectionItems.filter((it: any) => !UNSUPPORTED_GUIDE.has(guideTitle(Object.values(it)[0])) && !it.guideDownloadsEntryRenderer);
		return !(s.items && s.items.length === 0);
	});
	return g;
}

function guide() {
	const out = pruneGuide(clean(JSON.parse(body("channel2", /guide/))));
	save("guide/signed_out", tokenize(out, []));

	const raw = JSON.parse(body("in-home", /guide/));
	const g = pruneGuide(clean(raw));
	delete g.userProfile;
	const subsSection = g.items.find((s: any) => s.guideSubscriptionsSectionRenderer).guideSubscriptionsSectionRenderer;
	const entries = subsSection.items.filter((it: any) => it.guideEntryRenderer);
	const sample = entries[0];
	const ge = sample.guideEntryRenderer;
	const sid = ge.entryData.guideEntryData.guideEntryId;
	const sname = guideTitle(ge);
	const surl = ge.navigationEndpoint.browseEndpoint.canonicalBaseUrl;
	ge.presentationStyle = "GUIDE_ENTRY_PRESENTATION_STYLE_NONE";
	delete ge.badges;
	ge.thumbnail.thumbnails = "{{AVATAR}}";
	save("guide/subscription_entry", tokenize(sample, [[sid, "CHANNEL_ID"], [sname, "CHANNEL_NAME"], [surl, "CHANNEL_URL"]], [[sid, "CHANNEL_ID"]]), [sid, sname]);
	const more = subsSection.items.find((it: any) => it.guideCollapsibleEntryRenderer);
	if (more) {
		more.guideCollapsibleEntryRenderer.expandableItems = "{{MORE}}";
		save("guide/subscriptions_more", tokenize(more, []), entries.map((e: any) => guideTitle(e.guideEntryRenderer)));
	}
	subsSection.items = "{{SUBSCRIPTIONS}}";
	// "Your channel" / "Your videos" belong to the viewer
	const you = g.items.map((s: any) => find(s, "guideCollapsibleSectionEntryRenderer")).find(Boolean);
	const yourChannel = you.sectionItems.find((it: any) => it.guideEntryRenderer?.icon?.iconType === "ACCOUNT_BOX_CAIRO");
	const vid = yourChannel.guideEntryRenderer.navigationEndpoint.browseEndpoint.browseId;
	const vurl = yourChannel.guideEntryRenderer.navigationEndpoint.browseEndpoint.canonicalBaseUrl;
	const pairs: [string, string][] = [[vid, "VIEWER_CHANNEL_ID"]];
	if (vurl) pairs.push([vurl, "VIEWER_CHANNEL_URL"]);
	save("guide/signed_in", tokenize(g, pairs, [[vid, "VIEWER_CHANNEL_ID"]]), entries.map((e: any) => guideTitle(e.guideEntryRenderer)));
}

// ======================================================================
const only = process.argv.slice(2);
personalValues();
const steps: [string, () => void][] = [
	["channel", channel],
	["channel-in", channelSignedIn],
	["guide", guide],
];
for (const [name, fn] of steps) {
	if (only.length && !only.includes(name)) continue;
	try {
		fn();
	} catch (e) {
		console.error(`${name}: ${(e as Error).message}`);
		process.exitCode = 1;
	}
}
writeFileSync(join(OUT, "_assets.txt"), [...assets].sort().join("\n") + "\n");
console.log(`templates: ${written.join(", ")}`);
console.log(`gstatic assets referenced: ${assets.size}; personal values guarded: ${personal.filter(Boolean).length}`);
