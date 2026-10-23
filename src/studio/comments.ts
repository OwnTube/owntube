// Studio's Comments pages (the channel's, /channel/<id>/comments, and a
// video's, /video/<id>/comments): comment/get_comments with Studio's filters,
// replies, and the creator's actions (reply, edit, like, heart, remove,
// report as spam and approve, one at a time or for a selection). These are
// Studio routes on the shared router, since the main client's comment
// methods have the same names. The section around the list (header, batch
// action bar, empty message) is YouTube's (template studio/comments_section);
// no capture has a populated list, so the comment renderers follow what the
// client reads (ytcp-comment, ytcp-comment-action-buttons, ytcp-commentbox).

import type { Viewer } from "../client/page";
import { PUBLIC_ORIGIN } from "../config";
import { SHORT } from "../data";
import { sql } from "../db";
import { decodeToken, encodeToken, newCommentId } from "../ids";
import { ago, avatarThumbnails, grouped, responseContext, runs, videoThumbnails } from "../innertube/r";
import { ApiError, type Ctx, route } from "../innertube/router";
import { tpl } from "../innertube/tpl";
import { rateLimit } from "../ratelimit";

const PAGE = 20;
const REPLY_PAGE = 10;

type Row = {
	id: string;
	video_id: string;
	parent_id: string | null;
	text: string;
	like_count: number;
	reply_count: number;
	created_at: Date;
	hearted_at: Date | null;
	spam_at: Date | null;
	author_channel_id: string;
	author_handle: string;
	author_title: string;
	video_title: string;
	video_channel_id: string;
	liked: boolean;
};

type Owner = NonNullable<Viewer>;
function owner(ctx: Ctx): Owner {
	if (!ctx.viewer) throw new ApiError(401, "Sign in to use Studio.", "authError");
	return ctx.viewer;
}

// the list a request asks for: a channel's or a video's comments, published
// or held as spam, with Studio's filters
type Filters = { ch: string; v?: string; m: "published" | "spam" | "none"; q?: string; sort: "relevant" | "new"; engaged?: boolean; questions?: boolean; types?: ("watch" | "short")[] };

function filtersFrom(body: any, viewer: Owner): Filters {
	// the Held tab sends its own filter
	const f = body.commentsFilter ?? body.commentsFilterForHeldForReviewTab ?? {};
	const state = body.moderationState ?? "PUBLISHED";
	const out: Filters = {
		ch: viewer.channelId,
		v: typeof body.videoId === "string" ? body.videoId : undefined,
		// the only comments held here are those the channel reported as spam
		m: state === "PUBLISHED" ? "published" : state === "HELD_FOR_REVIEW" || state === "LIKELY_SPAM" ? "spam" : "none",
		q: String(body.searchQuery ?? f.queryIn?.values?.[0] ?? "").trim() || undefined,
		sort: f.sortBy === "SORT_BY_NEWEST" || body.sortOrder === "NEWEST" ? "new" : "relevant",
	};
	const cats: string[] = f.commentCategoryIn?.values ?? [];
	if (cats.includes("COMMENT_CATEGORY_NOT_ENGAGED")) out.engaged = false;
	if (cats.includes("COMMENT_CATEGORY_ENGAGED")) out.engaged = true;
	if (cats.includes("COMMENT_CATEGORY_CONTAINS_QUESTIONS")) out.questions = true;
	// categories this instance can't tell (follow-ups, Super Thanks) match nothing
	if (cats.some((c) => !["COMMENT_CATEGORY_NOT_ENGAGED", "COMMENT_CATEGORY_ENGAGED", "COMMENT_CATEGORY_CONTAINS_QUESTIONS"].includes(c))) out.m = "none";
	const types: string[] | undefined = f.parentEntityContentTypeIn?.values;
	if (types) out.types = types.flatMap((t) => (t === "PARENT_ENTITY_CONTENT_TYPE_WATCH" ? ["watch" as const] : t === "PARENT_ENTITY_CONTENT_TYPE_SHORT" ? ["short" as const] : []));
	return out;
}

const COLUMNS = (viewer: Owner) => sql`c.id, c.video_id, c.parent_id, c.text, c.like_count, c.reply_count, c.created_at, c.hearted_at, c.spam_at,
	c.author_channel_id, ch.handle as author_handle, ch.title as author_title, v.title as video_title, v.channel_id as video_channel_id,
	exists(select 1 from comment_reactions r where r.comment_id = c.id and r.user_id = ${viewer.userId} and r.kind = 'like') as liked`;

async function threads(viewer: Owner, f: Filters, offset: number, limit: number): Promise<Row[]> {
	if (f.m === "none" || (f.types && !f.types.length)) return [];
	// held comments are listed on their own, replies too
	const conds = [sql`v.channel_id = ${f.ch}`, sql`v.deleted_at is null`, sql`c.deleted_at is null`];
	conds.push(f.m === "spam" ? sql`c.spam_at is not null` : sql`c.spam_at is null and c.parent_id is null`);
	if (f.v) conds.push(sql`c.video_id = ${f.v}`);
	if (f.q) conds.push(sql`c.text ilike ${`%${f.q.replace(/[\\%_]/g, (m) => `\\${m}`)}%`}`);
	if (f.questions) conds.push(sql`c.text like '%?%'`);
	// responded: the channel replied (its own comments are neither)
	const replied = sql`exists(select 1 from comments r where r.parent_id = c.id and r.author_channel_id = v.channel_id and r.deleted_at is null)`;
	if (f.engaged === false) conds.push(sql`c.author_channel_id <> v.channel_id and not ${replied}`);
	if (f.engaged === true) conds.push(replied);
	if (f.types?.length === 1) conds.push(f.types[0] === "short" ? SHORT : sql`not (${SHORT})`);
	const where = conds.reduce((a, b) => sql`${a} and ${b}`);
	const order = f.sort === "new" ? sql`c.created_at desc` : sql`c.like_count desc, c.reply_count desc, c.created_at desc`;
	return (await sql`select ${COLUMNS(viewer)} from comments c join channels ch on ch.id = c.author_channel_id join videos v on v.id = c.video_id
		where ${where} order by ${order}, c.id limit ${limit} offset ${offset}`) as Row[];
}

async function replies(viewer: Owner, parent: string, offset: number, limit: number): Promise<Row[]> {
	return (await sql`select ${COLUMNS(viewer)} from comments c join channels ch on ch.id = c.author_channel_id join videos v on v.id = c.video_id
		where c.parent_id = ${parent} and c.deleted_at is null and c.spam_at is null and v.channel_id = ${viewer.channelId}
		order by c.created_at asc, c.id limit ${limit} offset ${offset}`) as Row[];
}

async function one(viewer: Owner, id: string): Promise<Row | undefined> {
	const [r] = (await sql`select ${COLUMNS(viewer)} from comments c join channels ch on ch.id = c.author_channel_id join videos v on v.id = c.video_id
		where c.id = ${id} and c.deleted_at is null`) as Row[];
	return r;
}

// ---- renderers ----

type Action = "like" | "unlike" | "heart" | "unheart" | "remove" | "spam" | "approve";
// a reply's id is its thread's and its own, as YouTube's are; the client
// finds a reply's thread from it. In the spam list replies stand alone.
const studioId = (c: { id: string; parent_id: string | null }, flat = false) => (c.parent_id && !flat ? `${c.parent_id}.${c.id}` : c.id);
const action = (a: Action, c: Row, viewer: Owner) => ({ performCommentActionEndpoint: { action: encodeToken({ s: 1, a, c: c.id, u: viewer.userId, ...(c.spam_at ? { f: 1 } : {}) }) } });
const text = (s: string) => ({ simpleText: s });
const button = (label: string, extra: Record<string, unknown> = {}) => ({ buttonRenderer: { style: "STYLE_TEXT", size: "SIZE_DEFAULT", text: runs(label), ...extra } });
const a11y = (label: string) => ({ accessibilityData: { label } });
const repliesText = (n: number) => runs(n === 1 ? "1 reply" : `${grouped(n)} replies`);
const watchUrl = (c: Row) => `${PUBLIC_ORIGIN}/watch?v=${c.video_id}&lc=${c.parent_id ? `${c.parent_id}.${c.id}` : c.id}`;

function commentbox(viewer: Owner, placeholder: string, submit: string, endpoint: Record<string, unknown>, editable?: string) {
	return {
		authorThumbnail: avatarThumbnails(viewer.channelId),
		placeholderText: runs(placeholder),
		...(editable === undefined ? {} : { editableText: runs(editable) }),
		replyButton: button(submit, { style: "STYLE_PRIMARY", serviceEndpoint: endpoint }),
		submitButton: button(submit, { style: "STYLE_PRIMARY", serviceEndpoint: endpoint }),
		cancelButton: button("Cancel"),
	};
}

function renderer(c: Row, viewer: Owner, opts: { thumbnail: boolean }) {
	const mine = c.author_channel_id === viewer.channelId;
	const creator = c.video_channel_id === viewer.channelId;
	const replyParams = encodeToken({ s: 1, v: c.video_id, p: c.parent_id ?? c.id });
	const editParams = encodeToken({ s: 1, c: c.id, u: viewer.userId });
	const others = c.like_count - (c.liked ? 1 : 0);
	const menu: unknown[] = [];
	if (mine)
		menu.push({
			menuNavigationItemRenderer: {
				text: runs("Edit"),
				icon: { iconType: "EDIT" },
				navigationEndpoint: c.parent_id
					? { updateCommentReplyDialogEndpoint: { dialog: { commentReplyDialogRenderer: commentbox(viewer, "Edit reply...", "Save", { updateCommentReplyEndpoint: { updateReplyParams: editParams } }, c.text) } } }
					: { updateCommentDialogEndpoint: { dialog: { commentDialogRenderer: commentbox(viewer, "Edit comment...", "Save", { updateCommentEndpoint: { updateCommentParams: editParams } }, c.text) } } },
			},
		});
	if (creator || mine) menu.push({ menuServiceItemRenderer: { text: runs("Remove"), icon: { iconType: "DELETE" }, menuItemIdentifier: "comments_menu_item_remove_button", serviceEndpoint: action("remove", c, viewer) } });
	if (creator && !mine && !c.spam_at) menu.push({ menuServiceItemRenderer: { text: runs("Report as spam"), icon: { iconType: "FLAG" }, serviceEndpoint: action("spam", c, viewer) } });
	const r: Record<string, unknown> = {
		commentId: studioId(c, !!c.spam_at),
		authorText: text(c.author_title),
		authorThumbnail: avatarThumbnails(c.author_channel_id, [32, 48, 88]),
		authorEndpoint: { urlEndpoint: { url: `${PUBLIC_ORIGIN}/@${c.author_handle}` } },
		authorIsChannelOwner: c.author_channel_id === c.video_channel_id,
		contentText: runs(c.text),
		publishedTimeText: runs({ text: ago(c.created_at), navigationEndpoint: { urlEndpoint: { url: watchUrl(c) } } }),
		publishedTime: { seconds: String(Math.floor(+c.created_at / 1000)) },
		...(c.like_count ? { voteCount: { ...text(grouped(c.like_count)), accessibility: a11y(`${grouped(c.like_count)} ${c.like_count === 1 ? "like" : "likes"}`) } } : {}),
		isLiked: c.liked,
		actionButtons: {
			commentActionButtonsRenderer: {
				likeButton: {
					toggleButtonRenderer: {
						isToggled: c.liked,
						isDisabled: false,
						defaultIcon: { iconType: "LIKE" },
						toggledIcon: { iconType: "LIKE" },
						defaultServiceEndpoint: action("like", c, viewer),
						toggledServiceEndpoint: action("unlike", c, viewer),
						defaultTooltip: "Like",
						toggledTooltip: "Unlike",
						accessibilityData: a11y(`Like this comment along with ${grouped(others)} other ${others === 1 ? "person" : "people"}`),
						toggledAccessibilityData: a11y("Unlike"),
					},
				},
				// a held comment can't be replied to until it's approved
				...(c.spam_at ? {} : { replyButton: button("Reply", { navigationEndpoint: { createCommentReplyDialogEndpoint: { dialog: { commentReplyDialogRenderer: commentbox(viewer, "Add a reply...", "Reply", { createCommentReplyEndpoint: { createReplyParams: replyParams } }) } } } }) }),
				...(creator && !mine
					? {
							creatorHeart: {
								creatorHeartRenderer: {
									creatorThumbnail: avatarThumbnails(viewer.channelId, [32, 48]),
									heartIcon: { iconType: "FULL_HEART" },
									heartColor: { argb: 4294901760 },
									isHearted: !!c.hearted_at,
									isEnabled: !c.spam_at,
									heartEndpoint: action("heart", c, viewer),
									unheartEndpoint: action("unheart", c, viewer),
									heartedTooltip: "Remove heart",
									unheartedTooltip: "Heart",
									heartedAccessibility: a11y("Remove heart"),
									unheartedAccessibility: a11y("Heart"),
								},
							},
						}
					: {}),
				...(!c.parent_id && c.reply_count
					? { showRepliesButton: { toggleButtonRenderer: { isToggled: false, isDisabled: false, defaultText: repliesText(c.reply_count), toggledText: repliesText(c.reply_count), defaultIcon: { iconType: "ARROW_DROP_DOWN" }, toggledIcon: { iconType: "ARROW_DROP_UP" } } } }
					: {}),
				style: "COMMENT_ACTION_BUTTON_STYLE_TYPE_DESKTOP_TOOLBAR",
			},
		},
		...(menu.length ? { actionMenu: { menuRenderer: { items: menu, accessibility: a11y("Action menu") } } } : {}),
		trackingParams: "",
	};
	// a held comment carries Approve and Remove buttons; in the published list
	// selection takes Remove from the menu and spam from reportAsSpamCommand
	if (creator && c.spam_at)
		r.moderationButtons = {
			commentModerationButtonsRenderer: {
				approveButton: button("Approve", { icon: { iconType: "CHECK" }, isDisabled: false, serviceEndpoint: action("approve", c, viewer) }),
				removeButton: button("Remove", { icon: { iconType: "DELETE" }, serviceEndpoint: action("remove", c, viewer) }),
			},
		};
	if (creator && !mine && !c.spam_at) r.reportAsSpamCommand = action("spam", c, viewer);
	if (c.spam_at) r.moderationReasonText = runs("You reported this comment as spam");
	if (opts.thumbnail && (!c.parent_id || c.spam_at))
		r.videoThumbnail = {
			commentVideoThumbnailRenderer: {
				videoId: c.video_id,
				thumbnail: videoThumbnails(c.video_id),
				title: runs(c.video_title),
				viewCommentButton: button("View comment", { navigationEndpoint: { urlEndpoint: { url: watchUrl(c), target: "TARGET_NEW_WINDOW" } } }),
			},
		};
	return r;
}

const repliesToken = (parent: string, offset: number) => encodeToken({ k: "sr", p: parent, o: offset });
const more = (token: string) => [{ nextContinuationData: { continuation: token, clickTrackingParams: "" } }];

async function thread(c: Row, viewer: Owner, opts: { thumbnail: boolean; maxReplies: number }) {
	const t: Record<string, unknown> = { comment: { commentRenderer: renderer(c, viewer, opts) }, renderingPriority: "RENDERING_PRIORITY_UNKNOWN", trackingParams: "" };
	if (c.reply_count && !c.spam_at) {
		const rs = await replies(viewer, c.id, 0, opts.maxReplies);
		t.replies = {
			commentRepliesRenderer: {
				contents: rs.map((r) => ({ commentRenderer: renderer(r, viewer, opts) })),
				...(c.reply_count > rs.length ? { continuations: more(repliesToken(c.id, rs.length)) } : {}),
			},
		};
	}
	return { commentThreadRenderer: t };
}

const listToken = (f: Filters, offset: number) => encodeToken({ k: "sc", f, o: offset });

async function page(viewer: Owner, f: Filters, offset: number, maxReplies: number) {
	const rows = await threads(viewer, f, offset, PAGE + 1);
	const contents = await Promise.all(rows.slice(0, PAGE).map((c) => thread(c, viewer, { thumbnail: !f.v, maxReplies })));
	return { contents, continuations: rows.length > PAGE ? more(listToken(f, offset + PAGE)) : undefined };
}

route(
	"comment/get_comments",
	async (ctx) => {
		const viewer = owner(ctx);
		const body = ctx.body;
		if (body.continuation) {
			const t = decodeToken<{ k: string; f: Filters; o: number }>(body.continuation);
			if (t?.k !== "sc" || t.f.ch !== viewer.channelId) throw new ApiError(400, "Invalid continuation");
			const p = await page(viewer, t.f, t.o, REPLY_PAGE);
			return { responseContext: responseContext(viewer), continuationContents: { itemSectionContinuation: { contents: p.contents, ...(p.continuations ? { continuations: p.continuations } : {}) } } };
		}
		if (body.channelId && body.channelId !== viewer.channelId) throw new ApiError(403, "You can only see your own channel's comments.", "forbidden");
		if (body.videoId) {
			const [v] = await sql`select 1 from videos where id = ${body.videoId} and channel_id = ${viewer.channelId} and deleted_at is null`;
			if (!v) throw new ApiError(403, "You can only see your own videos' comments.", "forbidden");
		}
		const f = filtersFrom(body, viewer);
		const p = await page(viewer, f, 0, Math.min(Number(body.maxReplies) || REPLY_PAGE, 50));
		const section = tpl("studio/comments_section");
		if (p.contents.length) section.contents = p.contents;
		if (p.continuations) section.continuations = p.continuations;
		return { responseContext: responseContext(viewer), contents: { itemSectionRenderer: section } };
	},
	{ studio: true },
);

route(
	"comment/get_comment_replies",
	async (ctx) => {
		const viewer = owner(ctx);
		const t = decodeToken<{ k: string; p: string; o: number }>(ctx.body.continuation);
		if (t?.k !== "sr") throw new ApiError(400, "Invalid continuation");
		const rows = await replies(viewer, t.p, t.o, REPLY_PAGE + 1);
		return {
			responseContext: responseContext(viewer),
			continuationContents: {
				commentRepliesContinuation: {
					contents: rows.slice(0, REPLY_PAGE).map((r) => ({ commentRenderer: renderer(r, viewer, { thumbnail: false }) })),
					...(rows.length > REPLY_PAGE ? { continuations: more(repliesToken(t.p, t.o + REPLY_PAGE)) } : {}),
				},
			},
		};
	},
	{ studio: true },
);

// ---- writing ----

function cleanText(body: any) {
	// edits of a reply send replyText
	const s = String(body.commentText ?? body.replyText ?? "").replace(/\r\n?/g, "\n").trim();
	if (!s) throw new ApiError(400, "Comments can't be empty.");
	if (s.length > 10000) throw new ApiError(400, "Comments are limited to 10,000 characters.");
	return s;
}

route(
	"comment/create_comment_reply",
	async (ctx) => {
		const viewer = owner(ctx);
		const p = decodeToken<{ s: number; v: string; p: string }>(ctx.body.createReplyParams);
		if (!p?.s) throw new ApiError(400, "Invalid reply parameters");
		const s = cleanText(ctx.body);
		if (!(await rateLimit(`comment:${viewer.userId}`, 30, 600))) throw new ApiError(429, "You're commenting too fast. Try again in a few minutes.", "rateLimitExceeded");
		const id = newCommentId();
		await sql.begin(async (tx) => {
			const [parent] = await tx`select c.id from comments c join videos v on v.id = c.video_id
				where c.id = ${p.p} and c.video_id = ${p.v} and c.parent_id is null and c.deleted_at is null and v.channel_id = ${viewer.channelId} for update of c`;
			if (!parent) throw new ApiError(404, "The comment you're replying to was removed.");
			await tx`insert into comments (id, video_id, author_channel_id, parent_id, text) values (${id}, ${p.v}, ${viewer.channelId}, ${p.p}, ${s})`;
			await tx`update comments set reply_count = reply_count + 1 where id = ${p.p}`;
			await tx`update videos set comment_count = comment_count + 1 where id = ${p.v}`;
		});
		const row = (await one(viewer, id))!;
		const [{ reply_count }] = await sql`select reply_count from comments where id = ${p.p}`;
		return {
			responseContext: responseContext(viewer),
			actions: [{ createCommentReplyAction: { parentCommentId: p.p, replyToCommentId: "", contents: { commentRenderer: renderer(row, viewer, { thumbnail: false }) }, updatedRepliesCount: repliesText(reply_count) } }],
		};
	},
	{ mutation: true, studio: true },
);

async function edit(ctx: Ctx, token: unknown, reply: boolean) {
	const viewer = owner(ctx);
	const t = decodeToken<{ s: number; c: string; u: string }>(token);
	if (!t?.s || t.u !== viewer.userId) throw new ApiError(400, "Invalid comment parameters");
	const s = cleanText(ctx.body);
	const [c] = await sql`update comments set text = ${s}, edited_at = now() where id = ${t.c} and author_channel_id = ${viewer.channelId} and deleted_at is null
		and (parent_id is not null) = ${reply} returning id`;
	if (!c) throw new ApiError(404, "That comment was removed.");
	const row = (await one(viewer, t.c))!;
	const contents = { commentRenderer: renderer(row, viewer, { thumbnail: !reply }) };
	return {
		responseContext: responseContext(viewer),
		actions: [reply ? { updateCommentReplyAction: { commentId: studioId(row), contents } } : { updateCommentAction: { commentId: row.id, contents } }],
	};
}
route("comment/update_comment", (ctx) => edit(ctx, ctx.body.updateCommentParams, false), { mutation: true, studio: true });
route("comment/update_comment_reply", (ctx) => edit(ctx, ctx.body.updateReplyParams, true), { mutation: true, studio: true });

// a comment leaves the public list (removed or held as spam): its video's
// count goes down by it and its replies, its thread's by one
async function leave(tx: any, c: { id: string; video_id: string; parent_id: string | null; reply_count: number }) {
	await tx`update videos set comment_count = greatest(0, comment_count - ${1 + (c.parent_id ? 0 : c.reply_count)}) where id = ${c.video_id}`;
	if (c.parent_id) await tx`update comments set reply_count = greatest(0, reply_count - 1) where id = ${c.parent_id}`;
}

// the client drops the comment from the list it's in
const removed = (c: { id: string; parent_id: string | null }, flat: boolean) => ({ removeCommentAction: { commentId: studioId(c, flat), ...(c.parent_id && !flat ? { parentCommentId: c.parent_id } : {}) } });

async function perform(viewer: Owner, t: { a: Action; c: string; f?: number }) {
	return sql.begin(async (tx) => {
		const [c] = await tx`select c.id, c.video_id, c.parent_id, c.reply_count, c.author_channel_id, c.spam_at, v.channel_id as video_channel_id
			from comments c join videos v on v.id = c.video_id where c.id = ${t.c} and c.deleted_at is null for update of c`;
		if (!c) return null;
		const creator = c.video_channel_id === viewer.channelId;
		switch (t.a) {
			case "like":
			case "unlike": {
				const [prev] = await tx`select kind from comment_reactions where user_id = ${viewer.userId} and comment_id = ${c.id}`;
				if (t.a === "like" && !prev) {
					await tx`insert into comment_reactions (user_id, comment_id, kind) values (${viewer.userId}, ${c.id}, 'like')`;
					await tx`update comments set like_count = like_count + 1 where id = ${c.id}`;
				} else if (t.a === "unlike" && prev) {
					await tx`delete from comment_reactions where user_id = ${viewer.userId} and comment_id = ${c.id}`;
					if (prev.kind === "like") await tx`update comments set like_count = greatest(0, like_count - 1) where id = ${c.id}`;
				}
				return null;
			}
			case "heart":
			case "unheart":
				if (!creator) throw new ApiError(403, "Only the video's channel can heart its comments.", "forbidden");
				await tx`update comments set hearted_at = ${t.a === "heart" ? sql`coalesce(hearted_at, now())` : null} where id = ${c.id}`;
				return null;
			case "remove":
				if (!creator && c.author_channel_id !== viewer.channelId) throw new ApiError(403, "You can't remove this comment.", "forbidden");
				await tx`update comments set deleted_at = now() where id = ${c.id}`;
				if (!c.spam_at) await leave(tx, c);
				return removed(c, !!t.f);
			case "spam":
				if (!creator || c.author_channel_id === viewer.channelId) throw new ApiError(403, "You can't report this comment.", "forbidden");
				if (c.spam_at) return null;
				await tx`update comments set spam_at = now(), hearted_at = null where id = ${c.id}`;
				await leave(tx, c);
				return removed(c, !!t.f);
			case "approve":
				if (!creator) throw new ApiError(403, "You can't approve this comment.", "forbidden");
				if (!c.spam_at) return null;
				await tx`update comments set spam_at = null where id = ${c.id}`;
				await tx`update videos set comment_count = comment_count + ${1 + (c.parent_id ? 0 : c.reply_count)} where id = ${c.video_id}`;
				if (c.parent_id) await tx`update comments set reply_count = reply_count + 1 where id = ${c.parent_id}`;
				return { approveCommentAction: removed(c, !!t.f).removeCommentAction };
		}
		return null;
	});
}

route(
	"comment/perform_comment_action",
	async (ctx) => {
		const viewer = owner(ctx);
		const tokens: unknown[] = Array.isArray(ctx.body.actions) ? ctx.body.actions : [ctx.body.action];
		// a selection can hold a page of comments and their replies
		if (tokens.length > 500) throw new ApiError(400, "Too many comments at once.");
		const actions: unknown[] = [];
		for (const raw of tokens) {
			const t = decodeToken<{ s: number; a: Action; c: string; u: string }>(raw);
			if (!t?.s || t.u !== viewer.userId) throw new ApiError(400, "Invalid comment action");
			const out = await perform(viewer, t);
			if (out) actions.push(out);
		}
		return { responseContext: responseContext(viewer), actionResults: tokens.map(() => ({ status: "STATUS_SUCCEEDED" })), actions };
	},
	{ mutation: true, studio: true },
);
