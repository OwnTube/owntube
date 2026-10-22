// Playlists: user playlists (PL...), Watch later (WL, a stored playlist per
// account) and Liked videos (LL, derived from likes). Pages, the watch-page
// playlist panel, the "Save to playlist" sheet and the edit endpoints.

import { fill, make, tpl } from "./tpl";
import { baseVars } from "./vars";
import type { Viewer } from "../client/page";
import { PUBLIC_ORIGIN } from "../config";
import { type Channel, type Video, ago, avatarUrl, browseEndpoint, channelEndpoint, content, duration, durationLabel, label, playlistEndpoint, plural, responseContext, runs, serviceEndpoint, shortViews, signInModal, text, viewsText, watchEndpoint } from "./r";
import { sql } from "../db";
import { encodeToken, isVideoId, newPlaylistId, randomId } from "../ids";
import { continuationItem } from "./items";
import { ApiError, route } from "./router";
import type { BrowseResult } from "./browse";

const PAGE = 100;

type Playlist = { id: string; user_id: string; title: string; description: string; visibility: "public" | "unlisted" | "private"; kind: "user" | "watch_later" | "liked"; updated_at: Date; video_count: number; first_video: string | null; owner_channel: string; owner_title: string; owner_handle: string };

const VIDEO_COLUMNS = sql`v.id, v.title, v.description, v.channel_id, c.title as channel_title, c.handle as channel_handle, c.avatar_path as channel_avatar,
	v.duration_ms, v.view_count::int as view_count, v.like_count, v.comment_count, v.published_at, v.created_at, v.visibility, v.status, v.width, v.height`;
// entries a viewer may see in a playlist
const PLAYABLE = (viewer: Viewer) => sql`v.deleted_at is null and v.status = 'ready' and (v.visibility <> 'private' or v.channel_id = ${viewer?.channelId ?? ""})`;

async function watchLaterId(viewer: NonNullable<Viewer>): Promise<string> {
	const [row] = await sql`select id from playlists where user_id = ${viewer.userId} and kind = 'watch_later'`;
	if (row) return row.id;
	const id = `WL${randomId(32)}`;
	await sql`insert into playlists (id, user_id, title, kind, visibility) values (${id}, ${viewer.userId}, 'Watch later', 'watch_later', 'private') on conflict do nothing`;
	const [again] = await sql`select id from playlists where user_id = ${viewer.userId} and kind = 'watch_later'`;
	return again.id;
}

// resolves the client's ids: WL and LL are the viewer's own lists
async function getPlaylist(id: string, viewer: Viewer): Promise<Playlist | undefined> {
	if (id === "LL") {
		if (!viewer) return undefined;
		const [r] = await sql`select count(*)::int as n, (select video_id from video_reactions where user_id = ${viewer.userId} and kind = 'like' order by created_at desc limit 1) as first from video_reactions where user_id = ${viewer.userId} and kind = 'like'`;
		return { id: "LL", user_id: viewer.userId, title: "Liked videos", description: "", visibility: "private", kind: "liked", updated_at: new Date(), video_count: r.n, first_video: r.first, owner_channel: viewer.channelId, owner_title: viewer.title, owner_handle: viewer.handle };
	}
	const real = id === "WL" ? (viewer ? await watchLaterId(viewer) : undefined) : id;
	if (!real) return undefined;
	const [p] = await sql`select p.*, c.id as owner_channel, c.title as owner_title, c.handle as owner_handle,
		(select count(*)::int from playlist_items i join videos v on v.id = i.video_id where i.playlist_id = p.id and ${PLAYABLE(viewer)}) as video_count,
		(select i.video_id from playlist_items i join videos v on v.id = i.video_id where i.playlist_id = p.id and ${PLAYABLE(viewer)} order by i.position limit 1) as first_video
		from playlists p join channels c on c.user_id = p.user_id where p.id = ${real}`;
	if (!p) return undefined;
	if (p.visibility === "private" && p.user_id !== viewer?.userId) return undefined;
	return { ...p, id: p.kind === "watch_later" ? "WL" : p.id, user_id: String(p.user_id) } as Playlist;
}

async function playlistVideos(p: Playlist, viewer: Viewer, limit: number, offset: number): Promise<(Video & { set_id: string })[]> {
	if (p.kind === "liked")
		return (await sql`select ${VIDEO_COLUMNS}, r.video_id as set_id from video_reactions r join videos v on v.id = r.video_id join channels c on c.id = v.channel_id
			where r.user_id = ${viewer!.userId} and r.kind = 'like' and ${PLAYABLE(viewer)} order by r.created_at desc limit ${limit} offset ${offset}`) as (Video & { set_id: string })[];
	const real = p.kind === "watch_later" ? await watchLaterId(viewer!) : p.id;
	return (await sql`select ${VIDEO_COLUMNS}, i.id as set_id from playlist_items i join videos v on v.id = i.video_id join channels c on c.id = v.channel_id
		where i.playlist_id = ${real} and ${PLAYABLE(viewer)} order by i.position limit ${limit} offset ${offset}`) as (Video & { set_id: string })[];
}

const thumb = (videoId: string | null) => (videoId ? `${PUBLIC_ORIGIN}/vi/${videoId}/hqdefault.jpg` : `${PUBLIC_ORIGIN}/_up/www.gstatic.com/youtube/img/icons/web/youtube_fill/offline_no_content/v1/192px.svg`);

// a playlist as a card (lockupViewModel with a collection thumbnail)
export function playlistLockup(p: Playlist) {
	const ep = p.first_video ? watchEndpoint(p.first_video, { playlistId: p.id }) : playlistEndpoint(p.id);
	return {
		lockupViewModel: {
			contentImage: {
				collectionThumbnailViewModel: {
					primaryThumbnail: {
						thumbnailViewModel: {
							image: { sources: [{ url: thumb(p.first_video), width: 480, height: 360 }] },
							overlays: [{ thumbnailOverlayBadgeViewModel: { thumbnailBadges: [{ thumbnailBadgeViewModel: { icon: { sources: [{ clientResource: { imageName: "PLAYLISTS" } }] }, text: plural(p.video_count, "video"), badgeStyle: "THUMBNAIL_OVERLAY_BADGE_STYLE_DEFAULT" } }], position: "THUMBNAIL_OVERLAY_BADGE_POSITION_BOTTOM_END" } }],
						},
					},
					stackColor: { lightTheme: 2829099, darkTheme: 13158600 },
				},
			},
			metadata: {
				lockupMetadataViewModel: {
					title: content(p.title),
					metadata: {
						contentMetadataViewModel: {
							metadataRows: [
								{ metadataParts: [{ text: content(p.visibility === "private" ? "Private" : p.visibility === "unlisted" ? "Unlisted" : p.owner_title) }, { text: content("Playlist") }] },
								{ metadataParts: [{ text: { content: "View full playlist", commandRuns: [{ startIndex: 0, length: 18, onTap: { innertubeCommand: playlistEndpoint(p.id) } }] } }] },
							],
						},
					},
				},
			},
			contentId: p.id,
			contentType: "LOCKUP_CONTENT_TYPE_PLAYLIST",
			rendererContext: { commandContext: { onTap: { innertubeCommand: ep } } },
		},
	};
}

export async function userPlaylists(viewer: Viewer, ownerUserId?: string, includePrivate = false): Promise<Playlist[]> {
	const uid = ownerUserId ?? viewer?.userId;
	if (!uid) return [];
	const rows = await sql`select p.*, c.id as owner_channel, c.title as owner_title, c.handle as owner_handle,
		(select count(*)::int from playlist_items i join videos v on v.id = i.video_id where i.playlist_id = p.id and ${PLAYABLE(viewer)}) as video_count,
		(select i.video_id from playlist_items i join videos v on v.id = i.video_id where i.playlist_id = p.id and ${PLAYABLE(viewer)} order by i.position limit 1) as first_video
		from playlists p join channels c on c.user_id = p.user_id
		where p.user_id = ${uid} and p.kind = 'user' and (${includePrivate} or p.visibility = 'public') order by p.updated_at desc`;
	return rows.map((p: Playlist) => ({ ...p, user_id: String(p.user_id) }));
}

export async function playlistLockupsFor(viewer: Viewer) {
	return (await userPlaylists(viewer, undefined, true)).map(playlistLockup);
}

export async function watchLaterAndLiked(viewer: Viewer) {
	const out = [];
	for (const id of ["WL", "LL"]) {
		const p = await getPlaylist(id, viewer);
		if (!p) continue;
		const vids = await playlistVideos(p, viewer, 12, 0);
		const { videoLockup } = await import("./items");
		out.push({ title: p.title, endpoint: playlistEndpoint(id), items: vids.map((v) => videoLockup(v, viewer)) });
	}
	return out;
}

// a channel's Playlists tab (template item/playlist_lockup); empty lists are not shown
export async function channelPlaylistLockups(c: Channel, viewer: Viewer) {
	const lists = (await userPlaylists(viewer, c.user_id, viewer?.channelId === c.id)).filter((p) => p.first_video);
	return lists.map((p) =>
		make("item/playlist_lockup", {
			...baseVars(viewer, `/@${c.handle}/playlists`),
			PLAYLIST_ID: p.id,
			TITLE: p.title,
			VIDEO_COUNT: plural(p.video_count, "video"),
			FIRST_VIDEO_ID: p.first_video,
			THUMBS: [{ url: thumb(p.first_video), width: 480, height: 270 }],
			CHANNEL_ID: c.id,
			AT_HANDLE: `@${c.handle}`,
		}),
	);
}

// public playlists whose title matches a search; empty ones are left out
export async function searchPlaylists(query: string, limit: number, offset: number, viewer: Viewer): Promise<Playlist[]> {
	const like = `%${query.trim().replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
	const rows = await sql`select * from (select p.*, c.id as owner_channel, c.title as owner_title, c.handle as owner_handle,
		(select count(*)::int from playlist_items i join videos v on v.id = i.video_id where i.playlist_id = p.id and ${PLAYABLE(viewer)}) as video_count,
		(select i.video_id from playlist_items i join videos v on v.id = i.video_id where i.playlist_id = p.id and ${PLAYABLE(viewer)} order by i.position limit 1) as first_video
		from playlists p join channels c on c.user_id = p.user_id
		where p.kind = 'user' and p.visibility = 'public' and p.title ilike ${like}) x
		where x.first_video is not null order by x.updated_at desc, x.id limit ${limit} offset ${offset}`;
	return rows.map((p: Playlist) => ({ ...p, user_id: String(p.user_id) }));
}

// a playlist search result (template item/playlist_search): the first two
// videos are listed under the title, each from the template's sample row
export async function playlistSearchItem(p: Playlist, viewer: Viewer) {
	const t = tpl("item/playlist_search");
	const rows = t.lockupViewModel.metadata.lockupMetadataViewModel.metadata.contentMetadataViewModel.metadataRows;
	const at = rows.findIndex((r: any) => JSON.stringify(r).includes("{{ROW_TEXT}}"));
	const videos = await playlistVideos(p, viewer, 2, 0);
	const listed = videos.map((v) => {
		const text = `${v.title} · ${duration(v.duration_ms)}`;
		return fill(structuredClone(rows[at]), { ROW_TEXT: text, ROW_TEXT_LENGTH: text.length, ROW_VIDEO_ID: v.id }, "item/playlist_search");
	});
	rows.splice(at, 1, ...listed);
	if (!p.description) rows.splice(rows.findIndex((r: any) => r.lockupContentMetadataRowExtension?.contentType === "METADATA_ROW_CONTENT_TYPE_DESCRIPTION"), 1);
	return fill(t, {
		...baseVars(viewer),
		PLAYLIST_ID: p.id,
		TITLE: p.title,
		VIDEO_COUNT: plural(p.video_count, "video"),
		FIRST_VIDEO_ID: p.first_video,
		THUMBS: [{ url: thumb(p.first_video), width: 480, height: 270 }],
		CHANNEL_ID: p.owner_channel,
		CHANNEL_NAME: p.owner_title,
		CHANNEL_NAME_LENGTH: p.owner_title.length,
		CHANNEL_URL: `/@${p.owner_handle}`,
		DESCRIPTION_SHORT: p.description.length > 160 ? `${p.description.slice(0, 157)}...` : p.description,
	}, "item/playlist_search");
}

export async function channelPlaylistsGrid(c: Channel, viewer: Viewer) {
	const lists = await userPlaylists(viewer, c.user_id, viewer?.channelId === c.id);
	if (!lists.length) return { sectionListRenderer: { contents: [{ itemSectionRenderer: { contents: [{ messageRenderer: { text: runs("This channel doesn't have any playlists.") } }] } }] } };
	return { richGridRenderer: { contents: lists.map((p) => ({ richItemRenderer: { content: playlistLockup(p) } })), targetId: `channel-playlists-${c.id}`, style: "RICH_GRID_RENDERER_STYLE_TAB" } };
}

// one row of the playlist page: a lockup in list layout
function playlistRow(p: Playlist, v: Video & { set_id: string }, index: number, viewer: Viewer) {
	const own = viewer && p.user_id === viewer.userId;
	const remove = own && p.kind !== "liked"
		? [{
				listItemViewModel: {
					title: content(`Remove from ${p.title}`),
					leadingImage: { sources: [{ clientResource: { imageName: "DELETE" } }] },
					rendererContext: { commandContext: { onTap: { innertubeCommand: serviceEndpoint("/youtubei/v1/browse/edit_playlist", { playlistEditEndpoint: { playlistId: p.id, actions: [{ setVideoId: v.set_id, action: "ACTION_REMOVE_VIDEO" }] } }) } } },
				},
			}]
		: [];
	return {
		lockupViewModel: {
			contentImage: {
				thumbnailViewModel: {
					image: { sources: [{ url: `${PUBLIC_ORIGIN}/vi/${v.id}/mqdefault.jpg`, width: 320, height: 180 }] },
					overlays: [{ thumbnailBottomOverlayViewModel: { badges: [{ thumbnailBadgeViewModel: { text: duration(v.duration_ms), badgeStyle: "THUMBNAIL_OVERLAY_BADGE_STYLE_DEFAULT", rendererContext: { accessibilityContext: { label: durationLabel(v.duration_ms) } } } }] } }],
				},
			},
			metadata: {
				lockupMetadataViewModel: {
					title: content(v.title),
					metadata: {
						contentMetadataViewModel: {
							metadataRows: [
								{ metadataParts: [{ text: { content: v.channel_title, commandRuns: [{ startIndex: 0, length: v.channel_title.length, onTap: { innertubeCommand: channelEndpoint({ id: v.channel_id, handle: v.channel_handle }) } }] } }] },
								{ metadataParts: [{ text: content(shortViews(v.view_count)), accessibilityLabel: viewsText(v.view_count) }, { text: content(ago(v.published_at ?? v.created_at)) }] },
							],
						},
					},
					menuButton: remove.length
						? { buttonViewModel: { iconName: "MORE_VERT", onTap: { innertubeCommand: { showSheetCommand: { panelLoadingStrategy: { inlineContent: { sheetViewModel: { content: { listViewModel: { listItems: remove } } } } } } } }, accessibilityText: "More actions", style: "BUTTON_VIEW_MODEL_STYLE_MONO", type: "BUTTON_VIEW_MODEL_TYPE_TEXT", buttonSize: "BUTTON_VIEW_MODEL_SIZE_DEFAULT" } }
						: undefined,
				},
			},
			contentId: v.id,
			contentType: "LOCKUP_CONTENT_TYPE_VIDEO",
			rendererContext: { accessibilityContext: { label: `${v.title} ${durationLabel(v.duration_ms)}` }, commandContext: { onTap: { innertubeCommand: watchEndpoint(v.id, { playlistId: p.id, index }) } } },
		},
	};
}

async function rows(p: Playlist, viewer: Viewer, offset: number) {
	const vids = await playlistVideos(p, viewer, PAGE, offset);
	const items: unknown[] = vids.map((v, i) => playlistRow(p, v, offset + i, viewer));
	if (vids.length === PAGE) items.push(continuationItem(encodeToken({ k: "playlist", p: p.id, o: offset + PAGE }), "/youtubei/v1/browse"));
	return items;
}

export async function playlistItemsContinuation(id: string, offset: number, viewer: Viewer) {
	const p = await getPlaylist(id, viewer);
	if (!p) throw new ApiError(404, "Not found");
	return { responseContext: responseContext(viewer), onResponseReceivedActions: [{ appendContinuationItemsAction: { continuationItems: await rows(p, viewer, offset), targetId: `playlist-${p.id}` } }] };
}

function headerActions(p: Playlist, viewer: Viewer) {
	const actions: unknown[] = [];
	if (p.first_video)
		actions.push({ buttonViewModel: { iconName: "PLAY_ARROW", title: "Play all", onTap: { innertubeCommand: watchEndpoint(p.first_video, { playlistId: p.id }) }, accessibilityText: "Play all", style: "BUTTON_VIEW_MODEL_STYLE_OVERLAY", type: "BUTTON_VIEW_MODEL_TYPE_FILLED", buttonSize: "BUTTON_VIEW_MODEL_SIZE_DEFAULT" } });
	if (viewer && p.user_id === viewer.userId && p.kind === "user")
		actions.push({
			buttonViewModel: {
				iconName: "DELETE",
				onTap: {
					innertubeCommand: {
						commandMetadata: { webCommandMetadata: { sendPost: true } },
						signalServiceEndpoint: {
							signal: "CLIENT_SIGNAL",
							actions: [{ openPopupAction: { popup: { confirmDialogRenderer: { title: text("Delete playlist"), dialogMessages: [runs(`Are you sure you want to delete ${p.title}?`)], confirmButton: { buttonRenderer: { style: "STYLE_BLUE_TEXT", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Delete"), serviceEndpoint: serviceEndpoint("/youtubei/v1/playlist/delete", { deletePlaylistEndpoint: { sourcePlaylistId: p.id } }) } }, cancelButton: { buttonRenderer: { style: "STYLE_TEXT", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Cancel") } } } }, popupType: "DIALOG" } }],
						},
					},
				},
				accessibilityText: "Delete playlist",
				style: "BUTTON_VIEW_MODEL_STYLE_OVERLAY",
				type: "BUTTON_VIEW_MODEL_TYPE_TONAL",
				buttonSize: "BUTTON_VIEW_MODEL_SIZE_DEFAULT",
				tooltip: "Delete playlist",
			},
		});
	return actions;
}

export async function playlistBrowse(id: string, viewer: Viewer): Promise<BrowseResult | undefined> {
	const p = await getPlaylist(id, viewer);
	if (!p) return undefined;
	const items = await rows(p, viewer, 0);
	const visibility = p.visibility === "private" ? "Private" : p.visibility === "unlisted" ? "Unlisted" : "Public";
	return {
		kind: "playlist",
		title: p.title,
		url: `/playlist?list=${p.id}`,
		command: playlistEndpoint(p.id),
		response: {
			contents: {
				twoColumnBrowseResultsRenderer: {
					tabs: [
						{
							tabRenderer: {
								selected: true,
								content: {
									sectionListRenderer: {
										contents: [{ itemSectionRenderer: { contents: items.length ? items : [{ messageRenderer: { text: runs("No videos in this playlist yet") } }], targetId: `playlist-${p.id}` } }],
										targetId: `playlist-${p.id}`,
									},
								},
							},
						},
					],
				},
			},
			header: {
				pageHeaderRenderer: {
					pageTitle: p.title,
					content: {
						pageHeaderViewModel: {
							title: { dynamicTextViewModel: { text: content(p.title) } },
							metadata: {
								contentMetadataViewModel: {
									metadataRows: [
										{ metadataParts: [{ avatarStack: { avatarStackViewModel: { avatars: [{ avatarViewModel: { image: { sources: [{ url: avatarUrl(p.owner_channel, 48), width: 48, height: 48 }] }, avatarImageSize: "AVATAR_SIZE_XS" } }], text: { content: `by ${p.owner_title}`, commandRuns: [{ startIndex: 0, length: 3 + p.owner_title.length, onTap: { innertubeCommand: channelEndpoint({ id: p.owner_channel, handle: p.owner_handle }) } }] } } } }] },
										{ metadataParts: [{ text: content(p.kind === "user" ? `${visibility} playlist` : "Private") }, { text: content(plural(p.video_count, "video")) }, ...(p.kind === "user" ? [{ text: content(`Updated ${ago(p.updated_at)}`) }] : [])] },
									],
									delimiter: "•",
								},
							},
							actions: { flexibleActionsViewModel: { actionsRows: [{ actions: headerActions(p, viewer) }] } },
							...(p.description ? { description: { descriptionPreviewViewModel: { description: content(p.description), maxLines: 3 } } } : {}),
							heroImage: { contentPreviewImageViewModel: { image: { sources: [{ url: thumb(p.first_video), width: 480, height: 360 }] }, style: "CONTENT_PREVIEW_IMAGE_STYLE_DEFAULT" } },
						},
					},
				},
			},
			metadata: { playlistMetadataRenderer: { title: p.title, description: p.description } },
		},
	};
}

// the playlist column on a watch page with &list=
export async function playlistPanel(id: string, videoId: string, viewer: Viewer, index?: number): Promise<unknown> {
	const p = await getPlaylist(id, viewer);
	if (!p) return undefined;
	const vids = await playlistVideos(p, viewer, 200, 0);
	const current = index !== undefined && vids[index]?.id === videoId ? index : vids.findIndex((v) => v.id === videoId);
	return {
		playlist: {
			title: p.title,
			contents: vids.map((v, i) => ({
				playlistPanelVideoRenderer: {
					title: { accessibility: label(v.title), simpleText: v.title },
					longBylineText: runs({ text: v.channel_title, navigationEndpoint: channelEndpoint({ id: v.channel_id, handle: v.channel_handle }) }),
					shortBylineText: runs({ text: v.channel_title, navigationEndpoint: channelEndpoint({ id: v.channel_id, handle: v.channel_handle }) }),
					thumbnail: { thumbnails: [{ url: `${PUBLIC_ORIGIN}/vi/${v.id}/default.jpg`, width: 120, height: 90 }, { url: `${PUBLIC_ORIGIN}/vi/${v.id}/mqdefault.jpg`, width: 320, height: 180 }] },
					lengthText: { accessibility: label(durationLabel(v.duration_ms)), simpleText: duration(v.duration_ms) },
					indexText: text(i === current ? "▶" : String(i + 1)),
					selected: i === current,
					navigationEndpoint: watchEndpoint(v.id, { playlistId: p.id, index: i }),
					videoId: v.id,
					playlistSetVideoId: v.set_id,
				},
			})),
			currentIndex: Math.max(0, current),
			playlistId: p.id,
			ownerName: text(p.owner_title),
			isInfinite: false,
			playlistShareUrl: `${PUBLIC_ORIGIN}/playlist?list=${p.id}`,
			shortBylineText: runs({ text: p.owner_title, navigationEndpoint: channelEndpoint({ id: p.owner_channel, handle: p.owner_handle }) }),
			isEditable: !!viewer && p.user_id === viewer.userId && p.kind === "user",
			totalVideos: vids.length,
			titleText: runs({ text: p.title, navigationEndpoint: playlistEndpoint(p.id) }),
			endpoint: playlistEndpoint(p.id),
			localCurrentIndex: Math.max(0, current),
		},
	};
}

// ---- mutations ----

async function touch(realId: string) {
	await sql`update playlists set updated_at = now() where id = ${realId}`;
}

async function ownedReal(id: string, viewer: NonNullable<Viewer>): Promise<string> {
	if (id === "WL") return watchLaterId(viewer);
	const [p] = await sql`select id from playlists where id = ${id} and user_id = ${viewer.userId} and kind = 'user'`;
	if (!p) throw new ApiError(403, "You can't edit this playlist.", "forbidden");
	return p.id;
}

async function addVideo(realId: string, videoId: string, viewer: NonNullable<Viewer>) {
	if (!isVideoId(videoId)) throw new ApiError(400, "Invalid video id");
	const [v] = await sql`select 1 from videos where id = ${videoId} and deleted_at is null and (visibility <> 'private' or channel_id = ${viewer.channelId})`;
	if (!v) throw new ApiError(404, "Video not found");
	const [{ n }] = await sql`select count(*)::int as n from playlist_items where playlist_id = ${realId}`;
	if (n >= 5000) throw new ApiError(400, "Playlists hold at most 5000 videos.");
	await sql`insert into playlist_items (id, playlist_id, video_id, position) values (${randomId(16)}, ${realId}, ${videoId}, coalesce((select max(position) from playlist_items where playlist_id = ${realId}), 0) + 1)`;
}

route(
	"playlist/create",
	async ({ body, viewer }) => {
		const title = String(body.title ?? "").trim().slice(0, 150);
		if (!title) throw new ApiError(400, "A playlist needs a title.");
		const privacy = String(body.privacyStatus ?? "PRIVATE").toUpperCase();
		const visibility = privacy === "PUBLIC" ? "public" : privacy === "UNLISTED" ? "unlisted" : "private";
		const id = newPlaylistId();
		const [{ n }] = await sql`select count(*)::int as n from playlists where user_id = ${viewer!.userId}`;
		if (n >= 500) throw new ApiError(400, "You can have at most 500 playlists.");
		await sql`insert into playlists (id, user_id, title, visibility) values (${id}, ${viewer!.userId}, ${title}, ${visibility})`;
		for (const vid of (Array.isArray(body.videoIds) ? body.videoIds : []).slice(0, 50)) await addVideo(id, String(vid), viewer!);
		return {
			responseContext: responseContext(viewer),
			playlistId: id,
			actions: [{ addToToastAction: { item: { notificationActionRenderer: { responseText: runs(`Saved to ${title}`), actionButton: { buttonRenderer: { style: "STYLE_BLUE_TEXT", text: runs("View"), navigationEndpoint: playlistEndpoint(id) } } } } } }],
		};
	},
	{ mutation: true },
);

route(
	"browse/edit_playlist",
	async ({ body, viewer }) => {
		const id = String(body.playlistId ?? "");
		const real = await ownedReal(id, viewer!);
		const toasts: string[] = [];
		for (const a of (Array.isArray(body.actions) ? body.actions : []).slice(0, 100)) {
			switch (a.action) {
				case "ACTION_ADD_VIDEO":
					await addVideo(real, String(a.addedVideoId), viewer!);
					toasts.push(id === "WL" ? "Saved to Watch later" : "Saved to playlist");
					break;
				case "ACTION_REMOVE_VIDEO":
					await sql`delete from playlist_items where playlist_id = ${real} and id = ${String(a.setVideoId)}`;
					toasts.push("Removed from playlist");
					break;
				case "ACTION_REMOVE_VIDEO_BY_VIDEO_ID":
					await sql`delete from playlist_items where playlist_id = ${real} and video_id = ${String(a.removedVideoId)}`;
					toasts.push(id === "WL" ? "Removed from Watch later" : "Removed from playlist");
					break;
				case "ACTION_SET_PLAYLIST_NAME": {
					const t = String(a.playlistName ?? "").trim().slice(0, 150);
					if (t) await sql`update playlists set title = ${t} where id = ${real} and kind = 'user'`;
					break;
				}
				case "ACTION_SET_PLAYLIST_DESCRIPTION":
					await sql`update playlists set description = ${String(a.playlistDescription ?? "").slice(0, 5000)} where id = ${real} and kind = 'user'`;
					break;
				case "ACTION_SET_PLAYLIST_PRIVACY": {
					const pv = String(a.playlistPrivacy ?? "").toUpperCase();
					const vis = pv === "PUBLIC" ? "public" : pv === "UNLISTED" ? "unlisted" : "private";
					await sql`update playlists set visibility = ${vis} where id = ${real} and kind = 'user'`;
					break;
				}
				case "ACTION_MOVE_VIDEO_AFTER": {
					const [moving] = await sql`select id from playlist_items where playlist_id = ${real} and id = ${String(a.setVideoId)}`;
					if (!moving) break;
					const [after] = a.movedSetVideoIdPredecessor ? await sql`select position from playlist_items where playlist_id = ${real} and id = ${String(a.movedSetVideoIdPredecessor)}` : [{ position: 0 }];
					const [next] = await sql`select min(position) as p from playlist_items where playlist_id = ${real} and position > ${after?.position ?? 0} and id <> ${moving.id}`;
					await sql`update playlist_items set position = ${next?.p != null ? (Number(after?.position ?? 0) + Number(next.p)) / 2 : Number(after?.position ?? 0) + 1} where id = ${moving.id}`;
					break;
				}
				default:
					throw new ApiError(400, `Unsupported playlist action ${String(a.action).slice(0, 40)}`);
			}
		}
		await touch(real);
		return {
			responseContext: responseContext(viewer),
			status: "STATUS_SUCCEEDED",
			playlistEditResults: [],
			actions: toasts.length ? [{ addToToastAction: { item: { notificationActionRenderer: { responseText: runs(toasts[toasts.length - 1]) } } } }] : [],
		};
	},
	{ mutation: true },
);

route(
	"playlist/delete",
	async ({ body, viewer }) => {
		const id = String(body.playlistId ?? body.sourcePlaylistId ?? "");
		const r = await sql`delete from playlists where id = ${id} and user_id = ${viewer!.userId} and kind = 'user' returning id`;
		if (!r.length) throw new ApiError(404, "Playlist not found");
		return { responseContext: responseContext(viewer), actions: [{ addToToastAction: { item: { notificationActionRenderer: { responseText: runs("Playlist deleted") } } } }] };
	},
	{ mutation: true },
);

// the "Save video to..." sheet (get_panel PAadd_to_playlist): one toggle row
// per playlist, Watch later first, and "New playlist", which opens the
// client's create-playlist dialog form; its Create button builds the
// createPlaylistServiceEndpoint itself from the form's values.
const CREATE_FORM_ID = "owntube-create-playlist";

function checkRow(title: string, subtitle: string, checked: boolean, command: unknown) {
	return {
		listItemViewModel: {
			title: content(title),
			subtitle: content(subtitle),
			leadingImage: { sources: [{ clientResource: { imageName: checked ? "CHECK_BOX" : "CHECK_BOX_OUTLINE_BLANK" } }] },
			rendererContext: { commandContext: { onTap: { innertubeCommand: command } } },
		},
	};
}

function createPlaylistDialog(videoId: string) {
	const option = (title: string, value: string, icon: string, selected: boolean) => ({ title: content(title), leadingImage: { sources: [{ clientResource: { imageName: icon } }] }, value: { privacyStatusValue: value }, isSelected: selected });
	return {
		showDialogCommand: {
			panelLoadingStrategy: {
				inlineContent: {
					dialogViewModel: {
						header: { dialogHeaderViewModel: { headline: content("New playlist") } },
						content: {
							createPlaylistDialogFormViewModel: {
								createPlaylistDialogFormSchema: { id: CREATE_FORM_ID, initialValues: { title: "", visibility: "PRIVATE", isCollaborative: false } },
								playlistTitle: { textFieldViewModel: { contentProperties: { labelText: "Title", placeholderText: "Choose a title", maxCharacterCount: 150 }, displayProperties: { disableNewLines: true } } },
								playlistVisibility: {
									dropdownViewModel: {
										label: "Visibility",
										type: "SELECTION_TYPE_PRIVACY_STATUS",
										options: [option("Public", "PUBLIC", "PRIVACY_PUBLIC", false), option("Unlisted", "UNLISTED", "PRIVACY_UNLISTED", false), option("Private", "PRIVATE", "PRIVACY_PRIVATE", true)],
									},
								},
								videoIds: [videoId],
								createPlaylistParamsCollaborationDisabled: "CAQ%3D",
								createPlaylistParamsCollaborationEnabled: "CAQ%3D",
							},
						},
						footer: {
							formFooterViewModel: {
								formId: CREATE_FORM_ID,
								panelFooter: {
									panelFooterViewModel: {
										primaryButton: { buttonViewModel: { title: "Create", style: "BUTTON_VIEW_MODEL_STYLE_CALL_TO_ACTION", type: "BUTTON_VIEW_MODEL_TYPE_TEXT", buttonSize: "BUTTON_VIEW_MODEL_SIZE_DEFAULT" } },
										secondaryButton: { buttonViewModel: { title: "Cancel", onTap: { innertubeCommand: { dismissDialogEndpoint: {} } }, style: "BUTTON_VIEW_MODEL_STYLE_MONO", type: "BUTTON_VIEW_MODEL_TYPE_TEXT", buttonSize: "BUTTON_VIEW_MODEL_SIZE_DEFAULT" } },
										shouldHideDivider: true,
									},
								},
							},
						},
					},
				},
			},
		},
	};
}

export async function addToPlaylistSheet(videoId: string, viewer: Viewer) {
	if (!viewer || !isVideoId(videoId)) return { responseContext: responseContext(viewer) };
	const wl = await watchLaterId(viewer);
	const lists = await sql`select p.id, p.title, p.kind, p.visibility, exists(select 1 from playlist_items i where i.playlist_id = p.id and i.video_id = ${videoId}) as has
		from playlists p where p.user_id = ${viewer.userId} order by p.kind = 'watch_later' desc, p.updated_at desc`;
	const rows = lists.map((p: { id: string; title: string; visibility: string; has: boolean }) => {
		const pid = p.id === wl ? "WL" : p.id;
		const vis = p.visibility === "private" ? "Private" : p.visibility === "unlisted" ? "Unlisted" : "Public";
		const add = serviceEndpoint("/youtubei/v1/browse/edit_playlist", { playlistEditEndpoint: { playlistId: pid, actions: [{ addedVideoId: videoId, action: "ACTION_ADD_VIDEO" }] } });
		const remove = serviceEndpoint("/youtubei/v1/browse/edit_playlist", { playlistEditEndpoint: { playlistId: pid, actions: [{ action: "ACTION_REMOVE_VIDEO_BY_VIDEO_ID", removedVideoId: videoId }] } });
		return {
			toggleableListItemViewModel: {
				defaultListItem: checkRow(p.title, vis, false, add),
				toggledListItem: checkRow(p.title, vis, true, remove),
				initialState: { isToggled: p.has },
			},
		};
	});
	rows.push({
		listItemViewModel: {
			title: content("New playlist"),
			leadingImage: { sources: [{ clientResource: { imageName: "ADD" } }] },
			rendererContext: { commandContext: { onTap: { innertubeCommand: createPlaylistDialog(videoId) } } },
		},
	} as never);
	return {
		responseContext: responseContext(viewer),
		content: { sheetViewModel: { header: { panelHeaderViewModel: { title: content("Save video to...") } }, content: { listViewModel: { listItems: rows } } } },
	};
}

route("get_panel", async ({ body, viewer }) => {
	if (body.panelId === "PAadd_to_playlist") {
		let id = "";
		try {
			id = Buffer.from(String(body.params ?? ""), "base64url").toString();
		} catch {}
		return addToPlaylistSheet(id, viewer);
	}
	return { responseContext: responseContext(viewer) };
});

export { getPlaylist, signInModal, browseEndpoint, label };
