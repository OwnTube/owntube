// Studio's analytics queries, answered from this instance's figures
// (src/stats.ts, reactions, comments, publishing dates).
//
// The dashboard and the analytics pages send queries of one shape:
//   {dimensions: [{type}], metrics: [{type}], restricts: [{dimension: {type}, inValues}],
//    orders: [{metric: {type}, direction}], timeRange, limit: {pageSize, pageOffset}}
// and read back a result table: one column per dimension (video ids as
// strings, days as dateIds or timestamps, hours as timestamps) and one per
// metric (counts, milliseconds or percentages). The shapes are those of the
// captured get_channel_dashboard and yta_web responses.
//
// Supported dimensions: none (totals), DAY, HOUR, VIDEO. Restricts by USER
// (the channel), VIDEO and CREATOR_CONTENT_TYPE (uploads only here). Metrics
// this instance has no data for (impressions, revenue, demographics, ...)
// come back undefined, which Studio shows as "—".

import { sql, textArray } from "../db";

export type Query = {
	dimensions?: { type: string }[];
	metrics?: { type: string; asPercentagesOfTotal?: boolean; includeTotal?: boolean; cumulative?: boolean }[];
	restricts?: { dimension?: { type: string }; inValues?: string[] }[];
	orders?: { metric?: { type: string }; dimension?: { type: string }; direction?: string }[];
	timeRange?: {
		dateIdRange?: { inclusiveStart?: number; exclusiveEnd?: number };
		unixTimeRange?: { inclusiveStart?: string; exclusiveEnd?: string };
		unboundedRange?: Record<string, never>;
	};
	limit?: { pageSize?: number; pageOffset?: number };
};

type Kind = "counts" | "milliseconds" | "percentages";
type Agg = { views: number; watch: number; gained: number; lost: number; likes: number; dislikes: number; comments: number; published: number; duration: number };
const empty = (): Agg => ({ views: 0, watch: 0, gained: 0, lost: 0, likes: 0, dislikes: 0, comments: 0, published: 0, duration: 0 });

const METRICS: Record<string, [Kind, (a: Agg) => number]> = {
	EXTERNAL_VIEWS: ["counts", (a) => a.views],
	VIEWS: ["counts", (a) => a.views],
	EXTERNAL_WATCH_TIME: ["milliseconds", (a) => a.watch],
	WATCH_TIME: ["milliseconds", (a) => a.watch],
	AVERAGE_WATCH_TIME: ["milliseconds", (a) => (a.views ? a.watch / a.views : 0)],
	AVERAGE_VIEW_DURATION: ["milliseconds", (a) => (a.views ? a.watch / a.views : 0)],
	AVERAGE_WATCH_PERCENTAGE: ["percentages", (a) => (a.views && a.duration ? Math.min(1, a.watch / a.views / a.duration) : 0)],
	SUBSCRIBERS_NET_CHANGE: ["counts", (a) => a.gained - a.lost],
	SUBSCRIBERS_GAINED: ["counts", (a) => a.gained],
	SUBSCRIBERS_LOST: ["counts", (a) => a.lost],
	LIKES: ["counts", (a) => a.likes],
	DISLIKES: ["counts", (a) => a.dislikes],
	RATINGS_LIKES: ["counts", (a) => a.likes],
	RATINGS_DISLIKES: ["counts", (a) => a.dislikes],
	COMMENTS: ["counts", (a) => a.comments],
	VIDEO_COUNT_FIRST_PUBLISHED: ["counts", (a) => a.published],
};
export const supportedMetric = (m: string) => m in METRICS;

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const dateId = (ms: number) => Number(new Date(ms).toISOString().slice(0, 10).replace(/-/g, ""));
const fromDateId = (id: number) => Date.UTC(Math.floor(id / 10000), (Math.floor(id / 100) % 100) - 1, id % 100);

// [start, end) in ms; unbounded starts at the channel's first video
export function timeRange(q: Query, since: number): [number, number] {
	const r = q.timeRange ?? {};
	if (r.dateIdRange?.inclusiveStart && r.dateIdRange.exclusiveEnd) return [fromDateId(r.dateIdRange.inclusiveStart), fromDateId(r.dateIdRange.exclusiveEnd)];
	if (r.unixTimeRange?.inclusiveStart && r.unixTimeRange.exclusiveEnd) return [Number(r.unixTimeRange.inclusiveStart) * 1000, Number(r.unixTimeRange.exclusiveEnd) * 1000];
	return [Math.floor(since / DAY) * DAY, Math.ceil((Date.now() + 1) / HOUR) * HOUR];
}

type Fact = { video: string | null; at: number; add: (a: Agg) => void };

// everything that happened to the channel's videos in [start, end)
async function facts(channelId: string, videoIds: string[], start: number, end: number): Promise<Fact[]> {
	const s = new Date(start);
	const e = new Date(end);
	const ids = videoIds.length ? videoIds : [""];
	const [stats, subs, reactions, comments, published] = await Promise.all([
		sql`select video_id, hour, views, watch_ms from video_stats_hourly where video_id = any(${textArray(ids)}::text[]) and hour >= ${s} and hour < ${e}`,
		sql`select hour, subscribers_gained, subscribers_lost from channel_stats_hourly where channel_id = ${channelId} and hour >= ${s} and hour < ${e}`,
		sql`select video_id, created_at, kind from video_reactions where video_id = any(${textArray(ids)}::text[]) and created_at >= ${s} and created_at < ${e}`,
		sql`select video_id, created_at from comments where video_id = any(${textArray(ids)}::text[]) and deleted_at is null and created_at >= ${s} and created_at < ${e}`,
		sql`select id, published_at from videos where id = any(${textArray(ids)}::text[]) and published_at >= ${s} and published_at < ${e}`,
	]);
	const out: Fact[] = [];
	for (const r of stats as any[]) out.push({ video: r.video_id, at: +new Date(r.hour), add: (a) => ((a.views += r.views), (a.watch += Number(r.watch_ms))) });
	for (const r of subs as any[]) out.push({ video: null, at: +new Date(r.hour), add: (a) => ((a.gained += r.subscribers_gained), (a.lost += r.subscribers_lost)) });
	for (const r of reactions as any[]) out.push({ video: r.video_id, at: +new Date(r.created_at), add: (a) => (r.kind === "like" ? a.likes++ : a.dislikes++) });
	for (const r of comments as any[]) out.push({ video: r.video_id, at: +new Date(r.created_at), add: (a) => a.comments++ });
	for (const r of published as any[]) out.push({ video: r.id, at: +new Date(r.published_at), add: (a) => a.published++ });
	return out;
}

export type ChannelVideo = { id: string; duration_ms: number | null; created_at: Date; published_at: Date | null };
export const channelVideos = async (channelId: string) =>
	(await sql`select id, duration_ms, created_at, published_at from videos where channel_id = ${channelId} and deleted_at is null`) as unknown as ChannelVideo[];

export type Options = { dayFormat?: "dateIds" | "timestamps"; videos?: ChannelVideo[] };

export async function runQuery(channelId: string, q: Query, opts: Options = {}) {
	const videos = opts.videos ?? (await channelVideos(channelId));
	const dims = (q.dimensions ?? []).map((d) => d.type);
	const metrics = q.metrics ?? [];
	let ids = videos.map((v) => v.id);
	let channelLevel = true; // whether channel-wide facts (subscribers) count
	let none = false;
	for (const r of q.restricts ?? []) {
		const t = r.dimension?.type;
		const values = r.inValues ?? [];
		if (t === "USER" || t === "CHANNEL") none ||= !values.includes(channelId);
		else if (t === "VIDEO") {
			ids = ids.filter((id) => values.includes(id));
			channelLevel = false;
		} else if (t === "CREATOR_CONTENT_TYPE") none ||= !values.some((v) => v === "VIDEO_ON_DEMAND" || v === "CREATOR_CONTENT_TYPE_VIDEO_ON_DEMAND");
		// restricts on data this instance doesn't keep (traffic sources,
		// countries, devices, ...) match nothing
		else none = true;
	}
	const since = Math.min(Date.now(), ...videos.map((v) => +new Date(v.published_at ?? v.created_at)));
	const [start, end] = timeRange(q, since);
	const all = none ? [] : await facts(channelId, ids, start, end);
	const byId = new Map(videos.map((v) => [v.id, v]));

	// group keys, in dimension order, and their aggregates
	const groups = new Map<string, { key: (string | number)[]; agg: Agg }>();
	const group = (key: (string | number)[]) => {
		const k = JSON.stringify(key);
		let g = groups.get(k);
		if (!g) groups.set(k, (g = { key, agg: empty() }));
		return g;
	};
	const timeDim = dims.find((d) => d === "DAY" || d === "HOUR");
	// time series list every bucket in the range, also the empty ones
	if (timeDim && !dims.includes("VIDEO")) {
		const step = timeDim === "DAY" ? DAY : HOUR;
		for (let t = Math.floor(start / step) * step; t < end && groups.size < 5000; t += step) group([t]);
	}
	if (dims.length === 1 && dims[0] === "VIDEO") for (const id of ids) group([id]).agg.duration = byId.get(id)?.duration_ms ?? 0;
	if (!dims.length) group([]);
	for (const f of all) {
		if (f.video === null && !channelLevel) continue;
		const key = dims.map((d) => (d === "VIDEO" ? f.video : d === "DAY" ? Math.floor(f.at / DAY) * DAY : d === "HOUR" ? Math.floor(f.at / HOUR) * HOUR : ""));
		if (key.some((k) => k === null)) continue;
		const g = group(key as (string | number)[]);
		if (dims.includes("VIDEO")) g.agg.duration = byId.get(g.key[dims.indexOf("VIDEO")] as string)?.duration_ms ?? 0;
		f.add(g.agg);
	}
	if (!dims.length && ids.length) {
		const g = group([]);
		g.agg.duration = videos.reduce((s, v) => s + (v.duration_ms ?? 0), 0) / videos.length;
	}

	let rows = [...groups.values()];
	const order = q.orders?.[0];
	if (order?.metric && METRICS[order.metric.type]) {
		const f = METRICS[order.metric.type][1];
		const sign = order.direction === "ANALYTICS_ORDER_DIRECTION_ASC" ? 1 : -1;
		rows.sort((a, b) => sign * (f(a.agg) - f(b.agg)));
	} else if (timeDim) {
		const i = dims.indexOf(timeDim);
		const desc = order?.dimension?.type === timeDim && order.direction === "ANALYTICS_ORDER_DIRECTION_DESC";
		rows.sort((a, b) => (desc ? -1 : 1) * ((a.key[i] as number) - (b.key[i] as number)));
	}
	if (q.limit?.pageSize) rows = rows.slice(q.limit.pageOffset ?? 0, (q.limit.pageOffset ?? 0) + q.limit.pageSize);

	const dimensionColumns = dims.map((d, i) => {
		const values = rows.map((r) => r.key[i]);
		const col: Record<string, unknown> = { dimension: { type: d } };
		if (d === "VIDEO") col.strings = values.length ? { values } : {};
		else if (d === "DAY" && opts.dayFormat !== "timestamps") col.dateIds = { values: values.map((v) => dateId(v as number)) };
		else if (d === "DAY" || d === "HOUR") col.timestamps = { values };
		else col.strings = {};
		col.columnAnomalies = {};
		return col;
	});
	const metricColumns = metrics.map((m) => {
		const def = METRICS[m.type];
		const col: Record<string, unknown> = { metric: { type: m.type, asPercentagesOfTotal: !!m.asPercentagesOfTotal, includeTotal: !!m.includeTotal, cumulative: !!m.cumulative }, columnAnomalies: {} };
		if (!def) {
			col.counts = { values: rows.map(() => 0) };
			col.undefinedValueIndices = rows.map((_, i) => i);
			return col;
		}
		let values = rows.map((r) => def[1](r.agg));
		if (m.cumulative) {
			let sum = 0;
			values = values.map((v) => (sum += v));
		}
		if (m.asPercentagesOfTotal) {
			const sum = values.reduce((s, v) => s + v, 0);
			col.percentages = { values: values.map((v) => (sum ? v / sum : 0)) };
		} else col[def[0]] = { values: def[0] === "milliseconds" ? values.map(Math.round) : values };
		return col;
	});
	return { resultTable: { ...(dimensionColumns.length ? { dimensionColumns } : {}), metricColumns } };
}
