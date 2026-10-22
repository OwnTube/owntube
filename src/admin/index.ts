// /admin: the instance's operator panel. Overview, accounts, videos, the
// processing queue, client compatibility (unhandled requests, patch status),
// instance settings and the audit log of what operators did.
//
// Every request under /admin is authorized here, on the server: signed-out
// viewers are sent to sign in, signed-in non-operators get a 404. Changes
// are POSTed forms carrying the session's API secret as a CSRF token, from
// this origin only; each one is written to admin_actions.

import { timingSafeEqual } from "node:crypto";
import { existsSync } from "node:fs";
import { type Appearance, prefCookie, prefWithAppearance, savedAppearance } from "../appearance";
import { forgetSession, parseCookies } from "../auth";
import { checkPatches, patchFailures } from "../client/assets";
import type { Viewer } from "../client/page";
import { loadPin, loadStudioPin } from "../client/store";
import { INSTANCE_NAME, MAX_UPLOAD_BYTES, MEDIA_DIR, PUBLIC_ORIGIN, SECURE_COOKIES, STUDIO_ORIGIN } from "../config";
import { sql } from "../db";
import { flushMisses } from "../diagnostics";
import { isVideoId } from "../ids";
import { forgetVerifications, VERIFICATIONS, type Verification } from "../innertube/badges";
import { avatarUrl } from "../innertube/r";
import { deleteMedia, enqueue } from "../media/process";
import { saveSetting, settings } from "../settings";
import { type Frame, type Section, action, badge, bytes, date, dateTime, esc, icon, layout, pager, table } from "./ui";

type Admin = NonNullable<Viewer>;
type Ctx = { req: Request; url: URL; viewer: Admin; frame: (section: Section, title: string, extra?: Partial<Frame>) => Frame };

const PAGE_SIZE = 25;

// the outcome of an action, named in the redirect (?done=...)
const DONE: Record<string, [string, boolean?]> = {
	disabled: ["Account disabled and signed out everywhere"],
	enabled: ["Account enabled"],
	granted: ["The account is now an operator"],
	revoked: ["The account is no longer an operator"],
	"signed-out": ["Signed out of every session"],
	marks: ["Marks saved"],
	removed: ["Video removed"],
	reprocess: ["Video queued for processing"],
	retried: ["Job queued again"],
	cleared: ["Diagnostics cleared"],
	saved: ["Settings saved"],
	"feedback-resolved": ["Feedback marked resolved"],
	"feedback-reopened": ["Feedback reopened"],
	"no-source": ["The uploaded file for that video is gone, so it can't be processed again", true],
	self: ["You can't do that to your own account", true],
	missing: ["That no longer exists", true],
};

function html(body: string, status = 200, headers: Record<string, string> = {}, nonce = "") {
	return new Response(body, {
		status,
		headers: {
			"content-type": "text/html; charset=utf-8",
			"cache-control": "no-store",
			"content-security-policy": `default-src 'self'; script-src 'nonce-${nonce}'; style-src 'unsafe-inline'; img-src 'self' data:; font-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'`,
			"x-frame-options": "DENY",
			"referrer-policy": "same-origin",
			"x-content-type-options": "nosniff",
			...headers,
		},
	});
}

const notFound = () => new Response("not found", { status: 404, headers: { "content-type": "text/plain", "cache-control": "no-store" } });

export async function adminRoutes(req: Request, url: URL, viewer: Viewer): Promise<Response | undefined> {
	const path = url.pathname;
	if (path !== "/admin" && !path.startsWith("/admin/")) return undefined;
	if (!viewer) return req.method === "GET" ? Response.redirect(`/signin?next=${encodeURIComponent(path + url.search)}`, 302) : notFound();
	// operators only, and nothing tells anyone else the panel exists
	if (!viewer.isAdmin) return notFound();
	const nonce = Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString("base64url");
	const appearance = savedAppearance(req);
	const ctx: Ctx = {
		req,
		url,
		viewer,
		frame: (section, title, extra = {}) => ({
			viewer,
			appearance,
			section,
			title,
			token: viewer.apiSecret,
			path: path + url.search,
			nonce,
			flash: flash(url),
			...extra,
		}),
	};
	if (req.method === "POST") return post(ctx);
	if (req.method !== "GET" && req.method !== "HEAD") return new Response("method not allowed", { status: 405 });
	const page = GET[path];
	if (!page) return notFound();
	const counts = await guideCounts();
	const { title, section, body, sub, actions, json } = await page(ctx);
	if (json !== undefined) return Response.json(json, { headers: { "cache-control": "no-store" } });
	return html(layout(ctx.frame(section, title, { counts, sub, actions }), body), 200, {}, nonce);
}

function flash(url: URL): Frame["flash"] {
	const d = DONE[url.searchParams.get("done") ?? ""];
	return d ? { text: d[0], bad: d[1] } : undefined;
}

async function guideCounts(): Promise<Frame["counts"]> {
	const [r] = await sql`select (select count(*)::int from processing_jobs where state = 'failed' and finished_at > now() - interval '7 days') as failed,
		(select count(*)::int from feedback where resolved_at is null) as feedback`;
	return { processing: r.failed, feedback: r.feedback };
}

type View = { title: string; section: Section; body: string; sub?: string; actions?: string; json?: unknown };
const GET: Record<string, (ctx: Ctx) => Promise<View>> = {
	"/admin": overview,
	"/admin/accounts": accounts,
	"/admin/account": account,
	"/admin/videos": videos,
	"/admin/processing": processing,
	"/admin/compatibility": compatibility,
	"/admin/settings": settingsPage,
	"/admin/feedback": feedback,
	"/admin/audit": audit,
	"/admin/diagnostics.json": async () => {
		await flushMisses();
		return { title: "", section: "compatibility", body: "", json: await sql`select key, count, first_seen, last_seen, sample from compat_misses order by count desc` };
	},
};

const pageOf = (url: URL) => Math.max(1, Math.min(10_000, Number(url.searchParams.get("page")) || 1));
const like = (q: string) => `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
const thumb = (id: string) => `<img class="thumb" src="/vi/${esc(id)}/mqdefault.jpg" alt="" loading="lazy">`;
const avatar = (channelId: string, size = 36) => `<img class="avatar" src="${esc(avatarUrl(channelId, 88))}" alt="" width="${size}" height="${size}" style="width:${size}px;height:${size}px">`;

const STATUS: Record<string, [string, "" | "good" | "bad" | "warn" | "info"]> = {
	ready: ["Ready", "good"],
	failed: ["Failed", "bad"],
	uploaded: ["Uploading", "info"],
	queued: ["Queued", "info"],
	processing: ["Processing", "warn"],
	running: ["Running", "warn"],
	done: ["Done", "good"],
};
const statusBadge = (s: string) => badge(...(STATUS[s] ?? [s, ""]));
const VISIBILITY: Record<string, string> = { public: "Public", unlisted: "Unlisted", private: "Private" };

// ---- overview ----

async function overview(): Promise<View> {
	await flushMisses();
	const [n] = await sql`select
		(select count(*)::int from users) as accounts,
		(select count(*)::int from users where created_at > now() - interval '7 days') as new_accounts,
		(select count(*)::int from users where disabled_at is not null) as disabled,
		(select count(*)::int from videos where deleted_at is null) as videos,
		(select count(*)::int from videos where deleted_at is null and status = 'ready' and visibility = 'public') as public_videos,
		(select coalesce(sum(view_count), 0)::bigint from videos where deleted_at is null) as views,
		(select count(*)::int from comments where deleted_at is null) as comments,
		(select coalesce(sum(size), 0)::bigint from video_formats f join videos v on v.id = f.video_id where v.deleted_at is null) as stored,
		(select count(*)::int from processing_jobs where state = 'queued') as queued,
		(select count(*)::int from processing_jobs where state = 'running') as running,
		(select count(*)::int from processing_jobs where state = 'failed') as failed,
		(select count(*)::int from compat_misses) as misses`;
	const recent = await sql`select v.id, v.title, v.status, v.visibility, v.created_at, c.title as channel from videos v join channels c on c.id = v.channel_id
		where v.deleted_at is null order by v.created_at desc limit 5`;
	const people = await sql`select u.login, u.created_at, c.id as channel_id, c.title, c.handle from users u join channels c on c.user_id = u.id order by u.created_at desc limit 5`;
	const misses = await sql`select key, count from compat_misses order by count desc, last_seen desc limit 5`;
	const log = await recentActions(5);
	const pin = loadPin();
	const studio = loadStudioPin();
	const failures = patchFailures.size;
	const s = await settings();
	const stat = (num: string, label: string, sub: string) => `<div class="stat"><div class="n">${num}</div><div class="k">${label}</div><div class="s">${sub}</div></div>`;
	const body = `<div class="stats">
${stat(Number(n.accounts).toLocaleString("en-US"), "Accounts", `${n.new_accounts} new this week${n.disabled ? ` · ${n.disabled} disabled` : ""}`)}
${stat(Number(n.videos).toLocaleString("en-US"), "Videos", `${n.public_videos} public and ready`)}
${stat(Number(n.views).toLocaleString("en-US"), "Views", `${Number(n.comments).toLocaleString("en-US")} comments`)}
${stat(bytes(Number(n.stored)), "Media stored", `in ${esc(MEDIA_DIR)}`)}
</div>
<div class="grid">
<section class="card wide"><h2>Latest uploads</h2><div class="rows">${
		recent
			.map((v: any) => `<a class="r" href="/watch?v=${esc(v.id)}">${thumb(v.id)}<div style="min-width:0"><div class="clip" style="font-weight:500">${esc(v.title)}</div><div class="muted clip">${esc(v.channel)} · ${esc(VISIBILITY[v.visibility])}</div></div><span class="v">${statusBadge(v.status)}</span></a>`)
			.join("") || `<p class="muted">No videos yet.</p>`
	}</div><a class="more" href="/admin/videos">All videos</a></section>
<section class="card"><h2>Processing</h2><dl class="kv"><dt>Queued</dt><dd>${n.queued}</dd><dt>Running</dt><dd>${n.running}</dd><dt>Failed</dt><dd>${n.failed ? `<span style="color:var(--red)">${n.failed}</span>` : "0"}</dd></dl><a class="more" href="/admin/processing">Processing queue</a></section>
<section class="card"><h2>Newest accounts</h2><div class="rows">${people
		.map((p: any) => `<a class="r" href="/@${esc(p.handle)}">${avatar(p.channel_id, 32)}<div style="min-width:0"><div class="clip">${esc(p.title)}</div><div class="muted clip">@${esc(p.handle)}</div></div><span class="v">${esc(date(p.created_at))}</span></a>`)
		.join("")}</div><a class="more" href="/admin/accounts">All accounts</a></section>
<section class="card"><h2>Official client</h2><dl class="kv"><dt>Web client</dt><dd class="mono">${esc(pin?.pageBuildLabel ?? "Not pinned")}</dd><dt>Player</dt><dd class="mono">${esc(pin?.player.id ?? "-")}</dd><dt>Studio</dt><dd class="mono">${esc(studio?.pageBuildLabel ?? "Not pinned")}</dd><dt>Patches</dt><dd>${failures ? badge(`${failures} not applied`, "bad") : badge("Applied", "good")}</dd></dl><a class="more" href="/admin/compatibility">Compatibility</a></section>
<section class="card"><h2>Unhandled requests</h2><div class="rows">${
		misses.map((m: any) => `<div class="r"><span class="mono clip">${esc(m.key)}</span><span class="v">${Number(m.count).toLocaleString("en-US")}</span></div>`).join("") || `<p class="muted">Every request the client made was handled.</p>`
	}</div><a class="more" href="/admin/compatibility">${n.misses} kinds recorded</a></section>
<section class="card"><h2>Sign-ups</h2><p style="margin:0">${s.registration === "open" ? "Anyone can create an account." : "Closed. Only existing accounts can sign in."}</p><a class="more" href="/admin/settings">Settings</a></section>
<section class="card wide"><h2>Recent operator activity</h2>${actionRows(log) || `<p class="muted">Nothing yet.</p>`}<a class="more" href="/admin/audit">Audit log</a></section>
</div>`;
	return { title: "Overview", section: "overview", body };
}

// ---- accounts ----

async function accounts({ url, viewer, frame }: Ctx): Promise<View> {
	const q = (url.searchParams.get("q") ?? "").trim().slice(0, 100);
	const filter = url.searchParams.get("filter") ?? "";
	const page = pageOf(url);
	const where = [
		q ? sql`(u.login ilike ${like(q)} or c.handle ilike ${like(q)} or c.title ilike ${like(q)})` : sql`true`,
		filter === "operators" ? sql`u.is_admin` : filter === "disabled" ? sql`u.disabled_at is not null` : sql`true`,
	];
	const rows = await sql`select u.id, u.login, u.is_admin, u.premium, u.created_at, u.disabled_at, c.id as channel_id, c.handle, c.title, c.verification,
			(select count(*)::int from videos v where v.channel_id = c.id and v.deleted_at is null) as videos,
			(select count(*)::int from sessions s where s.user_id = u.id and s.expires_at > now()) as sessions
		from users u join channels c on c.user_id = u.id
		where ${where[0]} and ${where[1]}
		order by u.created_at desc limit ${PAGE_SIZE + 1} offset ${(page - 1) * PAGE_SIZE}`;
	const more = rows.length > PAGE_SIZE;
	const f = frame("accounts", "Accounts");
	const body = `${toolbar("/admin/accounts", q, "Search by name, handle or username", "filter", filter, [
		["", "All"],
		["operators", "Operators"],
		["disabled", "Disabled"],
	])}
${table(
	["Account", "Username", ["Videos", "num"], ["Sessions", "num"], "Joined", "Status", ["", "num"]],
	rows.slice(0, PAGE_SIZE).map((u: any) => {
		const self = String(u.id) === viewer.userId;
		const acts = self ? `<span class="muted">You</span>` : accountActions(f, u);
		return [
			`<a class="who-cell" href="/admin/account?id=${esc(String(u.id))}">${avatar(u.channel_id)}<div style="min-width:0"><b class="clip">${esc(u.title)}${markIcons(u)}</b><span class="muted">@${esc(u.handle)}</span></div></a>`,
			esc(u.login),
			String(u.videos),
			String(u.sessions),
			esc(date(u.created_at)),
			accountStatus(u),
			`<div class="actions">${acts}</div>`,
		];
	}),
	q || filter ? "No accounts match" : "No accounts yet",
)}
${pager("/admin/accounts", url.searchParams, page, more)}`;
	return { title: "Accounts", section: "accounts", body };
}

// the marks an account shows on the site, as small icons after its name
const markIcons = (u: { verification: Verification; premium: boolean }) =>
	[u.verification !== "none" ? `<span class="mark" title="${esc(VERIFICATIONS[u.verification])}">${icon(u.verification, 16)}</span>` : "", u.premium ? `<span class="mark" title="Premium logo">${icon("premium", 16)}</span>` : ""].join("");
const accountStatus = (u: { is_admin: boolean; disabled_at: Date | null }) => [u.is_admin ? badge("Operator", "info") : "", u.disabled_at ? badge("Disabled", "bad") : badge("Active", "good")].join(" ");

function accountActions(f: Frame, u: { id: unknown; handle: string; disabled_at: Date | null; is_admin: boolean; sessions: number }) {
	const id = String(u.id);
	return [
		u.disabled_at
			? action(f, "/admin/accounts/enable", "Enable", { id }, "btn small")
			: action(f, "/admin/accounts/disable", "Disable", { id }, "btn small danger", `Disable @${u.handle}? They are signed out everywhere and can't sign in until enabled again.`),
		u.is_admin
			? action(f, "/admin/accounts/revoke", "Remove operator", { id }, "btn small", `Remove @${u.handle} as an operator?`)
			: action(f, "/admin/accounts/grant", "Make operator", { id }, "btn small", `Make @${u.handle} an operator? They will be able to do everything in this panel.`),
		u.sessions ? action(f, "/admin/accounts/signout", "Sign out", { id }, "btn small", `Sign @${u.handle} out of all ${u.sessions} sessions?`) : "",
	].join("");
}

async function account({ url, viewer, frame }: Ctx): Promise<View> {
	const id = url.searchParams.get("id") ?? "";
	const [u] = /^\d{1,18}$/.test(id)
		? await sql`select u.id, u.login, u.is_admin, u.premium, u.created_at, u.disabled_at, c.id as channel_id, c.handle, c.title, c.verification,
				(select count(*)::int from videos v where v.channel_id = c.id and v.deleted_at is null) as videos,
				(select count(*)::int from subscriptions s where s.channel_id = c.id) as subscribers,
				(select count(*)::int from sessions s where s.user_id = u.id and s.expires_at > now()) as sessions
			from users u join channels c on c.user_id = u.id where u.id = ${id}`
		: [];
	if (!u) return { title: "Account not found", section: "accounts", body: `<section class="card"><p style="margin:0">That account doesn't exist. <a href="/admin/accounts">All accounts</a></p></section>` };
	const f = frame("accounts", u.title);
	const self = String(u.id) === viewer.userId;
	const latest = await sql`select id, title, status, visibility, created_at from videos where channel_id = ${u.channel_id} and deleted_at is null order by created_at desc limit 5`;
	const option = (value: Verification, text: string) =>
		`<label class="option"><input type="radio" name="verification" value="${value}"${u.verification === value ? " checked" : ""}><span><b>${value === "none" ? "" : `<span class="mark">${icon(value, 16)}</span> `}${esc(VERIFICATIONS[value])}</b><span class="muted">${text}</span></span></label>`;
	const body = `<div class="grid">
<section class="card"><div class="who-cell" style="margin-bottom:16px">${avatar(u.channel_id, 48)}<div style="min-width:0"><b class="clip">${esc(u.title)}${markIcons(u)}</b><span class="muted">@${esc(u.handle)}</span></div></div>
<dl class="kv"><dt>Username</dt><dd>${esc(u.login)}</dd><dt>Joined</dt><dd>${esc(date(u.created_at))}</dd><dt>Status</dt><dd>${accountStatus(u)}</dd><dt>Videos</dt><dd>${u.videos}</dd><dt>Subscribers</dt><dd>${u.subscribers}</dd><dt>Sessions</dt><dd>${u.sessions}</dd><dt>Channel ID</dt><dd class="mono">${esc(u.channel_id)}</dd></dl>
<div class="actions" style="margin-top:16px">${self ? `<span class="muted">This is your account</span>` : accountActions(f, u)}</div></section>
<section class="card wide"><h2>Marks</h2><p class="section-note">Shown on the site with YouTube's own badges and logo.</p>
<form method="post" action="/admin/accounts/marks"><input type="hidden" name="token" value="${esc(f.token)}"><input type="hidden" name="back" value="${esc(f.path)}"><input type="hidden" name="id" value="${esc(String(u.id))}">
<h3 class="field-head">Verification</h3>
${option("none", "No badge.")}
${option("verified", "The grey checkmark after the channel name: on the watch page, in search, on lockups, the channel header and comments.")}
${option("artist", "The music note YouTube gives artists, in the same places.")}
<h3 class="field-head">Premium logo</h3>
<label class="option"><input type="checkbox" name="premium" value="1"${u.premium ? " checked" : ""}><span><b><span class="mark">${icon("premium", 16)}</span> YouTube Premium logo</b><span class="muted">The masthead shows the Premium logo for this account.</span></span></label>
<div style="margin-top:16px"><button class="btn primary">Save</button></div></form></section>
<section class="card"><h2>Latest videos</h2>${latest.length ? `<div class="rows">${latest.map((v: any) => `<div class="r"><a href="/watch?v=${esc(v.id)}" class="clip">${esc(v.title)}</a><span class="v">${statusBadge(v.status)}</span></div>`).join("")}</div><a class="more" href="/admin/videos?q=${encodeURIComponent(u.handle)}">All videos</a>` : `<p class="muted" style="margin:0">No videos.</p>`}</section>
</div>`;
	return { title: u.title, section: "accounts", body, sub: `@${u.handle}`, actions: `<a class="btn" href="/@${esc(u.handle)}" target="_blank" rel="noopener">${icon("external", 18)} View channel</a>` };
}

function toolbar(base: string, q: string, placeholder: string, key: string, current: string, chips: [string, string][]) {
	const href = (v: string) => {
		const p = new URLSearchParams();
		if (q) p.set("q", q);
		if (v) p.set(key, v);
		const s = p.toString();
		return `${base}${s ? `?${s}` : ""}`;
	};
	return `<div class="toolbar"><form class="searchbox" role="search" action="${base}">${current ? `<input type="hidden" name="${esc(key)}" value="${esc(current)}">` : ""}<input name="q" value="${esc(q)}" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}"><button aria-label="Search">${icon("search", 20)}</button></form>
<div class="chips">${chips.map(([v, label]) => `<a class="chip${v === current ? " on" : ""}" href="${esc(href(v))}">${esc(label)}</a>`).join("")}</div></div>`;
}

// ---- videos ----

async function videos({ url, frame }: Ctx): Promise<View> {
	const q = (url.searchParams.get("q") ?? "").trim().slice(0, 100);
	const status = url.searchParams.get("status") ?? "";
	const page = pageOf(url);
	const byStatus =
		status === "ready" ? sql`v.status = 'ready'` : status === "processing" ? sql`v.status in ('uploaded', 'queued', 'processing')` : status === "failed" ? sql`v.status = 'failed'` : sql`true`;
	const rows = await sql`select v.id, v.title, v.status, v.error, v.visibility, v.view_count, v.created_at, v.source_path, c.title as channel, c.handle
		from videos v join channels c on c.id = v.channel_id
		where v.deleted_at is null and ${byStatus} and ${q ? (isVideoId(q) ? sql`(v.id = ${q} or v.title ilike ${like(q)})` : sql`(v.title ilike ${like(q)} or c.handle ilike ${like(q)})`) : sql`true`}
		order by v.created_at desc limit ${PAGE_SIZE + 1} offset ${(page - 1) * PAGE_SIZE}`;
	const more = rows.length > PAGE_SIZE;
	const f = frame("videos", "Videos");
	const body = `${toolbar("/admin/videos", q, "Search by title, video ID or channel", "status", status, [
		["", "All"],
		["ready", "Ready"],
		["processing", "Processing"],
		["failed", "Failed"],
	])}
${table(
	["Video", "Channel", "Visibility", "Status", ["Views", "num"], "Uploaded", ["", "num"]],
	rows.slice(0, PAGE_SIZE).map((v: any) => [
		`<a class="who-cell" href="/watch?v=${esc(v.id)}">${thumb(v.id)}<div style="min-width:0"><b class="clamp">${esc(v.title)}</b><span class="muted mono">${esc(v.id)}</span></div></a>`,
		`<a href="/@${esc(v.handle)}">${esc(v.channel)}</a>`,
		esc(VISIBILITY[v.visibility]),
		`${statusBadge(v.status)}${v.error ? `<div class="muted" style="margin-top:4px;max-width:240px">${esc(v.error)}</div>` : ""}`,
		Number(v.view_count).toLocaleString("en-US"),
		esc(date(v.created_at)),
		`<div class="actions">${
			(v.status === "failed" || v.status === "ready") && v.source_path ? action(f, "/admin/videos/reprocess", "Process again", { id: v.id }, "btn small", `Encode "${v.title}" again from its uploaded file?`) : ""
		}${action(f, "/admin/videos/remove", "Remove", { id: v.id }, "btn small danger", `Remove "${v.title}" from ${INSTANCE_NAME}? Its files are deleted; this can't be undone.`)}</div>`,
	]),
	q || status ? "No videos match" : "No videos yet",
)}
${pager("/admin/videos", url.searchParams, page, more)}`;
	return { title: "Videos", section: "videos", body };
}

// ---- processing ----

async function processing({ url, frame }: Ctx): Promise<View> {
	const state = url.searchParams.get("state") ?? "";
	const page = pageOf(url);
	const rows = await sql`select j.id, j.video_id, j.state, j.attempts, j.error, j.created_at, j.started_at, j.finished_at, v.title, v.source_path, v.deleted_at
		from processing_jobs j join videos v on v.id = j.video_id
		where ${["queued", "running", "done", "failed"].includes(state) ? sql`j.state = ${state}` : sql`true`}
		order by j.id desc limit ${PAGE_SIZE + 1} offset ${(page - 1) * PAGE_SIZE}`;
	const more = rows.length > PAGE_SIZE;
	const f = frame("processing", "Processing");
	const took = (j: any) => (j.started_at && j.finished_at ? `${Math.max(1, Math.round((new Date(j.finished_at).getTime() - new Date(j.started_at).getTime()) / 1000))} s` : "");
	const body = `<div class="toolbar"><div class="chips">${[
		["", "All"],
		["queued", "Queued"],
		["running", "Running"],
		["failed", "Failed"],
		["done", "Done"],
	]
		.map(([v, label]) => `<a class="chip${v === state ? " on" : ""}" href="/admin/processing${v ? `?state=${v}` : ""}">${label}</a>`)
		.join("")}</div></div>
${table(
	[["Job", "num"], "Video", "State", ["Attempts", "num"], "Queued", ["Took", "num"], ["", "num"]],
	rows.slice(0, PAGE_SIZE).map((j: any) => [
		String(j.id),
		j.deleted_at ? `<span class="muted">${esc(j.title)} (removed)</span>` : `<a class="link" href="/watch?v=${esc(j.video_id)}">${esc(j.title)}</a>`,
		`${statusBadge(j.state)}${j.error ? `<div class="muted" style="margin-top:4px;max-width:360px">${esc(j.error)}</div>` : ""}`,
		String(j.attempts),
		esc(dateTime(j.created_at)),
		took(j),
		j.state === "failed" && !j.deleted_at && j.source_path ? `<div class="actions">${action(f, "/admin/processing/retry", "Retry", { id: String(j.id) })}</div>` : "",
	]),
	"No jobs",
)}
${pager("/admin/processing", url.searchParams, page, more)}`;
	return { title: "Processing", section: "processing", body, sub: "Encoding uploads into the player's formats" };
}

// ---- compatibility ----

const kind = (k: string) =>
	k.startsWith("csp blocked") ? "Blocked upstream request" : k.startsWith("youtubei") ? "InnerTube method" : k.startsWith("asset") || k.startsWith("app module") || k.startsWith("studio") ? "Client asset" : k.startsWith("page") ? "Page" : k.startsWith("client error") ? "Client error" : "Other";

async function compatibility({ frame }: Ctx): Promise<View> {
	await flushMisses();
	const misses = await sql`select key, count, first_seen, last_seen, sample from compat_misses order by count desc, last_seen desc limit 300`;
	const patches = await checkPatches().catch((e) => [{ id: `Check failed: ${e instanceof Error ? e.message : e}`, matches: 0, expect: 0, ok: false }]);
	const pin = loadPin();
	const studio = loadStudioPin();
	const f = frame("compatibility", "Compatibility");
	const bad = patches.filter((p) => !p.ok).length;
	const body = `<div class="grid">
<section class="card"><h2>Web client</h2><dl class="kv"><dt>Build</dt><dd class="mono">${esc(pin?.pageBuildLabel ?? "Not pinned")}</dd><dt>Player</dt><dd class="mono">${esc(pin?.player.id ?? "-")}</dd><dt>Pinned</dt><dd>${esc(dateTime(pin?.fetchedAt))}</dd></dl></section>
<section class="card"><h2>YouTube Studio</h2><dl class="kv"><dt>Build</dt><dd class="mono">${esc(studio?.pageBuildLabel ?? "Not pinned")}</dd><dt>Modules</dt><dd>${studio ? Object.keys(studio.app.modules).length : 0}</dd><dt>Pinned</dt><dd>${esc(dateTime(studio?.fetchedAt))}</dd><dt>Origin</dt><dd class="mono">${esc(STUDIO_ORIGIN)}</dd></dl></section>
<section class="card"><h2>Patches</h2><p style="margin:0">${bad ? `${bad} of ${patches.length} patches don't match the pinned client. The client may misbehave until they are fixed.` : `All ${patches.length} patches match the pinned client.`}</p>${patchFailures.size ? `<p style="color:var(--red)">Not applied while serving: ${esc([...patchFailures.keys()].join(", "))}</p>` : ""}</section>
</div>
<div class="section-head"><h2>Unhandled requests</h2><div class="end"><a class="btn" href="/admin/diagnostics.json">Download JSON</a>${misses.length ? action(f, "/admin/compatibility/clear", "Clear", {}, "btn", "Clear all recorded requests?") : ""}</div></div>
<p class="section-note">What the client asked for that this instance didn't answer, most frequent first. Samples are redacted when recorded.</p>
${table(
	[["Kind", "nowrap"], "Request", ["Count", "num"], ["Last seen", "nowrap"], "Sample"],
	misses.map((m: any) => [esc(kind(m.key)), `<span class="mono">${esc(m.key)}</span>`, Number(m.count).toLocaleString("en-US"), esc(dateTime(m.last_seen)), `<span class="mono clamp">${esc(String(m.sample ?? "").slice(0, 300))}</span>`]),
	"Every request the client made was handled",
)}
<div class="section-head"><h2>Patch checks</h2></div>
<p class="section-note">The documented changes made to the official client as it is served, and whether each still finds what it changes.</p>
${table(
	["Patch", ["Matches", "num"], ["Expected", "num"], "State"],
	patches.map((p) => [`<span class="mono">${esc(p.id)}</span>`, String(p.matches), String(p.expect), p.ok ? badge("Matches", "good") : badge("Mismatch", "bad")]),
)}`;
	return { title: "Compatibility", section: "compatibility", body };
}

// ---- settings ----

async function settingsPage({ frame }: Ctx): Promise<View> {
	const s = await settings();
	const f = frame("settings", "Settings");
	const option = (value: string, title: string, text: string) =>
		`<label class="option"><input type="radio" name="registration" value="${value}"${s.registration === value ? " checked" : ""}><span><b>${title}</b><span class="muted">${text}</span></span></label>`;
	const body = `<div class="grid">
<section class="card wide"><h2>Sign-ups</h2><form method="post" action="/admin/settings/registration"><input type="hidden" name="token" value="${esc(f.token)}"><input type="hidden" name="back" value="/admin/settings">
${option("open", "Open", "Anyone can create an account from the sign-in page.")}
${option("closed", "Closed", "The sign-in page has no Create account option. Existing accounts keep working.")}
<div style="margin-top:16px"><button class="btn primary">Save</button></div></form></section>
<section class="card"><h2>Instance</h2><dl class="kv"><dt>Name</dt><dd>${esc(INSTANCE_NAME)}</dd><dt>Address</dt><dd class="mono">${esc(PUBLIC_ORIGIN)}</dd><dt>Studio</dt><dd class="mono">${esc(STUDIO_ORIGIN)}</dd><dt>Media</dt><dd class="mono">${esc(MEDIA_DIR)}</dd><dt>Upload limit</dt><dd>${bytes(MAX_UPLOAD_BYTES)}</dd></dl>
<p class="muted" style="margin:16px 0 0">These come from the server's environment (README, Configuration).</p></section>
</div>`;
	return { title: "Settings", section: "settings", body };
}

// ---- audit log ----

async function recentActions(limit: number, offset = 0) {
	return await sql`select a.id, a.action, a.target, a.detail, a.created_at, c.handle, c.id as channel_id
		from admin_actions a left join users u on u.id = a.admin_id left join channels c on c.user_id = u.id
		order by a.id desc limit ${limit} offset ${offset}`;
}

const ACTION_TEXT: Record<string, string> = {
	"feedback.resolve": "marked resolved",
	"feedback.reopen": "reopened",
	"account.disable": "disabled",
	"account.enable": "enabled",
	"account.grant": "made an operator:",
	"account.revoke": "removed as operator:",
	"account.signout": "signed out",
	"account.marks": "changed the marks of",
	"video.remove": "removed video",
	"video.reprocess": "queued for processing:",
	"job.retry": "retried job",
	"diagnostics.clear": "cleared diagnostics",
	"settings.registration": "set sign-ups to",
};

function actionRows(rows: any[]) {
	if (!rows.length) return "";
	return `<div class="rows">${rows
		.map(
			(a) =>
				`<div class="r">${a.channel_id ? avatar(a.channel_id, 24) : ""}<div style="min-width:0" class="clip"><b style="font-weight:500">@${esc(a.handle ?? "deleted")}</b> ${esc(ACTION_TEXT[a.action] ?? a.action)} ${esc(a.target)}${a.detail ? ` <span class="muted">${esc(a.detail)}</span>` : ""}</div><span class="v">${esc(dateTime(a.created_at))}</span></div>`,
		)
		.join("")}</div>`;
}

// ---- feedback ----

// what people sent with the account menu's Send feedback (src/feedback.ts)
async function feedback({ url, frame }: Ctx): Promise<View> {
	const state = url.searchParams.get("state") === "resolved" ? "resolved" : "open";
	const page = pageOf(url);
	const rows = await sql`select f.id, f.user_id, f.page, f.body, f.user_agent, f.created_at, f.resolved_at, c.id as channel_id, c.handle, c.title
		from feedback f left join channels c on c.user_id = f.user_id
		where ${state === "open" ? sql`f.resolved_at is null` : sql`f.resolved_at is not null`}
		order by f.id desc limit ${PAGE_SIZE + 1} offset ${(page - 1) * PAGE_SIZE}`;
	const f = frame("feedback", "Feedback");
	const body = `<div class="toolbar"><div class="chips">${[
		["open", "Open"],
		["resolved", "Resolved"],
	]
		.map(([v, label]) => `<a class="chip${v === state ? " on" : ""}" href="/admin/feedback${v === "open" ? "" : `?state=${v}`}">${label}</a>`)
		.join("")}</div></div>
${table(
	["Received", "From", "Feedback", "Page", ["", "num"]],
	rows.slice(0, PAGE_SIZE).map((r: any) => [
		esc(dateTime(r.created_at)),
		r.channel_id ? `<a class="link" href="/admin/account?id=${esc(String(r.user_id))}">${esc(r.title)}</a><div class="muted">@${esc(r.handle)}</div>` : `<span class="muted">Signed out</span>`,
		`<div style="white-space:pre-wrap;max-width:480px">${esc(r.body)}</div>`,
		r.page ? `<a class="link" href="${esc(r.page)}">${esc(r.page)}</a>` : "",
		`<div class="actions">${action(f, r.resolved_at ? "/admin/feedback/reopen" : "/admin/feedback/resolve", r.resolved_at ? "Reopen" : "Mark resolved", { id: String(r.id) })}</div>`,
	]),
	state === "open" ? "No open feedback" : "No resolved feedback",
)}${pager("/admin/feedback", url.searchParams, page, rows.length > PAGE_SIZE)}`;
	return { title: "Feedback", section: "feedback", body, sub: "What people sent with Send feedback" };
}

async function audit({ url }: Ctx): Promise<View> {
	const page = pageOf(url);
	const rows = await recentActions(PAGE_SIZE + 1, (page - 1) * PAGE_SIZE);
	const body = `<section class="card">${actionRows(rows.slice(0, PAGE_SIZE)) || `<p class="muted" style="margin:0">No operator actions yet.</p>`}</section>${pager("/admin/audit", url.searchParams, page, rows.length > PAGE_SIZE)}`;
	return { title: "Audit log", section: "audit", body, sub: "Every change made from this panel" };
}

// ---- changes ----

function sameToken(a: string, b: string) {
	const x = Buffer.from(a);
	const y = Buffer.from(b);
	return x.length === y.length && timingSafeEqual(x, y);
}

async function post(ctx: Ctx): Promise<Response> {
	const { req, url, viewer } = ctx;
	// forms from this origin's own pages only
	const origin = req.headers.get("origin");
	if (origin && origin !== url.origin && origin !== PUBLIC_ORIGIN) return new Response("forbidden", { status: 403 });
	const site = req.headers.get("sec-fetch-site");
	if (site && site !== "same-origin") return new Response("forbidden", { status: 403 });
	const form = await req.formData().catch(() => undefined);
	const get = (k: string) => String(form?.get(k) ?? "");
	if (!sameToken(get("token"), viewer.apiSecret)) return new Response("forbidden", { status: 403 });
	const back = get("back").startsWith("/admin") && !get("back").startsWith("//") ? get("back") : "/admin";
	const to = (done: string) => {
		const u = new URL(back, url.origin);
		u.searchParams.set("done", done);
		return new Response(null, { status: 303, headers: { location: u.pathname + u.search } });
	};
	const log = (act: string, target: string, detail = "") => sql`insert into admin_actions (admin_id, action, target, detail) values (${viewer.userId}, ${act}, ${target}, ${detail.slice(0, 500)})`;

	switch (url.pathname) {
		case "/admin/appearance": {
			const a = get("appearance") as Appearance;
			if (!["dark", "light", "device"].includes(a)) return new Response("bad request", { status: 400 });
			const value = prefWithAppearance(parseCookies(req).PREF ?? "", a);
			return new Response(null, { status: 303, headers: { location: back, "set-cookie": prefCookie(value, SECURE_COOKIES) } });
		}
		case "/admin/feedback/resolve":
		case "/admin/feedback/reopen": {
			const id = get("id");
			if (!/^\d{1,18}$/.test(id)) return to("missing");
			const resolve = url.pathname.endsWith("/resolve");
			const [r] = await sql`update feedback set resolved_at = ${resolve ? sql`now()` : null} where id = ${id} returning id`;
			if (!r) return to("missing");
			await log(resolve ? "feedback.resolve" : "feedback.reopen", `feedback:${id}`);
			return to(resolve ? "feedback-resolved" : "feedback-reopened");
		}
		case "/admin/accounts/disable":
		case "/admin/accounts/enable":
		case "/admin/accounts/grant":
		case "/admin/accounts/revoke":
		case "/admin/accounts/signout": {
			const id = get("id");
			if (!/^\d{1,18}$/.test(id)) return to("missing");
			if (id === viewer.userId) return to("self");
			const [u] = await sql`select u.id, c.handle from users u join channels c on c.user_id = u.id where u.id = ${id}`;
			if (!u) return to("missing");
			const op = url.pathname.split("/").pop()!;
			if (op === "disable") await sql`update users set disabled_at = coalesce(disabled_at, now()) where id = ${id}`;
			if (op === "enable") await sql`update users set disabled_at = null where id = ${id}`;
			if (op === "grant" || op === "revoke") await sql`update users set is_admin = ${op === "grant"} where id = ${id}`;
			// a disabled account is signed out; any change reaches open sessions at once
			const sessions = op === "disable" || op === "signout" ? await sql`delete from sessions where user_id = ${id} returning id` : await sql`select id from sessions where user_id = ${id}`;
			for (const s of sessions) forgetSession(s.id);
			await log(`account.${op}`, `@${u.handle}`);
			return to({ disable: "disabled", enable: "enabled", grant: "granted", revoke: "revoked", signout: "signed-out" }[op]!);
		}
		case "/admin/accounts/marks": {
			const id = get("id");
			const verification = get("verification") as Verification;
			if (!/^\d{1,18}$/.test(id) || !(verification in VERIFICATIONS)) return new Response("bad request", { status: 400 });
			const premium = get("premium") === "1";
			const [u] = await sql`select u.id, u.premium, c.id as channel_id, c.handle, c.verification from users u join channels c on c.user_id = u.id where u.id = ${id}`;
			if (!u) return to("missing");
			await sql`update channels set verification = ${verification} where id = ${u.channel_id}`;
			await sql`update users set premium = ${premium} where id = ${id}`;
			forgetVerifications();
			for (const s of await sql`select id from sessions where user_id = ${id}`) forgetSession(s.id);
			const changes = [u.verification !== verification ? `verification: ${VERIFICATIONS[verification]}` : "", u.premium !== premium ? `Premium logo: ${premium ? "on" : "off"}` : ""].filter(Boolean).join(", ");
			if (changes) await log("account.marks", `@${u.handle}`, changes);
			return to("marks");
		}
		case "/admin/videos/remove": {
			const id = get("id");
			if (!isVideoId(id)) return to("missing");
			const [v] = await sql`update videos set deleted_at = now() where id = ${id} and deleted_at is null returning id, title`;
			if (!v) return to("missing");
			deleteMedia(id);
			await log("video.remove", `"${v.title}"`, id);
			return to("removed");
		}
		case "/admin/videos/reprocess":
		case "/admin/processing/retry": {
			const retry = url.pathname.endsWith("retry");
			const [v] = retry
				? await sql`select v.id, v.title, v.source_path from processing_jobs j join videos v on v.id = j.video_id where j.id = ${/^\d{1,18}$/.test(get("id")) ? get("id") : "0"} and j.state = 'failed' and v.deleted_at is null`
				: await sql`select id, title, source_path from videos where id = ${isVideoId(get("id")) ? get("id") : ""} and deleted_at is null and status in ('ready', 'failed')`;
			if (!v) return to("missing");
			if (!v.source_path || !existsSync(v.source_path)) return to("no-source");
			await enqueue(v.id);
			await log(retry ? "job.retry" : "video.reprocess", retry ? `#${get("id")}` : `"${v.title}"`, retry ? `"${v.title}"` : v.id);
			return to(retry ? "retried" : "reprocess");
		}
		case "/admin/compatibility/clear": {
			await flushMisses();
			await sql`delete from compat_misses`;
			await log("diagnostics.clear", "");
			return to("cleared");
		}
		case "/admin/settings/registration": {
			const value = get("registration");
			if (value !== "open" && value !== "closed") return new Response("bad request", { status: 400 });
			await saveSetting("registration", value);
			await log("settings.registration", value);
			return to("saved");
		}
	}
	return notFound();
}
