// /youtubei/v1/guide (the side bar), /youtubei/v1/account/account_menu and
// the notifications menu, built from YouTube's responses (templates guide/*,
// account/*, notification/*). Entries for YouTube's other products, Google
// account pages and features this instance doesn't have were left out when
// the templates were made (scripts/make-templates.ts).

import type { Viewer } from "../client/page";
import { subscribedChannels } from "../data";
import { viewerVars } from "./chrome";
import { avatarUrl, responseContext } from "./r";
import { route } from "./router";
import { find, make, tpl } from "./tpl";
import { baseVars } from "./vars";

// YouTube lists this many subscriptions before "Show more"
const GUIDE_SUBSCRIPTIONS = 7;

async function guide(viewer: Viewer) {
	if (!viewer) return { responseContext: responseContext(viewer), ...make<object>("guide/signed_out", baseVars(viewer)) };
	const g = make("guide/signed_in", { ...baseVars(viewer), ...viewerVars(viewer) });
	const section = find(g, "guideSubscriptionsSectionRenderer");
	const entries = (await subscribedChannels(viewer)).map((c) =>
		make("guide/subscription_entry", { CHANNEL_ID: c.id, CHANNEL_NAME: c.title, CHANNEL_URL: `/@${c.handle}`, AVATAR: [{ url: avatarUrl(c.id, 88) }] }),
	);
	if (!entries.length) {
		// no channels to list: Subscriptions is a plain entry under Home, as when signed out
		const out = tpl("guide/signed_out");
		const subs = out.items[0].guideSectionRenderer.items.find((it: any) => it.guideEntryRenderer?.icon?.iconType === "TAB_SUBSCRIPTIONS_CAIRO");
		g.items[0].guideSectionRenderer.items.push(subs);
		g.items = g.items.filter((s: any) => !s.guideSubscriptionsSectionRenderer);
	} else {
		section.items.push(...entries.slice(0, GUIDE_SUBSCRIPTIONS));
		if (entries.length > GUIDE_SUBSCRIPTIONS) section.items.push(make("guide/subscriptions_more", { MORE: entries.slice(GUIDE_SUBSCRIPTIONS) }));
	}
	return { responseContext: responseContext(viewer), ...g };
}

route("guide", ({ viewer }) => guide(viewer));

route("account/account_menu", ({ viewer }) => {
	if (!viewer) return { responseContext: responseContext(viewer), ...make<object>("account/menu_signed_out", baseVars(viewer)) };
	const r = make("account/menu_signed_in", { ...baseVars(viewer), ...viewerVars(viewer) });
	if (viewer.isAdmin) {
		// this instance's admin panel, listed with YouTube Studio
		const sections = r.actions[0].openPopupAction.popup.multiPageMenuRenderer.sections;
		const studio = sections.find((s: any) => s.multiPageMenuSectionRenderer?.items.some((it: any) => it.compactLinkRenderer?.icon?.iconType === "CREATOR_STUDIO")).multiPageMenuSectionRenderer;
		const link = structuredClone(studio.items.find((it: any) => it.compactLinkRenderer?.icon?.iconType === "CREATOR_STUDIO"));
		const c = link.compactLinkRenderer;
		c.icon.iconType = "ADMIN_PANEL_SETTINGS";
		c.title = { runs: [{ text: "Admin" }] };
		c.navigationEndpoint.commandMetadata.webCommandMetadata.url = "/admin";
		c.navigationEndpoint.urlEndpoint.url = "/admin";
		studio.items.push(link);
	}
	return { responseContext: responseContext(viewer), ...r };
});

// there are no notifications on this instance yet
route("notification/get_unseen_count", ({ viewer }) => ({
	responseContext: responseContext(viewer),
	actions: [{ updateNotificationsUnseenCountAction: { handlerData: "NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT", unseenCount: 0, timeoutMs: 1800000 } }],
}));
export const notificationsInbox = (viewer: Viewer) => ({ responseContext: responseContext(viewer), ...make<object>("notification/inbox_empty", {}) });
