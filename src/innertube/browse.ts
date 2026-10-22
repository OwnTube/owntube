// /youtubei/v1/browse: home, subscriptions, history, You, channels, playlist
// pages, and the same responses as ytInitialData for direct page loads.
//
// Continuations are signed tokens (ids.ts encodeToken); the client sends
// them back verbatim, so their contents are ours to choose.

import type { PageData, PageKind, Viewer } from "../client/page";
import { channelVideos, getChannel, isSubscribed, latestVideos, subscribedChannels, subscriptionFeed } from "../data";
import { sql } from "../db";
import { decodeToken, encodeToken, isChannelId } from "../ids";
import { topbar } from "./chrome";
import { channelRenderer, continuationItem, richItem, videoLockup, videoRenderer } from "./items";
import { channelPlaylistsGrid, playlistBrowse, playlistLockupsFor, watchLaterAndLiked } from "./playlists";
import {
	type Channel,
	type Video,
	avatarUrl,
	bannerUrl,
	browseEndpoint,
	channelEndpoint,
	channelUrl,
	content,
	label,
	plural,
	responseContext,
	runs,
	serviceEndpoint,
	signInEndpoint,
	signInModal,
	subscribersText,
	text,
	urlEndpoint,
} from "./r";
import { ApiError, route } from "./router";
import { recordMiss } from "../diagnostics";
import { aboutPanel, type ChannelSort, type ChannelTab, channelPage, channelTab, tabParams, videoGridItems, videoGridReload } from "./channel";

// the browse command for a channel tab, as the tab strip's endpoints have it
function channelCommand(c: Channel, tab: ChannelTab) {
	return { commandMetadata: { webCommandMetadata: { url: `/@${c.handle}${tab === "featured" ? "" : `/${tab}`}`, webPageType: "WEB_PAGE_TYPE_CHANNEL", rootVe: 3611, apiUrl: "/youtubei/v1/browse" } }, browseEndpoint: { browseId: c.id, ...(tab === "featured" ? {} : { params: tabParams(tab) }), canonicalBaseUrl: `/@${c.handle}` } };
}

export const PAGE = 24;

export type BrowseResult = { response: Record<string, unknown>; kind: PageKind; title: string; url: string; command: unknown };

function richGrid(items: unknown[], targetId: string, extra: Record<string, unknown> = {}) {
	return { richGridRenderer: { contents: items, targetId, reflowOptions: { minimumRowsOfVideosAtStart: 2, minimumRowsOfVideosBetweenSections: 1 }, layoutSizing: "RICH_GRID_LAYOUT_SIZING_STANDARD", ...extra } };
}

function singleTab(contentRenderer: unknown, tabIdentifier: string) {
	return { twoColumnBrowseResultsRenderer: { tabs: [{ tabRenderer: { selected: true, content: contentRenderer, tabIdentifier } }] } };
}

function feedNudge(title: string, subtitle: string) {
	return {
		richSectionRenderer: {
			content: {
				feedNudgeRenderer: {
					title: { runs: [{ text: title }], accessibility: label(title) },
					subtitle: { runs: [{ text: subtitle }], accessibility: label(subtitle) },
					applyModernizedStyle: true,
					contentsLocation: "FEED_NUDGE_CONTENTS_LOCATION_UNKNOWN",
					trimStyle: "FEED_NUDGE_TRIM_STYLE_NO_TRIM",
					backgroundStyle: "FEED_NUDGE_BACKGROUND_STYLE_UNKNOWN",
					disableDropShadow: false,
				},
			},
		},
	};
}

// full-page sign-in prompt for account pages (subscriptions, history, You)
function signInPromo(icon: string, title: string, body: string, next: string) {
	return {
		sectionListRenderer: {
			contents: [
				{
					itemSectionRenderer: {
						contents: [
							{
								backgroundPromoRenderer: {
									title: runs(title),
									bodyText: runs(body),
									cta: { buttonRenderer: { style: "STYLE_SUGGESTIVE", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Sign in"), icon: { iconType: "AVATAR_LOGGED_OUT" }, navigationEndpoint: signInEndpoint(next) } },
									icon: { iconType: icon },
								},
							},
						],
					},
				},
			],
		},
	};
}

function messageSection(message: string) {
	return { sectionListRenderer: { contents: [{ itemSectionRenderer: { contents: [{ messageRenderer: { text: runs(message) } }] } }] } };
}

const appendAction = (items: unknown[], targetId: string) => ({ appendContinuationItemsAction: { continuationItems: items, targetId } });

// ---- feeds ----

async function homeItems(viewer: Viewer, offset: number) {
	const videos = await latestVideos(PAGE, offset);
	const items: unknown[] = videos.map((v) => richItem(v, viewer));
	if (videos.length === PAGE) items.push(continuationItem(encodeToken({ k: "home", o: offset + PAGE }), "/youtubei/v1/browse"));
	return items;
}

async function home(viewer: Viewer): Promise<BrowseResult> {
	const items = await homeItems(viewer, 0);
	const contents = items.length ? items : [feedNudge("Nothing here yet", "When people on this instance upload videos, they show up here.")];
	return {
		kind: "home",
		title: "",
		url: "/",
		command: browseEndpoint("FEwhat_to_watch", "/"),
		response: { contents: singleTab(richGrid(contents, "browse-feedFEwhat_to_watch"), "FEwhat_to_watch") },
	};
}

async function subscriptionsItems(viewer: Viewer, offset: number) {
	const videos = await subscriptionFeed(viewer, PAGE, offset);
	const items: unknown[] = videos.map((v) => richItem(v, viewer));
	if (videos.length === PAGE) items.push(continuationItem(encodeToken({ k: "subs", o: offset + PAGE }), "/youtubei/v1/browse"));
	return items;
}

async function subscriptions(viewer: Viewer): Promise<BrowseResult> {
	const base = { kind: "home" as const, title: "Subscriptions", url: "/feed/subscriptions", command: browseEndpoint("FEsubscriptions", "/feed/subscriptions", "WEB_PAGE_TYPE_BROWSE", 96368) };
	if (!viewer) return { ...base, response: { contents: singleTab(signInPromo("SUBSCRIPTIONS", "Don't miss new videos", "Sign in to see updates from your favorite channels", "/feed/subscriptions"), "FEsubscriptions") } };
	const items = await subscriptionsItems(viewer, 0);
	const contents = items.length ? items : [feedNudge("No new videos", "Videos from channels you subscribe to show up here.")];
	return {
		...base,
		response: {
			contents: singleTab(richGrid(contents, "browse-feedFEsubscriptions", { header: { feedFilterChipBarRenderer: undefined } }), "FEsubscriptions"),
			header: { feedTabbedHeaderRenderer: { title: runs("Subscriptions") } },
		},
	};
}

async function historyItems(viewer: Viewer, offset: number) {
	const rows = (await sql`select v.id, v.title, v.description, v.channel_id, c.title as channel_title, c.handle as channel_handle, c.avatar_path as channel_avatar,
		v.duration_ms, v.view_count::int as view_count, v.like_count, v.comment_count, v.published_at, v.created_at, v.visibility, v.status, v.width, v.height, h.watched_at
		from watch_history h join videos v on v.id = h.video_id join channels c on c.id = v.channel_id
		where h.user_id = ${viewer!.userId} and v.deleted_at is null and (v.visibility <> 'private' or v.channel_id = ${viewer!.channelId})
		order by h.watched_at desc limit ${PAGE} offset ${offset}`) as (Video & { watched_at: Date })[];
	const items: unknown[] = rows.map((v) => videoRenderer(v));
	if (rows.length === PAGE) items.push(continuationItem(encodeToken({ k: "history", o: offset + PAGE }), "/youtubei/v1/browse"));
	return items;
}

async function history(viewer: Viewer): Promise<BrowseResult> {
	const base = { kind: "home" as const, title: "History", url: "/feed/history", command: browseEndpoint("FEhistory", "/feed/history", "WEB_PAGE_TYPE_BROWSE", 6827) };
	if (!viewer) return { ...base, response: { contents: singleTab(signInPromo("WATCH_HISTORY", "Keep track of what you watch", "Watch history isn't viewable when signed out.", "/feed/history"), "FEhistory") } };
	const items = await historyItems(viewer, 0);
	return {
		...base,
		response: {
			contents: {
				twoColumnBrowseResultsRenderer: {
					tabs: [
						{
							tabRenderer: {
								selected: true,
								content: items.length
									? { sectionListRenderer: { contents: [{ itemSectionRenderer: { contents: items, header: { itemSectionHeaderRenderer: { title: runs("Watch history") } } } }], targetId: "browse-feedFEhistory" } }
									: messageSection("This list has no videos."),
								tabIdentifier: "FEhistory",
							},
						},
					],
					secondaryContents: {
						browseFeedActionsRenderer: {
							contents: [
								{
									buttonRenderer: {
										style: "STYLE_DEFAULT",
										size: "SIZE_DEFAULT",
										isDisabled: false,
										text: runs("Clear all watch history"),
										icon: { iconType: "DELETE" },
										serviceEndpoint: serviceEndpoint("/youtubei/v1/history/clear_watch_history", {
											signalServiceEndpoint: {
												signal: "CLIENT_SIGNAL",
												actions: [
													{
														openPopupAction: {
															popup: {
																confirmDialogRenderer: {
																	title: text("Clear watch history?"),
																	dialogMessages: [runs("Your watch history on this instance will be cleared.")],
																	confirmButton: { buttonRenderer: { style: "STYLE_BLUE_TEXT", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Clear watch history"), serviceEndpoint: serviceEndpoint("/youtubei/v1/history/clear_watch_history", { clearWatchHistoryEndpoint: {} }) } },
																	cancelButton: { buttonRenderer: { style: "STYLE_TEXT", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Cancel") } },
																},
															},
															popupType: "DIALOG",
														},
													},
												],
											},
										}),
									},
								},
							],
						},
					},
				},
			},
			header: { feedTabbedHeaderRenderer: { title: runs("Watch history") } },
		},
	};
}

function shelf(title: string, endpoint: unknown, items: unknown[]) {
	return {
		itemSectionRenderer: {
			contents: [
				{
					shelfRenderer: {
						title: runs({ text: title, navigationEndpoint: endpoint }),
						endpoint,
						content: { horizontalListRenderer: { items, visibleItemCount: 4, collapsedItemCount: 0 } },
						playAllButton: undefined,
					},
				},
			],
		},
	};
}

async function library(viewer: Viewer): Promise<BrowseResult> {
	const base = { kind: "home" as const, title: "You", url: "/feed/you", command: browseEndpoint("FElibrary", "/feed/you", "WEB_PAGE_TYPE_BROWSE", 6827) };
	if (!viewer) return { ...base, response: { contents: singleTab(signInPromo("ACCOUNT_CIRCLE", "Enjoy your favorite videos", "Sign in to access videos that you've liked or saved", "/feed/you"), "FElibrary") } };
	const recent = (await sql`select v.id from watch_history h join videos v on v.id = h.video_id where h.user_id = ${viewer.userId} and v.deleted_at is null order by h.watched_at desc limit 12`).map((r: { id: string }) => r.id);
	const { getVideo } = await import("../data");
	const recentVideos = (await Promise.all(recent.map((id: string) => getVideo(id, viewer)))).filter(Boolean) as Video[];
	const sections: unknown[] = [];
	sections.push(shelf("History", browseEndpoint("FEhistory", "/feed/history", "WEB_PAGE_TYPE_BROWSE", 6827), recentVideos.map((v) => videoLockup(v, viewer))));
	sections.push(shelf("Playlists", browseEndpoint("FEplaylist_aggregation", "/feed/playlists", "WEB_PAGE_TYPE_BROWSE", 6827), await playlistLockupsFor(viewer)));
	sections.push(...(await watchLaterAndLiked(viewer)).map((s) => shelf(s.title, s.endpoint, s.items)));
	return {
		...base,
		response: {
			contents: singleTab({ sectionListRenderer: { contents: sections, targetId: "browse-feedFElibrary" } }, "FElibrary"),
			header: {
				pageHeaderRenderer: {
					pageTitle: viewer.title,
					content: {
						pageHeaderViewModel: {
							title: { dynamicTextViewModel: { text: content(viewer.title) } },
							image: { decoratedAvatarViewModel: { avatar: { avatarViewModel: { image: { sources: [{ url: avatarUrl(viewer.channelId, 120), width: 120, height: 120 }] }, avatarImageSize: "AVATAR_SIZE_XL" } } } },
							metadata: { contentMetadataViewModel: { metadataRows: [{ metadataParts: [{ text: content(`@${viewer.handle}`) }, { text: { content: "View channel", commandRuns: [{ startIndex: 0, length: 12, onTap: { innertubeCommand: channelEndpoint({ id: viewer.channelId, handle: viewer.handle }) } }] } }] }], delimiter: " • " } },
						},
					},
				},
			},
		},
	};
}

async function playlistsFeed(viewer: Viewer): Promise<BrowseResult> {
	const base = { kind: "home" as const, title: "Playlists", url: "/feed/playlists", command: browseEndpoint("FEplaylist_aggregation", "/feed/playlists", "WEB_PAGE_TYPE_BROWSE", 6827) };
	if (!viewer) return { ...base, response: { contents: singleTab(signInPromo("PLAYLISTS", "Save videos for later", "Sign in to see your playlists", "/feed/playlists"), "FEplaylist_aggregation") } };
	const items = (await playlistLockupsFor(viewer)).map((l) => ({ richItemRenderer: { content: l } }));
	return {
		...base,
		response: {
			contents: singleTab(items.length ? richGrid(items, "browse-feedFEplaylist_aggregation") : messageSection("You haven't created any playlists yet."), "FEplaylist_aggregation"),
			header: { feedTabbedHeaderRenderer: { title: runs("Playlists") } },
		},
	};
}

async function channelsFeed(viewer: Viewer): Promise<BrowseResult> {
	const base = { kind: "home" as const, title: "All subscriptions", url: "/feed/channels", command: browseEndpoint("FEchannels", "/feed/channels", "WEB_PAGE_TYPE_BROWSE", 6827) };
	if (!viewer) return { ...base, response: { contents: singleTab(signInPromo("SUBSCRIPTIONS", "Don't miss new videos", "Sign in to see updates from your favorite channels", "/feed/channels"), "FEchannels") } };
	const channels = await subscribedChannels(viewer);
	const items = channels.map((c) => channelRenderer(c, true, viewer));
	return {
		...base,
		response: {
			contents: singleTab(items.length ? { sectionListRenderer: { contents: [{ itemSectionRenderer: { contents: items } }] } } : messageSection("You haven't subscribed to any channels."), "FEchannels"),
			header: { feedTabbedHeaderRenderer: { title: runs("All subscriptions") } },
		},
	};
}

// ---- dispatch ----

export async function buildBrowse(browseId: string, params: string | undefined, viewer: Viewer): Promise<BrowseResult | undefined> {
	if (browseId === "FEwhat_to_watch") return home(viewer);
	if (browseId === "FEsubscriptions") return subscriptions(viewer);
	if (browseId === "FEhistory") return history(viewer);
	if (browseId === "FElibrary" || browseId === "FEyou") return library(viewer);
	if (browseId === "FEplaylist_aggregation") return playlistsFeed(viewer);
	if (browseId === "FEchannels") return channelsFeed(viewer);
	if (browseId.startsWith("VL")) return playlistBrowse(browseId.slice(2), viewer);
	// settings pages (SPaccount_downloads is prefetched by the signed-in client):
	// none of them exist on this instance
	if (browseId.startsWith("SP"))
		return { kind: "home", title: "Settings", url: "/", command: browseEndpoint(browseId, "/"), response: { contents: singleTab(messageSection("This setting isn't available on this instance."), browseId) } };
	if (isChannelId(browseId)) {
		const c = await getChannel({ id: browseId });
		if (!c) return undefined;
		const tab = channelTab(params);
		const r = await channelPage(c, tab, viewer);
		return { kind: "channel", title: c.title, url: r.path, command: channelCommand(c, tab), response: r.response };
	}
	return undefined;
}

async function continuation(token: string, viewer: Viewer) {
	const t = decodeToken<{ k: string; o: number; c?: string; s?: ChannelSort; reload?: boolean; p?: string }>(token);
	if (!t) throw new ApiError(400, "Invalid continuation");
	let items: unknown[] = [];
	let target = "";
	if (t.k === "home") [items, target] = [await homeItems(viewer, t.o), "browse-feedFEwhat_to_watch"];
	else if (t.k === "subs") [items, target] = [await subscriptionsItems(viewer, t.o), "browse-feedFEsubscriptions"];
	else if (t.k === "history" && viewer) [items, target] = [await historyItems(viewer, t.o), "browse-feedFEhistory"];
	else if ((t.k === "chvideos" || t.k === "about") && t.c) {
		const c = await getChannel({ id: t.c });
		if (!c) throw new ApiError(404, "Not found");
		if (t.k === "about") return { responseContext: responseContext(viewer), ...(await aboutPanel(c, viewer)) };
		if (t.reload) return { responseContext: responseContext(viewer), ...(await videoGridReload(c, viewer, t.s ?? "newest")) };
		items = await videoGridItems(c, viewer, t.o, t.s ?? "newest");
		target = `browse-feed${c.id}videos`;
	} else if (t.k === "playlist" && t.p) {
		const { playlistItemsContinuation } = await import("./playlists");
		return playlistItemsContinuation(t.p, t.o, viewer);
	} else throw new ApiError(400, "Unknown continuation");
	return { responseContext: responseContext(viewer), onResponseReceivedActions: [appendAction(items, target)] };
}

route("browse", async ({ body, viewer }) => {
	if (body.continuation) return continuation(body.continuation, viewer);
	const id = String(body.browseId ?? "");
	const r = await buildBrowse(id, body.params, viewer);
	if (!r) {
		recordMiss(`youtubei browse:${id.replace(/^(UC|VLPL|PL)[\w-]+$/, "$1*")}`, JSON.stringify({ browseId: id, params: body.params }));
		throw new ApiError(404, "Requested entity was not found.", "notFound");
	}
	return { responseContext: responseContext(viewer), ...r.response, topbar: topbar(viewer, r.url) };
});

// ---- direct page loads ----

export async function resolvePath(url: URL): Promise<{ browseId: string; params?: string } | undefined> {
	const p = url.pathname.replace(/\/$/, "") || "/";
	const feeds: Record<string, string> = { "/": "FEwhat_to_watch", "/feed/subscriptions": "FEsubscriptions", "/feed/history": "FEhistory", "/feed/you": "FElibrary", "/feed/library": "FElibrary", "/feed/playlists": "FEplaylist_aggregation", "/feed/channels": "FEchannels" };
	if (feeds[p]) return { browseId: feeds[p] };
	if (p === "/playlist") {
		const list = url.searchParams.get("list");
		return list ? { browseId: `VL${list}` } : undefined;
	}
	const m = /^\/(?:@([A-Za-z0-9._-]{3,30})|channel\/(UC[A-Za-z0-9_-]{22}))(?:\/(featured|videos|playlists))?$/.exec(decodeURIComponent(p));
	if (m) {
		const c = await getChannel(m[1] ? { handle: m[1] } : { id: m[2] });
		if (!c) return undefined;
		return { browseId: c.id, params: m[3] ? tabParams(m[3] as ChannelTab) : undefined };
	}
	return undefined;
}

export async function browsePage(url: URL, viewer: Viewer): Promise<PageData | Response | undefined> {
	const target = await resolvePath(url);
	if (!target) return undefined;
	const r = await buildBrowse(target.browseId, target.params, viewer);
	if (!r) return undefined;
	return {
		kind: r.kind,
		url: url.pathname + url.search,
		title: r.title,
		initialData: { responseContext: responseContext(viewer), ...r.response, topbar: topbar(viewer, url.pathname + url.search) },
		command: r.command,
	};
}

// in-app navigation to a URL the client can't map itself (typed /@handle links)
route("navigation/resolve_url", async ({ body }) => {
	const raw = String(body.url ?? "");
	let u: URL;
	try {
		u = new URL(raw, "http://x");
	} catch {
		throw new ApiError(400, "Bad URL");
	}
	const target = await resolvePath(u);
	if (target) {
		const r = await buildBrowse(target.browseId, target.params, null);
		if (r) return { endpoint: r.command };
	}
	if (u.pathname === "/watch" && u.searchParams.get("v")) return { endpoint: { commandMetadata: { webCommandMetadata: { url: u.pathname + u.search, webPageType: "WEB_PAGE_TYPE_WATCH", rootVe: 3832 } }, watchEndpoint: { videoId: u.searchParams.get("v") } } };
	throw new ApiError(404, "Not found", "notFound");
});


