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
