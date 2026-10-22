// Studio's InnerTube methods (creator/*, upload/*, video_manager/*), on the
// shared router. Every creator method acts for the signed-in channel only:
// requests naming another channel or another channel's videos get nothing.

import type { Viewer } from "../client/page";
import { sql } from "../db";
import { isVideoId, newVideoId } from "../ids";
import { responseContext } from "../innertube/r";
import { ApiError, type Ctx, route } from "../innertube/router";
import { creatorChannel } from "./channel";
import { attachSource } from "./upload";
import { maskedVideo, videosFor } from "./video";

function owner(ctx: Ctx): NonNullable<Viewer> {
	if (!ctx.viewer) throw new ApiError(401, "Sign in to use Studio.", "authError");
	return ctx.viewer;
}

const ok = (viewer: Viewer, data: Record<string, unknown>) => ({ responseContext: responseContext(viewer), ...data });

route("creator/get_creator_channels", async (ctx) => {
	const viewer = owner(ctx);
	const ids: string[] = Array.isArray(ctx.body.channelIds) ? ctx.body.channelIds : [];
	const channels = [];
	for (const id of ids.slice(0, 10)) {
		const ch = id === viewer.channelId ? await creatorChannel(viewer, ctx.body.mask ?? null) : null;
		channels.push(ch ?? { channelId: id, responseStatus: { statusCode: "CREATOR_ENTITY_STATUS_PERMISSION_DENIED" } });
	}
	return ok(viewer, { channels });
});

// announcements, survey and promotion slots: none
route("creator/get_creator_communications", (ctx) => ok(ctx.viewer, {}));
route("notification/get_unseen_count", (ctx) => ok(ctx.viewer, { unseenCount: 0 }));

route("creator/list_creator_playlists", async (ctx) => {
	const viewer = owner(ctx);
	if (ctx.body.channelId && ctx.body.channelId !== viewer.channelId) return ok(viewer, { playlists: [] });
	const rows = await sql`select id, title from playlists where user_id = ${viewer.userId} and kind = 'user' order by updated_at desc limit 500`;
	return ok(viewer, { playlists: rows.map((p: any) => ({ playlistId: p.id, title: p.title, responseStatus: { statusCode: "CREATOR_ENTITY_STATUS_OK" } })) });
});

// The content page's filter is a tree of and/not/channelIdIs/contentTypeIs
// conditions. This instance has uploads only (no Shorts, streams, films):
// a filter that asks for Shorts or a stream matches nothing.
function wantsOtherContent(filter: any, channelId: string): boolean {
	const walk = (f: any, negated: boolean): boolean => {
		if (!f || typeof f !== "object") return false;
		if (f.not) return walk(f.not.operand, !negated);
		if (f.and) return (f.and.operands ?? []).some((o: any) => walk(o, negated));
		if (negated) return false;
		if (f.contentTypeIs) return f.contentTypeIs.value !== "CREATOR_CONTENT_TYPE_VIDEO_ON_DEMAND";
		if (f.videoOriginIs) return f.videoOriginIs.value !== "VIDEO_ORIGIN_UPLOAD";
		if (f.channelIdIs) return f.channelIdIs.value !== channelId;
		return !!f.tvfilmTypeIs;
	};
	return walk(filter, false);
}

route("creator/list_creator_videos", async (ctx) => {
	const viewer = owner(ctx);
	const rows = wantsOtherContent(ctx.body.filter, viewer.channelId) ? [] : await videosFor(viewer.channelId);
	const size = Math.min(Math.max(Number(ctx.body.pageSize) || 30, 1), 100);
	const start = Math.max(0, Number(Buffer.from(String(ctx.body.pageToken ?? ""), "base64url").toString()) || 0);
	const page = rows.slice(start, start + size);
	return ok(viewer, {
		videos: page.map((v) => maskedVideo(v, ctx.body.mask ?? null)),
		videosTotalSize: { size: String(rows.length), accuracy: "ACCURACY_EXACT", achievedTotalSizeAccuracy: "CREATOR_ACHIEVED_TOTAL_SIZE_ACCURACY_EXACT" },
		...(start + size < rows.length ? { nextPageToken: Buffer.from(String(start + size)).toString("base64url") } : {}),
	});
});

route("creator/get_creator_videos", async (ctx) => {
	const viewer = owner(ctx);
	const ids: string[] = (Array.isArray(ctx.body.videoIds) ? ctx.body.videoIds : []).filter(isVideoId).slice(0, 50);
	const rows = ids.length ? await videosFor(viewer.channelId, ids) : [];
	const byId = new Map(rows.map((r) => [r.id, r]));
	return ok(viewer, {
		videos: ids.map((id) => {
			const v = byId.get(id);
			return v ? maskedVideo(v, ctx.body.mask ?? null) : { videoId: id, responseStatus: { statusCode: "CREATOR_ENTITY_STATUS_NOT_FOUND" } };
		}),
	});
});

const PRIVACY: Record<string, "public" | "unlisted" | "private"> = { PUBLIC: "public", UNLISTED: "unlisted", PRIVATE: "private", VIDEO_PRIVACY_PUBLIC: "public", VIDEO_PRIVACY_UNLISTED: "unlisted", VIDEO_PRIVACY_PRIVATE: "private" };

// The uploader registers the video as soon as its transfer has started;
// the file reaches processing when the transfer completes (upload.ts).
route(
	"upload/createvideo",
	async (ctx) => {
		const viewer = owner(ctx);
		const b = ctx.body;
		if (b.channelId && b.channelId !== viewer.channelId) throw new ApiError(403, "You can only upload to your own channel.", "forbidden");
		const resource = b.resourceId?.scottyResourceId?.id;
		const [t] = await sql`select id, file_name, video_id from upload_transfers where resource_id = ${String(resource ?? "")} and user_id = ${viewer.userId}`;
		if (!t) throw new ApiError(400, "No such upload.");
		if (t.video_id) return ok(viewer, { videoId: t.video_id });
		const meta = b.initialMetadata ?? {};
		const fileTitle = String(t.file_name || "").replace(/\.[^.]+$/, "");
		const title = String(meta.title?.newTitle ?? "").trim().slice(0, 100) || fileTitle.slice(0, 100) || "Untitled";
		const visibility = PRIVACY[meta.privacy?.newPrivacy] ?? "private";
		const draft = meta.draftState?.isDraft !== false;
		const id = newVideoId();
		await sql`insert into videos (id, channel_id, title, visibility, status, draft, original_filename)
			values (${id}, ${viewer.channelId}, ${title}, ${draft ? "private" : visibility}, 'uploaded', ${draft}, ${String(t.file_name).slice(0, 255)})`;
		await sql`update upload_transfers set video_id = ${id} where id = ${t.id}`;
		await attachSource(t.id, id);
		return ok(viewer, { videoId: id });
	},
	{ mutation: true },
);
