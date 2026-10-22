// /youtubei/v1/search, the /results page and search suggestions. Built from
// YouTube's search responses (templates search/*, item/*_search): the chip
// bar, the Filters dialog, video, channel and playlist results and the
// continuation that loads more.

import type { PageData, Viewer } from "../client/page";
import { isSubscribed, searchChannels, searchVideos, type VideoSearch } from "../data";
import { sql } from "../db";
import { decodeToken, encodeToken } from "../ids";
import { topbar } from "./chrome";
import { playlistSearchItem, searchPlaylists } from "./playlists";
import { decode, encode, fromBase64 } from "./proto";
import { PUBLIC_ORIGIN } from "../config";
import { type Channel, type Video, ago, compactViews, countLabel, responseContext, runs } from "./r";
import { ApiError, route } from "./router";
import { subscribeEntities } from "./subscribe";
import { make, type Vars } from "./tpl";
import { avatarSources, baseVars, channelVars, videoVars } from "./vars";

const PAGE = 20;

// The sp= parameter, as YouTube encodes it: field 1 the sort (3 popularity,
// 2 upload date), field 2 the filters (1 upload date, 2 type, 3 duration)
type Search = { sort?: number; date?: number; type?: number; duration?: number };

export function decodeParams(sp: string | null | undefined): Search {
	if (!sp) return {};
	try {
		const f = decode(fromBase64(decodeURIComponent(sp)));
		const out: Search = {};
		const sort = f.get(1)?.[0];
		if (sort === 2 || sort === 3) out.sort = sort;
		const sub = f.get(2)?.[0];
		if (sub instanceof Uint8Array) {
			const g = decode(sub);
			const num = (k: number, ok: number[]) => {
				const v = g.get(k)?.[0];
				return typeof v === "number" && ok.includes(v) ? v : undefined;
			};
			out.date = num(1, [2, 3, 4, 5]);
			out.type = num(2, [1, 2, 3]);
			out.duration = num(3, [2, 4, 5]);
		}
		return out;
	} catch {
		return {};
	}
}

export function encodeParams(s: Search): string {
	const filters: Record<number, number> = {};
	if (s.date) filters[1] = s.date;
	if (s.type) filters[2] = s.type;
	if (s.duration) filters[3] = s.duration;
	const msg: Record<number, number | Record<number, number>> = {};
	if (s.sort) msg[1] = s.sort;
	if (Object.keys(filters).length) msg[2] = filters;
	if (!Object.keys(msg).length) return "";
	return Buffer.from(encode(msg)).toString("base64").replace(/=/g, "%3D");
}

// Filters dialog entries: the template's F_<KEY> tokens
const FILTERS: [string, keyof Search, number | undefined][] = [
	["TYPE_VIDEO", "type", 1],
	["TYPE_CHANNEL", "type", 2],
	["TYPE_PLAYLIST", "type", 3],
	["DUR_SHORT", "duration", 4],
	["DUR_MEDIUM", "duration", 5],
	["DUR_LONG", "duration", 2],
	["DATE_TODAY", "date", 2],
	["DATE_WEEK", "date", 3],
	["DATE_MONTH", "date", 4],
	["DATE_YEAR", "date", 5],
	["SORT_RELEVANCE", "sort", undefined],
	["SORT_POPULARITY", "sort", 3],
];

const DAY = 86400000;
const SINCE: Record<number, number> = { 2: DAY, 3: 7 * DAY, 4: 31 * DAY, 5: 366 * DAY };
const DURATION: Record<number, [number?, number?]> = { 4: [undefined, 180000], 5: [180000, 1200000], 2: [1200000, undefined] };

const queryUrl = (q: string) => encodeURIComponent(q).replace(/%20/g, "+");

function headerVars(query: string, s: Search): Vars {
	const vars: Vars = { QUERY: query, QUERY_URL: queryUrl(query) };
	for (const [key, field, value] of FILTERS) {
		const selected = field === "sort" ? (s.sort ?? undefined) === value || (value === undefined && s.sort === 2) : s[field] === value;
		// a selected filter's entry clears it
		vars[`F_${key}`] = encodeParams({ ...s, [field]: selected ? undefined : value });
		const disabled = (field === "duration" && (s.type === 2 || s.type === 3)) || ((key === "TYPE_CHANNEL" || key === "TYPE_PLAYLIST") && s.duration !== undefined);
		vars[`F_${key}_STATUS`] = selected ? "FILTER_STATUS_SELECTED" : disabled ? "FILTER_STATUS_DISABLED" : undefined;
	}
	// chips: All, Videos, Recently uploaded (newest videos first)
	const chip = (next: Search) => encodeToken({ k: "search", q: query, sp: encodeParams(next), o: 0, reload: true });
	const recent = s.sort === 2;
	vars.CHIP_ALL = chip({ ...s, type: undefined, sort: recent ? undefined : s.sort });
	vars.CHIP_VIDEOS = chip({ ...s, type: 1, sort: recent ? undefined : s.sort });
	vars.CHIP_RECENT = chip({ ...s, type: 1, sort: 2 });
	vars.CHIP_ALL_SELECTED = !recent && s.type === undefined;
	vars.CHIP_VIDEOS_SELECTED = !recent && s.type === 1;
	vars.CHIP_RECENT_SELECTED = recent;
	return vars;
}

const searchThumbs = (id: string) => [[360, 202], [720, 404]].map(([width, height]) => ({ url: `${PUBLIC_ORIGIN}/vi/${id}/hq720.jpg`, width, height }));

function videoItem(v: Video, viewer: Viewer) {
	const snippet = (v.description ?? "").replace(/\s+/g, " ").trim();
	const item = make(`item/video_search_${viewer ? "in" : "out"}`, {
		...baseVars(viewer),
		...videoVars(v),
		...(v.view_count ? {} : { VIEWS_FULL: "No views" }),
		VIEWS_SHORT: compactViews(v.view_count),
		VIEWS_SHORT_LABEL: countLabel(v.view_count, "view"),
		PUBLISHED_FULL: ago(v.published_at ?? v.created_at),
		SEARCH_THUMBS: searchThumbs(v.id),
		AVATAR_68: avatarSources(v.channel_id, [68]),
		SNIPPET: snippet.length > 160 ? `${snippet.slice(0, 157)}...` : snippet,
	});
	if (!snippet) delete item.videoRenderer.detailedMetadataSnippets;
	return item;
}

async function channelItem(c: Channel, viewer: Viewer, query: string, mutations: unknown[]) {
	const vars: Vars = {
		...baseVars(viewer, `/results?search_query=${queryUrl(query)}`),
		...channelVars(c),
		CHANNEL_URL: `/@${c.handle}`,
		AVATAR_88_176: avatarSources(c.id, [88, 176]),
		QUERY: query,
		QUERY_URL: queryUrl(query),
	};
	const item = make("item/channel_search", vars);
	const cr = item.channelRenderer;
	if (!c.description) delete cr.descriptionSnippet;
	if (!viewer) return item;
	if (viewer.channelId === c.id) {
		delete cr.subscribeButton;
		return item;
	}
	const subscribed = await isSubscribed(viewer, c.id);
	cr.subscriptionButton = { subscribed };
	// the bell's preference blobs carry a video id as context; any id of the same length does
	const [latest] = await sql`select id from videos where channel_id = ${c.id} and deleted_at is null order by created_at desc limit 1`;
	cr.subscribeButton = make("item/subscribe_button_renderer", {
		...vars,
		VIDEO_ID: latest?.id ?? c.id.slice(-11),
		SUBSCRIBED: subscribed,
		SUBSCRIBE_LABEL: `Subscribe to ${c.title}.`,
		UNSUBSCRIBE_LABEL: `Unsubscribe from ${c.title}.`,
		BELL_LABEL_SUFFIX: `notification setting for ${c.title}`,
	});
	mutations.push(...(await subscribeEntities(c, viewer, vars, subscribed)));
	return item;
}

// one page of results; channels and playlists lead the first page of an unfiltered search
async function results(query: string, s: Search, offset: number, viewer: Viewer) {
	const q = query.trim().slice(0, 200);
	const items: unknown[] = [];
	const mutations: unknown[] = [];
	if (!q) return { items, mutations, more: false };
	if (s.type === 2) {
		const chans = await searchChannels(q, PAGE, offset);
		for (const c of chans) items.push(await channelItem(c, viewer, q, mutations));
		return { items, mutations, more: chans.length === PAGE };
	}
	if (s.type === 3) {
		const lists = await searchPlaylists(q, PAGE, offset, viewer);
		for (const p of lists) items.push(await playlistSearchItem(p, viewer));
		return { items, mutations, more: lists.length === PAGE };
	}
	const opts: VideoSearch = {
		sort: s.sort === 2 ? "date" : s.sort === 3 ? "views" : "relevance",
		since: s.date ? new Date(Date.now() - SINCE[s.date]) : undefined,
		minMs: s.duration ? DURATION[s.duration][0] : undefined,
		maxMs: s.duration ? DURATION[s.duration][1] : undefined,
	};
	const vids = await searchVideos(q, PAGE, offset, opts);
	const unfiltered = !s.type && !s.date && !s.duration && !s.sort;
	if (offset === 0 && unfiltered) for (const c of await searchChannels(q, 2)) items.push(await channelItem(c, viewer, q, mutations));
	items.push(...vids.map((v) => videoItem(v, viewer)));
	if (offset === 0 && unfiltered) {
		const lists = await searchPlaylists(q, 2, 0, viewer);
		items.splice(Math.min(items.length, 4), 0, ...(await Promise.all(lists.map((p) => playlistSearchItem(p, viewer)))));
	}
	return { items, mutations, more: vids.length === PAGE };
}

const continuationItem = (query: string, s: Search, offset: number) => make("item/continuation_search", { CONTINUATION: encodeToken({ k: "search", q: query, sp: encodeParams(s), o: offset + PAGE }) });

// YouTube's empty-results message
const noResults = () => ({
	backgroundPromoRenderer: {
		icon: { iconType: "EMPTY_SEARCH" },
		title: runs("No results found"),
		bodyText: runs("Try different keywords or remove search filters"),
	},
});

const withMutations = (mutations: unknown[]) => (mutations.length ? { frameworkUpdates: { entityBatchUpdate: { mutations, timestamp: { seconds: String(Math.floor(Date.now() / 1000)), nanos: 0 } } } } : {});

async function searchResponse(query: string, s: Search, viewer: Viewer) {
	const r = await results(query, s, 0, viewer);
	const page = make(`search/page_${viewer ? "in" : "out"}`, {
		...headerVars(query, s),
		ESTIMATED: String(r.items.length),
		ITEMS: r.items.length ? r.items : [noResults()],
		CONTINUATION_ITEM: r.more ? continuationItem(query, s, 0) : null,
	});
	const sl = page.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer;
	sl.contents = sl.contents.filter(Boolean);
	return { page, mutations: r.mutations };
}

route("search", async ({ body, viewer }) => {
	if (body.continuation) {
		const t = decodeToken<{ k: string; q: string; sp: string; o: number; reload?: boolean }>(body.continuation);
		if (!t || t.k !== "search") throw new ApiError(400, "Invalid continuation");
		const s = decodeParams(t.sp);
		if (t.reload) {
			// a chip: new results and a new header in place
			const { page, mutations } = await searchResponse(t.q, s, viewer);
			return { responseContext: responseContext(viewer), ...make<object>("search/reload", { ESTIMATED: page.estimatedResults, BODY: page.contents, HEADER: page.header }), ...withMutations(mutations) };
		}
		const r = await results(t.q, s, t.o, viewer);
		const items: unknown[] = [{ itemSectionRenderer: { contents: r.items } }];
		if (r.more) items.push(continuationItem(t.q, s, t.o));
		return { responseContext: responseContext(viewer), onResponseReceivedCommands: [{ appendContinuationItemsAction: { continuationItems: items, targetId: "search-feed" } }], ...withMutations(r.mutations) };
	}
	const query = String(body.query ?? "");
	const { page, mutations } = await searchResponse(query, decodeParams(body.params), viewer);
	return { responseContext: responseContext(viewer), ...page, ...withMutations(mutations), topbar: topbar(viewer, `/results?search_query=${queryUrl(query)}`) };
});

export async function searchPage(url: URL, viewer: Viewer): Promise<PageData | Response> {
	const query = url.searchParams.get("search_query") ?? url.searchParams.get("q") ?? "";
	if (!query.trim()) return Response.redirect("/", 302);
	const s = decodeParams(url.searchParams.get("sp"));
	const sp = encodeParams(s);
	const path = `/results?search_query=${queryUrl(query)}${sp ? `&sp=${sp}` : ""}`;
	const { page, mutations } = await searchResponse(query, s, viewer);
	return {
		kind: "results",
		url: url.pathname + url.search,
		title: query,
		initialData: { responseContext: responseContext(viewer), ...page, ...withMutations(mutations), topbar: topbar(viewer, path) },
		command: { commandMetadata: { webCommandMetadata: { url: path, webPageType: "WEB_PAGE_TYPE_SEARCH", rootVe: 4724 } }, searchEndpoint: { query, ...(sp ? { params: sp } : {}) } },
	};
}

// /complete/search?client=youtube&q=...: the search box's suggestions, as
// JSONP for the callback it names (or JSON). Titles and channel names that
// contain the text typed so far, those starting with it first.
export async function suggest(url: URL): Promise<Response> {
	const q = (url.searchParams.get("q") ?? "").trim().slice(0, 100);
	const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
	const rows = q
		? await sql`select lower(title) as s from videos where status = 'ready' and visibility = 'public' and deleted_at is null and title ilike ${like}
			union select lower(title) from channels where title ilike ${like}
			order by 1 limit 20`
		: [];
	const list = rows.map((r: { s: string }) => r.s).sort((a: string, b: string) => Number(!a.startsWith(q.toLowerCase())) - Number(!b.startsWith(q.toLowerCase()))).slice(0, 10);
	const payload = [q, list.map((s: string) => [s, 0, [512, 433]]), { k: 1, q: "" }];
	const cb = url.searchParams.get("callback");
	if (cb && /^[\w.$]{1,64}$/.test(cb)) return new Response(`${cb}(${JSON.stringify(payload)})`, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-store" } });
	return new Response(JSON.stringify(payload), { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
}
