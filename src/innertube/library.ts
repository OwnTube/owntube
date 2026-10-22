// The You page and the library feeds it links to, built from YouTube's own
// responses: the You page's shelves (templates you/*), the Playlists feed
// (playlists/page, item/playlist_lockup_feed) and All subscriptions
// (subscriptions/channels, item/channel_subscribed). The two feeds' sort
// dropdowns reload the list through browse continuations minted here.

import type { Viewer } from "../client/page";
import { type ChannelSortOrder, subscribedChannels } from "../data";
import { encodeToken } from "../ids";
import { viewerVars } from "./chrome";
import { entries, entryItem, progressItem, watchedPercents } from "./history";
import { getPlaylist, libraryPlaylists, playlistCard, playlistVideos } from "./playlists";
import { responseContext } from "./r";
import { channelRowButton, subscribeEntities } from "./subscribe";
import { make, type Vars } from "./tpl";
import { avatarSources, baseVars, channelVars } from "./vars";

const SHELF = 12;
const withMutations = (mutations: unknown[]) => (mutations.length ? { frameworkUpdates: { entityBatchUpdate: { mutations, timestamp: { seconds: String(Math.floor(Date.now() / 1000)), nanos: 0 } } } } : {});
const reload = (viewer: Viewer, targetId: string, items: unknown[], extra = {}) => ({
	responseContext: responseContext(viewer),
	onResponseReceivedActions: [{ reloadContinuationItemsCommand: { targetId, continuationItems: items, slot: "RELOAD_CONTINUATION_SLOT_BODY" } }],
	...extra,
});

// ---- You ----

// Watch later or Liked videos as a shelf; left out while empty
async function listShelf(id: "WL" | "LL", viewer: NonNullable<Viewer>, vars: Vars) {
	const p = await getPlaylist(id, viewer);
	if (!p?.video_count) return undefined;
	const videos = await playlistVideos(p, viewer, SHELF, 0);
	const percents = await watchedPercents(viewer, videos);
	const name = id === "WL" ? "item/video_lockup_you_wl" : "item/video_lockup_you";
	return make(id === "WL" ? "you/shelf_wl" : "you/shelf_ll", {
		...vars,
		VIDEO_COUNT_NUM: String(p.video_count),
		VIDEOS_WORD: p.video_count === 1 ? " video" : " videos",
		ITEMS: videos.map((v) => progressItem(name, v, percents.get(v.id) ?? 0, vars)),
	});
}

export async function youPage(viewer: Viewer) {
	const vars = baseVars(viewer, "/feed/you");
	if (!viewer) return make("you/signed_out", vars);
	const shelves: unknown[] = [];
	const recent = await entries(viewer, 0, "", SHELF);
	if (recent.length) shelves.push(make("you/shelf_history", { ...vars, ITEMS: recent.map((v) => entryItem(v, viewer, "item/video_lockup_you_history")) }));
	shelves.push(make("you/shelf_playlists", { ...vars, ITEMS: (await libraryPlaylists(viewer)).slice(0, SHELF).map((p) => playlistCard(p, viewer, "/feed/you")) }));
	for (const id of ["WL", "LL"] as const) {
		const shelf = await listShelf(id, viewer, vars);
		if (shelf) shelves.push(shelf);
	}
	return make("you/page", { ...vars, ...viewerVars(viewer), VIEWER_AVATAR_XL: avatarSources(viewer.channelId, [72, 120, 160]), SHELVES: shelves });
}

// ---- Playlists ----

// the dropdown's choices in the template's order, and the filter chips
const PLAYLIST_SORTS = ["A-Z", "Recently added"];
const OWNED = "owned";
type PlaylistsToken = { k: "plfeed"; s: number; f?: string };

async function playlistItems(viewer: NonNullable<Viewer>, sort: number, filter?: string) {
	return (await libraryPlaylists(viewer, filter === OWNED, sort === 0)).map((p) => playlistCard(p, viewer));
}

export async function playlistsPage(viewer: NonNullable<Viewer>, params?: string) {
	const filter = decodeURIComponent(params ?? "") === OWNED ? OWNED : undefined;
	const sort = 1;
	const sorts: Vars = { SORT_LABEL: PLAYLIST_SORTS[sort] };
	PLAYLIST_SORTS.forEach((_, i) => {
		sorts[`SORT_${i}`] = encodeToken({ k: "plfeed", s: i, f: filter } satisfies PlaylistsToken);
		sorts[`SORT_${i}_SELECTED`] = i === sort;
	});
	return make("playlists/page", {
		...baseVars(viewer, "/feed/playlists"),
		...sorts,
		// a selected chip's tap goes back to the whole library
		CHIP_PLAYLISTS: undefined,
		CHIP_PLAYLISTS_SELECTED: false,
		CHIP_OWNED: filter ? undefined : OWNED,
		CHIP_OWNED_SELECTED: !!filter,
		ITEMS: await playlistItems(viewer, sort, filter),
	});
}

export async function playlistsReload(viewer: NonNullable<Viewer>, t: PlaylistsToken) {
	return reload(viewer, "browse-feedFEplaylist_aggregation", await playlistItems(viewer, t.s, t.f));
}

// ---- All subscriptions ----

const CHANNEL_SORTS: [string, ChannelSortOrder][] = [
	["Most relevant", "relevant"],
	["New activity", "activity"],
	["A-Z", "az"],
];

async function channelItems(viewer: NonNullable<Viewer>, sort: number) {
	const mutations: unknown[] = [];
	const items: unknown[] = [];
	for (const c of await subscribedChannels(viewer, CHANNEL_SORTS[sort]?.[1] ?? "relevant")) {
		const vars: Vars = { ...baseVars(viewer, "/feed/channels"), ...channelVars(c), CHANNEL_URL: `/@${c.handle}`, AVATAR_88_176: avatarSources(c.id, [88, 176]) };
		const item = make("item/channel_subscribed", { ...vars, SUBSCRIBE_BUTTON: await channelRowButton(c, vars, true) });
		if (!c.description) delete item.channelRenderer.descriptionSnippet;
		items.push(item);
		mutations.push(...(await subscribeEntities(c, viewer, vars, true)));
	}
	return { items, mutations };
}

// the page with the list in the given order
async function channelsResponse(viewer: NonNullable<Viewer>, sort: number) {
	const sorts: Vars = { SORT_LABEL: CHANNEL_SORTS[sort][0] };
	CHANNEL_SORTS.forEach((_, i) => {
		sorts[`SORT_${i}`] = encodeToken({ k: "chfeed", s: i });
		sorts[`SORT_${i}_SELECTED`] = i === sort;
	});
	const { items, mutations } = await channelItems(viewer, sort);
	const page = make<any>("subscriptions/channels", { ...baseVars(viewer, "/feed/channels"), ...sorts, ITEMS: items });
	const sl = page.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer;
	// nothing subscribed: the list says so
	if (!items.length) sl.contents = [{ itemSectionRenderer: { contents: [{ messageRenderer: { text: { runs: [{ text: "You haven't subscribed to any channels." }] } } }] } }];
	return { page, sections: sl.contents as unknown[], mutations };
}

export async function channelsPage(viewer: NonNullable<Viewer>) {
	const { page, mutations } = await channelsResponse(viewer, 0);
	return { ...page, ...withMutations(mutations) };
}

export async function channelsReload(viewer: NonNullable<Viewer>, sort: number) {
	const { sections, mutations } = await channelsResponse(viewer, CHANNEL_SORTS[sort] ? sort : 0);
	return reload(viewer, "browse-feedFEchannels", sections, withMutations(mutations));
}
