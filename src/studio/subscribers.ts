// The channel's subscribers as Studio lists them: the dashboard's Recent
// subscribers card and its See all dialog (creator/list_creator_public_subscribers).
// Only subscribers who made their subscriptions public are named, as on
// YouTube: the "Keep all my subscriptions private" switch (setting 19,
// discoverable subscriptions) is on until turned off.

import type { Viewer } from "../client/page";
import { sql } from "../db";
import { decodeToken, encodeToken } from "../ids";
import { responseContext } from "../innertube/r";
import { ApiError, type Ctx, route } from "../innertube/router";
import { applyMask, publicChannels } from "./channel";

type Order = "SUBSCRIBER_ORDER_SUBSCRIBER_COUNT_DESC" | "SUBSCRIBER_ORDER_SUBSCRIBER_COUNT_ASC" | "SUBSCRIBER_ORDER_TIME_SUBSCRIBED_DESC" | "SUBSCRIBER_ORDER_TIME_SUBSCRIBED_ASC";
type Row = { channel_id: string; created_at: Date; subs: number; back: boolean };

const ORDERS: Record<Order, () => unknown> = {
	SUBSCRIBER_ORDER_SUBSCRIBER_COUNT_DESC: () => sql`subs desc, s.created_at desc`,
	SUBSCRIBER_ORDER_SUBSCRIBER_COUNT_ASC: () => sql`subs asc, s.created_at desc`,
	SUBSCRIBER_ORDER_TIME_SUBSCRIBED_DESC: () => sql`s.created_at desc`,
	SUBSCRIBER_ORDER_TIME_SUBSCRIBED_ASC: () => sql`s.created_at asc`,
};

// the public subscribers since `after`, with their own subscriber counts and
// whether the channel subscribes back
async function subscribers(viewer: NonNullable<Viewer>, after: Date, order: Order, offset: number, limit: number) {
	const where = () => sql`s.channel_id = ${viewer.channelId} and s.created_at >= ${after} and u.disabled_at is null
		and exists(select 1 from account_settings a where a.user_id = s.user_id and a.item = '19' and a.value = 'true'::jsonb)`;
	const from = () => sql`subscriptions s join users u on u.id = s.user_id
		join lateral (select id from channels where user_id = s.user_id order by created_at limit 1) c on true`;
	const rows = (await sql`select c.id as channel_id, s.created_at,
			(select count(*)::int from subscriptions x where x.channel_id = c.id) as subs,
			exists(select 1 from subscriptions b where b.user_id = ${viewer.userId} and b.channel_id = c.id) as back
		from ${from()} where ${where()} order by ${ORDERS[order]()}, c.id offset ${offset} limit ${limit}`) as Row[];
	const [{ n }] = (await sql`select count(*)::int as n from ${from()} where ${where()}`) as { n: number }[];
	return { rows, total: n };
}

const endpoint = (kind: "subscribe" | "unsubscribe", channelId: string) => ({
	commandMetadata: { webCommandMetadata: { sendPost: true, apiUrl: `/youtubei/v1/subscription/${kind}` } },
	[`${kind}Endpoint`]: { channelIds: [channelId] },
});

// the dashboard card: the most followed of the last 90 days' public subscribers
export async function recentSubscribersCard(viewer: NonNullable<Viewer>) {
	const { rows } = await subscribers(viewer, new Date(Date.now() - 90 * 86_400_000), "SUBSCRIBER_ORDER_SUBSCRIBER_COUNT_DESC", 0, 3);
	const ids = rows.map((r) => r.channel_id);
	return {
		card: { body: { basicCard: { item: { recentActivityItem: { timePeriod: "SUBSCRIBER_HIGHLIGHTS_TIME_PERIOD_LAST_90_DAYS", subscriberChannelIds: ids } } } }, id: "recent_activity" },
		channelIds: ids,
	};
}

route(
	"creator/list_creator_public_subscribers",
	async (ctx: Ctx) => {
		const viewer = ctx.viewer;
		if (!viewer) throw new ApiError(401, "Sign in to use Studio.", "authError");
		const q = ctx.body.query ?? {};
		if (q.externalChannelId && q.externalChannelId !== viewer.channelId) throw new ApiError(403, "You can only list your own channel's subscribers.", "forbidden");
		const order: Order = q.order in ORDERS ? q.order : "SUBSCRIBER_ORDER_SUBSCRIBER_COUNT_DESC";
		const after = new Date(Number(q.subscribedAfter?.seconds ?? 0) * 1000 || 0);
		const limit = Math.min(Math.max(Number(q.numSubscriptionsRequested) || 10, 1), 100);
		const token = ctx.body.pageToken ? decodeToken<{ s?: number; o?: number }>(String(ctx.body.pageToken)) : null;
		const offset = token?.s === 3 ? Math.max(0, Number(token.o) || 0) : 0;
		const { rows, total } = await subscribers(viewer, after, order, offset, limit);
		const channels = await publicChannels(rows.map((r) => r.channel_id));
		const next = offset + rows.length < total ? encodeToken({ s: 3, o: offset + rows.length }) : undefined;
		return {
			responseContext: responseContext(viewer),
			subscribers: rows.map((r) => ({
				channelId: r.channel_id,
				timeSubscribed: { seconds: String(Math.floor(+r.created_at / 1000)) },
				subscribeBackData: { subscribedBack: r.back, subscribeServiceEndpoints: [endpoint("subscribe", r.channel_id), endpoint("unsubscribe", r.channel_id)] },
			})),
			creatorChannelData: channels.map((c) => applyMask(c, ctx.body.mask ?? null)),
			...(next ? { nextPageToken: next } : {}),
			totalSize: { size: String(total), achievedTotalSizeAccuracy: "CREATOR_ACHIEVED_TOTAL_SIZE_ACCURACY_EXACT" },
		};
	},
	{ studio: true },
);
