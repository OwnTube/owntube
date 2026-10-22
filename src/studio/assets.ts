// Serves the archived Studio client under the Studio origin.
//
//   /s/_/creatorstudio/_/js/...   the app bundle and its modules (bundle.ts), patched
//   /s/_/creatorstudio/_/ss/...   the app stylesheet
// A request with the dark build's activation mask (am=, from the dark page)
// gets the dark build's bundle, stylesheet and modules.
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
	const dark = !!pin.dark && segments(path).am === pin.dark.am;
	if (path.startsWith("/s/_/creatorstudio/_/js/")) {
		if (segments(path).k !== pin.app.key) recordMiss("studio bundle with another build key", path);
		let body = memo.get(path);
		if (!body) {
			const code = studioModules(pin, path, dark);
			if (code !== undefined) body = patched(`studio:${path}`, Buffer.from(code), "studio", path);
			else {
				// the initial bundle of the light or the dark build
				const url = dark ? pin.dark!.jsUrl : pin.app.jsUrl;
				const raw = await original(url);
				if (raw) body = patched(dark ? "studio:main:dark" : "studio:main", raw, "studio", url);
			}
			if (body) memo.set(path, body);
		}
		return assetResponse(req, body, "text/javascript; charset=utf-8", false);
	}
	if (path.startsWith("/s/_/creatorstudio/_/ss/")) {
		const url = dark ? pin.dark!.cssUrl : pin.app.cssUrl;
		const raw = await original(url);
		return assetResponse(req, raw && patched(dark ? "studio:css:dark" : "studio:css", raw, "other", url), "text/css; charset=utf-8", false);
	}
	const upstream = `https://studio.youtube.com${path}${url.search}`;
	return assetResponse(req, await original(upstream), typeFor(upstream), true);
}
