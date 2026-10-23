// A video's thumbnail as Studio's thumbnail picker sets it: one of the three
// stills processing made (process.ts) or a custom image, uploaded first to
// UPLOAD_CONFIG.thumbnailsScottyUrl (/upload/studiothumbnail, scotty.ts) and
// then named in video_manager/metadata_update:
//   videoStill: {operation: "SET_AUTOGEN_STILL", newStillId: 1-3}
//   videoStill: {operation: "UPLOAD_CUSTOM_THUMBNAIL", image: {encryptedScottyResourceId, format}}
// The choice is kept in videos.thumbnail_choice and the thumbnails at
// YouTube's names are made again from it.

import { existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";
import type { Viewer } from "../client/page";
import { MEDIA_DIR, PUBLIC_ORIGIN } from "../config";
import { decodeToken, encodeToken, randomId } from "../ids";
import { CUSTOM_THUMBNAIL, STILLS, applyThumbnail, stillFile } from "../media/process";
import { imageTransfer } from "./scotty";

const UPLOADS = join(MEDIA_DIR, "uploads");
// Studio's custom thumbnail limit is 2 MB; larger files are refused before upload
const LIMIT = 10 * 1024 ** 2;

export async function thumbnailUploadRoute(req: Request, url: URL, viewer: Viewer): Promise<Response | undefined> {
	if (url.pathname !== "/upload/studiothumbnail") return undefined;
	return imageTransfer(req, url, viewer, {
		purpose: "thumbnail",
		limit: LIMIT,
		finish: async (bytes, ext) => {
			if (!viewer) return "Sign in to upload.";
			mkdirSync(UPLOADS, { recursive: true });
			const id = randomId(16);
			const raw = join(UPLOADS, `thumb-${id}.${ext}`);
			await Bun.write(raw, bytes);
			try {
				// 1280x720 like YouTube's own: the image fitted in, the rest black
				const p = Bun.spawn(["ffmpeg", "-v", "error", "-y", "-i", raw, "-frames:v", "1", "-vf",
					"scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:black,format=yuvj420p", "-q:v", "2", join(UPLOADS, `thumb-${id}.ready.jpg`)], { stdout: "ignore", stderr: "ignore" });
				if ((await p.exited) !== 0) return "This image can't be used.";
			} finally {
				rmSync(raw, { force: true });
			}
			return { scottyResourceId: encodeToken({ s: 8, u: viewer.userId, f: id }) };
		},
	});
}

// sets the custom thumbnail Studio names, once the video has been processed
export async function setCustomThumbnail(videoId: string, resourceId: unknown, viewer: NonNullable<Viewer>) {
	const t = decodeToken<{ s?: number; u?: string; f?: string }>(resourceId);
	if (t?.s !== 8 || t.u !== viewer.userId || !/^[\w-]{16}$/.test(String(t.f))) return false;
	const from = join(UPLOADS, `thumb-${t.f}.ready.jpg`);
	const dir = join(MEDIA_DIR, videoId);
	if (!existsSync(from) || !existsSync(dir)) return false;
	renameSync(from, join(dir, CUSTOM_THUMBNAIL));
	await applyThumbnail(videoId, "custom");
	return true;
}

export async function setStill(videoId: string, still: unknown) {
	const n = Number(still);
	if (!STILLS.includes(n as 1 | 2 | 3) || !existsSync(join(MEDIA_DIR, videoId, stillFile(n)))) return false;
	await applyThumbnail(videoId, `still${n}`);
	return true;
}

// Studio's thumbnailEditorState: the stills (picked by number, 1-3) and the
// custom image (0)
export function thumbnailEditorState(videoId: string, choice: string, version: string) {
	const dir = join(MEDIA_DIR, videoId);
	const image = (name: string, w: number, h: number) => ({ thumbnails: [{ url: `${PUBLIC_ORIGIN}/vi/${videoId}/${name}.jpg?v=${version}`, width: w, height: h }] });
	const custom = existsSync(join(dir, CUSTOM_THUMBNAIL));
	const stillId = choice === "custom" && custom ? 0 : /^still[123]$/.test(choice) ? Number(choice.slice(5)) : 1;
	return {
		stillId,
		stills: STILLS.filter((n) => existsSync(join(dir, stillFile(n)))).map((n) => image(`still${n}`, 1280, 720)),
		...(custom ? { customThumbnail: image("custom", 1280, 720) } : {}),
	};
}
