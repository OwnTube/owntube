// /youtubei/v1/guide (the side bar), /youtubei/v1/account/account_menu, the
// account menu's Switch account page (GET /getAccountSwitcherEndpoint) and
// the notifications menu, built from YouTube's responses (templates guide/*,
// account/*, notification/*). The guide keeps every section YouTube sends;
// account menu entries for Google's services point at the instance's own
// pages (scripts/make-templates.ts, localMenu).

import type { Viewer } from "../client/page";
import { browserAccounts } from "../auth";
import { INSTANCE_NAME, PUBLIC_ORIGIN, STUDIO_HOST, STUDIO_ORIGIN } from "../config";
import { subscribedChannels } from "../data";
import { viewerVars } from "./chrome";
import { avatarUrl, countLabel, responseContext } from "./r";
import { route } from "./router";
import { find, make, tpl } from "./tpl";
import { baseVars } from "./vars";

// Guide entries whose destination this instance doesn't serve yet; the
// templates keep them, and each comes back when its page does
// (docs/compat/parity.md tracks them)
const UNSERVED = new Set(["/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ", "/channel/UC4R8DWoMoI7CAwX8_LjQHig", "/gaming", "/podcasts", "/playables", "/channel_memberships", "/reporthistory"]);
const entryUrl = (e: any) => {
	const r = Object.values(e)[0] as any;
	return (r?.navigationEndpoint ?? r?.serviceEndpoint)?.commandMetadata?.webCommandMetadata?.url;
};
function dropUnserved(o: any): any {
	if (Array.isArray(o)) return o.filter((e) => !(e && typeof e === "object" && (UNSERVED.has(entryUrl(e)) || "guideDownloadsEntryRenderer" in e))).map(dropUnserved);
	if (o && typeof o === "object") {
		for (const k of Object.keys(o)) o[k] = dropUnserved(o[k]);
		// a collapsible group with nothing left in it goes too
		if (Array.isArray(o.items)) o.items = o.items.filter((e: any) => !(e?.guideCollapsibleEntryRenderer && !e.guideCollapsibleEntryRenderer.expandableItems?.length) && !(e?.guideSectionRenderer && !e.guideSectionRenderer.items?.length));
	}
	return o;
}

// YouTube lists this many subscriptions before "Show more"
const GUIDE_SUBSCRIPTIONS = 7;

async function guide(viewer: Viewer) {
	if (!viewer) return { responseContext: responseContext(viewer), ...dropUnserved(make<object>("guide/signed_out", baseVars(viewer))) };
	const g = dropUnserved(make("guide/signed_in", { ...baseVars(viewer), ...viewerVars(viewer) }));
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

route("account/account_menu", ({ viewer, url }) => {
	if (!viewer) return { responseContext: responseContext(viewer), ...make<object>("account/menu_signed_out", baseVars(viewer)) };
	// Studio has its own, shorter menu
	if (url.host === STUDIO_HOST) return { responseContext: responseContext(viewer), ...make<object>("account/studio_menu", { ...baseVars(viewer), ...viewerVars(viewer), ORIGIN: PUBLIC_ORIGIN }) };
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

// Switch account: every account signed in on this browser, the active one
// first under its own header, then the others; choosing one loads its
// accountSigninToken.signinUrl, which makes it active (signin.ts)
export async function accountSwitcher(req: Request): Promise<Response> {
	const accounts = await browserAccounts(req);
	// the page it was opened on, where choosing an account returns to; from
	// Studio the links lead to the main origin's sign-in and back to Studio
	const studio = new URL(req.url).host === STUDIO_HOST;
	const here = studio ? STUDIO_ORIGIN : PUBLIC_ORIGIN;
	let next = studio ? `${STUDIO_ORIGIN}/` : "/";
	try {
		const ref = new URL(req.headers.get("referer") ?? "");
		if (ref.origin === here) next = studio ? ref.href : ref.pathname + ref.search;
	} catch {}
	const signin = studio ? `${PUBLIC_ORIGIN}/signin` : "/signin";
	// the active account shows its handle and a larger photo; the others
	// their name and subscriber count
	const item = (a: (typeof accounts)[number], i: number) => {
		const size = a.active ? 48 : 36;
		const r = make<any>("account/switcher_item", {
			NAME: a.title,
			PHOTO: [{ url: avatarUrl(a.channelId, size), width: size, height: size }],
			SELECTED: a.active,
			ACCOUNT_ID: a.userId,
			CACHE_KEY: a.channelId.slice(2),
			SWITCH_URL: `${signin}?action_handle_signin=true&authuser=${i}&next=${encodeURIComponent(next)}`,
			DATASYNC_ID: `${a.channelId}||`,
			NEXT: next,
			BYLINE: countLabel(a.subscribers, "subscriber"),
			HANDLE: `@${a.handle}`,
		});
		if (!a.active) delete r.accountItem.channelHandle;
		return r;
	};
	const sections: any[] = [];
	const active = accounts.findIndex((a) => a.active);
	if (active >= 0) sections.push(make("account/switcher_active", { ITEM: item(accounts[active], active), ACCOUNT_NAME: accounts[active].login, ACCOUNT_LINE: `${INSTANCE_NAME} account` }));
	accounts.forEach((a, i) => {
		if (i === active) return;
		const s = make("account/switcher_other", { ITEM: item(a, i), ACCOUNT_NAME: a.login });
		// "Other accounts" heads the first of them only
		if (sections.length > (active >= 0 ? 1 : 0)) delete s.accountSectionListRenderer.header;
		sections.push(s);
	});
	const body = make<any>("account/switcher", { SECTIONS: sections, ADD_ACCOUNT_URL: `${signin}?add=1&next=${encodeURIComponent(next)}` });
	const footer = body.data.actions[0].getMultiPageMenuAction.menu.multiPageMenuRenderer.footer.multiPageMenuSectionRenderer;
	// the client asks for the list without Sign out where signing out
	// doesn't belong (X-YouTube-Account-Switcher-Disable-Signout)
	if (req.headers.get("x-youtube-account-switcher-disable-signout") === "true") footer.items = footer.items.filter((it: any) => !it.compactLinkRenderer?.navigationEndpoint?.signOutEndpoint);
	// Studio signs out with a link to the main origin, as on studio.youtube.com
	else if (studio)
		for (const it of footer.items) {
			const e = it.compactLinkRenderer?.navigationEndpoint;
			if (!e?.signOutEndpoint) continue;
			delete e.signOutEndpoint;
			e.commandMetadata.webCommandMetadata.url = `${PUBLIC_ORIGIN}/logout`;
			e.urlEndpoint = { url: `${PUBLIC_ORIGIN}/logout` };
		}
	return new Response(`)]}'\n${JSON.stringify(body)}`, { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
}

// there are no notifications on this instance yet
route("notification/get_unseen_count", ({ viewer }) => ({
	responseContext: responseContext(viewer),
	actions: [{ updateNotificationsUnseenCountAction: { handlerData: "NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT", unseenCount: 0, timeoutMs: 1800000 } }],
}));
export const notificationsInbox = (viewer: Viewer) => ({ responseContext: responseContext(viewer), ...make<object>("notification/inbox_empty", {}) });
