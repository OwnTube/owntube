// The instance's own sign-in and account-creation pages. They follow the
// layout of the account pages YouTube sends people to (a single card: logo,
// heading, one question per step, a text button on the left and Next on the
// right) but carry this instance's name and logo: these are local accounts,
// and the pages say so, so nobody mistakes them for Google's.
//
// Each step is a plain form post; earlier answers ride along in hidden
// fields, so the pages work without scripts. The username step does not say
// whether an account exists: a wrong username or password fails only at the
// password step, with one message for both.

import { join } from "node:path";
import { createSession, login, LOGIN_RE, register, switchSession } from "./auth";
import type { Viewer } from "./client/page";
import { INSTANCE_NAME } from "./config";
import { sql } from "./db";
import { settings } from "./settings";
import { rateLimit } from "./ratelimit";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const ASSETS_DIR = join(import.meta.dir, "..", "assets");
const ASSET_TYPES: Record<string, string> = { ".woff2": "font/woff2", ".png": "image/png" };

// /_ot/: the instance's own static files (fonts, logo)
export function instanceAsset(path: string): Response | undefined {
	const m = /^\/_ot\/((?:fonts\/)?[a-z0-9-]+(\.woff2|\.png))$/.exec(path);
	if (!m) return undefined;
	const f = Bun.file(join(ASSETS_DIR, m[1]));
	return new Response(f, { headers: { "content-type": ASSET_TYPES[m[2]], "cache-control": "public, max-age=86400" } });
}

const CSS = `
@font-face{font-family:Roboto;font-weight:400;font-display:swap;src:url(/_ot/fonts/roboto-latin-400-normal.woff2) format("woff2")}
@font-face{font-family:Roboto;font-weight:500;font-display:swap;src:url(/_ot/fonts/roboto-latin-500-normal.woff2) format("woff2")}
:root{color-scheme:light;--bg:#fff;--fg:#202124;--muted:#5f6368;--line:#dadce0;--blue:#1a73e8;--blue-hover:#1765cc;--on-blue:#fff;--err:#d93025;--chip:#fff}
@media (prefers-color-scheme:dark){:root{color-scheme:dark;--bg:#202124;--fg:#e8eaed;--muted:#9aa0a6;--line:#5f6368;--blue:#8ab4f8;--blue-hover:#aecbfa;--on-blue:#202124;--err:#f28b82;--chip:#202124}}
*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--fg);font:14px/20px Roboto,Arial,sans-serif}
.page{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 0}
.card{width:450px;min-height:500px;border:1px solid var(--line);border-radius:8px;padding:48px 40px 36px;display:flex;flex-direction:column}
.logo{display:block;width:40px;height:40px;margin:0 auto;border-radius:8px}
h1{margin:16px 0 0;font-size:24px;line-height:32px;font-weight:400;text-align:center}
.sub{margin:8px 0 0;font-size:16px;line-height:24px;letter-spacing:.1px;text-align:center}
form{display:flex;flex-direction:column;flex:1;margin-top:40px}
.chip{align-self:center;display:inline-flex;align-items:center;gap:8px;margin:-24px 0 32px;padding:3px 8px 3px 3px;border:1px solid var(--line);border-radius:16px;background:var(--chip);color:var(--fg);font:500 14px/20px Roboto,Arial,sans-serif;text-decoration:none;max-width:100%}
.chip .av{width:20px;height:20px;border-radius:50%;background:#1a73e8;color:#fff;font-size:12px;line-height:20px;text-align:center;flex:none}
.chip span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.chip svg{flex:none;fill:currentColor}
.field{position:relative;margin-bottom:8px}
.field+.field{margin-top:16px}
.field input{width:100%;height:56px;padding:13px 15px;border:1px solid var(--line);border-radius:4px;background:transparent;color:var(--fg);font:16px/24px Roboto,Arial,sans-serif;outline:none}
.field input:focus{border:2px solid var(--blue);padding:12px 14px}
.field label{position:absolute;left:8px;top:16px;padding:0 8px;background:var(--bg);color:var(--muted);font-size:16px;line-height:24px;pointer-events:none;transition:transform .15s,font-size .15s,top .15s}
.field input:focus+label,.field input:not(:placeholder-shown)+label{top:-10px;font-size:12px;line-height:16px}
.field input:focus+label{color:var(--blue)}
.field.bad input{border:2px solid var(--err);padding:12px 14px}
.field.bad label,.field.bad input:focus+label{color:var(--err)}
.help{margin:4px 16px 0;color:var(--muted);font-size:12px;line-height:16px}
.err{display:flex;gap:8px;margin:8px 0 0;color:var(--err);font-size:12px;line-height:16px}
.err svg{flex:none;fill:currentColor}
.show{display:flex;align-items:center;gap:12px;margin-top:16px;cursor:pointer;font-size:14px}
.show input{width:18px;height:18px;margin:0 3px;accent-color:var(--blue)}
.note{margin:40px 0 0;color:var(--muted);font-size:14px;line-height:20px}
.actions{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:32px}
.text-btn{margin-left:-8px;padding:8px;border:0;border-radius:4px;background:none;color:var(--blue);font:500 14px/20px Roboto,Arial,sans-serif;letter-spacing:.25px;text-decoration:none;cursor:pointer}
.text-btn:hover{background:color-mix(in srgb,var(--blue) 6%,transparent)}
.next{margin-left:auto;height:36px;padding:0 24px;border:0;border-radius:4px;background:var(--blue);color:var(--on-blue);font:500 14px/36px Roboto,Arial,sans-serif;letter-spacing:.25px;cursor:pointer}
.next:hover{background:var(--blue-hover)}
.text-btn:focus-visible,.next:focus-visible,.chip:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
footer{width:450px;display:flex;justify-content:space-between;padding:24px 0 0;color:var(--fg);font-size:12px;line-height:16px}
footer a{color:inherit;text-decoration:none;margin-left:32px}
@media (max-width:600px){.page{justify-content:flex-start;padding:0}.card{width:100%;min-height:0;flex:1;border:0;padding:24px}footer{width:100%;padding:24px}}
`;

const ERROR_ICON = `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
const CHEVRON = `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>`;
// the one script: "Show password" switches the password fields' type
const SHOW_SCRIPT = `<script>document.querySelectorAll(".show input").forEach(function(c){c.addEventListener("change",function(){document.querySelectorAll("input[data-pw]").forEach(function(i){i.type=c.checked?"text":"password"})})})</script>`;

type Field = { name: string; label: string; type?: string; value?: string; autocomplete: string; help?: string; error?: string; invalid?: boolean; autofocus?: boolean };

function field(f: Field) {
	const id = `f-${f.name}`;
	const pw = f.type === "password";
	return `<div class="field${f.error || f.invalid ? " bad" : ""}"><input id="${id}" name="${f.name}" type="${f.type ?? "text"}" placeholder=" " value="${esc(f.value ?? "")}" autocomplete="${f.autocomplete}"${pw ? " data-pw" : ""}${f.autofocus ? " autofocus" : ""}${f.error ? ` aria-invalid="true" aria-describedby="${id}-err"` : ""} spellcheck="false" autocapitalize="off" required><label for="${id}">${esc(f.label)}</label></div>${
		f.error ? `<p class="err" id="${id}-err" role="alert">${ERROR_ICON}<span>${esc(f.error)}</span></p>` : f.help ? `<p class="help">${esc(f.help)}</p>` : ""
	}`;
}

const hidden = (values: Record<string, string>) => Object.entries(values).map(([k, v]) => `<input type="hidden" name="${k}" value="${esc(v)}">`).join("");

type Step = {
	title: string;
	heading: string;
	sub?: string;
	chip?: { text: string; href: string };
	action: string;
	step: string;
	keep?: Record<string, string>;
	fields: Field[];
	showPassword?: boolean;
	note?: string;
	left?: { text: string; href: string };
	// false: a page with nothing to submit
	submit?: boolean;
	status?: number;
};

function page(s: Step) {
	const body = `<div class="page"><main class="card">
<img class="logo" src="/_ot/yewtube-logo-96.png" alt="${esc(INSTANCE_NAME)}" width="40" height="40">
<h1>${esc(s.heading)}</h1>${s.sub ? `<p class="sub">${esc(s.sub)}</p>` : ""}
<form method="post" action="${esc(s.action)}" novalidate>
${s.chip ? `<a class="chip" href="${esc(s.chip.href)}" aria-label="${esc(s.chip.text)}, switch account"><span class="av" aria-hidden="true">${esc([...s.chip.text][0]?.toUpperCase() ?? "")}</span><span>${esc(s.chip.text)}</span>${CHEVRON}</a>` : ""}
<input type="hidden" name="step" value="${esc(s.step)}">${hidden(s.keep ?? {})}
${s.fields.map(field).join("\n")}
${s.showPassword ? `<label class="show"><input type="checkbox">Show password</label>` : ""}
${s.note ? `<p class="note">${esc(s.note)}</p>` : ""}
<div class="actions">${s.left ? `<a class="text-btn" href="${esc(s.left.href)}">${esc(s.left.text)}</a>` : ""}${s.submit === false ? "" : `<button class="next" type="submit">Next</button>`}</div>
</form></main>
<footer><span>English (United States)</span></footer></div>${s.showPassword ? SHOW_SCRIPT : ""}`;
	return new Response(
		`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(s.title)} - ${esc(INSTANCE_NAME)}</title><style>${CSS}</style></head><body>${body}</body></html>`,
		{
			status: s.status ?? 200,
			headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "content-security-policy": "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self'; font-src 'self'; form-action 'self'; frame-ancestors 'none'", "x-frame-options": "DENY" },
		},
	);
}

const AN = /^[aeiou]/i.test(INSTANCE_NAME) ? "an" : "a";
const NOT_GOOGLE = `This is ${AN} ${INSTANCE_NAME} account, not a Google account. Don't enter your Google password here.`;
const q = (path: string, next: string) => `${path}?next=${encodeURIComponent(next)}`;

// ---- sign in ----

function usernameStep(next: string, signups: boolean, values: { login?: string } = {}, error?: string) {
	return page({
		title: "Sign in",
		heading: "Sign in",
		sub: `to continue to ${INSTANCE_NAME}`,
		action: q("/signin", next),
		step: "username",
		fields: [{ name: "login", label: "Username", value: values.login, autocomplete: "username", error, autofocus: true }],
		note: NOT_GOOGLE,
		left: signups ? { text: "Create account", href: q("/register", next) } : undefined,
		status: error ? 400 : 200,
	});
}

function passwordStep(next: string, loginName: string, error?: string) {
	return page({
		title: "Sign in",
		heading: "Welcome",
		chip: { text: loginName, href: q("/signin", next) },
		action: q("/signin", next),
		step: "password",
		keep: { login: loginName },
		fields: [{ name: "password", label: "Enter your password", type: "password", autocomplete: "current-password", error, autofocus: true }],
		showPassword: true,
		status: error ? 400 : 200,
	});
}

// ---- create account ----

// the admin panel's Settings can close sign-ups
function signupsClosed(next: string) {
	return page({
		title: "Create account",
		heading: "Sign-ups are closed",
		sub: `${INSTANCE_NAME} isn't accepting new accounts right now. Ask the people who run it if you need one.`,
		action: q("/signin", next),
		step: "closed",
		fields: [],
		left: { text: "Sign in instead", href: q("/signin", next) },
		submit: false,
		status: 403,
	});
}

function nameStep(next: string, values: { name?: string } = {}, error?: string) {
	return page({
		title: "Create account",
		heading: `Create ${AN} ${INSTANCE_NAME} account`,
		sub: "Enter your name",
		action: q("/register", next),
		step: "name",
		fields: [{ name: "name", label: "Name", value: values.name, autocomplete: "name", help: "Shown as your channel's name", error, autofocus: true }],
		note: NOT_GOOGLE,
		left: { text: "Sign in instead", href: q("/signin", next) },
		status: error ? 400 : 200,
	});
}

function chooseUsernameStep(next: string, values: { name: string; login?: string }, error?: string) {
	return page({
		title: "Create account",
		heading: "Choose your username",
		sub: "You'll use it to sign in, and it becomes your channel's @handle",
		action: q("/register", next),
		step: "username",
		keep: { name: values.name },
		fields: [{ name: "login", label: "Username", value: values.login, autocomplete: "username", help: "3 to 30 characters: letters, numbers, periods, dashes and underscores", error, autofocus: true }],
		status: error ? 400 : 200,
	});
}

function newPasswordStep(next: string, values: { name: string; login: string }, error?: string) {
	return page({
		title: "Create account",
		heading: "Create a strong password",
		sub: "Create a strong password with a mix of letters, numbers and symbols",
		action: q("/register", next),
		step: "password",
		keep: { name: values.name, login: values.login },
		fields: [
			{ name: "password", label: "Password", type: "password", autocomplete: "new-password", autofocus: true, invalid: !!error },
			{ name: "confirm", label: "Confirm", type: "password", autocomplete: "new-password", error },
		],
		showPassword: true,
		status: error ? 400 : 200,
	});
}

// ---- routes ----

async function signedIn(req: Request, userId: string, next: string) {
	const headers = new Headers({ location: next });
	for (const c of await createSession(req, userId)) headers.append("set-cookie", c);
	return new Response(null, { status: 303, headers });
}

export async function accountRoutes(req: Request, url: URL, viewer: Viewer, next: string): Promise<Response | undefined> {
	const path = url.pathname;
	if (path !== "/signin" && path !== "/register") return undefined;
	const signups = (await settings()).registration === "open";
	if (req.method === "GET") {
		// Switch account: the switcher's accountSigninToken.signinUrl
		// (/signin?action_handle_signin=true&authuser=N&next=...)
		if (path === "/signin" && url.searchParams.get("action_handle_signin") === "true" && url.searchParams.has("authuser")) {
			const cookies = await switchSession(req, Number(url.searchParams.get("authuser")));
			const headers = new Headers({ location: cookies ? next : q("/signin", next) });
			for (const c of cookies ?? []) headers.append("set-cookie", c);
			return new Response(null, { status: 303, headers });
		}
		// Add account (?add=1) signs in another account alongside this one
		if (viewer && url.searchParams.get("add") !== "1") return Response.redirect(next, 302);
		return path === "/signin" ? usernameStep(next, signups) : signups ? nameStep(next) : signupsClosed(next);
	}
	if (req.method !== "POST") return new Response("method not allowed", { status: 405 });
	const form = await req.formData().catch(() => undefined);
	const get = (k: string) => String(form?.get(k) ?? "");
	const step = get("step");
	const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
	const limited = !(await rateLimit(`auth:${ip}`, 30, 600));
	const tooMany = "Too many attempts. Try again in a few minutes.";

	if (path === "/signin") {
		const loginName = get("login").trim().toLowerCase();
		if (step !== "password") {
			if (!loginName) return usernameStep(next, signups, {}, "Enter a username");
			return passwordStep(next, loginName);
		}
		if (limited) return passwordStep(next, loginName, tooMany);
		const password = get("password");
		if (!password) return passwordStep(next, loginName, "Enter a password");
		const r = await login(loginName, password);
		if ("error" in r) return passwordStep(next, loginName, r.error);
		return signedIn(req, r.userId, next);
	}

	// /register
	if (!signups) return signupsClosed(next);
	const name = get("name").trim().slice(0, 100);
	const loginName = get("login").trim().toLowerCase();
	if (step === "name" || !name) return name ? chooseUsernameStep(next, { name }) : nameStep(next, {}, "Enter your name");
	if (step === "username" || !loginName) {
		if (!LOGIN_RE.test(loginName)) return chooseUsernameStep(next, { name, login: loginName }, "Use 3 to 30 characters: letters, numbers, periods, dashes or underscores");
		if (limited) return chooseUsernameStep(next, { name, login: loginName }, tooMany);
		const [taken] = await sql`select 1 from users where login = ${loginName} union select 1 from channels where lower(handle) = ${loginName}`;
		if (taken) return chooseUsernameStep(next, { name, login: loginName }, "That username is taken. Try another.");
		return newPasswordStep(next, { name, login: loginName });
	}
	if (limited) return newPasswordStep(next, { name, login: loginName }, tooMany);
	const password = get("password");
	if (password.length < 8) return newPasswordStep(next, { name, login: loginName }, "Use 8 characters or more for your password");
	if (password !== get("confirm")) return newPasswordStep(next, { name, login: loginName }, "Those passwords didn't match. Try again.");
	const r = await register(loginName, password, name);
	if ("error" in r) return /username/i.test(r.error) ? chooseUsernameStep(next, { name, login: loginName }, r.error) : newPasswordStep(next, { name, login: loginName }, r.error);
	return signedIn(req, r.userId, next);
}
