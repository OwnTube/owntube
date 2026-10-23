// Studio's analytics pages: yta_web/get_screen (a tab's layout and cards) and
// yta_web/get_cards (cards by config, as the page fetches them in the
// background and when the period changes).
//
// The layout, each tab's card list and the card bodies come from the capture
// (templates studio/analytics_*, a channel without views). The cards this
// instance has figures for are filled from analytics.ts: the overview's
// header, key metrics (views, watch time, subscribers, average view duration,
// likes), top content, the last 48 hours, and content-type tables. The rest
// ask about data this instance doesn't keep (impressions, traffic sources,
// demographics, returning viewers, revenue): they get YouTube's own "nothing
// to show" bodies, moved to the current day, and key metric tabs for such
// metrics are left out.

import { sql } from "../db";
import { responseContext } from "../innertube/r";
import { ApiError, route } from "../innertube/router";
import { make, tpl } from "../innertube/tpl";
import { type ChannelVideo, type Query, channelVideos, contentTypeOf, runQuery, supportedMetric } from "./analytics";
import { videoMask } from "./dashboard";
import { creatorVideo, videosFor } from "./video";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
type Card = Record<string, any>;
type Ctx = { channelId: string; videos: ChannelVideo[]; period: Period; now: number };
type Period = { type: string; start: number; end: number; days: number; phrase: string };

const dayStart = (ms: number) => Math.floor(ms / DAY) * DAY;
const dateId = (ms: number) => Number(new Date(ms).toISOString().slice(0, 10).replace(/-/g, ""));
const fromDateId = (id: number) => Date.UTC(Math.floor(id / 10000), (Math.floor(id / 100) % 100) - 1, id % 100);

// the periods the page's menu offers; like YouTube's, they end with
// yesterday (the client labels them through yesterday), and the realtime
// card covers the hours since
const PERIODS: Record<string, [number, string]> = {
	ANALYTICS_TIME_PERIOD_TYPE_WEEK: [7, "in the last 7 days"],
	ANALYTICS_TIME_PERIOD_TYPE_FOUR_WEEKS: [28, "in the last 28 days"],
	ANALYTICS_TIME_PERIOD_TYPE_LAST_SIXTY_DAYS: [60, "in the last 60 days"],
	ANALYTICS_TIME_PERIOD_TYPE_QUARTER: [90, "in the last 90 days"],
	ANALYTICS_TIME_PERIOD_TYPE_YEAR: [365, "in the last 365 days"],
};
function period(tp: any, videos: ChannelVideo[], now: number): Period {
	const today = dayStart(now);
	const fixed = tp?.fixedTimePeriodData;
	if (fixed?.inclusiveStart && fixed.exclusiveEnd) {
		const ms = (v: any) => (Number(v) < 1e9 ? fromDateId(Number(v)) : Number(v) < 1e11 ? Number(v) * 1000 : Number(v));
		const start = ms(fixed.inclusiveStart);
		const end = ms(fixed.exclusiveEnd);
		return { type: "fixed", start, end, days: Math.max(1, Math.round((end - start) / DAY)), phrase: "in this period" };
	}
	const type: string = tp?.timePeriodType ?? "ANALYTICS_TIME_PERIOD_TYPE_FOUR_WEEKS";
	if (type === "ANALYTICS_TIME_PERIOD_TYPE_LIFETIME") {
		const first = Math.min(today - DAY, ...videos.map((v) => dayStart(+new Date(v.published_at ?? v.created_at))));
		return { type, start: first, end: today, days: Math.round((today - first) / DAY), phrase: "since your first upload" };
	}
	const [days, phrase] = PERIODS[type] ?? PERIODS.ANALYTICS_TIME_PERIOD_TYPE_FOUR_WEEKS;
	return { type, start: today - days * DAY, end: today, days, phrase };
}
const range = (start: number, end: number) => ({ unixTimeRange: { inclusiveStart: String(start / 1000), exclusiveEnd: String(end / 1000) } });

// the capture's bodies, keyed by their config; dates move to today
const NORMAL_SKIP = new Set(["nowSeconds", "entity", "externalChannelId", "channelId"]);
const normal = (o: unknown): string =>
	JSON.stringify(o, (k, v) => (NORMAL_SKIP.has(k) ? undefined : v && typeof v === "object" && !Array.isArray(v) ? Object.fromEntries(Object.keys(v).sort().map((x) => [x, v[x]])) : v));
let catalog: { dayStart: number; dateId: number; byConfig: Map<string, Card>; byType: Map<string, Card> } | undefined;
function captured() {
	if (catalog) return catalog;
	const t = tpl<{ dayStart: number; dateId: number; cards: Card[] }>("studio/analytics_cards");
	const byConfig = new Map<string, Card>();
	const byType = new Map<string, Card>();
	for (const c of t.cards) {
		byConfig.set(normal(c.config), c);
		const k = cardType(c.config);
		if (k && !byType.has(k)) byType.set(k, c);
	}
	return (catalog = { dayStart: t.dayStart, dateId: t.dateId, byConfig, byType });
}
const cardType = (config: Card) => Object.keys(config ?? {}).find((k) => k.endsWith("CardConfig") && k !== "headerCardConfig");

// timestamps (ms) and date ids in a captured body, moved by whole days to now
function rebase(o: any, now: number): any {
	const c = captured();
	const shift = dayStart(now) - c.dayStart;
	const days = Math.round((dayStart(now) - fromDateId(c.dateId)) / DAY);
	const walk = (v: any): any => {
		if (Array.isArray(v)) return v.map(walk);
		if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
		if (typeof v === "number" && v > 1.5e12 && v < 2.5e12) return v + shift;
		if (typeof v === "number" && v > 20_000_000 && v < 21_000_000) return dateId(fromDateId(v) + days * DAY);
		return v;
	};
	return walk(o);
}

function loggingConfig(config: Card) {
	const type = cardType(config) ?? "";
	return {
		...(config.tableCardConfig ? { tableCardConfig: { dimension: config.tableCardConfig.dimension, metrics: config.tableCardConfig.metrics } } : {}),
		cardType: `ANALYTICS_CARD_CONFIG_TYPE_${type.replace(/Config$/, "").replace(/[A-Z]/g, (m) => `_${m}`).toUpperCase()}`,
		entityType: "ANALYTICS_SCREEN_ENTITY_TYPE_CHANNEL",
	};
}
// YouTube's body for a card with nothing to show: the capture's for this
// config (or this kind of card), else hidden
function nothing(config: Card, ctx: Ctx): Card {
	const c = captured();
	const hit = c.byConfig.get(normal(config)) ?? (cardType(config) === "tableCardConfig" ? undefined : c.byType.get(cardType(config) ?? ""));
	if (hit) {
		const filled = JSON.parse(JSON.stringify(hit).replaceAll("{{CHANNEL_ID}}", ctx.channelId).replaceAll("{{NOW_SECONDS}}", String(Math.floor(ctx.now / 1000))));
		const { config: _, ...rest } = rebase(filled, ctx.now);
		return { config, ...rest };
	}
	if (config.tableCardConfig) return { config, sideEntities: {}, tableCardData: { mainTableData: emptyTable(config.tableCardConfig) }, loggingConfig: loggingConfig(config) };
	return { config, isHidden: true, loggingConfig: loggingConfig(config) };
}

const STRING_DIMENSIONS = new Set(["VIDEO", "PLAYLIST", "PODCAST", "COURSE", "CAPTION_LANGUAGE", "TRAFFIC_SOURCE_DETAIL", "COUNTRY", "CITY"]);
function emptyTable(t: Card) {
	return {
		dimensionColumns: [{ dimension: { type: t.dimension }, [STRING_DIMENSIONS.has(t.dimension) ? "strings" : "enumValues"]: {}, columnAnomalies: {} }],
		metricColumns: (t.metrics ?? []).map((m: string) => ({ metric: { type: m, asPercentagesOfTotal: !!t.asPercentagesOfTotal, includeTotal: false, cumulative: false }, columnAnomalies: {}, counts: {} })),
	};
}

const CONTENT_TYPES: Record<string, string[]> = {
	CONTENT_ANALYSIS_TYPE_VIDEO: ["VIDEO_ON_DEMAND"],
	CONTENT_ANALYSIS_TYPE_SHORTS: ["SHORTS"],
	CONTENT_ANALYSIS_TYPE_LIVE_STREAMS: ["LIVE_STREAM"],
	CONTENT_ANALYSIS_TYPE_POSTS: ["POSTS"],
};
// a card's content-type tab restricts its figures; subscribers aren't
// attributed to videos here, so they are only known channel-wide
function restricts(config: Card) {
	const types = CONTENT_TYPES[config.contentAnalysisType];
	return types ? [{ dimension: { type: "CREATOR_CONTENT_TYPE" }, inValues: types }] : [];
}
const known = (metric: string, config: Card) => supportedMetric(metric) && !(CONTENT_TYPES[config.contentAnalysisType] && metric.startsWith("SUBSCRIBERS_"));
const column = (col: any) => col.counts ?? col.milliseconds ?? col.percentages ?? { values: [] };

async function views(ctx: Ctx, start: number, end: number, extra: Card[] = []) {
	const r = await runQuery(ctx.channelId, { metrics: [{ type: "EXTERNAL_VIEWS" }], restricts: extra, timeRange: range(start, end) }, { videos: ctx.videos });
	return column(r.resultTable.metricColumns[0]).values[0] as number;
}

async function personalizedHeader(config: Card, ctx: Ctx) {
	if (config.contentAnalysisType) return nothing(config, ctx);
	const total = await views(ctx, ctx.period.start, ctx.period.end);
	const card = nothing(config, ctx);
	card.personalizedHeaderCardData = { title: total ? `Your channel got ${total.toLocaleString("en-US")} ${total === 1 ? "view" : "views"} ${ctx.period.phrase}` : `Your channel didn’t get any views ${ctx.period.phrase}`, subtitle: "" };
	if (card.analysisVariant?.personalizedChannelOverviewVariant) card.analysisVariant.personalizedChannelOverviewVariant.timePeriod = ctx.period.type;
	return card;
}

async function keyMetric(config: Card, ctx: Ctx) {
	const { start, end, days } = ctx.period;
	const tabs: Card[] = [];
	for (const tab of config.keyMetricCardConfig.metricTabConfigs ?? []) {
		const metric: string = tab.metric;
		if (!known(metric, config)) {
			// figures this instance doesn't keep: the tab is left out
			tabs.push({ metricTabConfig: tab });
			continue;
		}
		const q: Query = { dimensions: [{ type: "DAY" }], metrics: [{ type: metric }], restricts: restricts(config), timeRange: range(start, end) };
		const [daily, total, previous] = await Promise.all([
			runQuery(ctx.channelId, q, { videos: ctx.videos, dayFormat: "timestamps" }),
			runQuery(ctx.channelId, { ...q, dimensions: [] }, { videos: ctx.videos }),
			runQuery(ctx.channelId, { ...q, dimensions: [], timeRange: range(start - days * DAY, start) }, { videos: ctx.videos }),
		]);
		const xs: number[] = (daily.resultTable.dimensionColumns?.[0] as any)?.timestamps?.values ?? [];
		const ys: number[] = column(daily.resultTable.metricColumns[0]).values;
		tabs.push({
			metricTabConfig: tab,
			primaryContent: {
				metric,
				total: column(total.resultTable.metricColumns[0]).values[0] ?? 0,
				mainSeries: { datums: xs.map((x, i) => ({ x, y: ys[i] ?? 0 })), timeUnit: "TIME_PERIOD_UNIT_DAYS" },
				previousTotal: column(previous.resultTable.metricColumns[0]).values[0] ?? 0,
			},
		});
	}
	const card = nothing(config, ctx);
	return { ...card, keyMetricCardData: { keyMetricTabs: tabs }, sideEntities: card.sideEntities ?? {} };
}

// a table of one dimension this instance can group by
async function table(config: Card, t: Card, ctx: Ctx, timeRange = range(ctx.period.start, ctx.period.end)) {
	const metrics: string[] = t.metrics ?? [];
	const restrict = t.restrict?.dimension?.type === "CREATOR_CONTENT_TYPE" ? [{ dimension: t.restrict.dimension, inValues: t.restrict.inValues }] : [];
	const order = t.metricsToOrderBy?.[0] ?? metrics[0];
	const r = await runQuery(
		ctx.channelId,
		{
			dimensions: [{ type: t.dimension }],
			metrics: metrics.map((type) => ({ type, asPercentagesOfTotal: !!t.asPercentagesOfTotal })),
			restricts: [...restrict, ...restricts(config)],
			orders: [{ metric: { type: order }, direction: "ANALYTICS_ORDER_DIRECTION_DESC" }],
			timeRange,
		},
		{ videos: ctx.videos },
	);
	// rows with nothing in the period aren't listed
	const cols = r.resultTable.metricColumns as any[];
	const keep = (cols.length ? column(cols[0]).values : []).map((_: unknown, i: number) => cols.some((c) => column(c).values[i])).map((k: boolean, i: number) => (k ? i : -1)).filter((i: number) => i >= 0).slice(0, t.maxRowCount ?? 10);
	const pick = (o: any) => (o?.values ? { values: keep.map((i: number) => o.values[i]) } : o);
	const dim = r.resultTable.dimensionColumns![0] as any;
	return {
		dimensionColumns: [{ dimension: dim.dimension, ...(dim.strings ? { strings: keep.length ? pick(dim.strings) : {} } : { enumValues: keep.length ? pick(dim.enumValues) : {} }), columnAnomalies: {} }],
		metricColumns: cols.map((c) => {
			const out: any = { metric: c.metric, columnAnomalies: {} };
			for (const k of ["counts", "milliseconds", "percentages"]) if (c[k]) out[k] = keep.length ? pick(c[k]) : {};
			return out;
		}),
	};
}
const groupable = (t: Card, config: Card) =>
	["VIDEO"].includes(t.dimension) && (t.metrics ?? []).every((m: string) => known(m, config)) && (!t.restrict || t.restrict.dimension?.type === "CREATOR_CONTENT_TYPE");

async function tableCard(config: Card, ctx: Ctx) {
	const t = config.tableCardConfig;
	if (!groupable(t, config)) return nothing(config, ctx);
	const card = nothing(config, ctx);
	return { ...card, sideEntities: card.sideEntities ?? {}, tableCardData: { mainTableData: await table(config, t, ctx) } };
}

// views by the hour over the last 48 hours, the top videos among them, and
// the channel's subscriber count
async function latestActivity(config: Card, ctx: Ctx) {
	const end = Math.floor(ctx.now / HOUR) * HOUR + HOUR;
	const start = end - 48 * HOUR;
	const limit = config.latestActivityCardConfig?.tableLimit ?? 3;
	const hourly = await runQuery(ctx.channelId, { dimensions: [{ type: "HOUR" }], metrics: [{ type: "EXTERNAL_VIEWS" }], timeRange: range(start, end) }, { videos: ctx.videos, dayFormat: "timestamps" });
	const top = await table({}, { dimension: "VIDEO", metrics: ["EXTERNAL_VIEWS"], maxRowCount: limit }, ctx, range(start, end));
	const ids: string[] = (top.dimensionColumns[0] as any).strings?.values ?? [];
	const spark = ids.length
		? await runQuery(ctx.channelId, { dimensions: [{ type: "HOUR" }, { type: "VIDEO" }], metrics: [{ type: "EXTERNAL_VIEWS" }], restricts: [{ dimension: { type: "VIDEO" }, inValues: ids }], timeRange: range(start, end) }, { videos: ctx.videos, dayFormat: "timestamps" })
		: undefined;
	const [subs] = await sql`select count(*)::int as n from subscriptions where channel_id = ${ctx.channelId}`;
	const metric = { type: "EXTERNAL_VIEWS", asPercentagesOfTotal: false, includeTotal: false, cumulative: false };
	const card = nothing(config, ctx);
	return {
		...card,
		latestActivityCardData: {
			datas: [
				{
					timePeriod: "ANALYTICS_TIME_PERIOD_TYPE_REALTIME_LAST_48_HOURS",
					mainChartData: hourly.resultTable,
					topEntitiesData: top,
					sparkChartData: spark?.resultTable ?? {
						dimensionColumns: [
							{ dimension: { type: "HOUR" }, timestamps: {}, columnAnomalies: {} },
							{ dimension: { type: "VIDEO" }, strings: {}, columnAnomalies: {} },
						],
						metricColumns: [{ metric, columnAnomalies: {}, counts: {} }],
					},
				},
			],
			lifetimeSubsData: { metricColumns: [{ metric: { ...metric, type: "SUBSCRIBERS_NET_CHANGE" }, columnAnomalies: {}, counts: { values: [subs.n] } }] },
		},
		sideEntities: card.sideEntities ?? {},
	};
}

// the videos a card lists travel with it (sideEntities.videos, mask and
// data) so the page can show their titles and thumbnails without a fetch.
// The mask also names what the page's own video requests ask for.
async function withVideos(card: Card, ctx: Ctx) {
	const ids = new Set<string>();
	const walk = (o: any) => {
		if (!o || typeof o !== "object") return;
		if (o.dimension?.type === "VIDEO" && Array.isArray(o.strings?.values)) for (const id of o.strings.values) ids.add(id);
		for (const v of Array.isArray(o) ? o : Object.values(o)) walk(v);
	};
	walk(card);
	if (!ids.size) return card;
	const videos = (await videosFor(ctx.channelId, [...ids])).map((v) => {
		const entityData = creatorVideo(v);
		return { mask: videoMask(entityData), entityData };
	});
	return { ...card, sideEntities: { ...(card.sideEntities ?? {}), videos } };
}

async function card(config: Card, ctx: Ctx): Promise<Card> {
	return withVideos(await cardFor(config, ctx), ctx);
}
async function cardFor(config: Card, ctx: Ctx): Promise<Card> {
	switch (cardType(config)) {
		case "personalizedHeaderCardConfig":
			return personalizedHeader(config, ctx);
		case "keyMetricCardConfig":
			return keyMetric(config, ctx);
		case "tableCardConfig":
			return tableCard(config, ctx);
		case "latestActivityCardConfig":
			return latestActivity(config, ctx);
		default:
			return nothing(config, ctx);
	}
}

// the Content tab lists a section per kind of content the channel has; the
// capture's channel had videos only, so a Shorts section follows its pattern
// with the Shorts cards the same screen sent
function layoutFor(ctx: Ctx, vars: Record<string, unknown>) {
	const layout = make("studio/analytics_layout", vars);
	const content = layout.desktopLayout.tabs.find((t: Card) => t.tabId === "ANALYTICS_TAB_ID_CONTENT");
	if (content && ctx.videos.some((v) => contentTypeOf(v) === "SHORTS")) {
		const screens = make("studio/analytics_screens", vars) as Record<string, Card[]>;
		const shorts = (screens.ANALYTICS_TAB_ID_CONTENT ?? []).filter((c) => c.contentAnalysisType === "CONTENT_ANALYSIS_TYPE_SHORTS");
		const of = (type: string) => shorts.find((c) => cardType(c) === type);
		const videoSection = content.analysisLayouts.find((a: Card) => a.contentAnalysisType === "CONTENT_ANALYSIS_TYPE_VIDEO");
		const top = videoSection?.cardSection.rightSectionCards.find((c: Card) => c.tableCardConfig?.dimension === "VIDEO");
		if (of("personalizedHeaderCardConfig") && of("keyMetricCardConfig"))
			content.analysisLayouts.push({
				contentAnalysisType: "CONTENT_ANALYSIS_TYPE_SHORTS",
				cardSection: {
					topSectionCards: [of("keyMetricCardConfig")],
					leftSectionCards: [of("tableCarouselCardConfig"), of("stackedBarCardConfig")].filter(Boolean),
					rightSectionCards: [top && { ...top, contentAnalysisType: "CONTENT_ANALYSIS_TYPE_SHORTS" }, of("shortVideoRemixCardConfig")].filter(Boolean),
				},
				headerCardConfig: of("personalizedHeaderCardConfig"),
			});
	}
	// the Content tab opens on its first section
	const first = content?.analysisLayouts?.[0]?.contentAnalysisType;
	if (first && layout.desktopLayout.defaultDesktopState) layout.desktopLayout.defaultDesktopState.selectedContentAnalysis = first;
	return layout;
}

async function context(body: any, viewer: { channelId: string } | null | undefined): Promise<Ctx> {
	if (!viewer) throw new ApiError(401, "Sign in to use Studio.", "authError");
	const entity = body.screenConfig?.entity ?? {};
	if (entity.channelId && entity.channelId !== viewer.channelId) throw new ApiError(403, "The caller does not have permission", "forbidden");
	const now = Date.now();
	const videos = await channelVideos(viewer.channelId);
	return { channelId: viewer.channelId, videos, now, period: period(body.screenConfig?.timePeriod, videos, now) };
}

route("yta_web/get_screen", async ({ body, viewer }) => {
	const ctx = await context(body, viewer);
	const vars = { CHANNEL_ID: ctx.channelId, NOW_SECONDS: String(Math.floor(ctx.now / 1000)) };
	const tabId: string = body.desktopState?.tabId ?? "ANALYTICS_TAB_ID_OVERVIEW";
	const layout = layoutFor(ctx, vars);
	const selected = layout.desktopLayout.selectedTimePeriod;
	if (selected && ctx.period.type !== "fixed") selected.timePeriodType = ctx.period.type;
	const screens = make("studio/analytics_screens", vars) as Record<string, Card[]>;
	const configs = screens[tabId] ?? [];
	return { responseContext: responseContext(viewer), cards: await Promise.all(configs.map((c) => card(c, ctx))), sideEntities: {}, layout };
});

route("yta_web/get_cards", async ({ body, viewer }) => {
	const ctx = await context(body, viewer);
	const configs: Card[] = body.cardConfigs ?? [];
	return { responseContext: responseContext(viewer), cards: await Promise.all(configs.map((c) => card(c, ctx))) };
});
