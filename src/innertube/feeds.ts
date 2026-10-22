// Feed pages built from YouTube's responses: home and subscriptions
// (templates home/*, subscriptions/*, item/video_lockup_rich*).

import type { Viewer } from "../client/page";
import { latestVideos, subscriptionFeed } from "../data";
import { encodeToken } from "../ids";
import type { Video } from "./r";
import { make } from "./tpl";
import { baseVars, videoVars } from "./vars";

export const FEED_PAGE = 24;

// a video in a rich grid; signed-out viewers get YouTube's signed-out menu
export const richLockup = (v: Video, viewer: Viewer) => make(viewer ? "item/video_lockup_rich" : "item/video_lockup_rich_out", { ...baseVars(viewer, `/watch?v=${v.id}`), ...videoVars(v) });

function page(videos: Video[], viewer: Viewer, next: Record<string, unknown>) {
	const items: unknown[] = videos.map((v) => richLockup(v, viewer));
	if (videos.length === FEED_PAGE) items.push(make("item/continuation_rich", { CONTINUATION: encodeToken(next) }));
	return items;
}

export const homeItems = async (viewer: Viewer, offset: number) => page(await latestVideos(FEED_PAGE, offset), viewer, { k: "home", o: offset + FEED_PAGE });
export const subscriptionsItems = async (viewer: Viewer, offset: number) => page(await subscriptionFeed(viewer, FEED_PAGE, offset), viewer, { k: "subs", o: offset + FEED_PAGE });

export async function homePage(viewer: Viewer) {
	const items = await homeItems(viewer, 0);
	// nothing uploaded yet: YouTube's own empty feed
	return items.length ? make("home/page", { ITEMS: items }) : make("home/empty", baseVars(viewer));
}

export async function subscriptionsPage(viewer: Viewer) {
	if (!viewer) return make("subscriptions/signed_out", baseVars(viewer, "/feed/subscriptions"));
	return make("subscriptions/page", { ITEMS: [make("subscriptions/latest", {}), ...(await subscriptionsItems(viewer, 0))] });
}
