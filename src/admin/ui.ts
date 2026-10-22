// The admin panel's page frame: masthead, guide and content, in the official
// client's visual language (its palettes, Roboto, pill buttons and chips) so
// operators move between the site and the panel without a change of style.
// Appearance is the client's own setting (appearance.ts), resolved on the
// server: Dark and Light are fixed, Use device theme follows the device
// through CSS alone, so it changes live only in that mode.

import type { Appearance } from "../appearance";
import type { Viewer } from "../client/page";
import { INSTANCE_NAME, STUDIO_ORIGIN } from "../config";
import { avatarUrl } from "../innertube/r";

export const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const ICONS: Record<string, string> = {
	overview: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
	accounts: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
	videos: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m10 9 5 3-5 3z"/>',
	processing: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
	compatibility: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
	settings: '<path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"/>',
	audit: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
	external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
	search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
	device: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
	dark: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
	light: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
	check: '<path d="M20 6 9 17l-5-5"/>',
	signout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
	left: '<path d="m15 18-6-6 6-6"/>',
	right: '<path d="m9 18 6-6-6-6"/>',
};

export const icon = (name: keyof typeof ICONS | string, size = 24) =>
	`<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] ?? ""}</svg>`;

export const SECTIONS = [
	["overview", "Overview", "/admin"],
	["accounts", "Accounts", "/admin/accounts"],
	["videos", "Videos", "/admin/videos"],
	["processing", "Processing", "/admin/processing"],
	["compatibility", "Compatibility", "/admin/compatibility"],
	["settings", "Settings", "/admin/settings"],
	["audit", "Audit log", "/admin/audit"],
] as const;
export type Section = (typeof SECTIONS)[number][0];

const PALETTES = `
:root{color-scheme:light;--bg:#fff;--raised:#fff;--text:#0f0f0f;--text-2:#606060;--layer:rgba(0,0,0,.05);--layer-2:rgba(0,0,0,.1);--line:rgba(0,0,0,.1);--chip:rgba(0,0,0,.05);--chip-hover:rgba(0,0,0,.1);--inverse:#0f0f0f;--on-inverse:#fff;--blue:#065fd4;--blue-soft:#def1ff;--red:#cc0000;--red-soft:#ffe5e5;--green:#107516;--green-soft:#e6f4e7;--amber:#8a5a00;--amber-soft:#fff4d6;--shadow:0 4px 32px rgba(0,0,0,.1)}
${dark(':root[data-appearance="dark"]')}
@media (prefers-color-scheme:dark){${dark(':root[data-appearance="device"]')}}`;
function dark(selector: string) {
	return `${selector}{color-scheme:dark;--bg:#0f0f0f;--raised:#282828;--text:#f1f1f1;--text-2:#aaa;--layer:rgba(255,255,255,.1);--layer-2:rgba(255,255,255,.2);--line:rgba(255,255,255,.2);--chip:rgba(255,255,255,.1);--chip-hover:rgba(255,255,255,.2);--inverse:#f1f1f1;--on-inverse:#0f0f0f;--blue:#3ea6ff;--blue-soft:#263850;--red:#ff4e45;--red-soft:#4a1d1b;--green:#5fd068;--green-soft:#1f3a21;--amber:#f2c14e;--amber-soft:#3e3216;--shadow:0 4px 32px rgba(0,0,0,.6)}`;
}

const CSS = `
@font-face{font-family:Roboto;font-weight:400;font-display:swap;src:url(/_ot/fonts/roboto-latin-400-normal.woff2) format("woff2")}
@font-face{font-family:Roboto;font-weight:500;font-display:swap;src:url(/_ot/fonts/roboto-latin-500-normal.woff2) format("woff2")}
@font-face{font-family:Roboto;font-weight:700;font-display:swap;src:url(/_ot/fonts/roboto-latin-700-normal.woff2) format("woff2")}
${PALETTES}
*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--text);font:400 14px/20px Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
a.link{color:var(--blue)}a.link:hover{text-decoration:underline}
button,input,select{font:inherit;color:inherit}
.icon{flex:none;display:block}
.mast{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:16px;height:56px;padding:0 16px 0 24px;background:var(--bg)}
.brand{display:flex;align-items:center;gap:8px;font-size:20px;font-weight:500;letter-spacing:-.5px}
.brand img{border-radius:6px}
.brand .tag{margin-left:4px;padding:2px 8px;border-radius:4px;background:var(--chip);font-size:12px;font-weight:500;letter-spacing:0;color:var(--text-2)}
.mast .end{margin-left:auto;display:flex;align-items:center;gap:8px}
.avatar{width:32px;height:32px;border-radius:50%;display:block;background:var(--chip)}
.account{position:relative}
.account summary{list-style:none;cursor:pointer;border-radius:50%;padding:4px}
.account summary::-webkit-details-marker{display:none}
.menu{position:absolute;right:0;top:44px;width:300px;padding:8px 0;border-radius:12px;background:var(--raised);box-shadow:var(--shadow);border:1px solid var(--line)}
.menu .who{display:flex;gap:16px;padding:8px 16px 16px;border-bottom:1px solid var(--line)}
.menu .who .avatar{width:40px;height:40px}
.menu .who b{display:block;font-weight:500;font-size:16px;line-height:22px}
.menu .label{padding:12px 16px 4px;color:var(--text-2);font-size:12px}
.menu form{margin:0}
.menu .item{display:flex;align-items:center;gap:16px;width:100%;height:40px;padding:0 16px;border:0;background:none;cursor:pointer;text-align:left}
.menu .item:hover{background:var(--layer)}
.menu .item .tick{margin-left:auto;color:var(--text)}
.menu hr{border:0;border-top:1px solid var(--line);margin:8px 0}
.shell{display:flex;align-items:flex-start}
.guide{position:sticky;top:56px;width:240px;flex:none;padding:12px;height:calc(100vh - 56px);overflow-y:auto}
.guide a{display:flex;align-items:center;gap:24px;height:40px;padding:0 12px;border-radius:10px}
.guide a:hover{background:var(--layer)}
.guide a.on{background:var(--layer);font-weight:500}
.guide a .count{margin-left:auto;min-width:20px;padding:0 6px;border-radius:10px;background:var(--red);color:#fff;font-size:12px;line-height:20px;text-align:center}
.guide hr{border:0;border-top:1px solid var(--line);margin:12px 0}
.guide .foot{padding:4px 12px;color:var(--text-2);font-size:12px;line-height:18px}
.content{flex:1;min-width:0;padding:8px 24px 48px}
.page{max-width:1284px}
.head{display:flex;align-items:center;gap:16px;flex-wrap:wrap;min-height:56px;margin-bottom:8px}
.head h1{margin:0;font-size:24px;line-height:32px;font-weight:700;letter-spacing:-.2px}
.head .sub{color:var(--text-2)}
.head .end{margin-left:auto;display:flex;gap:8px;flex-wrap:wrap}
.section-head{display:flex;align-items:center;gap:16px;margin:32px 0 4px}
.section-head h2{margin:0;font-size:20px;line-height:28px;font-weight:700}
.section-head .end{margin-left:auto;display:flex;gap:8px}
.section-note{margin:0 0 16px;color:var(--text-2)}
.flash{display:flex;align-items:center;gap:12px;margin:0 0 24px;padding:12px 16px;border-radius:12px;background:var(--green-soft);color:var(--green)}
.flash.bad{background:var(--red-soft);color:var(--red)}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;align-items:start}
.grid .wide{grid-column:span 2}
.card{border:1px solid var(--line);border-radius:12px;padding:24px;min-width:0}
.card h2{margin:0 0 16px;font-size:16px;line-height:22px;font-weight:500}
.card .more{display:inline-block;margin-top:16px;color:var(--blue);font-weight:500}
.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;margin-bottom:24px}
.stat{border:1px solid var(--line);border-radius:12px;padding:16px 24px}
.stat .n{font-size:28px;line-height:36px;font-weight:500}
.stat .k{color:var(--text-2)}
.stat .s{margin-top:4px;color:var(--text-2);font-size:12px}
.rows{display:flex;flex-direction:column}
.rows .r{display:flex;align-items:center;gap:12px;padding:8px 0;border-top:1px solid var(--line)}
.rows .r:first-child{border-top:0;padding-top:0}
.rows .r .v{margin-left:auto;color:var(--text-2);white-space:nowrap}
.kv{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:8px 24px;margin:0}
.kv dt{color:var(--text-2)}.kv dd{margin:0;overflow-wrap:anywhere}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px}
.muted{color:var(--text-2)}
.toolbar{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px}
.searchbox{display:flex;align-items:center;height:40px;width:min(480px,100%);border:1px solid var(--line);border-radius:20px;padding:0 4px 0 16px;background:var(--bg)}
.searchbox:focus-within{border-color:var(--blue)}
.searchbox input{flex:1;min-width:0;border:0;outline:0;background:none;height:100%}
.searchbox button{display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:50%;background:none;cursor:pointer;color:var(--text)}
.searchbox button:hover{background:var(--layer)}
.chips{display:flex;gap:12px;flex-wrap:wrap}
.chip{display:inline-flex;align-items:center;height:32px;padding:0 12px;border-radius:8px;background:var(--chip);font-weight:500}
.chip:hover{background:var(--chip-hover)}
.chip.on{background:var(--inverse);color:var(--on-inverse)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:36px;padding:0 16px;border:0;border-radius:18px;background:var(--chip);font-weight:500;cursor:pointer;white-space:nowrap}
.btn:hover{background:var(--chip-hover)}
.btn.primary{background:var(--inverse);color:var(--on-inverse)}
.btn.primary:hover{opacity:.9}
.btn.blue{background:none;color:var(--blue)}
.btn.blue:hover{background:var(--blue-soft)}
.btn.danger{background:none;color:var(--red)}
.btn.danger:hover{background:var(--red-soft)}
.btn.small{height:32px;padding:0 12px;border-radius:16px;font-size:13px}
.btn:disabled{opacity:.4;cursor:default}
.actions{display:flex;gap:4px;justify-content:flex-end;flex-wrap:wrap}
.actions form{margin:0}
.table{border:1px solid var(--line);border-radius:12px;overflow-x:auto}
.table table{width:100%;border-collapse:collapse}
.table th{padding:12px 16px;text-align:left;font-size:12px;font-weight:500;color:var(--text-2);border-bottom:1px solid var(--line);white-space:nowrap}
.table td{padding:12px 16px;border-top:1px solid var(--line);vertical-align:middle;overflow-wrap:anywhere}
.table .nowrap{white-space:nowrap}
.table tr:first-child td{border-top:0}
.table tbody tr:hover td{background:var(--layer)}
.table .num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.table .empty{padding:48px 16px;text-align:center;color:var(--text-2)}
.who-cell{display:flex;align-items:center;gap:12px;min-width:0}
.who-cell b{display:block;font-weight:500}
.thumb{width:120px;height:68px;border-radius:8px;object-fit:cover;background:var(--chip);flex:none}
.clip{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.clamp{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere}
.badge{display:inline-flex;align-items:center;height:24px;padding:0 8px;border-radius:4px;background:var(--chip);color:var(--text-2);font-size:12px;font-weight:500;white-space:nowrap}
.badge.good{background:var(--green-soft);color:var(--green)}
.badge.bad{background:var(--red-soft);color:var(--red)}
.badge.warn{background:var(--amber-soft);color:var(--amber)}
.badge.info{background:var(--blue-soft);color:var(--blue)}
.pager{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:16px;color:var(--text-2)}
.pager a,.pager span.off{display:grid;place-items:center;width:36px;height:36px;border-radius:50%}
.pager a:hover{background:var(--layer)}.pager span.off{opacity:.3}
.option{display:flex;gap:16px;align-items:flex-start;padding:16px 0;border-top:1px solid var(--line)}
.option:first-of-type{border-top:0;padding-top:0}
.option input{margin:2px 0 0;accent-color:var(--blue);width:18px;height:18px}
.option b{display:block;font-weight:500}
details.why summary{cursor:pointer;color:var(--blue)}
@media (max-width:1100px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.grid .wide{grid-column:span 2}.stats{grid-template-columns:repeat(2,minmax(0,1fr))}}
.sections{display:none}
@media (max-width:800px){.guide{display:none}.sections{display:flex;gap:12px;overflow-x:auto;padding:4px 16px 12px;scrollbar-width:none}.sections .chip{flex:none}.thumb{width:96px;height:54px}.content{padding:8px 16px 48px}.grid{grid-template-columns:1fr}.grid .wide{grid-column:auto}.mast .end .btn{display:none}.table{overflow-x:auto}}
`;

export type Frame = {
	viewer: NonNullable<Viewer>;
	appearance: Appearance;
	section: Section;
	title: string;
	sub?: string;
	actions?: string;
	flash?: { text: string; bad?: boolean };
	counts?: Partial<Record<Section, number>>;
	token: string;
	path: string;
	nonce: string;
};

const APPEARANCES: [Appearance, string][] = [
	["device", "Use device theme"],
	["dark", "Dark theme"],
	["light", "Light theme"],
];

export function layout(f: Frame, body: string): string {
	const v = f.viewer;
	const menu = `<details class="account"><summary aria-label="Account menu"><img class="avatar" src="${esc(avatarUrl(v.channelId, 88))}" alt=""></summary>
<div class="menu" role="menu">
<div class="who"><img class="avatar" src="${esc(avatarUrl(v.channelId, 88))}" alt=""><div><b>${esc(v.title)}</b><span class="muted">@${esc(v.handle)}</span></div></div>
<div class="label">Appearance</div>
${APPEARANCES.map(([a, label]) => `<form method="post" action="/admin/appearance"><input type="hidden" name="token" value="${esc(f.token)}"><input type="hidden" name="back" value="${esc(f.path)}"><button class="item" name="appearance" value="${a}" role="menuitemradio" aria-checked="${f.appearance === a}">${icon(a)}${label}${f.appearance === a ? `<span class="tick">${icon("check", 20)}</span>` : ""}</button></form>`).join("")}
<hr>
<a class="item" href="/">${icon("external")}Go to ${esc(INSTANCE_NAME)}</a>
<a class="item" href="${esc(STUDIO_ORIGIN)}/">${icon("videos")}YouTube Studio</a>
<form method="post" action="/logout"><button class="item">${icon("signout")}Sign out</button></form>
</div></details>`;
	const guide = SECTIONS.map(
		([key, label, href]) =>
			`<a href="${href}"${key === f.section ? ' class="on" aria-current="page"' : ""}>${icon(key)}<span>${label}</span>${f.counts?.[key] ? `<span class="count">${f.counts[key]}</span>` : ""}</a>`,
	).join("");
	return `<!doctype html><html lang="en" data-appearance="${f.appearance}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(f.title)} - ${esc(INSTANCE_NAME)} admin</title><link rel="icon" href="/_ot/owntube-logo-96.png"><style>${CSS}</style></head><body>
<header class="mast"><a class="brand" href="/admin"><img src="/_ot/owntube-logo-96.png" alt="" width="28" height="28"><span>${esc(INSTANCE_NAME)}</span><span class="tag">Admin</span></a>
<div class="end"><a class="btn" href="/">${icon("external", 20)}View site</a>${menu}</div></header>
<nav class="sections" aria-label="Admin sections">${SECTIONS.map(([key, label, href]) => `<a class="chip${key === f.section ? " on" : ""}" href="${href}"${key === f.section ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav>
<div class="shell"><nav class="guide" aria-label="Admin sections">${guide}<hr><div class="foot">Signed in as @${esc(v.handle)}, operator of this instance.</div></nav>
<main class="content"><div class="page">
<div class="head"><h1>${esc(f.title)}</h1>${f.sub ? `<span class="sub">${f.sub}</span>` : ""}${f.actions ? `<div class="end">${f.actions}</div>` : ""}</div>
${f.flash ? `<div class="flash${f.flash.bad ? " bad" : ""}" role="status">${esc(f.flash.text)}</div>` : ""}
${body}
</div></main></div>
<script nonce="${f.nonce}">document.addEventListener("submit",function(e){var m=e.target.getAttribute("data-confirm");if(m&&!confirm(m))e.preventDefault()});document.addEventListener("click",function(e){var d=document.querySelector("details.account[open]");if(d&&!d.contains(e.target))d.removeAttribute("open")})</script>
</body></html>`;
}

// a form that performs one admin action (POST, with the CSRF token)
export function action(f: Pick<Frame, "token" | "path">, url: string, label: string, fields: Record<string, string> = {}, cls = "btn small", confirm?: string) {
	const hidden = Object.entries({ token: f.token, back: f.path, ...fields })
		.map(([k, v]) => `<input type="hidden" name="${esc(k)}" value="${esc(v)}">`)
		.join("");
	return `<form method="post" action="${esc(url)}"${confirm ? ` data-confirm="${esc(confirm)}"` : ""}>${hidden}<button class="${cls}">${esc(label)}</button></form>`;
}

export function table(head: (string | [string, string])[], rows: string[][], empty = "Nothing here yet") {
	const th = head.map((h) => (Array.isArray(h) ? `<th class="${h[1]}">${esc(h[0])}</th>` : `<th>${esc(h)}</th>`)).join("");
	const cls = head.map((h) => (Array.isArray(h) ? ` class="${h[1]}"` : ""));
	const body = rows.length ? rows.map((r) => `<tr>${r.map((c, i) => `<td${cls[i] ?? ""}>${c}</td>`).join("")}</tr>`).join("") : `<tr><td class="empty" colspan="${head.length}">${esc(empty)}</td></tr>`;
	return `<div class="table"><table><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table></div>`;
}

export function pager(base: string, params: URLSearchParams, page: number, more: boolean) {
	const at = (p: number) => {
		const q = new URLSearchParams(params);
		if (p > 1) q.set("page", String(p));
		else q.delete("page");
		const s = q.toString();
		return `${base}${s ? `?${s}` : ""}`;
	};
	if (page <= 1 && !more) return "";
	return `<div class="pager">Page ${page}${page > 1 ? `<a href="${esc(at(page - 1))}" aria-label="Previous page">${icon("left")}</a>` : `<span class="off">${icon("left")}</span>`}${more ? `<a href="${esc(at(page + 1))}" aria-label="Next page">${icon("right")}</a>` : `<span class="off">${icon("right")}</span>`}</div>`;
}

export const badge = (text: string, kind: "" | "good" | "bad" | "warn" | "info" = "") => `<span class="badge${kind ? ` ${kind}` : ""}">${esc(text)}</span>`;

export function bytes(n: number) {
	const units = ["B", "KB", "MB", "GB", "TB"];
	let i = 0;
	while (n >= 1024 && i < units.length - 1) {
		n /= 1024;
		i++;
	}
	return `${n >= 10 || i === 0 ? Math.round(n) : n.toFixed(1)} ${units[i]}`;
}

export const date = (d: Date | string | null | undefined) =>
	d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }) : "";
export const dateTime = (d: Date | string | null | undefined) =>
	d ? `${new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" })} UTC` : "";
