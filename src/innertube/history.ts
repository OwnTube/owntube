import type { Viewer } from "../client/page";
import { sql } from "../db";

export async function recordWatch(viewer: Viewer, videoId: string, positionMs = 0) {
	if (!viewer) return;
	await sql`insert into watch_history (user_id, video_id, position_ms) values (${viewer.userId}, ${videoId}, ${positionMs})
		on conflict (user_id, video_id) do update set watched_at = now(), position_ms = greatest(watch_history.position_ms, excluded.position_ms)`;
}
