// /admin: operator-only page. Compatibility diagnostics (requests the
// backend did not handle, grouped by route or operation with counts),
// client patch status, the processing queue, accounts and videos.
// Samples are redacted when recorded (diagnostics.ts).

import type { Viewer } from "./client/page";
import { patchFailures } from "./client/assets";
import { checkPatches } from "./client/assets";
import { loadPin } from "./client/store";
import { sql } from "./db";
import { flushMisses } from "./diagnostics";
import { esc, instancePage } from "./instance";

function table(head: string[], rows: (string | number)[][]) {
	return `<table><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${typeof c === "number" ? c : c}</td>`).join("")}</tr>`).join("") || `<tr><td colspan="${head.length}">None</td></tr>`}</tbody></table>`;
}

async function page(): Promise<Response> {
	await flushMisses();
	const pin = loadPin();
	const misses = await sql`select key, count, first_seen, last_seen, sample from compat_misses order by count desc, last_seen desc limit 300`;
	const jobs = await sql`select j.id, j.video_id, j.state, j.attempts, j.error, j.created_at, v.title from processing_jobs j join videos v on v.id = j.video_id order by j.id desc limit 30`;
	const users = await sql`select u.id, u.login, u.is_admin, u.created_at, c.handle, (select count(*)::int from videos v where v.channel_id = c.id and v.deleted_at is null) as videos from users u join channels c on c.user_id = u.id order by u.id`;
	const counts = await sql`select status, count(*)::int as n from videos where deleted_at is null group by status order by status`;
	const patches = await checkPatches().catch((e) => [{ id: `check failed: ${e}`, matches: 0, expect: 0, ok: false }]);
	const group = (k: string) => (k.startsWith("csp blocked") ? "Blocked upstream request" : k.startsWith("youtubei") ? "InnerTube method" : k.startsWith("asset") || k.startsWith("app module") ? "Client asset" : k.startsWith("page") ? "Page" : k.startsWith("client error") ? "Client error" : "Other");
	return instancePage(
		"Admin",
		`<main class="wide"><p><a href="/">← Home</a></p><h1>Instance admin</h1>
<p class="sub">Client build ${esc(pin?.pageBuildLabel ?? "not pinned")} · player ${esc(pin?.player.id ?? "-")} · pinned ${esc(pin?.fetchedAt ?? "-")}</p>
<h2>Compatibility diagnostics</h2><p class="note">Requests this instance did not handle, most frequent first. Upstream requests are blocked by the page's Content-Security-Policy and reported here.</p>
${table(["Kind", "Key", "Count", "Last seen", "Sample"], misses.map((m: any) => [esc(group(m.key)), esc(m.key), Number(m.count), esc(new Date(m.last_seen).toISOString().slice(0, 19)), `<code>${esc(String(m.sample ?? "").slice(0, 200))}</code>`]))}
<h2>Client patches</h2>${table(["Patch", "Matches", "Expected", "State"], patches.map((p) => [esc(p.id), p.matches, p.expect, p.ok ? "ok" : '<span class="err">mismatch</span>']))}
${patchFailures.size ? `<p class="err">Serve-time mismatches: ${esc([...patchFailures.keys()].join(", "))}</p>` : ""}
<h2>Videos</h2>${table(["Status", "Count"], counts.map((c: any) => [esc(c.status), c.n]))}
<h2>Processing queue</h2>${table(["Job", "Video", "State", "Attempts", "Error"], jobs.map((j: any) => [j.id, `<a href="/watch?v=${esc(j.video_id)}">${esc(j.title)}</a>`, esc(j.state), j.attempts, esc(j.error ?? "")]))}
<h2>Accounts</h2>${table(["Id", "Login", "Channel", "Videos", "Admin", "Created"], users.map((u: any) => [Number(u.id), esc(u.login), `<a href="/@${esc(u.handle)}">@${esc(u.handle)}</a>`, u.videos, u.is_admin ? "yes" : "", esc(new Date(u.created_at).toISOString().slice(0, 10))]))}
<form method="post" action="/admin/clear-diagnostics"><button>Clear diagnostics</button></form></main>`,
	);
}

export async function adminRoutes(req: Request, url: URL, viewer: Viewer): Promise<Response | undefined> {
	if (!url.pathname.startsWith("/admin")) return undefined;
	if (!viewer) return Response.redirect(`/signin?next=${encodeURIComponent(url.pathname)}`, 302);
	if (!viewer.isAdmin) return instancePage("Admin", "<main><h1>Not allowed</h1><p>This page is for the instance's operators.</p></main>", 403);
	if (url.pathname === "/admin" && req.method === "GET") return page();
	if (url.pathname === "/admin/diagnostics.json") {
		await flushMisses();
		return Response.json(await sql`select key, count, first_seen, last_seen, sample from compat_misses order by count desc`);
	}
	if (url.pathname === "/admin/clear-diagnostics" && req.method === "POST") {
		if (req.headers.get("origin") && new URL(req.headers.get("origin")!).host !== url.host) return new Response("forbidden", { status: 403 });
		await sql`delete from compat_misses`;
		return Response.redirect("/admin", 303);
	}
	return new Response("not found", { status: 404 });
}
