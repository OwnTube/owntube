// The settings pages (/account, /account_notifications, ...: browse
// SPaccount_*) and account/set_setting, which their switches call.
//
// The pages are YouTube's own (templates settings/*, made by
// scripts/make-templates.ts with the options for Google's services left
// out). A switch's enable and disable commands each carry a
// setSettingEndpoint {settingItemId, boolValue | intValue | stringValue};
// the value a viewer last sent for an item is kept in account_settings and
// decides whether the switch shows as on. Choices the client keeps itself
// (video previews, download quality: cookies and local storage) never reach
// the server.

import type { Viewer } from "../client/page";
import { INSTANCE_NAME, PUBLIC_ORIGIN, STUDIO_ORIGIN } from "../config";
import { sql } from "../db";
import { viewerVars } from "./chrome";
import { form, panel } from "./panels";
import { browseEndpoint, responseContext } from "./r";
import { ApiError, route } from "./router";
import { make, tpl } from "./tpl";

// browse id -> path, in the sidebar's order (Downloads is reached from the
// Downloads page, not the sidebar)
export const SETTINGS_PAGES: Record<string, string> = {
	SPaccount_overview: "/account",
	SPaccount_time_management: "/account_time_management",
	SPaccount_notifications: "/account_notifications",
	SPaccount_playback: "/account_playback",
	SPaccount_privacy: "/account_privacy",
	SPaccount_sharing: "/account_sharing",
	SPaccount_billing: "/account_billing",
	SPaccount_advanced: "/account_advanced",
	SPaccount_downloads: "/account_downloads",
};
export const SETTINGS_PATHS: Record<string, string> = Object.fromEntries(Object.entries(SETTINGS_PAGES).map(([id, p]) => [p, id]));

type Value = boolean | number | string;

// every setting id the pages can send, with the kind of value it takes
const KNOWN = new Map<string, "bool" | "int" | "string">();
for (const id of Object.keys(SETTINGS_PAGES)) {
	const walk = (o: any) => {
		if (!o || typeof o !== "object") return;
		const e = o.setSettingEndpoint;
		if (e?.settingItemId) KNOWN.set(String(e.settingItemId), "boolValue" in e ? "bool" : "intValue" in e ? "int" : "string");
		for (const v of Array.isArray(o) ? o : Object.values(o)) walk(v);
	};
	walk(tpl(`settings/${id}`));
}

export async function accountSettings(userId: string): Promise<Map<string, Value>> {
	const rows = await sql`select item, value from account_settings where user_id = ${userId}`;
	return new Map(rows.map((r: { item: string; value: Value }) => [r.item, r.value]));
}

// one setting's value for a user, or `fallback` when they never chose
export async function accountSetting<T extends Value | string[]>(userId: string, item: string, fallback: T): Promise<T> {
	const [row] = await sql`select value from account_settings where user_id = ${userId} and item = ${item}`;
	return row ? (row.value as T) : fallback;
}

// a switch is on when the value last sent for its item is the one its
// enable command sends ("Keep all my subscriptions private" turns on by
// sending discoverable = false)
function applyChoices(o: any, chosen: Map<string, Value>) {
	if (!o || typeof o !== "object") return;
	for (const key of ["settingsSwitchRenderer", "settingsCheckboxRenderer"]) {
		const s = o[key];
		const on = s?.enableServiceEndpoint?.setSettingEndpoint;
		const off = s?.disableServiceEndpoint?.setSettingEndpoint;
		const item = String(on?.settingItemId ?? off?.settingItemId ?? "");
		if (item && chosen.has(item)) s.enabled = on ? chosen.get(item) === on.boolValue : chosen.get(item) !== off.boolValue;
	}
	for (const v of Array.isArray(o) ? o : Object.values(o)) applyChoices(v, chosen);
}

export async function settingsPage(browseId: string, viewer: NonNullable<Viewer>) {
	const [u] = await sql`select login from users where id = ${viewer.userId}`;
	const vars = { ...viewerVars(viewer), VIEWER_LOGIN: u?.login ?? viewer.handle, VIEWER_USER_ID: viewer.channelId.slice(2), INSTANCE_NAME, ORIGIN: PUBLIC_ORIGIN, STUDIO_ORIGIN };
	const page = make(`settings/${browseId}`, vars);
	applyChoices(page, await accountSettings(viewer.userId));
	const path = SETTINGS_PAGES[browseId];
	return {
		response: { ...page, sidebar: make("settings/sidebar", vars) },
		url: path,
		command: browseEndpoint(browseId, path, "WEB_PAGE_TYPE_SETTINGS", 23462),
	};
}

route("account/set_setting", async ({ body, viewer }) => {
	if (!viewer) throw new ApiError(401, "Sign in to change settings.", "authError");
	const item = String(body.settingItemId ?? "");
	const kind = KNOWN.get(item);
	if (!kind) throw new ApiError(400, "Unknown setting.");
	// the client sends {settingItemId, newValue: {boolValue | intValue | stringValue}}
	const v = body.newValue ?? {};
	let value: Value;
	if (kind === "bool" && typeof v.boolValue === "boolean") value = v.boolValue;
	else if (kind === "int" && v.intValue !== undefined && Number.isSafeInteger(Number(v.intValue))) value = Number(v.intValue);
	else if (kind === "string" && typeof v.stringValue === "string" && v.stringValue.length <= 100) value = v.stringValue;
	else throw new ApiError(400, "Invalid setting value.");
	await sql`insert into account_settings (user_id, item, value) values (${viewer.userId}, ${item}, ${JSON.stringify(value)}::text::jsonb)
		on conflict (user_id, item) do update set value = excluded.value, updated_at = now()`;
	return { responseContext: responseContext(viewer) };
}, { mutation: true });

// Playback and performance > Preferred languages: the dialog shows the saved
// languages from formSchema.initialValues and sends the new list with
// submit_form (formData.preferredLanguageSettingsFormData.selectedLanguages)
const LANGUAGE_KEYS = new Set<string>(
	tpl("settings/preferred_languages").content.dialogViewModel.customContent.preferredLanguageSettingsPanelViewModel.checkboxGroup.checkboxGroupViewModel.checkboxes.map((c: any) => c.checkboxItemViewModel.key),
);

panel("PApreferred_language_settings", async (_body, viewer) => {
	if (!viewer) throw new ApiError(401, "You must be signed in to perform this operation.", "unauthorized");
	const r = make<any>("settings/preferred_languages", {});
	const form = r.content.dialogViewModel.customContent.preferredLanguageSettingsPanelViewModel.formSchema;
	form.initialValues = { selectedLanguages: await accountSetting<string[]>(viewer.userId, "preferred_languages", []) };
	return { responseContext: responseContext(viewer), ...r };
});

form("SUBMIT_ID_PREFERRED_LANGUAGE_SETTINGS_FORM", async (data, viewer) => {
	const list = data.preferredLanguageSettingsFormData?.selectedLanguages;
	if (!Array.isArray(list) || list.length > LANGUAGE_KEYS.size || !list.every((k) => LANGUAGE_KEYS.has(k))) throw new ApiError(400, "Invalid languages.");
	await sql`insert into account_settings (user_id, item, value) values (${viewer.userId}, 'preferred_languages', ${JSON.stringify([...new Set(list)])}::text::jsonb)
		on conflict (user_id, item) do update set value = excluded.value, updated_at = now()`;
});
