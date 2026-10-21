// The app chrome every page response carries: the masthead (topbar).

import type { Viewer } from "../client/page";
import { avatarThumbnails, browseEndpoint, label, runs, serviceEndpoint, signInEndpoint, text, urlEndpoint } from "./r";

function hotkeys() {
	const section = (title: string, opts: [string, string][]) => ({
		hotkeyDialogSectionRenderer: { title: runs(title), options: opts.map(([l, k]) => ({ hotkeyDialogSectionOptionRenderer: { label: runs(l), hotkey: k } })) },
	});
	return {
		hotkeyDialogRenderer: {
			title: runs("Keyboard shortcuts"),
			sections: [
				section("Playback", [["Toggle play/pause", "k"], ["Rewind 10 seconds", "j"], ["Fast forward 10 seconds", "l"], ["Previous video", "P (SHIFT+p)"], ["Next video", "N (SHIFT+n)"], ["Previous frame (while paused)", ","], ["Next frame (while paused)", "."], ["Decrease playback rate", "< (SHIFT+,)"], ["Increase playback rate", "> (SHIFT+.)"], ["Seek to specific point in the video (7 advances to 70% of duration)", "0..9"]]),
				section("General", [["Toggle full screen", "f"], ["Toggle theater mode", "t"], ["Toggle miniplayer", "i"], ["Close miniplayer or current dialog", "ESCAPE"], ["Toggle mute", "m"]]),
				section("Subtitles and closed captions", [["If the video supports captions, toggle captions ON/OFF", "c"], ["Rotate through font sizes (increasing)", "+"], ["Rotate through font sizes (decreasing)", "-"]]),
			],
			dismissButton: { buttonRenderer: { style: "STYLE_BLUE_TEXT", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Dismiss") } },
		},
	};
}

const signal = (s: string) => ({ commandMetadata: { webCommandMetadata: { sendPost: true } }, signalServiceEndpoint: { signal: "CLIENT_SIGNAL", actions: [{ signalAction: { signal: s } }] } });

export function topbar(viewer: Viewer, pageUrl = "/") {
	const buttons: unknown[] = viewer
		? [
				{
					buttonRenderer: {
						style: "STYLE_DEFAULT",
						size: "SIZE_DEFAULT",
						isDisabled: false,
						icon: { iconType: "VIDEO_CALL" },
						text: runs("Create"),
						navigationEndpoint: urlEndpoint("/upload"),
						accessibility: { label: "Create" },
						tooltip: "Create",
						targetId: "topbar-create",
					},
				},
				{
					topbarMenuButtonRenderer: {
						avatar: avatarThumbnails(viewer.channelId, [32, 48, 88]),
						menuRequest: serviceEndpoint("/youtubei/v1/account/account_menu", {
							signalServiceEndpoint: {
								signal: "GET_ACCOUNT_MENU",
								actions: [{ openPopupAction: { popup: { multiPageMenuRenderer: { trackingParams: "", style: "MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT", showLoadingSpinner: true } }, popupType: "DROPDOWN", beReused: true } }],
							},
						}),
						accessibility: label("Account menu"),
						tooltip: "Account menu",
					},
				},
			]
		: [
				{
					topbarMenuButtonRenderer: {
						icon: { iconType: "MORE_VERT" },
						menuRequest: serviceEndpoint("/youtubei/v1/account/account_menu", {
							signalServiceEndpoint: {
								signal: "GET_ACCOUNT_MENU",
								actions: [{ openPopupAction: { popup: { multiPageMenuRenderer: { style: "MULTI_PAGE_MENU_STYLE_TYPE_SYSTEM", showLoadingSpinner: true } }, popupType: "DROPDOWN", beReused: true } }],
							},
						}),
						accessibility: label("Settings"),
						tooltip: "Settings",
						style: "STYLE_DEFAULT",
					},
				},
				{
					buttonRenderer: {
						style: "STYLE_SUGGESTIVE",
						size: "SIZE_SMALL",
						text: runs("Sign in"),
						icon: { iconType: "AVATAR_LOGGED_OUT" },
						navigationEndpoint: signInEndpoint(pageUrl),
						targetId: "topbar-signin",
					},
				},
			];
	return {
		desktopTopbarRenderer: {
			logo: { topbarLogoRenderer: { iconImage: { iconType: "YOUTUBE_LOGO" }, tooltipText: runs("Home"), endpoint: browseEndpoint("FEwhat_to_watch", "/") } },
			searchbox: {
				fusionSearchboxRenderer: {
					icon: { iconType: "SEARCH" },
					placeholderText: runs("Search"),
					config: { webSearchboxConfig: { requestLanguage: "en", requestDomain: "us", hasOnscreenKeyboard: false, focusSearchbox: true } },
					searchEndpoint: { commandMetadata: { webCommandMetadata: { url: "/results?search_query=", webPageType: "WEB_PAGE_TYPE_SEARCH", rootVe: 4724 } }, searchEndpoint: { query: "" } },
					clearButton: { buttonRenderer: { style: "STYLE_DEFAULT", size: "SIZE_DEFAULT", isDisabled: false, icon: { iconType: "CLOSE" }, accessibilityData: label("Clear search query") } },
					disableAiAppearance: true,
				},
			},
			topbarButtons: buttons,
			hotkeyDialog: hotkeys(),
			backButton: { buttonRenderer: { command: signal("HISTORY_BACK") } },
			forwardButton: { buttonRenderer: { command: signal("HISTORY_FORWARD") } },
			a11ySkipNavigationButton: { buttonRenderer: { style: "STYLE_DEFAULT", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Skip navigation"), command: signal("SKIP_NAVIGATION") } },
		},
	};
}

export { text };
