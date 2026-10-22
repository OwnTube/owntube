// Media delivery.
//   /videoplayback?id=&itag=&expire=&sig=[&range=a-b]   streams, as the player requests them
//   /vi/<videoId>/<name>.jpg                             thumbnails (i.ytimg.com layout)
//   /ggpht/<channelId>/<kind>                            channel avatars and banners
//
// The player asks for byte ranges with a `range=a-b` query parameter (and
// sometimes POSTs with a small body); browsers seeking a progressive file
// send a Range header. Both are answered. Stream URLs are signed by the
// player response that handed them out, so private videos need no session
// lookup per segment. With ump=1 the bytes are wrapped in UMP parts (ump.ts).

import { existsSync, statSync } from "node:fs";
import { join, normalize } from "node:path";
import type { Viewer } from "../client/page";
import { MEDIA_DIR, PUBLIC_ORIGIN } from "../config";
import { sql } from "../db";
import { sign, verify } from "../ids";
import { umpMediaBody } from "./ump";

const URL_TTL_S = 6 * 3600;
// the player asks for segments of a few MB at most; a UMP body is built in memory
const MAX_UMP_RANGE = 64 * 1024 * 1024;

export function streamUrl(videoId: string, itag: number, mime: string, size: number, viewer = "0"): string {
	const expire = Math.floor(Date.now() / 1000) + URL_TTL_S;
	const sig = sign(`vp.${videoId}.${itag}.${expire}.${viewer}`);
	const q = new URLSearchParams({ id: videoId, itag: String(itag), source: "owntube", expire: String(expire), v: viewer, mime, clen: String(size), sig });
	return `${PUBLIC_ORIGIN}/videoplayback?${q}`;
}

const cache = new Map<string, { path: string; mime: string; size: number }>();

async function formatFile(videoId: string, itag: number) {
	const key = `${videoId}.${itag}`;
	let f = cache.get(key);
	if (!f) {
		const [row] = await sql`select f.path, f.mime_type, f.size from video_formats f join videos v on v.id = f.video_id
			where f.video_id = ${videoId} and f.itag = ${itag} and v.deleted_at is null and v.status = 'ready'`;
		if (!row) return undefined;
		f = { path: join(MEDIA_DIR, row.path), mime: row.mime_type.split(";")[0], size: Number(row.size) };
		cache.set(key, f);
	}
	return f;
}

export function forgetFormats(videoId: string) {
	for (const k of cache.keys()) if (k.startsWith(`${videoId}.`)) cache.delete(k);
}

function parseRange(spec: string | null, size: number): [number, number] | undefined {
	if (!spec) return undefined;
	const m = /^(?:bytes=)?(\d*)-(\d*)$/.exec(spec.trim());
	if (!m || (m[1] === "" && m[2] === "")) return undefined;
	let start: number;
	let end: number;
	if (m[1] === "") {
		start = Math.max(0, size - Number(m[2]));
		end = size - 1;
	} else {
		start = Number(m[1]);
		end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
	}
	if (start > end || start >= size) return [-1, -1];
	return [start, end];
}

export async function videoplayback(req: Request, url: URL): Promise<Response> {
	const q = url.searchParams;
	const id = q.get("id") ?? "";
	const itag = Number(q.get("itag"));
	const expire = Number(q.get("expire"));
	const viewer = q.get("v") ?? "0";
	const sig = q.get("sig") ?? "";
	const cors = { "access-control-allow-origin": PUBLIC_ORIGIN, "access-control-allow-credentials": "true", "timing-allow-origin": "*" };
	if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: { ...cors, "access-control-allow-methods": "GET, POST", "access-control-allow-headers": "*" } });
	if (!verify(`vp.${id}.${itag}.${expire}.${viewer}`, sig)) return new Response("forbidden", { status: 403, headers: cors });
	if (expire < Date.now() / 1000) return new Response("expired", { status: 403, headers: cors });
	const f = await formatFile(id, itag);
	if (!f || !existsSync(f.path)) return new Response("not found", { status: 404, headers: cors });
	const size = statSync(f.path).size;
	const fromQuery = parseRange(q.get("range"), size);
	const fromHeader = fromQuery ? undefined : parseRange(req.headers.get("range"), size);
	const r = fromQuery ?? fromHeader;
	const base = { ...cors, "content-type": f.mime, "accept-ranges": "bytes", "cache-control": "private, max-age=21298", "last-modified": new Date(statSync(f.path).mtimeMs).toUTCString() };
	if (r && r[0] < 0) return new Response(null, { status: 416, headers: { ...base, "content-range": `bytes */${size}` } });
	const file = Bun.file(f.path);
	if (r && fromQuery && q.get("ump") === "1") {
		if (r[1] - r[0] + 1 > MAX_UMP_RANGE) return new Response("range too large", { status: 416, headers: base });
		const body = umpMediaBody(new Uint8Array(await file.slice(r[0], r[1] + 1).arrayBuffer()));
		return new Response(req.method === "HEAD" ? null : (body as Uint8Array<ArrayBuffer>), { status: 200, headers: { ...base, "content-type": "application/vnd.yt-ump", "content-length": String(body.byteLength) } });
	}
	if (r) {
		const [start, end] = r;
		const body = file.slice(start, end + 1);
		// a range in the query is answered with 200 and just those bytes, as googlevideo does
		if (fromQuery) return new Response(req.method === "HEAD" ? null : body, { status: 200, headers: { ...base, "content-length": String(end - start + 1) } });
		return new Response(req.method === "HEAD" ? null : body, { status: 206, headers: { ...base, "content-range": `bytes ${start}-${end}/${size}`, "content-length": String(end - start + 1) } });
	}
	return new Response(req.method === "HEAD" ? null : file, { headers: { ...base, "content-length": String(size) } });
}

// /vi/<id>/<name>.jpg, also the i.ytimg.com variants with _live or webp.
// A private video's thumbnails are for its owner (Studio shows them) and
// the instance's operators (the admin panel).
export async function thumbnail(url: URL, viewer: Viewer): Promise<Response> {
	const m = /^\/vi(?:_webp)?\/([A-Za-z0-9_-]{11})\/([a-z0-9]+)(?:_live)?\.(?:jpg|webp)$/.exec(url.pathname);
	if (!m) return new Response("not found", { status: 404 });
	const [, id, name] = m;
	const [row] = await sql`select t.path, v.visibility from video_thumbnails t join videos v on v.id = t.video_id
		where t.video_id = ${id} and t.name = ${name === "frame0" ? "hqdefault" : name} and v.deleted_at is null
		and (v.visibility <> 'private' or v.channel_id = ${viewer?.channelId ?? ""} or ${viewer?.isAdmin ?? false})`;
	if (!row) return new Response("not found", { status: 404 });
	const p = normalize(join(MEDIA_DIR, row.path));
	const cache = row.visibility === "private" ? "private, no-store" : "public, max-age=86400";
	return new Response(Bun.file(p), { headers: { "content-type": "image/jpeg", "cache-control": cache } });
}
