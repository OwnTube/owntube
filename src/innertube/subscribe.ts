// The signed-in channel header action: YouTube's subscribe button (with its
// notification bell sheet) for other channels, the owner's Studio buttons on
// the viewer's own channel. Signed out, the header template keeps its
// sign-in modal.

import type { Viewer } from "../client/page";
import { isSubscribed } from "../data";
import { sql } from "../db";
import { type Channel } from "./r";
import { make, type Vars } from "./tpl";

export async function subscribeAction(c: Channel, viewer: Viewer, vars: Vars) {
	if (!viewer) return undefined;
	if (viewer.channelId === c.id) return { actions: make("channel/owner_actions", vars), mutations: [] };
	return { actions: [subscribeButton(vars)], mutations: await subscribeEntities(c, viewer, vars) };
}

export const subscribeButton = (vars: Vars) => make("channel/subscribe_button", vars);

export async function subscribeEntities(c: { id: string }, viewer: Viewer, vars: Vars, subscribed?: boolean) {
	const s = subscribed ?? (await isSubscribed(viewer, c.id));
	return make<unknown[]>("channel/subscribe_entities", { ...vars, CHANNEL_ID: c.id, SUBSCRIBED: s, BELL_STATE: "SUBSCRIPTION_NOTIFICATION_STATE_OCCASIONAL" });
}

// the subscribe button of a channel row (search results, All subscriptions;
// template item/subscribe_button_renderer)
export async function channelRowButton(c: Channel, vars: Vars, subscribed: boolean) {
	// the bell's preference blobs carry a video id as context; any id of the same length does
	const [latest] = await sql`select id from videos where channel_id = ${c.id} and deleted_at is null order by created_at desc limit 1`;
	return make("item/subscribe_button_renderer", {
		...vars,
		CHANNEL_ID: c.id,
		CHANNEL_NAME: c.title,
		VIDEO_ID: latest?.id ?? c.id.slice(-11),
		SUBSCRIBED: subscribed,
		SUBSCRIBE_LABEL: `Subscribe to ${c.title}.`,
		UNSUBSCRIBE_LABEL: `Unsubscribe from ${c.title}.`,
		BELL_LABEL_SUFFIX: `notification setting for ${c.title}`,
	});
}
