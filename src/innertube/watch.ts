// /youtubei/v1/next for a video (and the watch page's ytInitialData):
// title and actions, owner and subscribe button, description panel, the
// comments section stub (filled by a continuation, see comments.ts) and
// related videos.

import type { Viewer } from "../client/page";
import { getVideo, isSubscribed, reactionOf, relatedVideos } from "../data";
import { encodeToken } from "../ids";
import { topbar } from "./chrome";
import { continuationItem, subscribeButton, videoLockup } from "./items";
import {
	type Video,
	ago,
	avatarThumbnails,
	channelEndpoint,
	compact,
	content,
	dateText,
	grouped,
	label,
	responseContext,
	runs,
	serviceEndpoint,
	signInModal,
	subscribersText,
	text,
	viewsText,
	watchEndpoint,
} from "./r";

export const RELATED_PAGE = 20;

const entityKey = (kind: string, id: string) => Buffer.from(`${kind}:${id}`).toString("base64url");

function toggleButton(opts: { icon: string; title: string; toggledTitle: string; tooltip: string; toggledTooltip: string; onTap: unknown; onToggledTap: unknown; a11y: string; identifier: string; isToggled: boolean; disabled: boolean; accessibilityId: string }) {
	const bvm = (title: string, tooltip: string, onTap: unknown) => ({
		buttonViewModel: {
			iconName: opts.icon,
			title,
			onTap,
			accessibilityText: opts.a11y,
			style: "BUTTON_VIEW_MODEL_STYLE_MONO",
			isFullWidth: false,
			type: "BUTTON_VIEW_MODEL_TYPE_TONAL",
			buttonSize: "BUTTON_VIEW_MODEL_SIZE_DEFAULT",
			accessibilityId: opts.accessibilityId,
			tooltip,
		},
	});
	return {
		toggleButtonViewModel: {
			toggleButtonViewModel: {
				defaultButtonViewModel: bvm(opts.title, opts.tooltip, opts.onTap),
				toggledButtonViewModel: bvm(opts.toggledTitle, opts.toggledTooltip, opts.onToggledTap),
				identifier: opts.identifier,
				isToggled: opts.isToggled,
				isTogglingDisabled: opts.disabled,
			},
		},
	};
}

const command = (c: unknown) => ({ serialCommand: { commands: [{ innertubeCommand: c }] } });

export function likeButtons(v: Video, viewer: Viewer, reaction: "like" | "dislike" | null) {
	const liked = reaction === "like";
	const disliked = reaction === "dislike";
	const others = v.like_count - (liked ? 1 : 0);
	const like = (status: string, api: string) => serviceEndpoint(`/youtubei/v1/like/${api}`, { likeEndpoint: { status, target: { videoId: v.id } } });
	const key = entityKey("like", v.id);
	return {
		segmentedLikeDislikeButtonViewModel: {
			likeButtonViewModel: {
				likeButtonViewModel: {
					toggleButtonViewModel: toggleButton({
						icon: "LIKE",
						title: others ? compact(others) : "",
						toggledTitle: compact(others + 1),
						tooltip: "I like this",
						toggledTooltip: "Unlike",
						a11y: `like this video along with ${grouped(others)} other ${others === 1 ? "person" : "people"}`,
						identifier: "watch-like",
						accessibilityId: "id.video.like.button",
						isToggled: liked,
						disabled: !viewer,
						onTap: viewer ? command(like("LIKE", "like")) : command(signInModal("Like this video?", "Sign in to make your opinion count.", `/watch?v=${v.id}`)),
						onToggledTap: command(like("INDIFFERENT", "removelike")),
					}).toggleButtonViewModel,
					likeStatusEntityKey: key,
					likeStatusEntity: { key, likeStatus: liked ? "LIKE" : disliked ? "DISLIKE" : "INDIFFERENT" },
				},
			},
			dislikeButtonViewModel: {
				dislikeButtonViewModel: {
					toggleButtonViewModel: toggleButton({
						icon: "DISLIKE",
						title: "",
						toggledTitle: "",
						tooltip: "I dislike this",
						toggledTooltip: "I dislike this",
						a11y: "Dislike this video",
						identifier: "watch-dislike",
						accessibilityId: "id.video.dislike.button",
						isToggled: disliked,
						disabled: !viewer,
						onTap: viewer ? command(like("DISLIKE", "dislike")) : command(signInModal("Don't like this video?", "Sign in to make your opinion count.", `/watch?v=${v.id}`)),
						onToggledTap: command(like("INDIFFERENT", "removelike")),
					}).toggleButtonViewModel,
					dislikeEntityKey: key,
				},
			},
			iconType: "LIKE_ICON_TYPE_UNKNOWN",
			likeCountEntity: { key: entityKey("likecount", v.id), likeCountIfLiked: content(compact(others + 1)), likeCountIfDisliked: content(compact(others)), likeCountIfIndifferent: content(compact(others)), expandedLikeCountIfLiked: content(grouped(others + 1)), expandedLikeCountIfDisliked: content(grouped(others)), expandedLikeCountIfIndifferent: content(grouped(others)), likeCountLabel: content("likes"), likeButtonA11yText: content(`like this video along with ${grouped(others)} other people`), likeCountIfLikedNumber: String(others + 1), likeCountIfDislikedNumber: String(others), likeCountIfIndifferentNumber: String(others), shouldExpandLikeCount: false, sentimentFactoidA11yTextIfLiked: content(`${grouped(others + 1)} likes`), sentimentFactoidA11yTextIfDisliked: content(`${grouped(others)} likes`) },
			dynamicLikeCountUpdateData: { updateStatusKey: "like_count_update_status_key", placeholderLikeCountValuesKey: "like_count_placeholder_values_key", updateDelayLoopId: "like_count_update_delay_loop_id", updateDelaySec: 5 },
			teasersOrderEntityKey: entityKey("teasers", v.id),
		},
	};
}

function shareButton(v: Video) {
	return {
		buttonViewModel: {
			iconName: "SHARE",
			title: "Share",
			onTap: {
				serialCommand: {
					commands: [
						{
							innertubeCommand: serviceEndpoint("/youtubei/v1/share/get_share_panel", {
								shareEntityServiceEndpoint: { serializedShareEntity: Buffer.from(v.id).toString("base64url"), commands: [{ openPopupAction: { popup: { unifiedSharePanelRenderer: { showLoadingSpinner: true } }, popupType: "DIALOG", beReused: true } }] },
							}),
						},
					],
				},
			},
			accessibilityText: "Share",
			style: "BUTTON_VIEW_MODEL_STYLE_MONO",
			isFullWidth: false,
			type: "BUTTON_VIEW_MODEL_TYPE_TONAL",
			buttonSize: "BUTTON_VIEW_MODEL_SIZE_DEFAULT",
			state: "BUTTON_VIEW_MODEL_STATE_ACTIVE",
			accessibilityId: "id.video.share.button",
			tooltip: "Share",
		},
	};
}

function saveButton(v: Video, viewer: Viewer) {
	return {
		menuFlexibleItemRenderer: {
			menuItem: {
				menuServiceItemRenderer: {
					text: runs("Save"),
					icon: { iconType: "PLAYLIST_ADD" },
					serviceEndpoint: viewer ? { showSheetCommand: { panelLoadingStrategy: { requestTemplate: { panelId: "PAadd_to_playlist", params: Buffer.from(v.id).toString("base64url") } } } } : signInModal("Want to watch this again later?", "Sign in to add this video to a playlist.", `/watch?v=${v.id}`),
				},
			},
			topLevelButton: {
				buttonViewModel: {
					iconName: "PLAYLIST_ADD",
					title: "Save",
					onTap: { innertubeCommand: viewer ? { showSheetCommand: { panelLoadingStrategy: { requestTemplate: { panelId: "PAadd_to_playlist", params: Buffer.from(v.id).toString("base64url") } } } } : signInModal("Want to watch this again later?", "Sign in to add this video to a playlist.", `/watch?v=${v.id}`) },
					accessibilityText: "Save to playlist",
					style: "BUTTON_VIEW_MODEL_STYLE_MONO",
					type: "BUTTON_VIEW_MODEL_TYPE_TONAL",
					buttonSize: "BUTTON_VIEW_MODEL_SIZE_DEFAULT",
					tooltip: "Save",
				},
			},
		},
	};
}

function primaryInfo(v: Video, viewer: Viewer, reaction: "like" | "dislike" | null) {
	const when = v.published_at ?? v.created_at;
	return {
		videoPrimaryInfoRenderer: {
			title: runs(v.title),
			viewCount: { videoViewCountRenderer: { viewCount: text(viewsText(v.view_count)), shortViewCount: text(`${compact(v.view_count)} views`), originalViewCount: String(v.view_count) } },
			videoActions: {
				menuRenderer: {
					items: [],
					topLevelButtons: [likeButtons(v, viewer, reaction), shareButton(v)],
					accessibility: label("More actions"),
					flexibleItems: [saveButton(v, viewer)],
				},
			},
			dateText: text(dateText(when)),
			relativeDateText: { accessibility: label(ago(when)), simpleText: ago(when) },
		},
	};
}

function secondaryInfo(v: Video, viewer: Viewer, subscribed: boolean) {
	const ch = { id: v.channel_id, handle: v.channel_handle, title: v.channel_title };
	const subs = v.subscriber_count ?? 0;
	return {
		videoSecondaryInfoRenderer: {
			owner: {
				videoOwnerRenderer: {
					thumbnail: avatarThumbnails(v.channel_id),
					title: runs({ text: v.channel_title, navigationEndpoint: channelEndpoint(ch) }),
					subscriptionButton: { type: "FREE" },
					navigationEndpoint: channelEndpoint(ch),
					subscriberCountText: { accessibility: label(`${grouped(subs)} subscribers`), simpleText: subscribersText(subs) },
				},
			},
			...(viewer?.channelId === v.channel_id ? {} : { subscribeButton: subscribeButton(ch, subscribed, viewer) }),
			metadataRowContainer: { metadataRowContainerRenderer: { collapsedItemCount: 0 } },
			showMoreText: text("...more"),
			showLessText: text("Show less"),
			attributedDescription: { content: v.description },
			descriptionCollapsedLines: 3,
			showMoreCommand: { commandExecutorCommand: { commands: [{ changeEngagementPanelVisibilityAction: { targetId: "engagement-panel-structured-description", visibility: "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED" } }] } },
			showLessCommand: { changeEngagementPanelVisibilityAction: { targetId: "engagement-panel-structured-description", visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN" } },
		},
	};
}

function descriptionPanel(v: Video) {
	const when = v.published_at ?? v.created_at;
	return {
		engagementPanelSectionListRenderer: {
			panelIdentifier: "engagement-panel-structured-description",
			header: {
				engagementPanelTitleHeaderRenderer: {
					title: runs("Description"),
					visibilityButton: { buttonRenderer: { icon: { iconType: "CLOSE" }, accessibilityData: label("Close description"), command: { changeEngagementPanelVisibilityAction: { targetId: "engagement-panel-structured-description", visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN" } } } },
				},
			},
			content: {
				structuredDescriptionContentRenderer: {
					items: [
						{
							videoDescriptionHeaderRenderer: {
								title: runs(v.title),
								channel: text(v.channel_title),
								views: text(viewsText(v.view_count)),
								publishDate: text(dateText(when)),
								factoid: [
									{ factoidRenderer: { value: text(compact(v.like_count)), label: text("Likes"), accessibilityText: `${grouped(v.like_count)} likes` } },
									{ factoidRenderer: { value: text(compact(v.view_count)), label: text("Views"), accessibilityText: viewsText(v.view_count) } },
									{ factoidRenderer: { value: text(String(new Date(when).getFullYear())), label: text(new Date(when).toLocaleDateString("en-US", { month: "short", day: "numeric" })), accessibilityText: dateText(when) } },
								],
								channelNavigationEndpoint: channelEndpoint({ id: v.channel_id, handle: v.channel_handle }),
								channelThumbnail: { thumbnails: [{ url: avatarThumbnails(v.channel_id, [88]).thumbnails[0].url }] },
							},
						},
						{ expandableVideoDescriptionBodyRenderer: { showMoreText: text("...more"), showLessText: text("Show less"), attributedDescriptionBodyText: { content: v.description } } },
					],
				},
			},
			veType: 124975,
			targetId: "engagement-panel-structured-description",
			visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN",
		},
	};
}

function commentsPanel(v: Video) {
	return {
		engagementPanelSectionListRenderer: {
			panelIdentifier: "engagement-panel-comments-section",
			header: { engagementPanelTitleHeaderRenderer: { title: runs("Comments"), contextualInfo: runs(grouped(v.comment_count)) } },
			content: { sectionListRenderer: { contents: [{ itemSectionRenderer: { contents: [continuationItem(encodeToken({ k: "comments", v: v.id, s: "top" }), "/youtubei/v1/next")], sectionIdentifier: "engagement-panel-comments-section" } }] } },
			veType: 76278,
			targetId: "engagement-panel-comments-section",
			visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN",
		},
	};
}

export async function relatedItems(v: Video, viewer: Viewer, offset: number) {
	const related = await relatedVideos(v, RELATED_PAGE, offset);
	const items: unknown[] = related.map((r) => videoLockup(r, viewer));
	if (related.length === RELATED_PAGE) items.push(continuationItem(encodeToken({ k: "related", v: v.id, o: offset + RELATED_PAGE }), "/youtubei/v1/next"));
	return items;
}

export async function watchNext(videoId: string, viewer: Viewer, opts: { playlist?: unknown } = {}) {
	const v = await getVideo(videoId, viewer);
	if (!v) return undefined;
	const [subscribed, reaction] = await Promise.all([isSubscribed(viewer, v.channel_id), reactionOf(viewer, v.id)]);
	const related = await relatedItems(v, viewer, 0);
	const response = {
		responseContext: responseContext(viewer),
		contents: {
			twoColumnWatchNextResults: {
				results: {
					results: {
						contents: [
							primaryInfo(v, viewer, reaction),
							secondaryInfo(v, viewer, subscribed),
							{
								itemSectionRenderer: {
									contents: [continuationItem(encodeToken({ k: "comments", v: v.id, s: "top" }), "/youtubei/v1/next")],
									header: { commentsHeaderRenderer: { countText: runs("Comments"), screenReaderOnly: true } },
									sectionIdentifier: "comment-item-section",
									targetId: "comments-section",
								},
							},
						],
						trackingParams: "",
					},
				},
				secondaryResults: {
					secondaryResults: {
						results: [{ itemSectionRenderer: { contents: related, sectionIdentifier: "sid-wn-chips", targetId: "watch-next-feed" } }],
						trackingParams: "",
						targetId: "watch-next-feed",
					},
				},
				...(opts.playlist ? { playlist: opts.playlist } : {}),
			},
		},
		currentVideoEndpoint: watchEndpoint(v.id),
		trackingParams: "",
		playerOverlays: {
			playerOverlayRenderer: {
				endScreen: { watchNextEndScreenRenderer: { results: [], title: text("You may also like..."), trackingParams: "" } },
				autoplay: undefined,
				shareButton: { buttonRenderer: { style: "STYLE_OPACITY", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Share"), icon: { iconType: "SHARE" }, navigationEndpoint: serviceEndpoint("/youtubei/v1/share/get_share_panel", { shareEntityServiceEndpoint: { serializedShareEntity: Buffer.from(v.id).toString("base64url"), commands: [{ openPopupAction: { popup: { unifiedSharePanelRenderer: { showLoadingSpinner: true } }, popupType: "DIALOG", beReused: true } }] } }), tooltip: "Share" } },
				addToMenu: { menuRenderer: { trackingParams: "" } },
				videoDetails: {
					playerOverlayVideoDetailsRenderer: { title: text(v.title), subtitle: runs(v.channel_title, " • ", viewsText(v.view_count)) },
				},
			},
		},
		engagementPanels: [commentsPanel(v), descriptionPanel(v)],
		topbar: topbar(viewer, `/watch?v=${v.id}`),
		frameworkUpdates: {
			entityBatchUpdate: {
				mutations: [{ entityKey: entityKey("like", v.id), type: "ENTITY_MUTATION_TYPE_REPLACE", payload: { likeStatusEntity: { key: entityKey("like", v.id), likeStatus: reaction === "like" ? "LIKE" : reaction === "dislike" ? "DISLIKE" : "INDIFFERENT" } } }],
				timestamp: { seconds: String(Math.floor(Date.now() / 1000)), nanos: 0 },
			},
		},
	};
	return { video: v, response };
}

export { entityKey };
