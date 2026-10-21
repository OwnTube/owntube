// Queries shared by the compatibility routes. Visibility rules live here:
// private videos are visible only to their owner, unlisted ones to anyone
// with the id but never in listings, and deleted ones to nobody.

import type { Viewer } from "./client/page";
import { sql } from "./db";
import type { Channel, Video } from "./innertube/r";

const VIDEO_COLUMNS = sql`v.id, v.title, v.description, v.channel_id, c.title as channel_title, c.handle as channel_handle, c.avatar_path as channel_avatar,
	v.duration_ms, v.view_count::int as view_count, v.like_count, v.comment_count, v.published_at, v.created_at, v.visibility, v.status, v.width, v.height`;

export async function getVideo(id: string, viewer: Viewer): Promise<Video | undefined> {
	const [v] = await sql`select ${VIDEO_COLUMNS}, (select count(*)::int from subscriptions s where s.channel_id = v.channel_id) as subscriber_count
		from videos v join channels c on c.id = v.channel_id where v.id = ${id} and v.deleted_at is null`;
	if (!v) return undefined;
	if (v.visibility === "private" && viewer?.channelId !== v.channel_id) return undefined;
	return v as Video;
}

// public, ready videos for feeds and search
const LISTED = sql`v.status = 'ready' and v.visibility = 'public' and v.deleted_at is null`;

export async function latestVideos(limit: number, offset = 0, excludeId = ""): Promise<Video[]> {
	return (await sql`select ${VIDEO_COLUMNS} from videos v join channels c on c.id = v.channel_id
		where ${LISTED} and v.id <> ${excludeId} order by v.published_at desc, v.id limit ${limit} offset ${offset}`) as Video[];
}

export async function relatedVideos(video: Video, limit: number, offset = 0): Promise<Video[]> {
	// same channel first, then everything else by recency
	return (await sql`select ${VIDEO_COLUMNS} from videos v join channels c on c.id = v.channel_id
		where ${LISTED} and v.id <> ${video.id}
		order by (v.channel_id = ${video.channel_id}) desc, v.published_at desc, v.id limit ${limit} offset ${offset}`) as Video[];
}

export async function searchVideos(query: string, limit: number, offset: number, sort: "relevance" | "date" | "views" = "relevance"): Promise<Video[]> {
	const q = query.trim();
	const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
	const order = sort === "date" ? sql`v.published_at desc` : sort === "views" ? sql`v.view_count desc` : sql`ts_rank(v.search, plainto_tsquery('simple', ${q})) desc, v.view_count desc`;
	return (await sql`select ${VIDEO_COLUMNS} from videos v join channels c on c.id = v.channel_id
		where ${LISTED} and (v.search @@ plainto_tsquery('simple', ${q}) or v.title ilike ${like} or c.title ilike ${like})
		order by ${order}, v.id limit ${limit} offset ${offset}`) as Video[];
}

export async function searchChannels(query: string, limit: number): Promise<Channel[]> {
	const like = `%${query.trim().replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
	return (await sql`select c.*, (select count(*)::int from subscriptions s where s.channel_id = c.id) as subscriber_count,
		(select count(*)::int from videos v where v.channel_id = c.id and ${LISTED}) as video_count
		from channels c where c.title ilike ${like} or c.handle ilike ${like} order by subscriber_count desc limit ${limit}`) as Channel[];
}

export async function channelVideos(channelId: string, viewer: Viewer, limit: number, offset: number, sort: "newest" | "popular" | "oldest" = "newest"): Promise<Video[]> {
	const own = viewer?.channelId === channelId;
	const order = sort === "popular" ? sql`v.view_count desc` : sort === "oldest" ? sql`coalesce(v.published_at, v.created_at) asc` : sql`coalesce(v.published_at, v.created_at) desc`;
	return (await sql`select ${VIDEO_COLUMNS} from videos v join channels c on c.id = v.channel_id
		where v.channel_id = ${channelId} and v.deleted_at is null and (${own} or (v.status = 'ready' and v.visibility = 'public'))
		order by ${order}, v.id limit ${limit} offset ${offset}`) as Video[];
}

export async function getChannel(where: { id?: string; handle?: string }): Promise<Channel | undefined> {
	const [c] = where.id
		? await sql`select c.*, (select count(*)::int from subscriptions s where s.channel_id = c.id) as subscriber_count,
			(select count(*)::int from videos v where v.channel_id = c.id and ${LISTED}) as video_count from channels c where c.id = ${where.id}`
		: await sql`select c.*, (select count(*)::int from subscriptions s where s.channel_id = c.id) as subscriber_count,
			(select count(*)::int from videos v where v.channel_id = c.id and ${LISTED}) as video_count from channels c where lower(c.handle) = lower(${where.handle ?? ""})`;
	return c as Channel | undefined;
}

export async function isSubscribed(viewer: Viewer, channelId: string): Promise<boolean> {
	if (!viewer) return false;
	const [r] = await sql`select 1 from subscriptions where user_id = ${viewer.userId} and channel_id = ${channelId}`;
	return !!r;
}

export async function reactionOf(viewer: Viewer, videoId: string): Promise<"like" | "dislike" | null> {
	if (!viewer) return null;
	const [r] = await sql`select kind from video_reactions where user_id = ${viewer.userId} and video_id = ${videoId}`;
	return (r?.kind as "like" | "dislike") ?? null;
}

export async function subscribedChannels(viewer: Viewer): Promise<Channel[]> {
	if (!viewer) return [];
	return (await sql`select c.*, 0 as subscriber_count, 0 as video_count from subscriptions s join channels c on c.id = s.channel_id
		where s.user_id = ${viewer.userId} order by c.title`) as Channel[];
}

export async function subscriptionFeed(viewer: Viewer, limit: number, offset: number): Promise<Video[]> {
	if (!viewer) return [];
	return (await sql`select ${VIDEO_COLUMNS} from videos v join channels c on c.id = v.channel_id join subscriptions s on s.channel_id = v.channel_id and s.user_id = ${viewer.userId}
		where ${LISTED} order by v.published_at desc, v.id limit ${limit} offset ${offset}`) as Video[];
}
