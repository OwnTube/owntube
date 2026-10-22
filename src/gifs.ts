// GIFs in comments, from KLIPY. Off unless the host sets KLIPY_API_KEY.
//
// YouTube's desktop client already shows a comment's GIF (it reads
// commentSurfaceEntity.imageAttachmentViewModel), but has no way to pick one;
// assets/gifs.js adds a GIF button and picker to its comment boxes. The
// picker searches through this server, so the API key stays here, and every
// result carries a token this instance signs. comment/create_comment and
// create_comment_reply take that token as `owntubeGif` (comments.ts), so only
// GIFs that came from a search can be attached.
//
// GIF files are fetched from KLIPY's CDN once and served from MEDIA_DIR/gifs,
// so viewers never contact KLIPY.
//
//   GET /_ot/gifs.js                      the picker (only when enabled)
//   GET /_ot/gifs/search?q=&page=         {items: [{token, title, preview, width, height, favorite}], next}
//   GET /_ot/gifs/favorites               the viewer's starred GIFs, as {items}
//   POST /_ot/gifs/favorites              {token, favorite}: star or unstar a GIF
//   GET /_ot/gifs/media/<id>/<size>.webp  a cached GIF (size: sm for previews, md in comments)

import { existsSync, mkdirSync, renameSync } from "node:fs";
import { join } from "node:path";
import type { Viewer } from "./client/page";
import { KLIPY_API_KEY, KLIPY_CONTENT_FILTER, MEDIA_DIR } from "./config";
import { sql } from "./db";
import { decodeToken, encodeToken, sign } from "./ids";
import { rateLimit } from "./ratelimit";

export const GIFS_ENABLED = KLIPY_API_KEY !== "";

const API = "https://api.klipy.com/api/v1";
const CDN = /^https:\/\/static\.klipy\.com\/[\w./-]+\.webp$/;
const SIZES = ["sm", "md"] as const;
type Size = (typeof SIZES)[number];
const DIR = join(MEDIA_DIR, "gifs");

// what a comment stores and a token carries
export type Gif = { provider: "klipy"; id: string; title: string; width: number; height: number; src: Record<Size, string> };

// recently searched GIFs, so their previews can be served before any comment uses them
const seen = new Map<string, Gif>();
const remember = (g: Gif) => {
	seen.delete(g.id);
	seen.set(g.id, g);
	if (seen.size > 5000) seen.delete(seen.keys().next().value!);
};

export const gifToken = (g: Gif) => encodeToken({ gif: g });
export function gifFromToken(token: unknown): Gif | undefined {
	const g = decodeToken<{ gif: Gif }>(token)?.gif;
	return g && g.provider === "klipy" && /^\d{1,20}$/.test(g.id) && SIZES.every((s) => CDN.test(g.src?.[s] ?? "")) ? g : undefined;
}

export const gifUrl = (g: Pick<Gif, "id">, size: Size) => `/_ot/gifs/media/${g.id}/${size}.webp`;

// a picker entry
const item = (g: Gif, favorite: boolean) => ({ token: gifToken(g), title: g.title, preview: gifUrl(g, "sm"), width: g.width, height: g.height, favorite });

async function favoriteIds(viewer: NonNullable<Viewer>, ids: string[]) {
	if (!ids.length) return new Set<string>();
	const rows = await sql`select gif_id from gif_favorites where user_id = ${viewer.userId} and gif_id in ${sql(ids)}`;
	return new Set(rows.map((r: any) => r.gif_id as string));
}

async function favorites(viewer: NonNullable<Viewer>) {
	const rows = await sql`select gif from gif_favorites where user_id = ${viewer.userId} order by added_at desc limit 200`;
	return { items: rows.map((r: any) => (remember(r.gif), item(r.gif, true))), next: null };
}

async function setFavorite(req: Request, url: URL, viewer: NonNullable<Viewer>) {
	// JSON from this origin's pages only; a cross-site form can't send it
	const origin = req.headers.get("origin");
	const site = req.headers.get("sec-fetch-site");
	if ((origin && origin !== url.origin) || (site && site !== "same-origin") || !(req.headers.get("content-type") ?? "").startsWith("application/json"))
		return Response.json({ error: "forbidden" }, { status: 403 });
	const body = (await req.json().catch(() => undefined)) as { token?: unknown; favorite?: unknown } | undefined;
	const gif = gifFromToken(body?.token);
	if (!gif) return Response.json({ error: "Unknown GIF." }, { status: 400 });
	if (body?.favorite === true) {
		await sql`insert into gif_favorites (user_id, gif_id, gif) values (${viewer.userId}, ${gif.id}, ${JSON.stringify(gif)}::text::jsonb)
			on conflict (user_id, gif_id) do update set added_at = now()`;
		// keep the list bounded
		await sql`delete from gif_favorites where user_id = ${viewer.userId} and gif_id not in
			(select gif_id from gif_favorites where user_id = ${viewer.userId} order by added_at desc limit 200)`;
	} else await sql`delete from gif_favorites where user_id = ${viewer.userId} and gif_id = ${gif.id}`;
	return Response.json({ favorite: body?.favorite === true });
}

async function search(q: string, page: number, viewer: NonNullable<Viewer>) {
	const params = new URLSearchParams({
		page: String(page),
		per_page: "24",
		// KLIPY asks for a stable id per end user; this one is not the account id
		customer_id: sign(`klipy.${viewer.userId}`).slice(0, 24),
		locale: "en",
		content_filter: KLIPY_CONTENT_FILTER,
	});
	if (q) params.set("q", q);
	const res = await fetch(`${API}/${encodeURIComponent(KLIPY_API_KEY)}/gifs/${q ? "search" : "trending"}?${params}`, { signal: AbortSignal.timeout(10_000) });
	if (!res.ok) throw new Error(`KLIPY answered ${res.status}`);
	const body = (await res.json()) as { data?: { data?: any[]; has_next?: boolean } };
	const gifs: Gif[] = [];
	for (const it of body.data?.data ?? []) {
		const sm = it?.file?.sm?.webp;
		const md = it?.file?.md?.webp;
		if (!sm || !md || !CDN.test(sm.url) || !CDN.test(md.url) || !/^\d{1,20}$/.test(String(it.id))) continue;
		const gif: Gif = { provider: "klipy", id: String(it.id), title: String(it.title ?? "").slice(0, 200), width: Number(md.width) || 0, height: Number(md.height) || 0, src: { sm: sm.url, md: md.url } };
		remember(gif);
		gifs.push(gif);
	}
	const starred = await favoriteIds(viewer, gifs.map((g) => g.id));
	return { items: gifs.map((g) => item(g, starred.has(g.id))), next: body.data?.has_next ? page + 1 : null };
}

async function media(id: string, size: Size): Promise<Response> {
	const file = join(DIR, `${id}-${size}.webp`);
	const headers = { "content-type": "image/webp", "cache-control": "public, max-age=31536000, immutable" };
	if (existsSync(file)) return new Response(Bun.file(file), { headers });
	let gif = seen.get(id);
	if (!gif) {
		const [row] = await sql`select gif from comments where gif->>'id' = ${id} and gif->>'provider' = 'klipy' limit 1`;
		gif = row?.gif;
	}
	const src = gif?.src?.[size];
	if (!src || !CDN.test(src)) return new Response("not found", { status: 404 });
	const res = await fetch(src, { signal: AbortSignal.timeout(20_000) });
	if (!res.ok || !(res.headers.get("content-type") ?? "").startsWith("image/")) return new Response("not found", { status: 404 });
	const bytes = new Uint8Array(await res.arrayBuffer());
	if (bytes.byteLength > 15 * 1024 * 1024) return new Response("too large", { status: 404 });
	mkdirSync(DIR, { recursive: true });
	await Bun.write(`${file}.part`, bytes);
	renameSync(`${file}.part`, file);
	return new Response(bytes, { headers });
}

export async function gifRoutes(req: Request, url: URL, viewer: Viewer): Promise<Response | undefined> {
	const path = url.pathname;
	if (path !== "/_ot/gifs.js" && !path.startsWith("/_ot/gifs/")) return undefined;
	if (!GIFS_ENABLED) return new Response("not found", { status: 404 });
	if (path === "/_ot/gifs/favorites") {
		if (!viewer) return Response.json({ error: "Sign in to add GIFs." }, { status: 401 });
		if (req.method === "POST") return setFavorite(req, url, viewer);
		if (req.method === "GET") return Response.json(await favorites(viewer), { headers: { "cache-control": "no-store" } });
	}
	if (req.method !== "GET") return new Response("not found", { status: 404 });
	if (path === "/_ot/gifs.js") return new Response(Bun.file(join(import.meta.dir, "..", "assets", "gifs.js")), { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-cache" } });
	const m = /^\/_ot\/gifs\/media\/(\d{1,20})\/(sm|md)\.webp$/.exec(path);
	if (m) return media(m[1], m[2] as Size);
	if (path === "/_ot/gifs/search") {
		if (!viewer) return Response.json({ error: "Sign in to add GIFs." }, { status: 401 });
		if (!(await rateLimit(`gifs:${viewer.userId}`, 120, 600))) return Response.json({ error: "Too many searches. Try again in a few minutes." }, { status: 429 });
		const q = (url.searchParams.get("q") ?? "").trim().slice(0, 100);
		const page = Math.max(1, Math.min(50, Number(url.searchParams.get("page")) || 1));
		try {
			return Response.json(await search(q, page, viewer), { headers: { "cache-control": "no-store" } });
		} catch (e) {
			console.error("gif search failed", e);
			return Response.json({ error: "GIF search isn't available right now." }, { status: 502 });
		}
	}
	return new Response("not found", { status: 404 });
}

// the attachment YouTube's comment view model shows under the text
// (commentSurfaceEntity.imageAttachmentViewModel; ytw-comment-image-attachment-view-model
// in the pinned bundle reads these fields)
export function imageAttachment(g: Gif) {
	return {
		commentImageAttachmentViewModel: {
			image: { sources: [{ url: gifUrl(g, "md"), width: g.width, height: g.height }] },
			...(g.width && g.height ? { aspectRatio: g.width / g.height } : {}),
			rendererContext: { accessibilityContext: { label: g.title || "GIF" } },
		},
	};
}
