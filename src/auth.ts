// Local accounts and sessions. These are accounts of this instance, not
// Google accounts; the sign-in form never asks for a Google password.
//
// A session sets two cookies:
//   OT_SID            httpOnly, identifies the session
//   SAPISID / APISID  the session's API secret, readable by page script.
// The official client signs every InnerTube request with it
// (Authorization: SAPISIDHASH <ts>_<sha1(ts secret origin)>, APISIDHASH on
// plain http), which a page on another origin cannot produce, so the
// signature doubles as the CSRF check for mutations.

import { createHash } from "node:crypto";
import type { Viewer } from "./client/page";
import { PUBLIC_ORIGIN, SECURE_COOKIES } from "./config";
import { sql } from "./db";
import { newChannelId, newToken } from "./ids";

const SESSION_DAYS = 30;
const SECRET_COOKIE = SECURE_COOKIES ? "SAPISID" : "APISID";

export function parseCookies(req: Request): Record<string, string> {
	const out: Record<string, string> = {};
	for (const part of (req.headers.get("cookie") ?? "").split(";")) {
		const i = part.indexOf("=");
		if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
	}
	return out;
}

const viewers = new Map<string, { viewer: NonNullable<Viewer>; at: number }>();

export async function getViewer(req: Request): Promise<Viewer> {
	const sid = parseCookies(req).OT_SID;
	if (!sid || sid.length > 100) return null;
	const hit = viewers.get(sid);
	if (hit && Date.now() - hit.at < 30_000) return hit.viewer;
	const [row] = await sql`select s.id, s.user_id, s.api_secret, u.is_admin, c.id as channel_id, c.handle, c.title
		from sessions s join users u on u.id = s.user_id join channels c on c.user_id = u.id
		where s.id = ${sid} and s.expires_at > now() and u.disabled_at is null`;
	if (!row) {
		viewers.delete(sid);
		return null;
	}
	const viewer = { userId: String(row.user_id), channelId: row.channel_id, handle: row.handle, title: row.title, apiSecret: row.api_secret, sessionId: row.id, isAdmin: row.is_admin };
	viewers.set(sid, { viewer, at: Date.now() });
	if (!hit) void sql`update sessions set last_seen_at = now() where id = ${sid}`;
	return viewer;
}

export function forgetSession(sid: string) {
	viewers.delete(sid);
}

// SAPISIDHASH <ts>_<sha1> [SAPISID1PHASH ...]: any one valid signature,
// at most a day old, with this instance's origin
export function verifyApiSignature(req: Request, viewer: Viewer): boolean {
	if (!viewer) return false;
	const auth = req.headers.get("authorization") ?? "";
	const now = Math.floor(Date.now() / 1000);
	for (const m of auth.matchAll(/(?:SAPISID|APISID)\w*HASH (\d+)_([0-9a-f]{40})/g)) {
		const ts = Number(m[1]);
		if (Math.abs(now - ts) > 86400) continue;
		const want = createHash("sha1").update(`${ts} ${viewer.apiSecret} ${PUBLIC_ORIGIN}`).digest("hex");
		if (want === m[2]) return true;
	}
	return false;
}

function cookie(name: string, value: string, opts: { httpOnly?: boolean; maxAge?: number }) {
	const parts = [`${name}=${encodeURIComponent(value)}`, "Path=/", "SameSite=Lax"];
	if (opts.httpOnly) parts.push("HttpOnly");
	if (SECURE_COOKIES) parts.push("Secure");
	if (opts.maxAge !== undefined) parts.push(`Max-Age=${opts.maxAge}`);
	return parts.join("; ");
}

export async function createSession(userId: string, userAgent: string | null): Promise<string[]> {
	const id = newToken();
	const secret = newToken(24);
	await sql`insert into sessions (id, user_id, api_secret, expires_at, user_agent)
		values (${id}, ${userId}, ${secret}, now() + ${`${SESSION_DAYS} days`}::interval, ${userAgent?.slice(0, 300) ?? null})`;
	const age = SESSION_DAYS * 86400;
	return [cookie("OT_SID", id, { httpOnly: true, maxAge: age }), cookie(SECRET_COOKIE, secret, { maxAge: age })];
}

export async function destroySession(req: Request): Promise<string[]> {
	const sid = parseCookies(req).OT_SID;
	if (sid) {
		await sql`delete from sessions where id = ${sid}`;
		forgetSession(sid);
	}
	return [cookie("OT_SID", "", { httpOnly: true, maxAge: 0 }), cookie(SECRET_COOKIE, "", { maxAge: 0 })];
}

export const LOGIN_RE = /^[a-z0-9._-]{3,30}$/;

export async function register(login: string, password: string, displayName: string): Promise<{ userId: string } | { error: string }> {
	login = login.trim().toLowerCase();
	displayName = displayName.trim().slice(0, 100) || login;
	if (!LOGIN_RE.test(login)) return { error: "Usernames are 3 to 30 characters: letters, digits, dot, dash or underscore." };
	if (password.length < 8 || password.length > 200) return { error: "Passwords need at least 8 characters." };
	const [taken] = await sql`select 1 from users where login = ${login} union select 1 from channels where lower(handle) = ${login}`;
	if (taken) return { error: "That username is taken." };
	const hash = await Bun.password.hash(password, { algorithm: "argon2id" });
	const [{ count }] = await sql`select count(*)::int as count from users`;
	return await sql.begin(async (tx) => {
		const [u] = await tx`insert into users (login, password_hash, is_admin) values (${login}, ${hash}, ${count === 0}) returning id`;
		await tx`insert into channels (id, user_id, handle, title) values (${newChannelId()}, ${u.id}, ${login}, ${displayName})`;
		return { userId: String(u.id) };
	});
}

export async function login(loginName: string, password: string): Promise<{ userId: string } | { error: string }> {
	const [u] = await sql`select id, password_hash from users where login = ${loginName.trim().toLowerCase()} and disabled_at is null`;
	// verify against a dummy hash when the user doesn't exist, so timing doesn't tell
	const ok = await Bun.password.verify(password, u?.password_hash ?? "$argon2id$v=19$m=65536,t=2,p=1$c29tZXNhbHQ$RdescudvJCsgt3ub+b+dWRWJTmaaJObG").catch(() => false);
	if (!u || !ok) return { error: "Wrong username or password." };
	return { userId: String(u.id) };
}
