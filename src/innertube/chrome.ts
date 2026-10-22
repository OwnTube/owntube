// The app chrome every page response carries: the masthead (topbar), built
// from YouTube's signed-out and signed-in top bars (templates topbar/*).

import type { Viewer } from "../client/page";
import { avatarUrl } from "./r";
import { make } from "./tpl";
import { baseVars } from "./vars";

export const viewerVars = (viewer: NonNullable<Viewer>) => ({
	VIEWER_CHANNEL_ID: viewer.channelId,
	VIEWER_CHANNEL_URL: `/@${viewer.handle}`,
	VIEWER_NAME: viewer.title,
	VIEWER_AT_HANDLE: `@${viewer.handle}`,
	VIEWER_AVATAR: [{ url: avatarUrl(viewer.channelId, 88), width: 88, height: 88 }],
	VIEWER_PHOTO: [{ url: avatarUrl(viewer.channelId, 108), width: 108, height: 108 }],
});

export function topbar(viewer: Viewer, pageUrl = "/") {
	const vars = baseVars(viewer, pageUrl);
	if (!viewer) return make("topbar/signed_out", vars);
	const t = make("topbar/signed_in", { ...vars, ...viewerVars(viewer) });
	// the logo YouTube shows Premium members (the client draws it from this icon type)
	if (viewer.premium) {
		const logo = t.desktopTopbarRenderer.logo.topbarLogoRenderer;
		logo.iconImage.iconType = "YOUTUBE_PREMIUM_LOGO";
		logo.tooltipText = { runs: [{ text: "YouTube Premium Home" }] };
	}
	return t;
}
