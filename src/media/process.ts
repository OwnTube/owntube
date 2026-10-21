// Upload processing: ffprobe the source, then encode with ffmpeg into what
// the official player consumes.
//   - itag 18: progressive MP4 (H.264 + AAC, 360p), streamingData.formats
//   - DASH video: fragmented MP4 with a global sidx, one per rung of the
//     ladder up to the source height, streamingData.adaptiveFormats
//   - itag 140: fragmented AAC audio, 128 kb/s; itag 251: Opus in WebM
//   - every video rung twice: H.264/MP4 (Safari, Chrome) and VP9/WebM
//     (Chromium builds without proprietary codecs, Firefox)
//   - thumbnails at YouTube's names and sizes (default, mqdefault, ...)
// Jobs run in this process, one at a time, from the processing_jobs queue.

import { existsSync, mkdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import { MEDIA_DIR } from "../config";
import { sql } from "../db";
import { codecString, dashRanges } from "./mp4";
import { webmRanges } from "./webm";

// YouTube's itags: H.264 in MP4 (Safari, Chrome) and VP9 in WebM (Firefox,
// Chromium builds without proprietary codecs), one of each per rung
type Rung = { height: number; itag: number; itag60?: number; vp9: number; vp960?: number; quality: string; maxrate: number };
const LADDER: Rung[] = [
	{ height: 144, itag: 160, vp9: 278, quality: "tiny", maxrate: 150 },
	{ height: 240, itag: 133, vp9: 242, quality: "small", maxrate: 400 },
	{ height: 360, itag: 134, vp9: 243, quality: "medium", maxrate: 800 },
	{ height: 480, itag: 135, vp9: 244, quality: "large", maxrate: 1400 },
	{ height: 720, itag: 136, itag60: 298, vp9: 247, vp960: 302, quality: "hd720", maxrate: 3000 },
	{ height: 1080, itag: 137, itag60: 299, vp9: 248, vp960: 303, quality: "hd1080", maxrate: 5500 },
];

const THUMBS = [
	{ name: "default", w: 120, h: 90 },
	{ name: "mqdefault", w: 320, h: 180 },
	{ name: "hqdefault", w: 480, h: 360 },
	{ name: "sddefault", w: 640, h: 480 },
	{ name: "maxresdefault", w: 1280, h: 720 },
	{ name: "hq720", w: 1280, h: 720 },
];

export type Probe = { duration: number; width: number; height: number; fps: number; hasAudio: boolean; rotation: number };

async function run(cmd: string[], timeoutMs = 60 * 60 * 1000): Promise<string> {
	const p = Bun.spawn(cmd, { stdout: "pipe", stderr: "pipe" });
	const timer = setTimeout(() => p.kill(), timeoutMs);
	const [out, err, code] = await Promise.all([new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited]);
	clearTimeout(timer);
	if (code !== 0) throw new Error(`${cmd[0]} exited ${code}: ${err.trim().split("\n").slice(-3).join(" ")}`);
	return out;
}

export async function probe(path: string): Promise<Probe> {
	const out = JSON.parse(await run(["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", path], 60_000));
	const v = (out.streams ?? []).find((s: any) => s.codec_type === "video" && !s.disposition?.attached_pic);
	if (!v) throw new Error("the file has no video stream");
	const duration = Number(out.format?.duration ?? v.duration);
	if (!(duration > 0)) throw new Error("could not read the duration");
	const [num, den] = String(v.avg_frame_rate || v.r_frame_rate || "30/1").split("/").map(Number);
	const fps = den ? num / den : 30;
	const rotation = Math.abs(Number(v.side_data_list?.find((d: any) => d.rotation !== undefined)?.rotation ?? v.tags?.rotate ?? 0)) % 180;
	const [width, height] = rotation === 90 ? [v.height, v.width] : [v.width, v.height];
	return { duration, width, height, fps: Number.isFinite(fps) && fps > 0 ? fps : 30, hasAudio: (out.streams ?? []).some((s: any) => s.codec_type === "audio"), rotation };
}

const even = (n: number) => Math.max(2, Math.round(n / 2) * 2);

async function encode(videoId: string, src: string, dir: string, p: Probe) {
	const fps = Math.min(60, Math.round(p.fps));
	const gop = Math.max(1, fps * 2);
	const outFps = ["-r", String(fps)];
	const silent = p.hasAudio ? [] : ["-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100"];
	const audioMap = p.hasAudio ? ["-map", "0:a:0"] : ["-map", "1:a:0", "-shortest"];
	const formats: any[] = [];
	const durationMs = Math.round(p.duration * 1000);

	// progressive 360p, the simplest path the player supports
	const muxed = join(dir, "18.mp4");
	await run(["ffmpeg", "-v", "error", "-y", "-i", src, ...silent, "-map", "0:v:0", ...audioMap, "-vf", `scale=-2:${Math.min(360, even(p.height))}`, ...outFps,
		"-c:v", "libx264", "-profile:v", "main", "-preset", "veryfast", "-crf", "26", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-ac", "2", "-ar", "44100", "-movflags", "+faststart", muxed]);
	formats.push({ itag: 18, kind: "muxed", path: "18.mp4", quality: "medium", qualityLabel: "360p", height: Math.min(360, even(p.height)) });

	for (const r of LADDER) {
		if (r.height > p.height && r.height !== 144) continue;
		const itag = fps > 30 && r.itag60 ? r.itag60 : r.itag;
		const file = `${itag}.mp4`;
		await run(["ffmpeg", "-v", "error", "-y", "-i", src, "-map", "0:v:0", "-an", "-vf", `scale=-2:${r.height}`, ...outFps,
			"-c:v", "libx264", "-profile:v", r.height >= 720 ? "high" : "main", "-preset", "veryfast", "-crf", "23", "-maxrate", `${r.maxrate}k`, "-bufsize", `${r.maxrate * 2}k`,
			"-pix_fmt", "yuv420p", "-g", String(gop), "-keyint_min", String(gop), "-sc_threshold", "0",
			"-movflags", "+frag_keyframe+empty_moov+default_base_moof+global_sidx", "-f", "mp4", join(dir, file)]);
		formats.push({ itag, kind: "video", path: file, quality: r.quality, qualityLabel: `${r.height}p${fps > 30 ? fps : ""}`, height: r.height });
		const vp9 = fps > 30 && r.vp960 ? r.vp960 : r.vp9;
		await run(["ffmpeg", "-v", "error", "-y", "-i", src, "-map", "0:v:0", "-an", "-vf", `scale=-2:${r.height}`, ...outFps,
			"-c:v", "libvpx-vp9", "-deadline", "realtime", "-cpu-used", "8", "-row-mt", "1", "-crf", "33", "-b:v", `${r.maxrate}k`, "-maxrate", `${r.maxrate}k`, "-bufsize", `${r.maxrate * 2}k`,
			"-pix_fmt", "yuv420p", "-g", String(gop), "-keyint_min", String(gop), "-f", "webm", "-dash", "1", "-cues_to_front", "1", join(dir, `${vp9}.webm`)]);
		formats.push({ itag: vp9, kind: "video", path: `${vp9}.webm`, quality: r.quality, qualityLabel: `${r.height}p${fps > 30 ? fps : ""}`, height: r.height });
	}

	await run(["ffmpeg", "-v", "error", "-y", "-i", src, ...silent, "-vn", ...audioMap, "-c:a", "aac", "-b:a", "128k", "-ac", "2", "-ar", "44100",
		"-frag_duration", "2000000", "-movflags", "+empty_moov+default_base_moof+global_sidx", "-f", "mp4", join(dir, "140.m4a")]);
	formats.push({ itag: 140, kind: "audio", path: "140.m4a", quality: "tiny" });
	await run(["ffmpeg", "-v", "error", "-y", "-i", src, ...silent, "-vn", ...audioMap, "-c:a", "libopus", "-b:a", "128k", "-ac", "2",
		"-f", "webm", "-dash", "1", "-cues_to_front", "1", join(dir, "251.webm")]);
	formats.push({ itag: 251, kind: "audio", path: "251.webm", quality: "tiny" });

	const rows = [];
	for (const f of formats) {
		const full = join(dir, f.path);
		const size = statSync(full).size;
		const fp = await probe(full).catch(() => undefined);
		const bitrate = Math.round((size * 8) / p.duration);
		const webm = f.path.endsWith(".webm");
		const ranges = f.kind === "muxed" ? undefined : webm ? webmRanges(full) : dashRanges(full);
		let mime: string;
		if (webm) mime = f.kind === "video" ? 'video/webm; codecs="vp9"' : 'audio/webm; codecs="opus"';
		else if (f.kind === "muxed") mime = `video/mp4; codecs="${codecString(full)}, mp4a.40.2"`;
		else if (f.kind === "video") mime = `video/mp4; codecs="${codecString(full)}"`;
		else mime = `audio/mp4; codecs="${codecString(full)}"`;
		rows.push({
			video_id: videoId,
			itag: f.itag,
			kind: f.kind,
			mime_type: mime,
			path: join(videoId, f.path),
			size,
			bitrate: Math.round(bitrate * 1.2),
			average_bitrate: bitrate,
			width: f.kind === "audio" ? null : (fp?.width ?? null),
			height: f.kind === "audio" ? null : (fp?.height ?? f.height),
			fps: f.kind === "audio" ? null : fps,
			quality: f.quality,
			quality_label: f.qualityLabel ?? null,
			init_start: ranges?.initStart ?? null,
			init_end: ranges?.initEnd ?? null,
			index_start: ranges?.indexStart ?? null,
			index_end: ranges?.indexEnd ?? null,
			audio_sample_rate: f.kind === "video" ? null : webm ? 48000 : 44100,
			audio_channels: f.kind === "video" ? null : 2,
			duration_ms: durationMs,
		});
	}
	return rows;
}

async function thumbnails(videoId: string, src: string, dir: string, p: Probe) {
	const at = Math.min(p.duration * 0.25, 30).toFixed(2);
	const rows = [];
	for (const t of THUMBS) {
		// 4:3 names are letterboxed like YouTube's; 16:9 ones are cropped to fill
		const box = t.w / t.h > 1.5
			? `scale=${t.w}:${t.h}:force_original_aspect_ratio=increase,crop=${t.w}:${t.h}`
			: `scale=${t.w}:${t.h}:force_original_aspect_ratio=decrease,pad=${t.w}:${t.h}:(ow-iw)/2:(oh-ih)/2:black`;
		const file = `${t.name}.jpg`;
		await run(["ffmpeg", "-v", "error", "-y", "-ss", at, "-i", src, "-frames:v", "1", "-vf", box, "-q:v", "3", join(dir, file)]);
		rows.push({ video_id: videoId, name: t.name, path: join(videoId, file), width: t.w, height: t.h });
	}
	return rows;
}

export async function processVideo(videoId: string) {
	const [video] = await sql`select id, source_path from videos where id = ${videoId}`;
	if (!video?.source_path || !existsSync(video.source_path)) throw new Error("the uploaded file is missing");
	await sql`update videos set status = 'processing', error = null where id = ${videoId}`;
	const finalDir = join(MEDIA_DIR, videoId);
	const work = join(MEDIA_DIR, `.work-${videoId}`);
	rmSync(work, { recursive: true, force: true });
	mkdirSync(work, { recursive: true });
	try {
		const p = await probe(video.source_path);
		if (p.duration > 6 * 3600) throw new Error("videos are limited to 6 hours");
		if (p.width < 16 || p.height < 16) throw new Error("the video is too small");
		const formats = await encode(videoId, video.source_path, work, p);
		const thumbs = await thumbnails(videoId, video.source_path, work, p);
		rmSync(finalDir, { recursive: true, force: true });
		renameSync(work, finalDir);
		await sql.begin(async (tx) => {
			await tx`delete from video_formats where video_id = ${videoId}`;
			await tx`delete from video_thumbnails where video_id = ${videoId}`;
			for (const f of formats) await tx`insert into video_formats ${tx(f)}`;
			for (const t of thumbs) await tx`insert into video_thumbnails ${tx(t)}`;
			await tx`update videos set status = 'ready', duration_ms = ${Math.round(p.duration * 1000)}, width = ${p.width}, height = ${p.height}, fps = ${p.fps},
				published_at = coalesce(published_at, now()) where id = ${videoId}`;
		});
	} catch (e) {
		rmSync(work, { recursive: true, force: true });
		throw e;
	}
}

let running = false;
export async function runQueueOnce(): Promise<boolean> {
	if (running) return false;
	running = true;
	try {
		const [job] = await sql`update processing_jobs set state = 'running', started_at = now(), attempts = attempts + 1
			where id = (select id from processing_jobs where state = 'queued' order by created_at limit 1 for update skip locked) returning id, video_id`;
		if (!job) return false;
		try {
			await processVideo(job.video_id);
			await sql`update processing_jobs set state = 'done', finished_at = now() where id = ${job.id}`;
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			console.log(`processing ${job.video_id} failed: ${msg}`);
			await sql`update processing_jobs set state = 'failed', error = ${msg}, finished_at = now() where id = ${job.id}`;
			await sql`update videos set status = 'failed', error = ${msg.slice(0, 500)} where id = ${job.video_id}`;
		}
		return true;
	} finally {
		running = false;
	}
}

export function startProcessing() {
	// jobs left running by a stopped server start over
	void sql`update processing_jobs set state = 'queued' where state = 'running'`.then(() => sql`update videos set status = 'queued' where status = 'processing'`);
	setInterval(async () => {
		while (await runQueueOnce()) {}
	}, 2000);
}

export async function enqueue(videoId: string) {
	await sql`update videos set status = 'queued' where id = ${videoId}`;
	await sql`insert into processing_jobs (video_id) values (${videoId})`;
}

export function deleteMedia(videoId: string) {
	rmSync(join(MEDIA_DIR, videoId), { recursive: true, force: true });
	rmSync(join(MEDIA_DIR, `.work-${videoId}`), { recursive: true, force: true });
}
