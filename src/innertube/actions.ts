// Likes, subscriptions, sharing, history: the mutations behind the watch
// page and channel buttons. Each returns the actions and entity updates the
// client applies, and persists the change so a reload shows the same state.

import { PUBLIC_ORIGIN } from "../config";
import { getChannel, getVideo } from "../data";
import { sql } from "../db";
import { isChannelId, isVideoId } from "../ids";
import { avatarThumbnails, channelEndpoint, label, responseContext, runs, text } from "./r";
import { ApiError, route } from "./router";
import { entityKey } from "./watch";

const toast = (message: string) => ({ addToToastAction: { item: { notificationActionRenderer: { responseText: runs(message) } } } });
const now = () => ({ seconds: String(Math.floor(Date.now() / 1000)), nanos: 0 });

async function react(videoId: string, userId: string, kind: "like" | "dislike" | null) {
	await sql.begin(async (tx) => {
		const [prev] = await tx`select kind from video_reactions where user_id = ${userId} and video_id = ${videoId} for update`;
		if (prev?.kind === kind) return;
		if (kind) await tx`insert into video_reactions (user_id, video_id, kind) values (${userId}, ${videoId}, ${kind}) on conflict (user_id, video_id) do update set kind = ${kind}, created_at = now()`;
		else await tx`delete from video_reactions where user_id = ${userId} and video_id = ${videoId}`;
		const delta = (kind === "like" ? 1 : 0) - (prev?.kind === "like" ? 1 : 0);
		if (delta) await tx`update videos set like_count = greatest(0, like_count + ${delta}) where id = ${videoId}`;
	});
}

for (const [method, kind] of [["like/like", "like"], ["like/dislike", "dislike"], ["like/removelike", null]] as const) {
	route(
		method,
		async ({ body, viewer }) => {
			const id = body.target?.videoId;
			if (!isVideoId(id)) throw new ApiError(400, "Invalid video id");
			if (!(await getVideo(id, viewer))) throw new ApiError(404, "Video not found");
			await react(id, viewer!.userId, kind);
			const status = kind === "like" ? "LIKE" : kind === "dislike" ? "DISLIKE" : "INDIFFERENT";
			return {
				responseContext: responseContext(viewer),
				actions: kind === "like" ? [toast("Added to Liked videos")] : kind === null ? [] : [toast("You dislike this video")],
				frameworkUpdates: { entityBatchUpdate: { mutations: [{ entityKey: entityKey("like", id), type: "ENTITY_MUTATION_TYPE_REPLACE", payload: { likeStatusEntity: { key: entityKey("like", id), likeStatus: status } } }], timestamp: now() } },
			};
		},
		{ mutation: true },
	);
}

function subscriptionMutation(channelId: string, subscribed: boolean) {
	const key = Buffer.from(`sub:${channelId}`).toString("base64url");
	return { entityKey: key, type: "ENTITY_MUTATION_TYPE_REPLACE", payload: { subscriptionStateEntity: { key, subscribed } } };
}

route(
	"subscription/subscribe",
	async ({ body, viewer }) => {
		const ids: string[] = (Array.isArray(body.channelIds) ? body.channelIds : []).filter(isChannelId).slice(0, 10);
		if (!ids.length) throw new ApiError(400, "No channel");
		const actions: unknown[] = [];
		for (const id of ids) {
			const c = await getChannel({ id });
			if (!c) throw new ApiError(404, "Channel not found");
			if (c.id === viewer!.channelId) throw new ApiError(400, "You can't subscribe to your own channel.");
			await sql`insert into subscriptions (user_id, channel_id) values (${viewer!.userId}, ${id}) on conflict do nothing`;
			actions.push({ updateSubscribeButtonAction: { subscribed: true, channelId: id } });
			actions.push({
				addToGuideSectionAction: {
					handlerData: "GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS",
					items: [{ guideEntryRenderer: { navigationEndpoint: channelEndpoint(c), thumbnail: avatarThumbnails(c.id, [88]), formattedTitle: text(c.title), accessibility: label(c.title), entryData: { guideEntryData: { guideEntryId: c.id } }, presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NONE" } }],
				},
			});
			actions.push(toast("Subscription added"));
		}
		return { responseContext: responseContext(viewer), actions, frameworkUpdates: { entityBatchUpdate: { mutations: ids.map((id) => subscriptionMutation(id, true)), timestamp: now() } } };
	},
	{ mutation: true },
);

route(
	"subscription/unsubscribe",
	async ({ body, viewer }) => {
		const ids: string[] = (Array.isArray(body.channelIds) ? body.channelIds : []).filter(isChannelId).slice(0, 10);
		if (!ids.length) throw new ApiError(400, "No channel");
		const actions: unknown[] = [];
		for (const id of ids) {
			await sql`delete from subscriptions where user_id = ${viewer!.userId} and channel_id = ${id}`;
			actions.push({ updateSubscribeButtonAction: { subscribed: false, channelId: id } });
			actions.push({ removeFromGuideSectionAction: { handlerData: "GUIDE_ACTION_REMOVE_FROM_SUBSCRIPTIONS", guideEntryId: id } });
			actions.push(toast("Subscription removed"));
		}
		return { responseContext: responseContext(viewer), actions, frameworkUpdates: { entityBatchUpdate: { mutations: ids.map((id) => subscriptionMutation(id, false)), timestamp: now() } } };
	},
	{ mutation: true },
);

// notification bell preferences: accepted, nothing is sent from this instance yet
route("notification/modify_channel_preference", ({ viewer }) => ({ responseContext: responseContext(viewer), actions: [toast("Notification preferences saved")] }), { mutation: true });

route("share/get_share_panel", async ({ body, viewer }) => {
	let id = "";
	try {
		id = Buffer.from(String(body.serializedSharedEntity ?? body.serializedShareEntity ?? ""), "base64url").toString();
	} catch {}
	const url = isVideoId(id) ? `${PUBLIC_ORIGIN}/watch?v=${id}` : `${PUBLIC_ORIGIN}/`;
	return {
		responseContext: responseContext(viewer),
		actions: [
			{
				openPopupAction: {
					popup: {
						unifiedSharePanelRenderer: {
							contents: [
								{
									thirdPartyNetworkSection: {
										shareTargetContainer: { thirdPartyShareTargetSectionRenderer: { shareTargets: [] } },
										copyLinkRenderer: {
											copyButton: { buttonRenderer: { style: "STYLE_PRIMARY", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Copy"), accessibilityData: label("Copy") } },
											shortUrl: url,
											style: "COPY_LINK_STYLE_INLINE_ROUNDED",
										},
										startAtCheckbox: { checkboxRenderer: { checkedState: "CHECKBOX_CHECKED_STATE_UNCHECKED", labelText: runs("Start at") } },
									},
								},
							],
							header: { sharePanelHeaderRenderer: { title: runs("Share") } },
							shareType: "SHARE_TYPE_VIDEO",
						},
					},
					popupType: "DIALOG",
					beReused: true,
				},
			},
		],
	};
});

route(
	"history/clear_watch_history",
	async ({ viewer }) => {
		await sql`delete from watch_history where user_id = ${viewer!.userId}`;
		return { responseContext: responseContext(viewer), actions: [toast("Watch history cleared")] };
	},
	{ mutation: true },
);
