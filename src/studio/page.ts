// Renders the Studio page shell for a signed-in channel owner, from the
// pinned page (sanitized at pin time: it carries no account), or the dark
// build's page when the viewer's Appearance is dark (appearance.ts). The markup and
// bootstrap scripts stay as upstream served them; these parts are filled in
// or replaced, each by a rule that must match:
//   - ytcfg.set({...})                         -> buildStudioYtcfg()
//   - the prefetched channel (CreatorChannelData) -> this channel
//   - nonces                                   -> this response's
//   - studio.youtube.com/s/, www.gstatic.com and fonts.googleapis.com URLs -> this origin

import { readFileSync } from "node:fs";
import type { Viewer } from "../client/page";
import { FLAG_OVERRIDES, PLAYER_FLAG_OVERRIDES, visitorData } from "../client/page";
import { jsonEnd } from "../client/json";
import { loadPin, loadStudioPin, studioPagePath } from "../client/store";
import { PUBLIC_ORIGIN, STUDIO_ORIGIN } from "../config";
import { recordMiss } from "../diagnostics";
import { creatorChannel } from "./channel";

const bases = new Map<boolean, { html: string; cfg: Record<string, any> }>();
function basePage(dark: boolean) {
	const hit = bases.get(dark);
	if (hit) return hit;
	const html = readFileSync(studioPagePath(dark), "utf8");
	const start = html.indexOf("ytcfg.set({") + "ytcfg.set(".length;
	const base = { html, cfg: JSON.parse(html.slice(start, jsonEnd(html, start))) };
	bases.set(dark, base);
	return base;
}

const json = (v: unknown) => JSON.stringify(v).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

// the x-youtube-delegation-context header value: field 2 the channel id,
// field 5 the role (owner)
export function delegationContext(channelId: string): string {
	const id = Buffer.from(channelId);
	return Buffer.concat([Buffer.from([0x12, id.length]), id, Buffer.from([0x2a, 0x02, 0x08, 0x08])]).toString("base64");
}

function rehost(v: unknown): unknown {
	if (typeof v === "string") {
		if (v.startsWith("https://studio.youtube.com/")) return STUDIO_ORIGIN + v.slice("https://studio.youtube.com".length);
		if (v.startsWith("https://www.youtube.com/")) return PUBLIC_ORIGIN + v.slice("https://www.youtube.com".length);
		return v;
	}
	if (Array.isArray(v)) return v.map(rehost);
	if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, rehost(x)]));
	return v;
}

function serializedFlags(s: string, overrides: Record<string, unknown>): string {
	const params = new URLSearchParams(s);
	for (const [k, v] of Object.entries(overrides)) params.set(k, String(v));
	return params.toString();
}

export function buildStudioYtcfg(viewer: NonNullable<Viewer>, pageUrl: string, nonce: string, dark = false): Record<string, any> {
	const cfg = structuredClone(basePage(dark).cfg);
	const visitor = visitorData();
	cfg.EVENT_ID = Buffer.from(crypto.getRandomValues(new Uint8Array(12))).toString("base64url");
	cfg.TIME_CREATED_MS = Date.now();
	cfg.SERVER_MILLIS_SINCE_EPOCH = Date.now();
	cfg.VISITOR_DATA = visitor;
	cfg.XSRF_TOKEN = viewer.apiSecret;
	cfg.LOGGED_IN = true;
	cfg.SESSION_INDEX = "0";
	cfg.DATASYNC_ID = `${viewer.channelId}||`;
	cfg.USER_SESSION_ID = viewer.channelId;
	cfg.CHANNEL_ID = viewer.channelId;
	cfg.DELEGATION_CONTEXT = { externalChannelId: viewer.channelId, roleType: { channelRoleType: "CREATOR_CHANNEL_ROLE_TYPE_OWNER" } };
	cfg.INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT = delegationContext(viewer.channelId);
	cfg.SIGNIN_URL = `${PUBLIC_ORIGIN}/signin?next=${encodeURIComponent(STUDIO_ORIGIN + pageUrl)}`;
	cfg.INNERTUBE_API_KEY = "AIzaSyYewTubeLocalInstanceKeyNotGoogle01";
	cfg.UPLOAD_CONFIG = {
		scottyUrl: `${STUDIO_ORIGIN}/upload/studio`,
		// keys the client's local record of unfinished uploads to this account
		localStorageUserKey: Buffer.from(new Bun.CryptoHasher("sha256").update(`yewtube-upload:${viewer.userId}`).digest()).toString("base64"),
		showKrNotice: false,
		thumbnailsScottyUrl: `${STUDIO_ORIGIN}/upload/studiothumbnail`,
		audioTracksScottyUrl: `${STUDIO_ORIGIN}/upload/audiotrack`,
		maxShortVideoDuration: { seconds: 180 },
	};
	// Customization's picture and banner uploads; without these the client
	// resolves channel_image_upload/... against YOUTUBE_ROOT_URL, the main site
	cfg.CHANNEL_PROFILE_IMAGE_UPLOAD_URL = `${STUDIO_ORIGIN}/channel_image_upload/profile`;
	cfg.CHANNEL_BANNER_IMAGE_UPLOAD_URL = `${STUDIO_ORIGIN}/channel_image_upload/banner`;
	cfg.REAUTH_SERVLET_URL = `${STUDIO_ORIGIN}/reauth`;
	cfg.YOUTUBE_ROOT_URL = `${PUBLIC_ORIGIN}/`;
	cfg.VALID_SESSION_TEMPDATA_DOMAINS = [new URL(PUBLIC_ORIGIN).hostname, new URL(STUDIO_ORIGIN).hostname];
	// IS_DBSC only gates the RotateCookiesPage iframe on accounts.youtube.com
	cfg.IS_DBSC = true;
	const client = cfg.INNERTUBE_CONTEXT.client;
	client.visitorData = visitor;
	client.originalUrl = STUDIO_ORIGIN + pageUrl;
	Object.assign(cfg.EXPERIMENT_FLAGS, FLAG_OVERRIDES);
	// changing the channel's name, handle or picture asks for a Google
	// re-sign-in first (REAUTH_FLOW_YT_CHANNEL_SETTINGS), which a local
	// account has no flow for; the session already proves the owner
	cfg.EXPERIMENT_FLAGS.enable_channel_settings_reauth = false;
	// previews play in the main client's pinned player
	const pin = loadPin();
	if (pin) {
		const playerPath = new URL(pin.player.jsUrl).pathname;
		const playerCss = new URL(pin.player.cssUrl).pathname;
		cfg.PLAYER_CLIENT_VERSION = pin.player.version;
		for (const ctx of Object.values(cfg.WEB_PLAYER_CONTEXT_CONFIGS ?? {}) as any[]) {
			ctx.jsUrl = playerPath;
			ctx.cssUrl = playerCss;
			ctx.trustedJsUrl = { privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: playerPath };
			ctx.trustedCssUrl = { privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: playerCss };
			ctx.innertubeApiKey = cfg.INNERTUBE_API_KEY;
			ctx.cspNonce = nonce;
			ctx.datasyncId = cfg.DATASYNC_ID;
			if (typeof ctx.serializedExperimentFlags === "string") ctx.serializedExperimentFlags = serializedFlags(ctx.serializedExperimentFlags, PLAYER_FLAG_OVERRIDES);
		}
	}
	return rehost(cfg) as Record<string, any>;
}

export async function renderStudioPage(viewer: NonNullable<Viewer>, pageUrl: string, nonce: string, wantsDark = false): Promise<string> {
	const pin = loadStudioPin()!;
	const dark = wantsDark && !!pin.dark;
	let html = basePage(dark).html;
	const start = html.indexOf("ytcfg.set({") + "ytcfg.set(".length;
	html = html.slice(0, start) + json(buildStudioYtcfg(viewer, pageUrl, nonce, dark)) + html.slice(jsonEnd(html, start));
	const channel = await creatorChannel(viewer, null);
	// [name, find, replace, optional]: a rule that isn't optional must match
	const rules: [string, RegExp, () => string, boolean?][] = [
		["nonce", /nonce=""/g, () => `nonce="${nonce}"`],
		["prefetch-entity", /"entity_id": ""/g, () => `"entity_id": ${json(viewer.channelId)}`],
		["prefetch-data", /window\.chunkedPrefetchResolvers\['id-0'\]\.resolve\(null\);/g, () => `window.chunkedPrefetchResolvers['id-0'].resolve(${json(channel)});`],
		["static-host", /https:\/\/studio\.youtube\.com\/s\//g, () => "/s/"],
		["gstatic-host", /https:\/\/www\.gstatic\.com\//g, () => "/_up/www.gstatic.com/"],
		["fonts-host", /(?:https:)?\/\/fonts\.googleapis\.com\//g, () => "/_up/fonts.googleapis.com/", true],
		["font-files-host", /(?:https:)?\/\/fonts\.gstatic\.com\//g, () => "/_up/fonts.gstatic.com/", true],
	];
	for (const [name, re, to, optional] of rules) {
		let n = 0;
		html = html.replace(re, () => (n++, to()));
		if (!n && !optional) recordMiss(`studio page rule ${name}`, pin.pageBuildLabel);
	}
	return html;
}
