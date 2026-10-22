// Verification badges for channels an operator has verified (admin panel,
// channels.verification), in the forms YouTube's responses carry them:
//
//   videoOwnerRenderer.badges, videoRenderer / channelRenderer.ownerBadges
//                                 metadataBadgeRenderer (badge/verified_owner)
//   a lockup's channel-name part  an icon on the part (badge/*_part)
//   a channel header's title      an image attached after the name (badge/*_run_24)
//   a comment's author            commentEntityPayload.author.isVerified / isArtist
//
// The templates come from captures (make-templates.ts, step "badges"). No
// capture had an artist's metadataBadgeRenderer; it is the verified one with
// the icon and style the client pairs with artists (OFFICIAL_ARTIST_BADGE,
// BADGE_STYLE_TYPE_VERIFIED_ARTIST, both handled in the pinned bundle).
//
// Responses are decorated as a whole after they are built (router.ts and the
// page renderer), so every builder that names a channel gets its badge.

import { sql } from "../db";
import { make } from "./tpl";

export type Verification = "none" | "verified" | "artist";
export const VERIFICATIONS: Record<Verification, string> = { none: "None", verified: "Verified", artist: "Official Artist Channel" };

type Tier = Exclude<Verification, "none">;
let cache: { at: number; map: Map<string, Tier>; titles: Map<string, string> } | undefined;
export async function verifiedChannels() {
	if (cache && Date.now() - cache.at < 10_000) return cache;
	const rows = await sql`select id, title, verification from channels where verification <> 'none'`;
	cache = { at: Date.now(), map: new Map(rows.map((r: any) => [r.id, r.verification])), titles: new Map(rows.map((r: any) => [r.id, r.title])) };
	return cache;
}
export const forgetVerifications = () => (cache = undefined);

const ownerBadge = (v: Tier) => {
	const b = make("badge/verified_owner", {});
	if (v === "artist") {
		const m = b.metadataBadgeRenderer;
		m.icon.iconType = "OFFICIAL_ARTIST_BADGE";
		m.style = "BADGE_STYLE_TYPE_VERIFIED_ARTIST";
		m.tooltip = VERIFICATIONS.artist;
		m.accessibilityData = { label: VERIFICATIONS.artist };
	}
	return b;
};

// the 24 px run is captured for the checkmark only; the artist note keeps the
// same size and spacing
function headerRun(v: Tier, name: string) {
	const r = make("badge/verified_run_24", { NAME: name });
	if (v === "artist") r.attachmentRun.element.type.imageType.image.sources[0].clientResource.imageName = "AUDIO_BADGE";
	return r;
}

const channelIdIn = (o: any): string | undefined => {
	if (!o || typeof o !== "object") return undefined;
	const id = o.browseEndpoint?.browseId;
	if (typeof id === "string" && id.startsWith("UC")) return id;
	for (const v of Object.values(o)) {
		const found = channelIdIn(v);
		if (found) return found;
	}
	return undefined;
};

const findParts = (o: any, out: any[][] = []): any[][] => {
	if (!o || typeof o !== "object") return out;
	if (Array.isArray(o.metadataParts)) out.push(o.metadataParts);
	for (const v of Object.values(o)) findParts(v, out);
	return out;
};

function attach(text: any, run: { styleRun: unknown; attachmentRun: any }) {
	if (!text || typeof text.content !== "string" || text.attachmentRuns?.length) return;
	text.styleRuns = [...(text.styleRuns ?? []), run.styleRun];
	text.attachmentRuns = [run.attachmentRun];
}

export async function addBadges<T>(response: T): Promise<T> {
	const { map, titles } = await verifiedChannels();
	if (!map.size || !response || typeof response !== "object") return response;
	const walk = (o: any) => {
		if (!o || typeof o !== "object") return;
		if (Array.isArray(o)) {
			for (const v of o) walk(v);
			return;
		}
		for (const [k, v] of Object.entries(o) as [string, any][]) {
			if (!v || typeof v !== "object") continue;
			if (k === "videoOwnerRenderer" || k === "videoRenderer" || k === "channelRenderer" || k === "gridChannelRenderer") {
				const tier = map.get(k.includes("hannel") && v.channelId ? v.channelId : channelIdIn(k === "videoRenderer" ? v.ownerText ?? v.longBylineText : v));
				if (tier) v[k === "videoOwnerRenderer" ? "badges" : "ownerBadges"] = [ownerBadge(tier)];
			} else if (k === "lockupViewModel") {
				// the channel-name part: linked to the channel (home, channel
				// pages), or, in the watch page's related videos, unlinked and
				// matched by the name of the channel the lockup belongs to
				const own = channelIdIn(v);
				for (const parts of findParts(v))
					for (const part of parts) {
						const id = part?.text?.commandRuns ? channelIdIn(part.text.commandRuns) : own && part?.text?.content === titles.get(own) ? own : undefined;
						const tier = id && map.get(id);
						if (tier && !part.icon) part.icon = make(`badge/${tier}_part`, {});
					}
			} else if (k === "commentEntityPayload" && v.author?.channelId) {
				const tier = map.get(v.author.channelId);
				if (tier) {
					v.author.isVerified = true;
					v.author.isArtist = tier === "artist";
					// the badge's tooltip
					v.author.innerBadgeA11y = VERIFICATIONS[tier];
				}
			}
			walk(v);
		}
	};
	walk(response);
	// a channel page's header names the channel in its metadata
	const r = response as any;
	const channelId = r.metadata?.channelMetadataRenderer?.externalId;
	const tier = channelId && map.get(channelId);
	const title = r.header?.pageHeaderRenderer?.content?.pageHeaderViewModel?.title?.dynamicTextViewModel?.text;
	if (tier && title) attach(title, headerRun(tier, title.content));
	return response;
}
