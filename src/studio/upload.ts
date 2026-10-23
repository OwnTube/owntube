// Studio's uploads: the resumable Scotty protocol its uploader speaks
// (UPLOAD_CONFIG.scottyUrl), answered on the Studio origin.
//
//   POST /upload/studio                X-Goog-Upload-Command: start
//        body {"frontendUploadId": ...}  X-Goog-Upload-Protocol: resumable
//     -> X-Goog-Upload-Status: active, X-Goog-Upload-URL, X-Goog-Upload-Chunk-Granularity,
//        X-Goog-Upload-Header-Scotty-Resource-Id (read by Studio as the start completes)
//   POST <upload url>                  X-Goog-Upload-Command: upload | upload, finalize | query | cancel
//                                      X-Goog-Upload-Offset: n, body = bytes from n
//     -> active (+ X-Goog-Upload-Size-Received on query), or final with
//        {"status":"STATUS_SUCCESS","scottyResourceId":...} once complete
//
// A 400 makes the uploader query the offset and resume from there. The
// resource id names the file in upload/createvideo (api.ts), which may come
// before or after the last byte, or race it: the file goes to processing
// once both have happened, handed over exactly once by whichever comes
// second (attached_at is claimed atomically). A recovery pass at startup and
// every minute hands over any complete transfer whose video still has no
// file, so an upload is never left at "Uploading".

import { appendFileSync, existsSync, mkdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import type { Viewer } from "../client/page";
import { MAX_UPLOAD_BYTES, MEDIA_DIR, STUDIO_ORIGIN } from "../config";
import { sql } from "../db";
import { newToken } from "../ids";
import { enqueue, probe } from "../media/process";
import { rateLimit } from "../ratelimit";

const SOURCES = join(MEDIA_DIR, "sources");
const GRANULARITY = 256 * 1024;
const partPath = (id: string) => join(SOURCES, `transfer-${id}.part`);

function scotty(status: number, state: string, extra: Record<string, string> = {}, body?: string): Response {
	return new Response(body ?? null, {
		status,
		headers: { "x-goog-upload-status": state, "cache-control": "no-store", ...(body ? { "content-type": "application/json; charset=utf-8" } : {}), ...extra },
	});
}

const failed = (status: number, message: string) => scotty(status, "final", {}, JSON.stringify({ status: "STATUS_FAILURE", errorMessage: message }));

// the transfer's file to its video, the source for processing, once the
// transfer is complete and named by a video; a claim older than ten minutes
// (a server stopped mid-way) can be taken again
export async function attachSource(transferId: string) {
	const [t] = await sql`update upload_transfers set attached_at = now()
		where id = ${transferId} and complete and video_id is not null and (attached_at is null or attached_at < now() - interval '10 minutes')
		returning video_id`;
	if (!t) return;
	const videoId: string = t.video_id;
	const source = join(SOURCES, `${videoId}.src`);
	const [v] = await sql`select source_path, deleted_at from videos where id = ${videoId}`;
	if (!v || v.deleted_at || (v.source_path && existsSync(v.source_path))) return;
	if (!existsSync(partPath(transferId))) {
		if (!existsSync(source)) await sql`update videos set status = 'failed', error = 'The uploaded file is missing. Upload it again.' where id = ${videoId}`;
		else {
			await sql`update videos set source_path = ${source} where id = ${videoId}`;
			await enqueue(videoId);
		}
		return;
	}
	try {
		const p = await probe(partPath(transferId));
		if (p.duration > 6 * 3600) throw new Error("videos are limited to 6 hours");
	} catch (e) {
		rmSync(partPath(transferId), { force: true });
		await sql`update videos set status = 'failed', error = ${`This file can't be processed: ${e instanceof Error ? e.message : String(e)}`.slice(0, 500)} where id = ${videoId}`;
		return;
	}
	renameSync(partPath(transferId), source);
	await sql`update videos set source_path = ${source} where id = ${videoId}`;
	await enqueue(videoId);
}

// complete transfers whose video never got its file (a lost race, a server
// stopped between the two)
export async function recoverTransfers() {
	const stuck = await sql`select t.id, t.video_id from upload_transfers t join videos v on v.id = t.video_id
		where t.complete and v.source_path is null and v.deleted_at is null and v.status <> 'failed'
		and (t.attached_at is null or t.attached_at < now() - interval '10 minutes')`;
	for (const t of stuck) {
		console.log(`upload ${t.id}: handing the finished file to ${t.video_id}`);
		await attachSource(t.id).catch((e) => console.log(`upload ${t.id}: ${e instanceof Error ? e.message : e}`));
	}
	return stuck.length;
}

// transfers that never became a video (the dialog closed mid-upload, or the
// file was never registered) are dropped after a day
export async function pruneTransfers() {
	const stale = await sql`delete from upload_transfers where video_id is null and created_at < now() - interval '1 day' returning id`;
	for (const { id } of stale) rmSync(partPath(id), { force: true });
}

export async function uploadRoutes(req: Request, url: URL, viewer: Viewer): Promise<Response | undefined> {
	if (url.pathname !== "/upload/studio") return undefined;
	if (req.method !== "POST" && req.method !== "PUT") return new Response("method not allowed", { status: 405 });
	if (!viewer) return failed(401, "Sign in to upload.");
	// cookies authenticate the uploader, so only Studio's own pages may use it
	const origin = req.headers.get("origin");
	if (origin && origin !== STUDIO_ORIGIN) return failed(403, "Uploads come from Studio.");
	const command = (req.headers.get("x-goog-upload-command") ?? "").toLowerCase().split(",").map((s) => s.trim());
	const uploadId = url.searchParams.get("upload_id");

	if (!uploadId) {
		if (!command.includes("start") || req.headers.get("x-goog-upload-protocol") !== "resumable") return failed(400, "Start a resumable upload first.");
		if (!(await rateLimit(`upload:${viewer.userId}`, 60, 3600))) return failed(429, "Too many uploads. Try again later.");
		const declared = Number(req.headers.get("x-goog-upload-header-content-length") ?? req.headers.get("x-goog-upload-content-length") ?? Number.NaN);
		if (Number.isFinite(declared) && declared > MAX_UPLOAD_BYTES) return failed(413, `Files are limited to ${Math.round(MAX_UPLOAD_BYTES / 1024 ** 2)} MB.`);
		const meta = await req.json().catch(() => ({}));
		const id = newToken(24);
		const resource = newToken(24);
		const name = decodeURIComponent(req.headers.get("x-goog-upload-file-name") ?? "").slice(0, 255);
		mkdirSync(SOURCES, { recursive: true });
		await Bun.write(partPath(id), "");
		await sql`insert into upload_transfers (id, resource_id, user_id, frontend_upload_id, file_name, size)
			values (${id}, ${resource}, ${viewer.userId}, ${typeof meta.frontendUploadId === "string" ? meta.frontendUploadId.slice(0, 200) : null}, ${name}, ${Number.isFinite(declared) ? declared : null})`;
		const at = `${STUDIO_ORIGIN}/upload/studio?upload_id=${id}&upload_protocol=resumable`;
		return scotty(200, "active", {
			"x-goog-upload-url": at,
			"x-goog-upload-control-url": at,
			"x-goog-upload-chunk-granularity": String(GRANULARITY),
			"x-goog-upload-header-scotty-resource-id": resource,
			"x-guploader-uploadid": id,
		});
	}

	const [t] = await sql`select id, resource_id, user_id, size, received, complete, video_id from upload_transfers where id = ${uploadId}`;
	if (!t || String(t.user_id) !== viewer.userId) return failed(404, "No such upload.");
	const done = () => scotty(200, "final", {}, JSON.stringify({ status: "STATUS_SUCCESS", scottyResourceId: t.resource_id }));
	const received = existsSync(partPath(t.id)) ? statSync(partPath(t.id)).size : Number(t.received);
	if (command.includes("query")) return t.complete ? done() : scotty(200, "active", { "x-goog-upload-size-received": String(received) });
	if (command.includes("cancel")) {
		rmSync(partPath(t.id), { force: true });
		await sql`delete from upload_transfers where id = ${t.id}`;
		return scotty(200, "cancelled");
	}
	if (!command.includes("upload")) return failed(400, "Unknown upload command.");
	if (t.complete) return done();
	const offset = Number(req.headers.get("x-goog-upload-offset"));
	// anything but the next byte: the uploader asks where to go on
	if (offset !== received) return scotty(400, "active");
	const chunk = new Uint8Array(await req.arrayBuffer());
	const finalize = command.includes("finalize");
	if (!finalize && chunk.byteLength % GRANULARITY) return scotty(400, "active");
	const total = received + chunk.byteLength;
	if (total > MAX_UPLOAD_BYTES || (t.size !== null && total > Number(t.size))) {
		rmSync(partPath(t.id), { force: true });
		await sql`delete from upload_transfers where id = ${t.id}`;
		return failed(413, `Files are limited to ${Math.round(MAX_UPLOAD_BYTES / 1024 ** 2)} MB.`);
	}
	appendFileSync(partPath(t.id), chunk);
	await sql`update upload_transfers set received = ${total}, complete = ${finalize} where id = ${t.id}`;
	if (!finalize) return scotty(200, "active");
	// createvideo may have named the video since t was read
	await attachSource(t.id);
	return done();
}
