// Hourly figures behind Studio's dashboard and analytics (migration 008):
// views and watch time per video, subscribers gained and lost per channel.

import { sql } from "./db";

export async function recordView(videoId: string) {
	await sql`insert into video_stats_hourly (video_id, hour, views) values (${videoId}, date_trunc('hour', now()), 1)
		on conflict (video_id, hour) do update set views = video_stats_hourly.views + 1`;
}

// the segments played since the last ping: st and et are comma-separated
// start and end positions in seconds
export function playedMs(st: string | null, et: string | null): number {
	if (!st || !et) return 0;
	const starts = st.split(",").map(Number);
	const ends = et.split(",").map(Number);
	let ms = 0;
	for (let i = 0; i < Math.min(starts.length, ends.length, 20); i++) {
		const d = ends[i] - starts[i];
		if (Number.isFinite(d) && d > 0) ms += d * 1000;
	}
	// pings come every few seconds to a minute; more than this is not one viewer's playback
	return Math.min(Math.round(ms), 120_000);
}

export async function recordWatchTime(videoId: string, ms: number) {
	if (ms <= 0) return;
	await sql`insert into video_stats_hourly (video_id, hour, watch_ms)
		select id, date_trunc('hour', now()), ${ms} from videos where id = ${videoId}
		on conflict (video_id, hour) do update set watch_ms = video_stats_hourly.watch_ms + excluded.watch_ms`;
}

export async function recordSubscription(channelId: string, subscribed: boolean) {
	if (subscribed)
		await sql`insert into channel_stats_hourly (channel_id, hour, subscribers_gained) values (${channelId}, date_trunc('hour', now()), 1)
			on conflict (channel_id, hour) do update set subscribers_gained = channel_stats_hourly.subscribers_gained + 1`;
	else
		await sql`insert into channel_stats_hourly (channel_id, hour, subscribers_lost) values (${channelId}, date_trunc('hour', now()), 1)
			on conflict (channel_id, hour) do update set subscribers_lost = channel_stats_hourly.subscribers_lost + 1`;
}
