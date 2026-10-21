// The upload tool at /upload: a small page of this instance, not part of
// the official client. YouTube uploads in YouTube Studio (studio.youtube.com),
// a separate application this instance does not serve; the client's
// "Create" button and the guide's "Upload" entry link here instead.
//
// Uploads are resumable: the page creates a session, PUTs the file in
// chunks with Content-Range, and can ask how much arrived to resume after a
// network failure. A complete file is checked with ffprobe and queued for
// processing (media/process.ts).
//
//   POST   /upload/api/sessions           {name,size,title,description,visibility} -> {videoId}
//   GET    /upload/api/sessions/:id       -> {received,size}
//   PUT    /upload/api/sessions/:id       Content-Range: bytes a-b/size, body = chunk
//   GET    /upload/api/videos             the signed-in channel's videos with status
//   PATCH  /upload/api/videos/:id         {title?,description?,visibility?}
//   DELETE /upload/api/videos/:id
// Every API call needs the X-OwnTube-CSRF header with the session's secret.

import { appendFileSync, existsSync, mkdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import type { Viewer } from "./client/page";
import { INSTANCE_NAME, MAX_UPLOAD_BYTES, MEDIA_DIR } from "./config";
import { sql } from "./db";
import { isVideoId, newVideoId } from "./ids";
import { esc, instancePage } from "./instance";
import { deleteMedia, enqueue, probe } from "./media/process";
import { forgetFormats } from "./media/serve";
import { rateLimit } from "./ratelimit";

const SOURCES = join(MEDIA_DIR, "sources");
const sessions = new Map<string, { size: number; userId: string }>();

const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { "cache-control": "no-store" } });
const fail = (status: number, error: string) => json({ error }, status);

async function sessionFor(id: string, viewer: NonNullable<Viewer>) {
	let s = sessions.get(id);
	if (!s) {
		const [v] = await sql`select v.id, v.status from videos v where v.id = ${id} and v.channel_id = ${viewer.channelId} and v.deleted_at is null`;
		const meta = join(SOURCES, `${id}.size`);
		if (!v || v.status !== "uploaded" || !existsSync(meta)) return undefined;
		s = { size: Number(await Bun.file(meta).text()), userId: viewer.userId };
		sessions.set(id, s);
	}
	return s.userId === viewer.userId ? s : undefined;
}

async function finish(id: string): Promise<Response> {
	const part = join(SOURCES, `${id}.part`);
	const source = join(SOURCES, `${id}.src`);
	try {
		const p = await probe(part);
		if (p.duration > 6 * 3600) throw new Error("videos are limited to 6 hours");
	} catch (e) {
		rmSync(part, { force: true });
		const msg = `This file can't be processed: ${e instanceof Error ? e.message : String(e)}`;
		await sql`update videos set status = 'failed', error = ${msg.slice(0, 500)} where id = ${id}`;
		sessions.delete(id);
		return fail(422, msg);
	}
	renameSync(part, source);
	rmSync(join(SOURCES, `${id}.size`), { force: true });
	sessions.delete(id);
	await sql`update videos set source_path = ${source} where id = ${id}`;
	await enqueue(id);
	return json({ videoId: id, status: "queued" });
}

const VISIBILITY = new Set(["public", "unlisted", "private"]);

async function api(req: Request, url: URL, viewer: NonNullable<Viewer>): Promise<Response> {
	if (req.headers.get("x-owntube-csrf") !== viewer.apiSecret) return fail(403, "Missing or wrong CSRF token");
	const parts = url.pathname.split("/").filter(Boolean); // upload, api, sessions|videos, id?
	const [, , kind, id] = parts;
	if (kind === "sessions" && !id && req.method === "POST") {
		if (!(await rateLimit(`upload:${viewer.userId}`, 20, 3600))) return fail(429, "Too many uploads. Try again later.");
		const b = await req.json().catch(() => ({}));
		const size = Number(b.size);
		if (!Number.isInteger(size) || size <= 0) return fail(400, "Choose a video file.");
		if (size > MAX_UPLOAD_BYTES) return fail(413, `Files are limited to ${Math.round(MAX_UPLOAD_BYTES / 1024 ** 2)} MB.`);
		const title = String(b.title ?? "").trim().slice(0, 100) || String(b.name ?? "Untitled").replace(/\.[^.]+$/, "").slice(0, 100);
		const visibility = VISIBILITY.has(b.visibility) ? b.visibility : "public";
		const vid = newVideoId();
		mkdirSync(SOURCES, { recursive: true });
		await Bun.write(join(SOURCES, `${vid}.size`), String(size));
		await Bun.write(join(SOURCES, `${vid}.part`), "");
		await sql`insert into videos (id, channel_id, title, description, visibility, status) values (${vid}, ${viewer.channelId}, ${title}, ${String(b.description ?? "").slice(0, 5000)}, ${visibility}, 'uploaded')`;
		sessions.set(vid, { size, userId: viewer.userId });
		return json({ videoId: vid, received: 0, size });
	}
	if (kind === "sessions" && id) {
		if (!isVideoId(id)) return fail(404, "No such upload");
		const s = await sessionFor(id, viewer);
		if (!s) return fail(404, "No such upload");
		const part = join(SOURCES, `${id}.part`);
		const received = existsSync(part) ? statSync(part).size : 0;
		if (req.method === "GET") return json({ received, size: s.size });
		if (req.method !== "PUT") return fail(405, "Method not allowed");
		const m = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(req.headers.get("content-range") ?? "");
		if (!m || Number(m[3]) !== s.size) return fail(400, "Content-Range is required");
		const start = Number(m[1]);
		const end = Number(m[2]);
		if (start !== received) return json({ received, size: s.size, error: "Resume from the received offset" }, 409);
		if (end < start || end >= s.size || end - start + 1 > 64 * 1024 * 1024) return fail(400, "Bad chunk range");
		const chunk = new Uint8Array(await req.arrayBuffer());
		if (chunk.byteLength !== end - start + 1) return fail(400, "Chunk size doesn't match Content-Range");
		appendFileSync(part, chunk);
		const now = received + chunk.byteLength;
		if (now === s.size) return finish(id);
		return json({ received: now, size: s.size });
	}
	if (kind === "videos" && !id && req.method === "GET") {
		const rows = await sql`select v.id, v.title, v.description, v.visibility, v.status, v.error, v.duration_ms, v.view_count::int as views, v.like_count, v.comment_count, v.created_at,
			(select state from processing_jobs j where j.video_id = v.id order by j.id desc limit 1) as job
			from videos v where v.channel_id = ${viewer.channelId} and v.deleted_at is null order by v.created_at desc`;
		return json({ videos: rows });
	}
	if (kind === "videos" && id) {
		if (!isVideoId(id)) return fail(404, "Not found");
		const [v] = await sql`select id, status from videos where id = ${id} and channel_id = ${viewer.channelId} and deleted_at is null`;
		if (!v) return fail(404, "Not found");
		if (req.method === "PATCH") {
			const b = await req.json().catch(() => ({}));
			if (b.title !== undefined) {
				const t = String(b.title).trim().slice(0, 100);
				if (!t) return fail(400, "A title is required.");
				await sql`update videos set title = ${t} where id = ${id}`;
			}
			if (b.description !== undefined) await sql`update videos set description = ${String(b.description).slice(0, 5000)} where id = ${id}`;
			if (b.visibility !== undefined) {
				if (!VISIBILITY.has(b.visibility)) return fail(400, "Unknown visibility");
				await sql`update videos set visibility = ${b.visibility} where id = ${id}`;
			}
			return json({ ok: true });
		}
		if (req.method === "DELETE") {
			await sql`update videos set deleted_at = now(), status = case when status = 'ready' then status else 'failed' end where id = ${id}`;
			await sql`delete from playlist_items where video_id = ${id}`;
			sessions.delete(id);
			for (const ext of ["part", "size", "src"]) rmSync(join(SOURCES, `${id}.${ext}`), { force: true });
			deleteMedia(id);
			forgetFormats(id);
			return json({ ok: true });
		}
		if (req.method === "POST" && url.pathname.endsWith("/retry")) {
			await enqueue(id);
			return json({ ok: true });
		}
	}
	return fail(404, "Not found");
}

function page(viewer: NonNullable<Viewer>) {
	const csrf = esc(viewer.apiSecret);
	return instancePage(
		"Upload",
		`<main class="wide"><p><a href="/">← ${esc(INSTANCE_NAME)}</a> · <a href="/@${esc(viewer.handle)}">Your channel</a></p>
<h1>Upload a video</h1><p class="sub">Uploading as ${esc(viewer.title)} (@${esc(viewer.handle)}). Files up to ${Math.round(MAX_UPLOAD_BYTES / 1024 ** 2)} MB; any format ffmpeg reads.</p>
<form id="up"><label for="file">Video file</label><input id="file" type="file" accept="video/*,.mkv,.mov,.avi,.webm" required>
<label for="title">Title</label><input id="title" maxlength="100" placeholder="Defaults to the file name">
<label for="description">Description</label><textarea id="description" rows="4" maxlength="5000"></textarea>
<label for="visibility">Visibility</label><select id="visibility"><option value="public">Public</option><option value="unlisted">Unlisted</option><option value="private">Private</option></select>
<button type="submit" id="go">Upload</button><p id="progress" class="note" role="status"></p></form>
<h2 id="videos">Your videos</h2><table><thead><tr><th>Video</th><th>Visibility</th><th>Status</th><th>Views</th><th></th></tr></thead><tbody id="list"></tbody></table></main>
<script src="/upload/tool.js" data-csrf="${csrf}"></script>`,
	);
}

const TOOL_JS = `(() => {
const csrf = document.currentScript.dataset.csrf;
const h = { "content-type": "application/json", "x-owntube-csrf": csrf };
const $ = (id) => document.getElementById(id);
const CHUNK = 8 * 1024 * 1024;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
async function send(id, file, from) {
  for (let off = from; off < file.size; ) {
    const end = Math.min(off + CHUNK, file.size) - 1;
    let r;
    try {
      r = await fetch("/upload/api/sessions/" + id, { method: "PUT", headers: { "x-owntube-csrf": csrf, "content-range": "bytes " + off + "-" + end + "/" + file.size }, body: file.slice(off, end + 1) });
    } catch (e) {
      $("progress").textContent = "Connection lost; resuming...";
      await new Promise((ok) => setTimeout(ok, 2000));
      const s = await (await fetch("/upload/api/sessions/" + id, { headers: h })).json();
      off = s.received;
      continue;
    }
    const j = await r.json();
    if (r.status === 409) { off = j.received; continue; }
    if (!r.ok) throw new Error(j.error || "Upload failed");
    if (j.status === "queued") return j;
    off = j.received;
    $("progress").textContent = "Uploaded " + Math.floor((off / file.size) * 100) + "%";
  }
}
$("up").addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = $("file").files[0];
  if (!file) return;
  $("go").disabled = true;
  $("progress").textContent = "Starting...";
  try {
    const r = await fetch("/upload/api/sessions", { method: "POST", headers: h, body: JSON.stringify({ name: file.name, size: file.size, title: $("title").value, description: $("description").value, visibility: $("visibility").value }) });
    const s = await r.json();
    if (!r.ok) throw new Error(s.error);
    await send(s.videoId, file, 0);
    $("progress").textContent = "Uploaded. Processing starts shortly; this list updates by itself.";
    $("up").reset();
  } catch (err) {
    $("progress").textContent = String(err.message || err);
  }
  $("go").disabled = false;
  load();
});
async function act(id, method, body) {
  await fetch("/upload/api/videos/" + id, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
  load();
}
async function load() {
  const { videos } = await (await fetch("/upload/api/videos", { headers: h })).json();
  $("list").innerHTML = videos.map((v) =>
    '<tr data-id="' + esc(v.id) + '"><td>' + (v.status === "ready" ? '<a href="/watch?v=' + esc(v.id) + '">' + esc(v.title) + "</a>" : esc(v.title)) +
    '</td><td><select data-act="vis">' + ["public", "unlisted", "private"].map((x) => "<option" + (x === v.visibility ? " selected" : "") + ">" + x + "</option>").join("") +
    "</select></td><td>" + esc(v.status) + (v.error ? ': <span class="err">' + esc(v.error) + "</span>" : "") +
    "</td><td>" + v.views + '</td><td><button data-act="rename" type="button">Rename</button> ' + (v.status === "failed" ? '<button data-act="retry" type="button">Retry</button> ' : "") +
    '<button data-act="delete" type="button">Delete</button></td></tr>').join("") || '<tr><td colspan="5">No videos yet.</td></tr>';
  if (videos.some((v) => v.status === "queued" || v.status === "processing" || v.status === "uploaded")) setTimeout(load, 3000);
}
$("list").addEventListener("change", (e) => { const id = e.target.closest("tr").dataset.id; if (e.target.dataset.act === "vis") act(id, "PATCH", { visibility: e.target.value }); });
$("list").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  const id = b.closest("tr").dataset.id;
  if (b.dataset.act === "delete" && confirm("Delete this video?")) act(id, "DELETE");
  if (b.dataset.act === "rename") { const t = prompt("New title"); if (t) act(id, "PATCH", { title: t }); }
  if (b.dataset.act === "retry") fetch("/upload/api/videos/" + id + "/retry", { method: "POST", headers: h }).then(load);
});
load();
})();`;

export async function uploadRoutes(req: Request, url: URL, viewer: Viewer): Promise<Response | undefined> {
	if (url.pathname === "/upload/tool.js") return new Response(TOOL_JS, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-cache" } });
	if (url.pathname === "/upload") {
		if (!viewer) return Response.redirect("/signin?next=/upload", 302);
		return page(viewer);
	}
	if (url.pathname.startsWith("/upload/api/")) {
		if (!viewer) return fail(401, "Sign in to upload.");
		return api(req, url, viewer);
	}
	return undefined;
}
