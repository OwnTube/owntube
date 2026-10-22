// Watch history: recording what a signed-in viewer watches, and the History
// page built from YouTube's (templates history/*, item/video_lockup_history):
// entries grouped by day, the Videos chip, searching the history, removing an
// entry and clearing it all. Removing and clearing are YouTube's feedback
// calls, with tokens minted here.

import type { Viewer } from "../client/page";
import { verifyApiSignature } from "../auth";
import { sql, textArray } from "../db";
import { decodeToken, encodeToken } from "../ids";
import { viewerVars } from "./chrome";
import { type Video, responseContext } from "./r";
import { ApiError, route } from "./router";
import { find, make } from "./tpl";
import { baseVars, videoVars } from "./vars";

const PAGE = 30;

export async function recordWatch(viewer: Viewer, videoId: string, positionMs = 0) {
	if (!viewer) return;
	await sql`insert into watch_history (user_id, video_id, position_ms) values (${viewer.userId}, ${videoId}, ${positionMs})
		on conflict (user_id, video_id) do update set watched_at = now(), position_ms = greatest(watch_history.position_ms, excluded.position_ms)`;
}

export type Entry = Video & { watched_at: Date; position_ms: number };

export async function entries(viewer: NonNullable<Viewer>, offset: number, query: string, limit = PAGE): Promise<Entry[]> {
	const q = query.trim().slice(0, 100);
	const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
	const match = q ? sql`and (v.title ilike ${like} or c.title ilike ${like})` : sql``;
	return (await sql`select v.id, v.title, v.description, v.channel_id, c.title as channel_title, c.handle as channel_handle, c.avatar_path as channel_avatar,
		v.duration_ms, v.view_count::int as view_count, v.like_count, v.comment_count, v.published_at, v.created_at, v.visibility, v.status, v.width, v.height,
		h.watched_at, h.position_ms
		from watch_history h join videos v on v.id = h.video_id join channels c on c.id = v.channel_id
		where h.user_id = ${viewer.userId} and v.deleted_at is null and (v.visibility <> 'private' or v.channel_id = ${viewer.channelId}) ${match}
		order by h.watched_at desc limit ${limit} offset ${offset}`) as Entry[];
}

// the day headings YouTube uses: Today, Yesterday, a weekday this week, then dates
export function dayLabel(d: Date, now = new Date()): string {
	const day = (x: Date) => Math.floor((x.getTime() - x.getTimezoneOffset() * 60000) / 86400000);
	const diff = day(now) - day(d);
	if (diff <= 0) return "Today";
	if (diff === 1) return "Yesterday";
	if (diff < 7) return d.toLocaleDateString("en-US", { weekday: "long" });
	return d.toLocaleDateString("en-US", d.getFullYear() === now.getFullYear() ? { month: "short", day: "numeric" } : { month: "short", day: "numeric", year: "numeric" });
}

export const watchedPercent = (v: { duration_ms: number | null }, positionMs: number) => (v.duration_ms ? Math.min(100, Math.round((positionMs / v.duration_ms) * 100)) : 0);

// a lockup with YouTube's red progress bar, when some of it was watched
export function progressItem(name: string, v: Video, percent: number, vars: Record<string, unknown>) {
	const item = make(name, { ...vars, ...videoVars(v), WATCHED_PERCENT: percent });
	if (!percent) {
		const bottom = find(item, "thumbnailBottomOverlayViewModel");
		if (bottom) delete bottom.progressBar;
	}
	return item;
}

// a history entry; template item/video_lockup_history (History page) or
// item/video_lockup_you_history (the You page's History shelf)
export function entryItem(v: Entry, viewer: Viewer, name = "item/video_lockup_history") {
	return progressItem(name, v, watchedPercent(v, v.position_ms), { ...baseVars(viewer, "/feed/history"), REMOVE_TOKEN: encodeToken({ k: "hremove", v: v.id }) });
}

// how far the viewer got into each video
export async function watchedPercents(viewer: NonNullable<Viewer>, videos: Video[]): Promise<Map<string, number>> {
	if (!videos.length) return new Map();
	const rows = await sql`select video_id, position_ms from watch_history where user_id = ${viewer.userId} and video_id = any(${textArray(videos.map((v) => v.id))}::text[])`;
	const pos = new Map(rows.map((r: { video_id: string; position_ms: number }) => [r.video_id, r.position_ms]));
	return new Map(videos.map((v) => [v.id, watchedPercent(v, Number(pos.get(v.id) ?? 0))]));
}

// day sections for one page, then the continuation when there is more
async function sections(viewer: NonNullable<Viewer>, offset: number, query: string) {
	const rows = await entries(viewer, offset, query);
	const out: unknown[] = [];
	let current: { label: string; items: unknown[] } | undefined;
	for (const v of rows) {
		const label = dayLabel(new Date(v.watched_at));
		if (current?.label !== label) {
			current = { label, items: [] };
			out.push(current);
		}
		current.items.push(entryItem(v, viewer));
	}
	const contents: unknown[] = out.map((s: any) => make("history/section", { DAY: s.label, ITEMS: s.items }));
	if (rows.length === PAGE) contents.push(make("item/continuation", { CONTINUATION: encodeToken({ k: "history", o: offset + PAGE, q: query }) }));
	return contents;
}

// "oggECgIgAQ==" is the Videos chip's params; anything else is All
const VIDEOS_CHIP = "oggECgIgAQ";

export async function historyPage(viewer: Viewer, params?: string, query = "") {
	if (!viewer) return make("history/signed_out", baseVars(viewer, "/feed/history"));
	const contents = await sections(viewer, 0, query);
	const videos = decodeURIComponent(params ?? "").startsWith(VIDEOS_CHIP);
	const page = make("history/page", {
		...baseVars(viewer, "/feed/history"),
		...viewerVars(viewer),
		QUERY: query,
		CLEAR_TOKEN: encodeToken({ k: "hclear" }),
		CHIP_ALL_SELECTED: !videos,
		CHIP_VIDEOS_SELECTED: videos,
		CONTENTS: contents.length ? contents : [{ itemSectionRenderer: { contents: [{ messageRenderer: { text: { runs: [{ text: query ? "No results found" : "This list has no videos." }] } } }] } }],
	});
	return page;
}

export async function historyContinuation(viewer: Viewer, offset: number, query = "") {
	if (!viewer) throw new ApiError(401, "Sign in to do this.", "authError");
	return { responseContext: responseContext(viewer), onResponseReceivedActions: [{ appendContinuationItemsAction: { continuationItems: await sections(viewer, offset, query), targetId: "browse-feedFEhistory" } }] };
}

// /youtubei/v1/feedback: the History page's remove and clear. Other feedback
// (the client's own reports) is accepted and dropped.
route("feedback", async ({ req, body, viewer }) => {
	const tokens = (Array.isArray(body.feedbackTokens) ? body.feedbackTokens : []).slice(0, 20).map((t: unknown) => decodeToken<{ k: string; v?: string }>(String(t))).filter(Boolean);
	const ours = tokens.filter((t: { k: string }) => t.k === "hremove" || t.k === "hclear");
	if (!ours.length) return { responseContext: responseContext(viewer) };
	if (!viewer) throw new ApiError(401, "Sign in to do this.", "authError");
	if (!verifyApiSignature(req, viewer)) throw new ApiError(403, "The request is missing a valid API signature.", "forbidden");
	for (const t of ours as { k: string; v?: string }[]) {
		if (t.k === "hclear") await sql`delete from watch_history where user_id = ${viewer.userId}`;
		else await sql`delete from watch_history where user_id = ${viewer.userId} and video_id = ${String(t.v)}`;
	}
	return { responseContext: responseContext(viewer), feedbackResponses: ours.map(() => ({ isProcessed: true })) };
});
