// /youtubei/v1/guide (the side bar) and /youtubei/v1/account/account_menu.
// Entries point only at pages this instance serves; YouTube's own products
// (Music, Kids, TV, Premium) and Google account links are left out.

import type { Viewer } from "../client/page";
import { INSTANCE_NAME } from "../config";
import { subscribedChannels } from "../data";
import { avatarThumbnails, avatarUrl, browseEndpoint, channelEndpoint, label, responseContext, runs, signInEndpoint, text, urlEndpoint } from "./r";
import { route } from "./router";
import { userPlaylists } from "./playlists";

const entry = (title: string, icon: string, endpoint: unknown, extra: Record<string, unknown> = {}) => ({
	guideEntryRenderer: { navigationEndpoint: endpoint, icon: { iconType: icon }, formattedTitle: text(title), accessibility: label(title), ...extra },
});

async function guide(viewer: Viewer) {
	const items: unknown[] = [];
	items.push({
		guideSectionRenderer: {
			items: [
				entry("Home", "TAB_HOME_CAIRO", browseEndpoint("FEwhat_to_watch", "/"), { isPrimary: true }),
				entry("Subscriptions", "TAB_SUBSCRIPTIONS_CAIRO", browseEndpoint("FEsubscriptions", "/feed/subscriptions", "WEB_PAGE_TYPE_BROWSE", 96368), { isPrimary: true, targetId: "subscriptions-guide-item" }),
			],
		},
	});
	const you: unknown[] = [
		entry("History", "WATCH_HISTORY_CAIRO", browseEndpoint("FEhistory", "/feed/history", "WEB_PAGE_TYPE_BROWSE", 6827)),
		entry("Playlists", "PLAYLISTS_CAIRO", browseEndpoint("FEplaylist_aggregation", "/feed/playlists", "WEB_PAGE_TYPE_BROWSE", 6827)),
	];
	if (viewer) {
		you.unshift(entry("Your channel", "ACCOUNT_BOX_CAIRO", channelEndpoint({ id: viewer.channelId, handle: viewer.handle })));
		you.push(entry("Your videos", "MY_VIDEOS_CAIRO", urlEndpoint("/upload#videos")));
		you.push(entry("Watch later", "WATCH_LATER_CAIRO", browseEndpoint("VLWL", "/playlist?list=WL", "WEB_PAGE_TYPE_PLAYLIST", 5754)));
		for (const p of (await userPlaylists(viewer, undefined, true)).slice(0, 5)) you.push(entry(p.title, "PLAYLISTS_CAIRO", browseEndpoint(`VL${p.id}`, `/playlist?list=${p.id}`, "WEB_PAGE_TYPE_PLAYLIST", 5754)));
		you.push(entry("Liked videos", "LIKES_PLAYLIST_CAIRO", browseEndpoint("VLLL", "/playlist?list=LL", "WEB_PAGE_TYPE_PLAYLIST", 5754)));
	}
	items.push({
		guideSectionRenderer: {
			items: [
				{
					guideCollapsibleSectionEntryRenderer: {
						headerEntry: entry("You", "CHEVRON_RIGHT", browseEndpoint("FElibrary", "/feed/you", "WEB_PAGE_TYPE_BROWSE", 6827), { presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NONE", isPrimary: true }),
						expanderIcon: { iconType: "EXPAND" },
						collapserIcon: { iconType: "COLLAPSE" },
						sectionItems: you,
						handlerDatas: ["GUIDE_ACTION_ADD_TO_PLAYLISTS", "GUIDE_ACTION_REMOVE_FROM_PLAYLISTS"],
					},
				},
			],
		},
	});
	if (viewer) {
		const subs = await subscribedChannels(viewer);
		if (subs.length)
			items.push({
				guideSubscriptionsSectionRenderer: {
					formattedTitle: text("Subscriptions"),
					items: [
						...subs.slice(0, 30).map((c) => ({
							guideEntryRenderer: {
								navigationEndpoint: channelEndpoint(c),
								thumbnail: avatarThumbnails(c.id, [88]),
								formattedTitle: text(c.title),
								accessibility: label(c.title),
								presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NONE",
								entryData: { guideEntryData: { guideEntryId: c.id } },
							},
						})),
						entry("All subscriptions", "SUBSCRIPTIONS_CAIRO", browseEndpoint("FEchannels", "/feed/channels", "WEB_PAGE_TYPE_BROWSE", 6827)),
					],
					handlerDatas: ["GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS", "GUIDE_ACTION_REMOVE_FROM_SUBSCRIPTIONS"],
				},
			});
	} else {
		items.push({
			guideSigninPromoRenderer: {
				descriptiveText: text("Sign in to like videos, comment, and subscribe."),
				actionText: text("Sign in"),
				signInButton: { buttonRenderer: { style: "STYLE_SUGGESTIVE", size: "SIZE_DEFAULT", isDisabled: false, text: text("Sign in"), icon: { iconType: "AVATAR_LOGGED_OUT" }, navigationEndpoint: signInEndpoint("/") } },
			},
		});
	}
	items.push({
		guideSectionRenderer: {
			items: [entry("Upload", "VIDEO_CALL", urlEndpoint("/upload")), ...(viewer?.isAdmin ? [entry("Instance admin", "SETTINGS_CAIRO", urlEndpoint("/admin"))] : []), entry(`About ${INSTANCE_NAME}`, "INFO", urlEndpoint("/about"))],
		},
	});
	return { responseContext: responseContext(viewer), items };
}

route("guide", ({ viewer }) => guide(viewer));

const link = (title: string, icon: string, endpoint: unknown) => ({ compactLinkRenderer: { icon: { iconType: icon }, title: text(title), navigationEndpoint: endpoint } });

route("account/account_menu", ({ viewer }) => {
	const sections: unknown[] = viewer
		? [
				{
					multiPageMenuSectionRenderer: {
						items: [
							link("Your channel", "TAB_ACCOUNT", channelEndpoint({ id: viewer.channelId, handle: viewer.handle })),
							link("Upload video", "VIDEO_CALL", urlEndpoint("/upload")),
							link("Sign out", "EXIT_APP", urlEndpoint("/logout")),
						],
					},
				},
				...(viewer.isAdmin ? [{ multiPageMenuSectionRenderer: { items: [link("Instance admin", "SETTINGS", urlEndpoint("/admin"))] } }] : []),
			]
		: [{ multiPageMenuSectionRenderer: { items: [link("Sign in", "AVATAR_LOGGED_OUT", signInEndpoint("/")), link("Create account", "AVATAR_LOGGED_OUT", urlEndpoint("/register"))] } }];
	const header = viewer
		? {
				activeAccountHeaderRenderer: {
					accountName: text(viewer.title),
					accountPhoto: { thumbnails: [{ url: avatarUrl(viewer.channelId, 88), width: 88, height: 88 }] },
					channelHandle: text(`@${viewer.handle}`),
					manageAccountTitle: runs({ text: "View your channel", navigationEndpoint: channelEndpoint({ id: viewer.channelId, handle: viewer.handle }) }),
				},
			}
		: undefined;
	return {
		responseContext: responseContext(viewer),
		actions: [{ openPopupAction: { popup: { multiPageMenuRenderer: { ...(header ? { header } : {}), sections, style: viewer ? "MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT" : "MULTI_PAGE_MENU_STYLE_TYPE_SYSTEM" } }, popupType: "DROPDOWN" } }],
	};
});

// the bell's unseen count; there are no notifications on this instance yet
route("notification/get_unseen_count", ({ viewer }) => ({ responseContext: responseContext(viewer), unseenCount: 0 }));
