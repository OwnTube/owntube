// Serves the archived Studio client under the Studio origin.
//
//   /s/_/creatorstudio/_/js/...   the app bundle and its modules (bundle.ts), patched
//   /s/_/creatorstudio/_/ss/...   the app stylesheet
//   /s/<version>/...              Studio's static scripts (polyfills, Lottie)
//   /_up/<host>/...               fonts and images, shared with the main client

import { assetResponse, original, patched, serveUpstream, typeFor } from "../client/assets";
import { loadStudioPin } from "../client/store";
import { recordMiss } from "../diagnostics";
import { segments, studioModules } from "./bundle";

const memo = new Map<string, Buffer>();

export async function serveStudioAsset(req: Request, url: URL): Promise<Response | undefined> {
	const path = url.pathname;
	if (path.startsWith("/_up/")) return serveUpstream(req, url);
	if (!path.startsWith("/s/")) return undefined;
	const pin = loadStudioPin();
	if (!pin) return new Response("Studio not acquired; run bun scripts/fetch-studio.ts", { status: 503 });
	if (path.startsWith("/s/_/creatorstudio/_/js/")) {
		if (segments(path).k !== pin.app.key) recordMiss("studio bundle with another build key", path);
		let body = memo.get(path);
		if (!body) {
			const code = studioModules(pin, path);
			if (code !== undefined) body = patched(`studio:${path}`, Buffer.from(code), "studio", path);
			else {
				// the initial bundle, whatever activation mask the page asked for
				const raw = await original(pin.app.jsUrl);
				if (raw) body = patched("studio:main", raw, "studio", pin.app.jsUrl);
			}
			if (body) memo.set(path, body);
		}
		return assetResponse(req, body, "text/javascript; charset=utf-8", false);
	}
	if (path.startsWith("/s/_/creatorstudio/_/ss/")) {
		const raw = await original(pin.app.cssUrl);
		return assetResponse(req, raw && patched("studio:css", raw, "other", pin.app.cssUrl), "text/css; charset=utf-8", false);
	}
	const upstream = `https://studio.youtube.com${path}${url.search}`;
	return assetResponse(req, await original(upstream), typeFor(upstream), true);
}
