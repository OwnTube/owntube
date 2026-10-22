// /youtubei/v1/<method> dispatch. Bodies arrive as JSON, gzip-compressed
// when the client's wug_networking_gzip_request flag is on. Unknown methods
// are counted in diagnostics and answered with an empty envelope so the
// client degrades rather than retrying.

import { verifyApiSignature } from "../auth";
import type { Viewer } from "../client/page";
import { recordMiss } from "../diagnostics";
import { addBadges } from "./badges";
import { responseContext } from "./r";

export type Ctx = { req: Request; url: URL; body: any; viewer: Viewer; method: string };
export type Handler = (ctx: Ctx) => Promise<unknown> | unknown;

const handlers = new Map<string, { fn: Handler; mutation: boolean }>();
export function route(method: string, fn: Handler, opts: { mutation?: boolean } = {}) {
	handlers.set(method, { fn, mutation: !!opts.mutation });
}

export class ApiError extends Error {
	constructor(public status: number, message: string, public reason = "badRequest") {
		super(message);
	}
}

const MAX_BODY = 1024 * 1024;

async function readBody(req: Request): Promise<any> {
	const len = Number(req.headers.get("content-length") ?? 0);
	if (len > MAX_BODY) throw new ApiError(413, "Request too large");
	let buf = new Uint8Array(await req.arrayBuffer());
	if (buf.byteLength > MAX_BODY) throw new ApiError(413, "Request too large");
	if (req.headers.get("content-encoding") === "gzip" || (buf[0] === 0x1f && buf[1] === 0x8b)) {
		buf = Bun.gunzipSync(buf);
		if (buf.byteLength > 8 * MAX_BODY) throw new ApiError(413, "Request too large");
	}
	if (!buf.byteLength) return {};
	try {
		return JSON.parse(new TextDecoder().decode(buf));
	} catch {
		throw new ApiError(400, "Invalid JSON");
	}
}

function errorEnvelope(status: number, message: string, reason: string) {
	return Response.json({ error: { code: status, message, errors: [{ message, domain: "global", reason }], status: status === 401 ? "UNAUTHENTICATED" : status === 403 ? "PERMISSION_DENIED" : status === 404 ? "NOT_FOUND" : "INVALID_ARGUMENT" } }, { status });
}

export async function innertube(req: Request, url: URL, viewer: Viewer): Promise<Response> {
	const method = url.pathname.slice("/youtubei/v1/".length);
	let body: any;
	try {
		body = req.method === "POST" ? await readBody(req) : {};
	} catch (e) {
		if (e instanceof ApiError) return errorEnvelope(e.status, e.message, e.reason);
		throw e;
	}
	const h = handlers.get(method);
	if (!h) {
		recordMiss(`youtubei ${method}`, JSON.stringify(body).slice(0, 400));
		return Response.json({ responseContext: responseContext(viewer) });
	}
	if (h.mutation) {
		if (!viewer) return errorEnvelope(401, "Sign in to do this.", "authError");
		if (!verifyApiSignature(req, viewer)) return errorEnvelope(403, "The request is missing a valid API signature.", "forbidden");
	}
	try {
		const out = await h.fn({ req, url, body, viewer, method });
		if (out instanceof Response) return out;
		await addBadges(out);
		return new Response(JSON.stringify(out), { headers: { "content-type": "application/json; charset=UTF-8", "cache-control": "no-store" } });
	} catch (e) {
		if (e instanceof ApiError) return errorEnvelope(e.status, e.message, e.reason);
		console.error(`youtubei ${method} failed`, e);
		recordMiss(`youtubei ${method} error`, String(e));
		return errorEnvelope(500, "Internal error", "backendError");
	}
}

// telemetry the client sends; accepted and dropped
for (const m of ["log_event", "att/log", "visitor_id", "stats/qoe", "stats/watchtime"]) route(m, () => ({ responseContext: {} }));
// att/get: a challenge without a BotGuard program. The client then marks
// BotGuard as not needed (window.bgens = 1) and sends player and get_watch
// requests without waiting for a PO token it could never mint; with no
// challenge at all it retries and holds in-app watch navigation forever.
// t is the challenge's lifetime in seconds
route("att/get", () => ({ responseContext: {}, challenge: "a=5&t=86400" }));
