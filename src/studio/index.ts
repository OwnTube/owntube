// Requests to the Studio origin (STUDIO_ORIGIN): the pinned Studio client,
// its InnerTube calls (the shared router; creator methods in api.ts) and
// uploads (upload.ts). Studio is for signed-in channel owners only; anyone
// else is sent to the main origin's sign-in.

import { APPEARANCE_HEADERS, isDark } from "../appearance";
import type { Viewer } from "../client/page";
import { loadStudioPin } from "../client/store";
import { PUBLIC_ORIGIN, STUDIO_ORIGIN } from "../config";
import { sql } from "../db";
import { innertube } from "../innertube/router";
import { serveStudioAsset } from "./assets";
import { renderStudioPage } from "./page";
import { uploadRoutes } from "./upload";
import "./api";
import "./feedback";
import "./dashboard";

// Studio's pages may load images and media from the main origin (avatars,
// thumbnails, the player's streams) and nothing from anywhere else
const CSP = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
	"style-src 'self' 'unsafe-inline'",
	`img-src 'self' data: blob: ${PUBLIC_ORIGIN}`,
	`media-src 'self' blob: data: ${PUBLIC_ORIGIN}`,
	"font-src 'self' data:",
	`connect-src 'self' blob: data: ${PUBLIC_ORIGIN}`,
	"worker-src 'self' blob:",
	`frame-src 'self' ${PUBLIC_ORIGIN}`,
	`report-uri ${PUBLIC_ORIGIN}/_csp`,
].join("; ");

async function ownsVideo(channelId: string, videoId: string) {
	const [row] = await sql`select 1 from videos where id = ${videoId} and channel_id = ${channelId}`;
	return !!row;
}

function nonce() {
	return Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString("base64url");
}

export async function studioRoutes(req: Request, url: URL, viewer: Viewer): Promise<Response> {
	const path = url.pathname;
	const asset = await serveStudioAsset(req, url);
	if (asset) return asset;
	if (path.startsWith("/youtubei/v1/")) return innertube(req, url, viewer);
	const up = await uploadRoutes(req, url, viewer);
	if (up) return up;
	if (path === "/favicon.ico") return Response.redirect(`${STUDIO_ORIGIN}/_up/www.gstatic.com/youtube/img/creator/favicon/favicon_v2.ico`, 302);
	if (req.method !== "GET" && req.method !== "HEAD") return new Response("method not allowed", { status: 405 });
	if (!loadStudioPin()) return new Response("YouTube Studio is not acquired on this instance; run bun scripts/fetch-studio.ts", { status: 503 });
	if (!viewer) return Response.redirect(`${PUBLIC_ORIGIN}/signin?next=${encodeURIComponent(STUDIO_ORIGIN + path + url.search)}`, 303);
	// Studio's own routes are /channel/<id>/... and /video/<id>/...; the
	// root, other channels' pages and other channels' videos lead to the
	// viewer's channel
	const m = /^\/channel\/(UC[\w-]{22})(\/.*)?$/.exec(path);
	const v = /^\/video\/([\w-]{11})(\/.*)?$/.exec(path);
	if (v ? !(await ownsVideo(viewer.channelId, v[1])) : !m || m[1] !== viewer.channelId)
		return Response.redirect(`${STUDIO_ORIGIN}/channel/${viewer.channelId}${m?.[2] ?? ""}${url.search}`, 303);
	const n = nonce();
	return new Response(await renderStudioPage(viewer, path + url.search, n, isDark(req)), {
		headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "content-security-policy": CSP, "x-content-type-options": "nosniff", "referrer-policy": "strict-origin-when-cross-origin", ...APPEARANCE_HEADERS },
	});
}
