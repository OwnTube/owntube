// Studio's channel dashboard (creator/get_channel_dashboard): the cards it
// shows, filled from this instance's data.
//
// The request names the figures it wants as analytics query nodes
// (factsAnalyticsParams); the "facts" card answers each one (analytics.ts)
// and fills the top videos' details through the request's connectors. The
// card layout is the captured response's; YouTube's own news and promotion
// cards (Creator Insider, product updates) are left out. Card bodies the
// capture had no example of (latest video snapshot, published videos) follow
// the shapes the pinned bundle reads (channel_dashboard and sy9 modules).

import type { Viewer } from "../client/page";
import { responseContext } from "../innertube/r";
import { ApiError, type Ctx, route } from "../innertube/router";
import { make } from "../innertube/tpl";
import { baseVars } from "../innertube/vars";
import { type ChannelVideo, type Query, channelVideos, runQuery } from "./analytics";
import { creatorVideo, maskedVideo, videosFor } from "./video";

// a mask naming every field of an entity, for entities sent along with a card
export function fullMask(o: Record<string, unknown>) {
	return Object.fromEntries(Object.keys(o).map((k) => [k, o[k] && typeof o[k] === "object" && !Array.isArray(o[k]) ? { all: true } : true]));
}
// the client checks a video's mask for these before using it (absent from
// the entity means none: not a livestream or premiere, no ownership claims)
const VIDEO_MASK_EXTRA = { contentOwnershipModelSettings: { all: true }, livestream: { all: true }, publicLivestream: { all: true }, premiere: { all: true }, publicPremiere: { all: true }, responseStatus: { all: true } };
export const videoMask = (video: Record<string, unknown>) => ({ ...fullMask(video), ...VIDEO_MASK_EXTRA });

type Node = { key: string; value: { query?: Query; getTypicalPerformance?: any; getCreatorVideos?: { mask?: any } } };
type Connector = { extractorParams?: { resultKey?: string; resultTableExtractorParams?: { dimension?: { type: string } } }; fillerParams?: { targetKey?: string } };

async function facts(viewer: NonNullable<Viewer>, nodes: Node[], connectors: Connector[], videos: ChannelVideo[]) {
	const results: Record<string, any> = {};
	for (const n of nodes) {
		if (n.value.query) results[n.key] = await runQuery(viewer.channelId, n.value.query, { videos });
		else if (n.value.getTypicalPerformance) {
			const t = n.value.getTypicalPerformance.query ?? {};
			const metrics: { metric?: { type: string } }[] = t.metrics ?? [];
			const current = await runQuery(viewer.channelId, { metrics: metrics.map((m) => ({ type: m.metric?.type ?? "" })), timeRange: t.timeRange }, { videos });
			results[n.key] = {
				getTypicalPerformance: {
					result: {
						metricColumns: metrics.map((m, i) => {
							const col = current.resultTable.metricColumns[i] as any;
							const value = (col.counts ?? col.milliseconds ?? col.percentages)?.values?.[0] ?? 0;
							return { metric: { metric: { type: m.metric?.type } }, currentValue: { column: { type: m.metric?.type }, values: [{ double: value }] } };
						}),
					},
					externalChannelId: viewer.channelId,
				},
			};
		}
	}
	// connectors fill a node with the details of the ids another node returned
	for (const c of connectors) {
		const from = results[c.extractorParams?.resultKey ?? ""]?.resultTable;
		const target = nodes.find((n) => n.key === c.fillerParams?.targetKey);
		if (!target?.value.getCreatorVideos) continue;
		const col = from?.dimensionColumns?.find((d: any) => d.dimension?.type === (c.extractorParams?.resultTableExtractorParams?.dimension?.type ?? "VIDEO"));
		const ids: string[] = col?.strings?.values ?? [];
		const rows = ids.length ? await videosFor(viewer.channelId, ids) : [];
		results[target.key] = { getCreatorVideos: rows.length ? { videos: rows.map((v) => maskedVideo(v, target.value.getCreatorVideos!.mask ?? null)) } : {} };
	}
	for (const n of nodes) results[n.key] ??= {};
	return { body: { basicCard: { item: { channelFactsItem: { channelFactsData: { results: Object.entries(results).map(([key, value]) => ({ key, value })) } } } } }, id: "facts" };
}

// the latest published video's first days, ranked among the channel's recent videos
async function snapshot(viewer: NonNullable<Viewer>, videos: ChannelVideo[]) {
	const published = videos.filter((v) => v.published_at).sort((a, b) => +new Date(b.published_at!) - +new Date(a.published_at!));
	const latest = published[0];
	if (!latest) return undefined;
	const age = Date.now() - +new Date(latest.published_at!);
	// figures are kept by the hour, so a window starts at its publishing hour
	const hourOf = (v: ChannelVideo) => Math.floor(+new Date(v.published_at!) / 3_600_000) * 3600;
	const windowFor = (v: ChannelVideo) => ({ unixTimeRange: { inclusiveStart: String(hourOf(v)), exclusiveEnd: String(Math.ceil((+new Date(v.published_at!) + age) / 1000) + 3600) } });
	const recent = published.slice(0, 10);
	const ranked = [];
	for (const v of recent) {
		const r = await runQuery(viewer.channelId, { metrics: [{ type: "EXTERNAL_VIEWS" }], restricts: [{ dimension: { type: "VIDEO" }, inValues: [v.id] }], timeRange: windowFor(v) }, { videos });
		ranked.push({ id: v.id, views: (r.resultTable.metricColumns[0] as any).counts.values[0] as number });
	}
	ranked.sort((a, b) => b.views - a.views);
	const own = await runQuery(viewer.channelId, { metrics: [{ type: "EXTERNAL_VIEWS" }, { type: "AVERAGE_WATCH_TIME" }, { type: "EXTERNAL_WATCH_TIME" }], restricts: [{ dimension: { type: "VIDEO" }, inValues: [latest.id] }], timeRange: windowFor(latest) }, { videos });
	const cols = own.resultTable.metricColumns as any[];
	const row = (type: string, value: number) => ({ metric: { type }, value: { double: value }, availability: { currentConfidence: "ANALYTICS_DATA_CONFIDENCE_NOT_COMPARABLE" } });
	return {
		body: {
			basicCard: {
				item: {
					entitySnapshotItem: {
						entitySnapshotCardData: {
							video: { externalVideoId: latest.id },
							ranking: { entities: ranked.map((r, i) => ({ entity: { videoId: r.id }, rank: i + 1, metric: { type: "EXTERNAL_VIEWS" }, value: { double: r.views } })) },
							metricsTable: { metricRows: [row("EXTERNAL_VIEWS", cols[0].counts.values[0]), row("AVERAGE_WATCH_TIME", cols[1].milliseconds.values[0]), row("EXTERNAL_WATCH_TIME", cols[2].milliseconds.values[0])] },
						},
					},
				},
			},
		},
		id: "entity_snapshot",
	};
}

route("creator/get_channel_dashboard", async (ctx: Ctx) => {
	const viewer = ctx.viewer;
	if (!viewer) throw new ApiError(401, "Sign in to use Studio.", "authError");
	const params = ctx.body.dashboardParams ?? {};
	if (params.channelId && params.channelId !== viewer.channelId) return { responseContext: responseContext(viewer), cards: [] };
	const videos = await channelVideos(viewer.channelId);
	const f = params.factsAnalyticsParams ?? {};
	const youtube = { ...baseVars(viewer), YOUTUBE: "https://www.youtube.com" };
	const cards: unknown[] = [
		await facts(viewer, f.nodes ?? [], f.connectors ?? [], videos),
		make("studio/dashboard_product_updates", youtube),
		make("studio/dashboard_creator_insider", youtube),
	];
	const snap = await snapshot(viewer, videos);
	if (snap) cards.push(snap);
	// the channel's latest uploads, with their details sent along so the card
	// needn't fetch them
	const latest = (await videosFor(viewer.channelId)).slice(0, 5);
	if (latest.length) cards.push({ body: { listCard: { items: latest.map((v) => ({ recentVideoItem: { videoId: v.id } })) } }, id: "recent_videos" });
	const entities = latest.length || snap ? { videos: (await videosFor(viewer.channelId, [...new Set([...latest.map((v) => v.id), ...((snap?.body.basicCard.item.entitySnapshotItem.entitySnapshotCardData.ranking.entities ?? []).map((e) => e.entity.videoId))])])).map((v) => {
		const video = creatorVideo(v);
		return { mask: videoMask(video), video };
	}) } : {};
	return { responseContext: responseContext(viewer), cards, entities };
});

