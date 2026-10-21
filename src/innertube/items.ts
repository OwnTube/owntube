// Item renderers shared by feeds, search, channels and the watch sidebar.

import type { Viewer } from "../client/page";
import { PUBLIC_ORIGIN } from "../config";
import {
	type Channel,
	type Video,
	ago,
	avatarThumbnails,
	avatarUrl,
	channelEndpoint,
	compact,
	content,
	duration,
	durationLabel,
	grouped,
	label,
	lockupSources,
	runs,
	serviceEndpoint,
	shortViews,
	signInEndpoint,
	subscribersText,
	text,
	videoThumbnails,
	viewsText,
	watchEndpoint,
} from "./r";

const channelRef = (v: Video) => ({ id: v.channel_id, handle: v.channel_handle });

function videoMenuSheet(v: Video, viewer: Viewer) {
	const items: unknown[] = [
		{
			listItemViewModel: {
				title: content("Add to queue"),
				leadingImage: { sources: [{ clientResource: { imageName: "ADD_TO_QUEUE_TAIL" } }] },
				rendererContext: {
					commandContext: {
						onTap: {
							innertubeCommand: {
								commandMetadata: { webCommandMetadata: { sendPost: true } },
								signalServiceEndpoint: { signal: "CLIENT_SIGNAL", actions: [{ addToPlaylistCommand: { openMiniplayer: true, videoId: v.id, listType: "PLAYLIST_EDIT_LIST_TYPE_QUEUE", videoIds: [v.id], videoCommand: watchEndpoint(v.id) } }] },
							},
						},
					},
				},
			},
		},
		{
			listItemViewModel: {
				title: content("Save to playlist"),
				leadingImage: { sources: [{ clientResource: { imageName: "BOOKMARK_BORDER" } }] },
				rendererContext: {
					commandContext: {
						onTap: {
							innertubeCommand: viewer
								? { showSheetCommand: { panelLoadingStrategy: { requestTemplate: { panelId: "PAadd_to_playlist", params: Buffer.from(v.id).toString("base64url") } } } }
								: signInEndpoint(`/watch?v=${v.id}`),
						},
					},
				},
			},
		},
		{
			listItemViewModel: {
				title: content("Share"),
				leadingImage: { sources: [{ clientResource: { imageName: "SHARE" } }] },
				rendererContext: {
					commandContext: {
						onTap: {
							innertubeCommand: serviceEndpoint("/youtubei/v1/share/get_share_panel", {
								shareEntityServiceEndpoint: { serializedShareEntity: Buffer.from(v.id).toString("base64url"), commands: [{ openPopupAction: { popup: { unifiedSharePanelRenderer: { showLoadingSpinner: true } }, popupType: "DIALOG", beReused: true } }] },
							}),
						},
					},
				},
			},
		},
	];
	return {
		buttonViewModel: {
			iconName: "MORE_VERT",
			onTap: { innertubeCommand: { showSheetCommand: { panelLoadingStrategy: { inlineContent: { sheetViewModel: { content: { listViewModel: { listItems: items } } } } } } } },
			accessibilityText: "More actions",
			style: "BUTTON_VIEW_MODEL_STYLE_MONO",
			type: "BUTTON_VIEW_MODEL_TYPE_TEXT",
			buttonSize: "BUTTON_VIEW_MODEL_SIZE_DEFAULT",
			state: "BUTTON_VIEW_MODEL_STATE_ACTIVE",
		},
	};
}

function durationOverlay(v: Video) {
	return {
		thumbnailBottomOverlayViewModel: {
			badges: [{ thumbnailBadgeViewModel: { text: duration(v.duration_ms), badgeStyle: "THUMBNAIL_OVERLAY_BADGE_STYLE_DEFAULT", animationActivationTargetId: v.id, rendererContext: { accessibilityContext: { label: durationLabel(v.duration_ms) } } } }],
		},
	};
}

// lockupViewModel: the current card for a video in the watch sidebar,
// home grid and channel tabs
export function videoLockup(v: Video, viewer: Viewer, opts: { showChannel?: boolean; endpoint?: unknown; avatar?: boolean } = {}) {
	const showChannel = opts.showChannel ?? true;
	const rows: unknown[] = [];
	if (showChannel) rows.push({ metadataParts: [{ text: { content: v.channel_title, commandRuns: [{ startIndex: 0, length: v.channel_title.length, onTap: { innertubeCommand: channelEndpoint(channelRef(v)) } }] } }] });
	rows.push({
		metadataParts: [
			{ text: content(shortViews(v.view_count)), accessibilityLabel: viewsText(v.view_count) },
			{ text: content(ago(v.published_at ?? v.created_at)) },
		],
	});
	return {
		lockupViewModel: {
			contentImage: {
				thumbnailViewModel: {
					image: { sources: lockupSources(v.id) },
					overlays: [durationOverlay(v)],
				},
			},
			metadata: {
				lockupMetadataViewModel: {
					title: content(v.title),
					...(opts.avatar !== false && showChannel
						? {
								image: {
									decoratedAvatarViewModel: {
										avatar: { avatarViewModel: { image: { sources: [{ url: avatarUrl(v.channel_id, 68), width: 68, height: 68 }] }, avatarImageSize: "AVATAR_SIZE_M" } },
										a11yLabel: `Go to channel ${v.channel_title}`,
										rendererContext: { commandContext: { onTap: { innertubeCommand: channelEndpoint(channelRef(v)) } } },
									},
								},
							}
						: {}),
					metadata: { contentMetadataViewModel: { metadataRows: rows, delimiter: " • " } },
					menuButton: videoMenuSheet(v, viewer),
				},
			},
			contentId: v.id,
			contentType: "LOCKUP_CONTENT_TYPE_VIDEO",
			rendererContext: {
				accessibilityContext: { label: `${v.title} ${durationLabel(v.duration_ms)}` },
				commandContext: { onTap: { innertubeCommand: opts.endpoint ?? watchEndpoint(v.id) } },
			},
		},
	};
}

// videoRenderer: search results
export function videoRenderer(v: Video) {
	const ch = channelRef(v);
	const byline = runs({ text: v.channel_title, navigationEndpoint: channelEndpoint(ch) });
	return {
		videoRenderer: {
			videoId: v.id,
			thumbnail: videoThumbnails(v.id),
			title: { runs: [{ text: v.title }], accessibility: label(`${v.title} by ${v.channel_title} ${viewsText(v.view_count)} ${ago(v.published_at)} ${durationLabel(v.duration_ms)}`) },
			descriptionSnippet: v.description ? runs(v.description.slice(0, 160)) : undefined,
			longBylineText: byline,
			publishedTimeText: text(ago(v.published_at ?? v.created_at)),
			lengthText: { accessibility: label(durationLabel(v.duration_ms)), simpleText: duration(v.duration_ms) },
			viewCountText: text(viewsText(v.view_count)),
			navigationEndpoint: watchEndpoint(v.id),
			ownerText: byline,
			shortBylineText: byline,
			showActionMenu: false,
			shortViewCountText: { accessibility: label(viewsText(v.view_count)), simpleText: shortViews(v.view_count) },
			channelThumbnailSupportedRenderers: {
				channelThumbnailWithLinkRenderer: { thumbnail: avatarThumbnails(v.channel_id, [68]), navigationEndpoint: channelEndpoint(ch), accessibility: label(`Go to channel ${v.channel_title}`) },
			},
			thumbnailOverlays: [
				{ thumbnailOverlayTimeStatusRenderer: { text: { accessibility: label(durationLabel(v.duration_ms)), simpleText: duration(v.duration_ms) }, style: "DEFAULT" } },
				{ thumbnailOverlayNowPlayingRenderer: { text: runs("Now playing") } },
			],
		},
	};
}

// gridVideoRenderer-less channels use richItemRenderer + lockup
export function richItem(v: Video, viewer: Viewer, showChannel = true) {
	return { richItemRenderer: { content: videoLockup(v, viewer, { showChannel }) } };
}

export function channelRenderer(c: Channel, subscribed: boolean, viewer: Viewer) {
	return {
		channelRenderer: {
			channelId: c.id,
			title: text(c.title),
			navigationEndpoint: channelEndpoint(c),
			thumbnail: avatarThumbnails(c.id, [88, 176]),
			descriptionSnippet: c.description ? runs(c.description.slice(0, 120)) : undefined,
			shortBylineText: runs({ text: c.title, navigationEndpoint: channelEndpoint(c) }),
			videoCountText: runs(`@${c.handle}`),
			subscriptionButton: { subscribed },
			subscriberCountText: text(subscribersText(c.subscriber_count)),
			subscribeButton: subscribeButton(c, subscribed, viewer),
		},
	};
}

export function subscribeButton(c: { id: string; title: string }, subscribed: boolean, viewer: Viewer) {
	return {
		subscribeButtonRenderer: {
			buttonText: runs(subscribed ? "Subscribed" : "Subscribe"),
			subscribed,
			enabled: true,
			type: "FREE",
			channelId: c.id,
			showPreferences: false,
			subscribedButtonText: runs("Subscribed"),
			unsubscribedButtonText: runs("Subscribe"),
			unsubscribeButtonText: runs("Unsubscribe"),
			subscribeAccessibility: label(`Subscribe to ${c.title}.`),
			unsubscribeAccessibility: label(`Unsubscribe from ${c.title}.`),
			targetId: "watch-subscribe",
			...(viewer
				? {
						serviceEndpoints: [
							serviceEndpoint("/youtubei/v1/subscription/subscribe", { subscribeEndpoint: { channelIds: [c.id], params: "EgIIAhgA" } }),
							serviceEndpoint("/youtubei/v1/subscription/unsubscribe", {
								signalServiceEndpoint: {
									signal: "CLIENT_SIGNAL",
									actions: [
										{
											openPopupAction: {
												popup: {
													confirmDialogRenderer: {
														dialogMessages: [runs("Unsubscribe from ", c.title, "?")],
														confirmButton: { buttonRenderer: { style: "STYLE_BLUE_TEXT", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Unsubscribe"), serviceEndpoint: serviceEndpoint("/youtubei/v1/subscription/unsubscribe", { unsubscribeEndpoint: { channelIds: [c.id], params: "CgIIAhgA" } }), accessibility: { label: "Unsubscribe" } } },
														cancelButton: { buttonRenderer: { style: "STYLE_TEXT", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Cancel"), accessibility: { label: "Cancel" } } },
														primaryIsCancel: false,
													},
												},
												popupType: "DIALOG",
											},
										},
									],
								},
							}),
						],
					}
				: {
						signInEndpoint: {
							commandMetadata: { webCommandMetadata: { ignoreNavigation: true } },
							modalEndpoint: {
								modal: {
									modalWithTitleAndButtonRenderer: {
										title: text("Want to subscribe to this channel?"),
										content: text("Sign in to subscribe to this channel."),
										button: { buttonRenderer: { style: "STYLE_MONO_FILLED", size: "SIZE_DEFAULT", isDisabled: false, text: text("Sign in"), navigationEndpoint: signInEndpoint("/") } },
									},
								},
							},
						},
					}),
		},
	};
}

export function continuationItem(token: string, apiUrl: string, request?: string) {
	return {
		continuationItemRenderer: {
			trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN",
			continuationEndpoint: {
				commandMetadata: { webCommandMetadata: { sendPost: true, apiUrl } },
				continuationCommand: { token, request: request ?? (apiUrl.endsWith("/next") ? "CONTINUATION_REQUEST_TYPE_WATCH_NEXT" : apiUrl.endsWith("/search") ? "CONTINUATION_REQUEST_TYPE_SEARCH" : "CONTINUATION_REQUEST_TYPE_BROWSE") },
			},
		},
	};
}

export const subscriberLabel = (n: number) => ({ accessibility: label(`${grouped(n)} subscribers`), simpleText: subscribersText(n) });
export { compact, PUBLIC_ORIGIN };
