// /youtubei/v1/search, the /results page and search suggestions.

import type { PageData, Viewer } from "../client/page";
import { isSubscribed, searchChannels, searchVideos } from "../data";
import { sql } from "../db";
import { decodeToken, encodeToken } from "../ids";
import { topbar } from "./chrome";
import { channelRenderer, continuationItem, videoRenderer } from "./items";
import { responseContext, runs, searchEndpoint, text } from "./r";
import { ApiError, route } from "./router";

const PAGE = 20;
type Filter = "all" | "videos" | "channels" | "date" | "views";
const FILTERS: [Filter, string][] = [["all", "All"], ["videos", "Videos"], ["channels", "Channels"], ["date", "Recently uploaded"], ["views", "Most viewed"]];

// sp= in /results URLs carries the filter, as YouTube's does
const filterFromParams = (sp?: string | null): Filter => (FILTERS.find(([f]) => Buffer.from(f).toString("base64url") === sp)?.[0] ?? "all");
const paramsFor = (f: Filter) => (f === "all" ? undefined : Buffer.from(f).toString("base64url"));

async function results(query: string, filter: Filter, offset: number, viewer: Viewer) {
	const q = query.trim().slice(0, 200);
	const items: unknown[] = [];
	if (!q) return { items, more: false, total: 0 };
	if (offset === 0 && (filter === "all" || filter === "channels")) {
		const chans = await searchChannels(q, filter === "channels" ? 30 : 3);
		for (const c of chans) items.push(channelRenderer(c, await isSubscribed(viewer, c.id), viewer));
	}
	let more = false;
	if (filter !== "channels") {
		const vids = await searchVideos(q, PAGE, offset, filter === "date" ? "date" : filter === "views" ? "views" : "relevance");
		items.push(...vids.map((v) => videoRenderer(v)));
		more = vids.length === PAGE;
	}
	return { items, more, total: items.length };
}

function section(items: unknown[], query: string, filter: Filter, offset: number, more: boolean) {
	const out: unknown[] = [];
	if (items.length) out.push({ itemSectionRenderer: { contents: items } });
	else if (offset === 0)
		out.push({
			itemSectionRenderer: {
				contents: [
					{
						backgroundPromoRenderer: {
							title: runs("No results found"),
							bodyText: runs("Try different keywords or remove search filters"),
							icon: { iconType: "SEARCH" },
						},
					},
				],
			},
		});
	if (more) out.push(continuationItem(encodeToken({ k: "search", q: query, f: filter, o: offset + PAGE }), "/youtubei/v1/search", "CONTINUATION_REQUEST_TYPE_SEARCH"));
	return out;
}

function header(query: string, filter: Filter) {
	return {
		searchHeaderRenderer: {
			chipBar: {
				chipCloudRenderer: {
					chips: FILTERS.map(([f, label]) => ({
						chipCloudChipRenderer: {
							style: { styleType: "STYLE_HOME_FILTER" },
							text: text(label),
							isSelected: f === filter,
							location: "CHIP_LOCATION_SEARCH_RESULTS",
							...(f === filter ? {} : { navigationEndpoint: searchEndpoint(query, paramsFor(f)) }),
						},
					})),
					nextButton: { buttonRenderer: { style: "STYLE_TEXT", size: "SIZE_DEFAULT", isDisabled: false, icon: { iconType: "CHEVRON_RIGHT" }, accessibilityData: { accessibilityData: { label: "Next" } } } },
					previousButton: { buttonRenderer: { style: "STYLE_TEXT", size: "SIZE_DEFAULT", isDisabled: false, icon: { iconType: "CHEVRON_LEFT" }, accessibilityData: { accessibilityData: { label: "Previous" } } } },
				},
			},
		},
	};
}

async function searchResponse(query: string, filter: Filter, viewer: Viewer) {
	const r = await results(query, filter, 0, viewer);
	return {
		responseContext: responseContext(viewer),
		estimatedResults: String(r.total),
		contents: {
			twoColumnSearchResultsRenderer: {
				primaryContents: { sectionListRenderer: { contents: section(r.items, query, filter, 0, r.more), subMenu: { searchSubMenuRenderer: {} }, hideBottomSeparator: true, targetId: "search-feed" } },
			},
		},
		header: header(query, filter),
		targetId: "search-page",
		topbar: topbar(viewer, `/results?search_query=${encodeURIComponent(query)}`),
	};
}

route("search", async ({ body, viewer }) => {
	if (body.continuation) {
		const t = decodeToken<{ k: string; q: string; f: Filter; o: number }>(body.continuation);
		if (!t || t.k !== "search") throw new ApiError(400, "Invalid continuation");
		const r = await results(t.q, t.f, t.o, viewer);
		return { responseContext: responseContext(viewer), onResponseReceivedCommands: [{ appendContinuationItemsAction: { continuationItems: section(r.items, t.q, t.f, t.o, r.more), targetId: "search-feed" } }] };
	}
	return searchResponse(String(body.query ?? ""), filterFromParams(body.params), viewer);
});

export async function searchPage(url: URL, viewer: Viewer): Promise<PageData | Response> {
	const query = url.searchParams.get("search_query") ?? url.searchParams.get("q") ?? "";
	if (!query.trim()) return Response.redirect("/", 302);
	const filter = filterFromParams(url.searchParams.get("sp"));
	return {
		kind: "results",
		url: url.pathname + url.search,
		title: query,
		initialData: await searchResponse(query, filter, viewer),
		command: searchEndpoint(query, paramsFor(filter)),
	};
}

// /complete/search?client=youtube&q=...: the search box's suggestions, as
// JSONP for the callback it names (or JSON). Titles and channel names that
// start with or contain the text typed so far.
export async function suggest(url: URL): Promise<Response> {
	const q = (url.searchParams.get("q") ?? "").trim().slice(0, 100);
	const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
	const prefix = `${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
	const rows = q
		? await sql`select lower(title) as s from videos where status = 'ready' and visibility = 'public' and deleted_at is null and title ilike ${like}
			union select lower(title) from channels where title ilike ${like}
			order by 1 limit 20`
		: [];
	const list = rows.map((r: { s: string }) => r.s).sort((a: string, b: string) => Number(!a.startsWith(q.toLowerCase())) - Number(!b.startsWith(q.toLowerCase()))).slice(0, 10);
	void prefix;
	const payload = [q, list.map((s: string) => [s, 0, [512, 433]]), { k: 1, q: "" }];
	const cb = url.searchParams.get("callback");
	if (cb && /^[\w.$]{1,64}$/.test(cb)) return new Response(`${cb}(${JSON.stringify(payload)})`, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-store" } });
	return new Response(JSON.stringify(payload), { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
}
