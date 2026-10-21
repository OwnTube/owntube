// Comments on the watch page. The section loads through a /next
// continuation: a header (count, sort menu, composer) and threads, where
// each comment is a commentViewModel holding entity keys and the content
// arrives as frameworkUpdates entity payloads (commentEntityPayload,
// commentSurfaceEntityPayload, engagementToolbar*EntityPayload), as in the
// pinned build. Composer and reply dialog submit to comment/create_comment
// and comment/create_comment_reply; likes go through
// comment/perform_comment_action with tokens this instance signs.

import type { Viewer } from "../client/page";
import { getVideo } from "../data";
import { sql } from "../db";
import { decodeToken, encodeToken, newCommentId } from "../ids";
import { continuationItem } from "./items";
import { ago, avatarThumbnails, avatarUrl, channelEndpoint, compact, grouped, responseContext, runs, serviceEndpoint, signInModal, watchEndpoint } from "./r";
import { ApiError, route } from "./router";
import { rateLimit } from "../ratelimit";

const PAGE = 20;
const REPLY_PAGE = 10;

type Row = { id: string; video_id: string; parent_id: string | null; text: string; like_count: number; reply_count: number; created_at: Date; author_channel_id: string; author_handle: string; author_title: string; video_channel_id: string; liked: boolean };

const key = (kind: string, id: string) => Buffer.from(`${kind}:${id}`).toString("base64url");
const SHARED_KEY = key("shared", "comments");
const now = () => ({ seconds: String(Math.floor(Date.now() / 1000)), nanos: 0 });

function sharedPayload() {
	return {
		entityKey: SHARED_KEY,
		type: "ENTITY_MUTATION_TYPE_REPLACE",
		payload: {
			commentSharedEntityPayload: {
				key: SHARED_KEY,
				strings: { viewAllRepliesButtonA11y: "View all replies", expandText: "Read more", collapseText: "Show less", replyButtonText: "Reply", discardDialogTitle: "Discard comment?", discardDialogAction: "Discard", discardDialogCancel: "Keep writing" },
				toolbarShared: { unlikeButtonA11y: "Unlike", undislikeButtonA11y: "Remove dislike", replyButtonA11y: "Reply", menuButtonA11y: "Action menu", dislikeCommentButtonA11y: "Dislike this comment", dislikeReplyButtonA11y: "Dislike this reply", cancelButtonLabel: "Cancel" },
				clientName: "WEB",
			},
		},
	};
}

function actionToken(action: "like" | "unlike" | "delete", commentId: string, userId: string) {
	return encodeToken({ a: action, c: commentId, u: userId });
}

function replyDialog(c: Row, viewer: NonNullable<Viewer>) {
	return {
		commandMetadata: { webCommandMetadata: { ignoreNavigation: true } },
		createCommentReplyDialogEndpoint: {
			dialog: {
				commentReplyDialogRenderer: {
					replyButton: { buttonRenderer: { style: "STYLE_PRIMARY", size: "SIZE_DEFAULT", isDisabled: true, text: runs("Reply"), serviceEndpoint: serviceEndpoint("/youtubei/v1/comment/create_comment_reply", { createCommentReplyEndpoint: { createReplyParams: encodeToken({ v: c.video_id, p: c.parent_id ?? c.id }) } }) } },
					cancelButton: { buttonRenderer: { style: "STYLE_TEXT", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Cancel") } },
					authorThumbnail: avatarThumbnails(viewer.channelId, [48, 88]),
					placeholderText: runs("Add a reply..."),
					errorMessage: runs("Something went wrong. Try again."),
					emojiButton: { buttonRenderer: { size: "SIZE_SMALL", icon: { iconType: "EMOJI" } } },
				},
			},
		},
	};
}

// the comment's view model plus the entity payloads that fill it
function commentParts(c: Row, viewer: Viewer) {
	const commentKey = key("comment", c.id);
	const toolbarStateKey = key("toolbarstate", c.id);
	const toolbarSurfaceKey = key("toolbarsurface", c.id);
	const surfaceKey = key("surface", c.id);
	const authorEp = channelEndpoint({ id: c.author_channel_id, handle: c.author_handle });
	const isCreator = c.author_channel_id === c.video_channel_id;
	const others = c.like_count - (c.liked ? 1 : 0);
	const signIn = signInModal("Want to join the conversation?", "Sign in to continue", `/watch?v=${c.video_id}`);
	const viewModel = {
		commentViewModel: {
			commentKey,
			sharedKey: SHARED_KEY,
			toolbarStateKey,
			toolbarSurfaceKey,
			commentId: c.id,
			commentSurfaceKey: surfaceKey,
			inlineRepliesKey: "empty_inline_replies",
		},
	};
	const mutations = [
		{
			entityKey: commentKey,
			type: "ENTITY_MUTATION_TYPE_REPLACE",
			payload: {
				commentEntityPayload: {
					key: commentKey,
					properties: { commentId: c.id, content: { content: c.text }, publishedTime: ago(c.created_at), replyLevel: c.parent_id ? 1 : 0, authorButtonA11y: `@${c.author_handle}`, toolbarStateKey },
					author: {
						channelId: c.author_channel_id,
						displayName: `@${c.author_handle}`,
						avatarThumbnailUrl: avatarUrl(c.author_channel_id, 88),
						isVerified: false,
						isCurrentUser: viewer?.channelId === c.author_channel_id,
						isCreator,
						channelCommand: { innertubeCommand: authorEp },
						isArtist: false,
					},
					toolbar: {
						likeCountLiked: compact(others + 1),
						likeCountNotliked: others ? compact(others) : "",
						replyCount: c.parent_id ? "" : c.reply_count ? String(c.reply_count) : "",
						likeButtonA11y: `Like this comment along with ${grouped(others)} other people`,
						engagementToolbarStyle: { value: "ENGAGEMENT_TOOLBAR_STYLE_VALUE_DEFAULT" },
						likeCountA11y: `${grouped(c.like_count)} likes`,
						replyCountA11y: `${c.reply_count} replies`,
						likeInactiveTooltip: "Like",
						likeActiveTooltip: "Unlike",
						dislikeInactiveTooltip: "Dislike",
						dislikeActiveTooltip: "Remove dislike",
					},
				},
			},
		},
		{
			entityKey: surfaceKey,
			type: "ENTITY_MUTATION_TYPE_REPLACE",
			payload: {
				commentSurfaceEntityPayload: {
					key: surfaceKey,
					inlineReadMoreButton: { isExpanded: false },
					publishedTimeCommand: { innertubeCommand: watchEndpoint(c.video_id) },
					threadLines: {},
					relativeNestingLevel: c.parent_id ? 1 : 0,
					avatar: {
						avatarViewModel: {
							image: { sources: [{ url: avatarUrl(c.author_channel_id, 88), width: 88, height: 88 }], processor: { borderImageProcessor: { circular: true } } },
							accessibilityText: `@${c.author_handle}`,
							avatarImageSize: c.parent_id ? "AVATAR_SIZE_24" : "AVATAR_SIZE_40",
							endpoint: { innertubeCommand: authorEp },
						},
					},
				},
			},
		},
		{
			entityKey: toolbarSurfaceKey,
			type: "ENTITY_MUTATION_TYPE_REPLACE",
			payload: {
				engagementToolbarSurfaceEntityPayload: {
					key: toolbarSurfaceKey,
					prepareAccountCommand: { innertubeCommand: viewer ? {} : signIn },
					likeCommand: { innertubeCommand: viewer ? serviceEndpoint("/youtubei/v1/comment/perform_comment_action", { performCommentActionEndpoint: { action: actionToken("like", c.id, viewer.userId) } }) : signIn },
					unlikeCommand: { innertubeCommand: viewer ? serviceEndpoint("/youtubei/v1/comment/perform_comment_action", { performCommentActionEndpoint: { action: actionToken("unlike", c.id, viewer.userId) } }) : signIn },
					dislikeCommand: { innertubeCommand: viewer ? serviceEndpoint("/youtubei/v1/comment/perform_comment_action", { performCommentActionEndpoint: { action: actionToken("unlike", c.id, viewer.userId) } }) : signIn },
					undislikeCommand: { innertubeCommand: viewer ? serviceEndpoint("/youtubei/v1/comment/perform_comment_action", { performCommentActionEndpoint: { action: actionToken("unlike", c.id, viewer.userId) } }) : signIn },
					replyCommand: { innertubeCommand: viewer ? replyDialog(c, viewer) : signIn },
					isEngagementToolbar: true,
				},
			},
		},
		{
			entityKey: toolbarStateKey,
			type: "ENTITY_MUTATION_TYPE_REPLACE",
			payload: { engagementToolbarStateEntityPayload: { key: toolbarStateKey, likeState: c.liked ? "TOOLBAR_LIKE_STATE_LIKED" : "TOOLBAR_LIKE_STATE_INDIFFERENT", heartState: "TOOLBAR_HEART_STATE_UNHEARTED" } },
		},
	];
	return { viewModel, mutations };
}

function thread(c: Row, viewer: Viewer) {
	const { viewModel, mutations } = commentParts(c, viewer);
	const replies = c.reply_count
		? {
				commentRepliesRenderer: {
					viewReplies: { buttonRenderer: { text: runs(c.reply_count === 1 ? "1 reply" : `${grouped(c.reply_count)} replies`), icon: { iconType: "EXPAND" }, iconPosition: "BUTTON_ICON_POSITION_TYPE_LEFT_OF_TEXT" } },
					hideReplies: { buttonRenderer: { text: runs("Hide replies"), icon: { iconType: "COLLAPSE" }, iconPosition: "BUTTON_ICON_POSITION_TYPE_LEFT_OF_TEXT" } },
					targetId: `comment-replies-item-${c.id}`,
					subThreads: [continuationItem(encodeToken({ k: "replies", v: c.video_id, c: c.id, o: 0 }), "/youtubei/v1/next")],
				},
			}
		: undefined;
	return { item: { commentThreadRenderer: { ...(replies ? { replies } : {}), renderingPriority: "RENDERING_PRIORITY_UNKNOWN", isModeratedElqComment: false, commentViewModel: viewModel } }, mutations };
}

async function load(videoId: string, viewer: Viewer, opts: { parent?: string; sort?: string; offset: number; limit: number }): Promise<Row[]> {
	const order = opts.parent ? sql`c.created_at asc` : opts.sort === "new" ? sql`c.created_at desc` : sql`c.like_count desc, c.reply_count desc, c.created_at desc`;
	return (await sql`select c.id, c.video_id, c.parent_id, c.text, c.like_count, c.reply_count, c.created_at, c.author_channel_id, ch.handle as author_handle, ch.title as author_title,
		v.channel_id as video_channel_id, exists(select 1 from comment_reactions r where r.comment_id = c.id and r.user_id = ${viewer?.userId ?? "0"} and r.kind = 'like') as liked
		from comments c join channels ch on ch.id = c.author_channel_id join videos v on v.id = c.video_id
		where c.video_id = ${videoId} and c.deleted_at is null and ${opts.parent ? sql`c.parent_id = ${opts.parent}` : sql`c.parent_id is null`}
		order by ${order}, c.id limit ${opts.limit} offset ${opts.offset}`) as Row[];
}

function composer(videoId: string, viewer: Viewer) {
	const common = { placeholderText: runs("Add a comment..."), avatarSize: "SIMPLEBOX_AVATAR_SIZE_TYPE_DEFAULT", emojiButton: { buttonRenderer: { size: "SIZE_SMALL", icon: { iconType: "EMOJI" }, accessibilityData: { accessibilityData: { label: "Show emoji picker" } } } } };
	if (!viewer)
		return { commentSimpleboxRenderer: { ...common, authorThumbnail: { thumbnails: [{ url: avatarUrl("UC0000000000000000000000", 48), width: 48, height: 48 }] }, prepareAccountEndpoint: signInModal("Want to join the conversation?", "Sign in to continue", `/watch?v=${videoId}`) } };
	return {
		commentSimpleboxRenderer: {
			...common,
			authorThumbnail: avatarThumbnails(viewer.channelId, [48, 88]),
			submitButton: { buttonRenderer: { style: "STYLE_PRIMARY", size: "SIZE_DEFAULT", isDisabled: true, text: runs("Comment"), serviceEndpoint: serviceEndpoint("/youtubei/v1/comment/create_comment", { createCommentEndpoint: { createCommentParams: encodeToken({ v: videoId }) } }), accessibility: { label: "Comment" } } },
			cancelButton: { buttonRenderer: { style: "STYLE_TEXT", size: "SIZE_DEFAULT", isDisabled: false, text: runs("Cancel"), accessibility: { label: "Cancel" } } },
		},
	};
}

function header(videoId: string, count: number, sort: string, viewer: Viewer) {
	const sortItem = (title: string, s: string, subtitle: string) => ({
		title,
		selected: s === sort,
		serviceEndpoint: {
			commandMetadata: { webCommandMetadata: { sendPost: true, apiUrl: "/youtubei/v1/next" } },
			continuationCommand: { token: encodeToken({ k: "comments", v: videoId, s }), request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT", command: { showReloadUiCommand: { targetId: "comments-section" } } },
		},
		subtitle,
	});
	return {
		commentsHeaderRenderer: {
			countText: runs(grouped(count), count === 1 ? " Comment" : " Comments"),
			createRenderer: composer(videoId, viewer),
			sortMenu: { sortFilterSubMenuRenderer: { subMenuItems: [sortItem("Top", "top", "Show featured comments"), sortItem("Newest", "new", "Show recent comments")], title: "Sort by", icon: { iconType: "SORT" }, tooltip: "Sort comments" } },
			titleText: runs("Comments"),
			commentsCount: runs(grouped(count)),
			showSeparator: true,
		},
	};
}

export async function commentsContinuation(tok: { v: string; s?: string; c?: string; o?: number; k?: string }, viewer: Viewer) {
	const video = await getVideo(tok.v, viewer);
	if (!video) throw new ApiError(404, "Video not found");
	const offset = tok.o ?? 0;
	if (tok.k === "replies" && tok.c) {
		const rows = await load(tok.v, viewer, { parent: tok.c, offset, limit: REPLY_PAGE });
		const parts = rows.map((r) => commentParts(r, viewer));
		const items: unknown[] = parts.map((p) => ({ commentViewModel: p.viewModel }));
		if (rows.length === REPLY_PAGE)
			items.push({ continuationItemRenderer: { trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN", button: { buttonRenderer: { style: "STYLE_TEXT", size: "SIZE_DEFAULT", text: runs("Show more replies"), icon: { iconType: "SUBDIRECTORY_ARROW_RIGHT" }, command: { commandMetadata: { webCommandMetadata: { sendPost: true, apiUrl: "/youtubei/v1/next" } }, continuationCommand: { token: encodeToken({ k: "replies", v: tok.v, c: tok.c, o: offset + REPLY_PAGE }), request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT" } } } } } });
		return {
			responseContext: responseContext(viewer),
			onResponseReceivedEndpoints: [{ appendContinuationItemsAction: { continuationItems: items, targetId: `comment-replies-item-${tok.c}` } }],
			frameworkUpdates: { entityBatchUpdate: { mutations: [sharedPayload(), ...parts.flatMap((p) => p.mutations)], timestamp: now() } },
		};
	}
	const sort = tok.s === "new" ? "new" : "top";
	const rows = await load(tok.v, viewer, { sort, offset, limit: PAGE });
	const threads = rows.map((r) => thread(r, viewer));
	const items: unknown[] = threads.map((t) => t.item);
	if (rows.length === PAGE) items.push(continuationItem(encodeToken({ k: "comments", v: tok.v, s: sort, o: offset + PAGE }), "/youtubei/v1/next"));
	const mutations = [sharedPayload(), ...threads.flatMap((t) => t.mutations)];
	const update = { frameworkUpdates: { entityBatchUpdate: { mutations, timestamp: now() } } };
	if (offset > 0) return { responseContext: responseContext(viewer), onResponseReceivedEndpoints: [{ appendContinuationItemsAction: { continuationItems: items, targetId: "comments-section" } }], ...update };
	const [{ n }] = await sql`select count(*)::int as n from comments where video_id = ${tok.v} and deleted_at is null`;
	return {
		responseContext: responseContext(viewer),
		onResponseReceivedEndpoints: [
			{ reloadContinuationItemsCommand: { targetId: "comments-section", continuationItems: [header(tok.v, n, sort, viewer)], slot: "RELOAD_CONTINUATION_SLOT_HEADER" } },
			{ reloadContinuationItemsCommand: { targetId: "comments-section", continuationItems: items, slot: "RELOAD_CONTINUATION_SLOT_BODY" } },
		],
		...update,
	};
}

function cleanText(body: any): string {
	const t = String(body.commentText ?? "").replace(/\r\n?/g, "\n").trim();
	if (!t) throw new ApiError(400, "Comments can't be empty.");
	if (t.length > 10000) throw new ApiError(400, "Comments are limited to 10,000 characters.");
	return t;
}

async function insertComment(videoId: string, viewer: NonNullable<Viewer>, text: string, parent: string | null) {
	if (!(await rateLimit(`comment:${viewer.userId}`, 30, 600))) throw new ApiError(429, "You're commenting too fast. Try again in a few minutes.", "rateLimitExceeded");
	const video = await getVideo(videoId, viewer);
	if (!video || video.status !== "ready") throw new ApiError(404, "Video not found");
	const id = newCommentId();
	await sql.begin(async (tx) => {
		if (parent) {
			const [p] = await tx`select id from comments where id = ${parent} and video_id = ${videoId} and parent_id is null and deleted_at is null`;
			if (!p) throw new ApiError(404, "The comment you're replying to was removed.");
			await tx`update comments set reply_count = reply_count + 1 where id = ${parent}`;
		}
		await tx`insert into comments (id, video_id, author_channel_id, parent_id, text) values (${id}, ${videoId}, ${viewer.channelId}, ${parent}, ${text})`;
		await tx`update videos set comment_count = comment_count + 1 where id = ${videoId}`;
	});
	const [row] = await load(videoId, viewer, { parent: parent ?? undefined, offset: 0, limit: 1000 }).then((rs) => rs.filter((r) => r.id === id));
	return row;
}

route(
	"comment/create_comment",
	async ({ body, viewer }) => {
		const params = decodeToken<{ v: string }>(body.createCommentParams);
		if (!params) throw new ApiError(400, "Invalid comment parameters");
		const row = await insertComment(params.v, viewer!, cleanText(body), null);
		const t = thread(row, viewer);
		return {
			responseContext: responseContext(viewer),
			actions: [{ createCommentAction: { contents: t.item } }],
			frameworkUpdates: { entityBatchUpdate: { mutations: [sharedPayload(), ...t.mutations], timestamp: now() } },
		};
	},
	{ mutation: true },
);

route(
	"comment/create_comment_reply",
	async ({ body, viewer }) => {
		const params = decodeToken<{ v: string; p: string }>(body.createReplyParams);
		if (!params) throw new ApiError(400, "Invalid reply parameters");
		const row = await insertComment(params.v, viewer!, cleanText(body), params.p);
		const parts = commentParts(row, viewer);
		return {
			responseContext: responseContext(viewer),
			actions: [{ createCommentReplyAction: { contents: { commentViewModel: parts.viewModel } } }],
			frameworkUpdates: { entityBatchUpdate: { mutations: [sharedPayload(), ...parts.mutations], timestamp: now() } },
		};
	},
	{ mutation: true },
);

route(
	"comment/perform_comment_action",
	async ({ body, viewer }) => {
		const tokens: unknown[] = Array.isArray(body.actions) ? body.actions : [body.action];
		const mutations: unknown[] = [];
		for (const raw of tokens.slice(0, 10)) {
			const t = decodeToken<{ a: string; c: string; u: string }>(raw);
			if (!t || t.u !== viewer!.userId) throw new ApiError(400, "Invalid comment action");
			if (t.a === "like" || t.a === "unlike") {
				await sql.begin(async (tx) => {
					const [prev] = await tx`select kind from comment_reactions where user_id = ${viewer!.userId} and comment_id = ${t.c} for update`;
					if (t.a === "like" && !prev) {
						await tx`insert into comment_reactions (user_id, comment_id, kind) values (${viewer!.userId}, ${t.c}, 'like')`;
						await tx`update comments set like_count = like_count + 1 where id = ${t.c}`;
					} else if (t.a === "unlike" && prev) {
						await tx`delete from comment_reactions where user_id = ${viewer!.userId} and comment_id = ${t.c}`;
						if (prev.kind === "like") await tx`update comments set like_count = greatest(0, like_count - 1) where id = ${t.c}`;
					}
				});
				const k = key("toolbarstate", t.c);
				mutations.push({ entityKey: k, type: "ENTITY_MUTATION_TYPE_REPLACE", payload: { engagementToolbarStateEntityPayload: { key: k, likeState: t.a === "like" ? "TOOLBAR_LIKE_STATE_LIKED" : "TOOLBAR_LIKE_STATE_INDIFFERENT", heartState: "TOOLBAR_HEART_STATE_UNHEARTED" } } });
			} else if (t.a === "delete") {
				const [c] = await sql`update comments set deleted_at = now() where id = ${t.c} and author_channel_id = ${viewer!.channelId} and deleted_at is null returning video_id, parent_id`;
				if (c) {
					await sql`update videos set comment_count = greatest(0, comment_count - 1) where id = ${c.video_id}`;
					if (c.parent_id) await sql`update comments set reply_count = greatest(0, reply_count - 1) where id = ${c.parent_id}`;
				}
			}
		}
		return { responseContext: responseContext(viewer), actionResults: [{ status: "STATUS_SUCCEEDED" }], frameworkUpdates: { entityBatchUpdate: { mutations, timestamp: now() } } };
	},
	{ mutation: true },
);
