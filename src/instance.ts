// Routes that belong to this instance rather than to the official client:
// the local sign-in/registration pages (Google's sign-in is a separate app
// at accounts.google.com, so the client's "Sign in" goes here instead),
// avatars, view counting from the player's stats pings, and small endpoints
// the page fetches outside /youtubei.

import { existsSync } from "node:fs";
import { join } from "node:path";
import { createSession, destroySession, login, register } from "./auth";
import type { Viewer } from "./client/page";
import { loadPin, archivePath } from "./client/store";
import { INSTANCE_NAME, MEDIA_DIR, PUBLIC_ORIGIN } from "./config";
import { sql } from "./db";
import { isVideoId } from "./ids";
import { rateLimit } from "./ratelimit";
import { uploadRoutes } from "./upload";
import { adminRoutes } from "./admin";
import { suggest } from "./innertube/search";
import { recordWatch } from "./innertube/history";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function instancePage(title: string, body: string, status = 200, headers: Record<string, string> = {}) {
	return new Response(
		`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} - ${esc(INSTANCE_NAME)}</title>
<style>
:root{color-scheme:light dark;--bg:#fff;--fg:#0f0f0f;--muted:#606060;--line:#e5e5e5;--accent:#065fd4;--err:#cc0000}
@media (prefers-color-scheme:dark){:root{--bg:#0f0f0f;--fg:#f1f1f1;--muted:#aaa;--line:#3f3f3f;--accent:#3ea6ff;--err:#ff6b6b}}
body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.5 Roboto,Arial,sans-serif}
main{max-width:440px;margin:8vh auto;padding:32px 24px;border:1px solid var(--line);border-radius:12px}
main.wide{max-width:880px}
h1{font-size:22px;font-weight:500;margin:0 0 4px}p.sub{color:var(--muted);margin:0 0 24px}
label{display:block;margin:14px 0 4px;font-weight:500}input,textarea,select{box-sizing:border-box;width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px;background:transparent;color:inherit;font:inherit}
button{margin-top:20px;padding:10px 18px;border:0;border-radius:18px;background:var(--fg);color:var(--bg);font:500 14px Roboto,Arial,sans-serif;cursor:pointer}
a{color:var(--accent)}.err{color:var(--err);margin:12px 0 0}.note{color:var(--muted);font-size:12px;margin-top:20px}
table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid var(--line);padding:6px 8px;text-align:left;vertical-align:top;font-size:13px}
</style></head><body>${body}</body></html>`,
		{ status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "content-security-policy": "default-src 'self'; style-src 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:", ...headers } },
	);
}

function safeNext(next: string | null): string {
	return next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

function authForm(kind: "signin" | "register", next: string, error = "", values: Record<string, string> = {}) {
	const reg = kind === "register";
	return instancePage(
		reg ? "Create account" : "Sign in",
		`<main><h1>${reg ? "Create an account" : "Sign in"}</h1><p class="sub">to continue to ${esc(INSTANCE_NAME)}. This is an account on this instance, not a Google account.</p>
<form method="post" action="/${kind}?next=${encodeURIComponent(next)}">
<label for="login">Username</label><input id="login" name="login" autocomplete="username" required value="${esc(values.login ?? "")}">
${reg ? `<label for="name">Channel name</label><input id="name" name="name" value="${esc(values.name ?? "")}">` : ""}
<label for="password">Password</label><input id="password" name="password" type="password" autocomplete="${reg ? "new-password" : "current-password"}" required>
${error ? `<p class="err" role="alert">${esc(error)}</p>` : ""}
<button type="submit">${reg ? "Create account" : "Sign in"}</button></form>
<p class="note">${reg ? `Have an account? <a href="/signin?next=${encodeURIComponent(next)}">Sign in</a>` : `New here? <a href="/register?next=${encodeURIComponent(next)}">Create an account</a>`}</p></main>`,
		error ? 400 : 200,
	);
}

// default avatar: the channel's initial on a colour derived from its id
function avatarSvg(seed: string, letter: string) {
	const hues = [4, 24, 200, 262, 291, 122, 340, 174];
	const h = hues[Number(BigInt(Bun.hash(seed)) % BigInt(hues.length))];
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><rect width="88" height="88" fill="hsl(${h},55%,45%)"/><text x="44" y="58" font-family="Roboto,Arial,sans-serif" font-size="40" text-anchor="middle" fill="#fff">${esc(letter.toUpperCase())}</text></svg>`;
}

async function ggpht(url: URL): Promise<Response> {
	const m = /^\/ggpht\/(UC[A-Za-z0-9_-]{22})\/(avatar|banner)/.exec(url.pathname);
	if (!m) return new Response("not found", { status: 404 });
	const [c] = await sql`select title, avatar_path, banner_path from channels where id = ${m[1]}`;
	if (!c) return new Response("not found", { status: 404 });
	const p = m[2] === "avatar" ? c.avatar_path : c.banner_path;
	if (p && existsSync(join(MEDIA_DIR, p))) return new Response(Bun.file(join(MEDIA_DIR, p)), { headers: { "cache-control": "public, max-age=3600" } });
	if (m[2] === "banner") return new Response("not found", { status: 404 });
	return new Response(avatarSvg(m[1], [...c.title][0] ?? "?"), { headers: { "content-type": "image/svg+xml", "cache-control": "public, max-age=3600" } });
}

// /api/stats/playback is pinged once when playback starts: that is a view.
// watchtime pings carry the position, which history keeps for resuming.
async function stats(url: URL, viewer: Viewer): Promise<Response> {
	const id = url.searchParams.get("docid") ?? "";
	if (!isVideoId(id)) return new Response(null, { status: 204 });
	if (url.pathname.endsWith("/playback")) {
		const key = `view:${id}:${viewer?.userId ?? url.searchParams.get("cpn") ?? "anon"}`;
		if (await rateLimit(key, 1, 3600)) await sql`update videos set view_count = view_count + 1 where id = ${id}`;
		if (viewer) await recordWatch(viewer, id);
	} else if (url.pathname.endsWith("/watchtime") && viewer) {
		const cmt = Number((url.searchParams.get("cmt") ?? "0").split(",").pop());
		if (Number.isFinite(cmt)) await recordWatch(viewer, id, Math.round(cmt * 1000));
	}
	return new Response(null, { status: 204 });
}

export async function instanceRoutes(req: Request, url: URL, viewer: Viewer): Promise<Response | undefined> {
	const path = url.pathname;
	if (path === "/signin" || path === "/register") {
		const kind = path === "/signin" ? "signin" : "register";
		const next = safeNext(url.searchParams.get("next"));
		if (req.method === "GET") return viewer ? Response.redirect(next, 302) : authForm(kind, next);
		if (req.method !== "POST") return new Response("method not allowed", { status: 405 });
		const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
		if (!(await rateLimit(`auth:${ip}`, 20, 600))) return authForm(kind, next, "Too many attempts. Try again in a few minutes.");
		const form = await req.formData().catch(() => undefined);
		const loginName = String(form?.get("login") ?? "");
		const password = String(form?.get("password") ?? "");
		const result = kind === "register" ? await register(loginName, password, String(form?.get("name") ?? "")) : await login(loginName, password);
		if ("error" in result) return authForm(kind, next, result.error, { login: loginName, name: String(form?.get("name") ?? "") });
		const cookies = await createSession(result.userId, req.headers.get("user-agent"));
		const headers = new Headers({ location: next });
		for (const c of cookies) headers.append("set-cookie", c);
		return new Response(null, { status: 303, headers });
	}
	if (path === "/logout") {
		if (req.method !== "POST" && req.method !== "GET") return new Response("method not allowed", { status: 405 });
		// GET only from this origin (the account menu link); a cross-site GET can't sign anyone out
		const site = req.headers.get("sec-fetch-site");
		if (req.method === "GET" && site && site !== "same-origin" && site !== "none") return new Response("forbidden", { status: 403 });
		const headers = new Headers({ location: "/" });
		for (const c of await destroySession(req)) headers.append("set-cookie", c);
		return new Response(null, { status: 303, headers });
	}
	if (path.startsWith("/ggpht/")) return ggpht(url);
	if (path.startsWith("/api/stats/")) return stats(url, viewer);
	if (path === "/complete/search") return suggest(url);
	if (path === "/favicon.ico") {
		const pin = loadPin();
		const p = pin && archivePath(`https://www.youtube.com/s/desktop/${pin.desktopVersion}/img/favicon.ico`);
		return p && existsSync(p) ? new Response(Bun.file(p), { headers: { "content-type": "image/x-icon" } }) : new Response(null, { status: 404 });
	}
	if (path === "/manifest.webmanifest")
		return Response.json({ name: INSTANCE_NAME, short_name: INSTANCE_NAME, start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#ffffff", icons: [] });
	// the page registers no worker (FLAG_OVERRIDES); one left from an earlier
	// configuration unregisters itself and clears its caches
	if (path === "/sw.js" || path === "/sw.js_data")
		return new Response("self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.map(n=>caches.delete(n)))).then(()=>self.registration.unregister())));", {
			headers: { "content-type": "text/javascript", "cache-control": "no-store" },
		});
	if (path === "/about")
		return instancePage(
			`About ${INSTANCE_NAME}`,
			`<main class="wide"><h1>About ${esc(INSTANCE_NAME)}</h1>
<p class="sub">A self-hosted video site. The interface is YouTube's own web client, served from this instance and pointed at this instance's database, accounts and media. Nothing on this site comes from YouTube's servers, and accounts here are local accounts, not Google accounts.</p>
<h2 id="terms">Terms</h2><p>Upload only videos you have the right to share. The operator of this instance may remove videos, comments and accounts.</p>
<h2 id="privacy">Privacy</h2><p>This instance stores your username, a password hash, what you upload, your comments, likes, subscriptions, playlists and watch history. It sends nothing to third parties; the page is not allowed to contact any other site.</p>
<p><a href="/">Back to the home page</a></p></main>`,
		);
	if (path === "/robots.txt") return new Response("User-agent: *\nDisallow: /youtubei/\nDisallow: /videoplayback\n", { headers: { "content-type": "text/plain" } });
	const up = await uploadRoutes(req, url, viewer);
	if (up) return up;
	return adminRoutes(req, url, viewer);
}

export { esc, PUBLIC_ORIGIN };
