// The Appearance setting of the main client (account menu > Appearance),
// which the client keeps in its PREF cookie: flag 165 is Dark theme, flag
// 174 Light theme, neither is Use device theme. Flag n is bit n % 31 of the
// hex field f<floor(n / 31) + 1>, so both live in f6 (0x400 and 0x80000).
//
// The client writes PREF for ALT_PREF_COOKIE_DOMAIN (prefCookieDomain), and
// the server resolves the theme before first paint, as YouTube does: the
// saved choice, or for the device theme the Sec-CH-Prefers-Color-Scheme
// client hint, which browsers that support it send once asked
// (APPEARANCE_HEADERS). Other browsers get the light page and the client
// reloads it dark when the device prefers dark.

import { parseCookies } from "./auth";
import { COOKIE_DOMAIN, PUBLIC_ORIGIN } from "./config";

export type Appearance = "dark" | "light" | "device";

const DARK = 0x400;
const LIGHT = 0x80000;

export function savedAppearance(req: Request): Appearance {
	const pref = parseCookies(req).PREF ?? "";
	const f6 = /(?:^|&)f6=([0-9a-fA-F]{1,8})(?:&|$)/.exec(pref)?.[1];
	const flags = f6 ? Number.parseInt(f6, 16) : 0;
	return flags & DARK ? "dark" : flags & LIGHT ? "light" : "device";
}

// whether the page is dark: the saved choice, else the device's (when the
// browser says), else light
export function isDark(req: Request): boolean {
	const saved = savedAppearance(req);
	if (saved !== "device") return saved === "dark";
	return req.headers.get("sec-ch-prefers-color-scheme")?.replace(/"/g, "") === "dark";
}

export const APPEARANCE_HEADERS = {
	"accept-ch": "Sec-CH-Prefers-Color-Scheme",
	"critical-ch": "Sec-CH-Prefers-Color-Scheme",
	vary: "Cookie, Sec-CH-Prefers-Color-Scheme",
};

// the domain the client sets PREF for: the shared cookie domain when there
// is one (so Studio's origin sees it too), else this host
export const prefCookieDomain = () => COOKIE_DOMAIN || new URL(PUBLIC_ORIGIN).hostname;

// PREF with the Appearance flags set to `appearance`, its other fields kept
// (the admin panel's Appearance menu saves the same setting as the client's)
export function prefWithAppearance(pref: string, appearance: Appearance): string {
	// raw k=v pairs, as the client writes them (values such as tz=Europe/London unencoded)
	const fields = pref.split("&").filter((f) => f && !f.startsWith("f6="));
	let flags = Number.parseInt(/(?:^|&)f6=([0-9a-fA-F]{1,8})/.exec(pref)?.[1] ?? "0", 16);
	flags &= ~(DARK | LIGHT);
	if (appearance === "dark") flags |= DARK;
	if (appearance === "light") flags |= LIGHT;
	if (flags) fields.push(`f6=${flags.toString(16)}`);
	return fields.join("&");
}

export function prefCookie(value: string, secure: boolean) {
	return `PREF=${value}; Domain=${prefCookieDomain()}; Path=/; Max-Age=${2 * 365 * 86400}; SameSite=Lax${secure ? "; Secure" : ""}`;
}
