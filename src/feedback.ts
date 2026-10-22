// /feedback: where the account menu's "Send feedback" leads. YouTube's own
// feedback form is Google's; this one keeps what people send for the
// instance's operators, who read it on the admin panel's Feedback page.
// Signed-out viewers can send feedback too, as on YouTube.

import { header, localPage } from "./myaccount";
import type { Viewer } from "./client/page";
import { INSTANCE_NAME, PUBLIC_ORIGIN } from "./config";
import { sql } from "./db";
import { rateLimit } from "./ratelimit";

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const MAX = 5000;

// the page someone was on, when it is one of this instance's
function pageOf(value: string | null): string {
	if (!value) return "";
	try {
		const u = new URL(value, PUBLIC_ORIGIN);
		return u.origin === PUBLIC_ORIGIN && u.pathname !== "/feedback" ? u.pathname + u.search : "";
	} catch {
		return "";
	}
}

function feedbackPage(req: Request, page: string, notice?: [string, boolean], text = "") {
	const body = `${header("Send feedback", "/feedback")}
<main>
${notice ? `<p class="notice${notice[1] ? " bad" : ""}" role="status">${esc(notice[0])}</p>` : ""}
<section><h2>Send feedback to ${esc(INSTANCE_NAME)}</h2><p class="sub">Tell this instance's operators what went wrong or what you'd like. It goes to them, not to Google or YouTube.</p>
<form method="post" action="/feedback"><input type="hidden" name="page" value="${esc(page)}">
<label for="fb">Describe your feedback</label><textarea id="fb" name="body" maxlength="${MAX}" required>${esc(text)}</textarea>
${page ? `<p class="sub" style="margin:8px 0 0">Sent with the page you were on: ${esc(page)}</p>` : ""}
<button>Send</button></form></section>
</main>`;
	return localPage(req, `Send feedback - ${INSTANCE_NAME}`, body, notice?.[1] ? 400 : 200);
}

export async function feedbackRoutes(req: Request, url: URL, viewer: Viewer): Promise<Response | undefined> {
	if (url.pathname !== "/feedback") return undefined;
	if (req.method === "GET") {
		const sent = url.searchParams.get("done") === "sent";
		return feedbackPage(req, pageOf(url.searchParams.get("page") ?? req.headers.get("referer")), sent ? ["Thanks. Your feedback was sent to the operators.", false] : undefined);
	}
	if (req.method !== "POST") return new Response("method not allowed", { status: 405 });
	const origin = req.headers.get("origin");
	if (origin && origin !== url.origin && origin !== PUBLIC_ORIGIN) return new Response("forbidden", { status: 403 });
	const site = req.headers.get("sec-fetch-site");
	if (site && site !== "same-origin") return new Response("forbidden", { status: 403 });
	const f = await req.formData().catch(() => undefined);
	const text = String(f?.get("body") ?? "").trim();
	const page = pageOf(String(f?.get("page") ?? ""));
	if (!text) return feedbackPage(req, page, ["Describe your feedback before sending it.", true]);
	if (text.length > MAX) return feedbackPage(req, page, [`Keep it under ${MAX} characters.`, true], text);
	const who = viewer?.userId ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
	if (!(await rateLimit(`feedback:${who}`, 10, 3600))) return feedbackPage(req, page, ["You've sent a lot of feedback. Try again later.", true], text);
	await sql`insert into feedback (user_id, page, body, user_agent) values (${viewer?.userId ?? null}, ${page || null}, ${text}, ${req.headers.get("user-agent")?.slice(0, 300) ?? null})`;
	return new Response(null, { status: 303, headers: { location: "/feedback?done=sent" } });
}
