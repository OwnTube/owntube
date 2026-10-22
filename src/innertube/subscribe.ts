// The signed-in channel header action: YouTube's subscribe button (with its
// notification bell sheet) for other channels, the owner's Studio buttons on
// the viewer's own channel. Signed out, the header template keeps its
// sign-in modal.

import type { Viewer } from "../client/page";
import { isSubscribed } from "../data";
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
