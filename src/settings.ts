// Instance settings operators change from the admin panel, kept in
// instance_settings with their defaults here.

import { sql } from "./db";

const DEFAULTS = {
	// "open": anyone may create an account; "closed": only existing accounts sign in
	registration: "open" as "open" | "closed",
};
export type Settings = typeof DEFAULTS;

let cache: { at: number; value: Settings } | undefined;

export async function settings(): Promise<Settings> {
	if (cache && Date.now() - cache.at < 5000) return cache.value;
	const rows = await sql`select key, value from instance_settings`;
	const value = { ...DEFAULTS };
	for (const r of rows as unknown as { key: keyof Settings; value: never }[]) if (r.key in DEFAULTS) value[r.key] = r.value;
	cache = { at: Date.now(), value };
	return value;
}

export async function saveSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
	await sql`insert into instance_settings (key, value) values (${key}, ${JSON.stringify(value)}::text::jsonb)
		on conflict (key) do update set value = excluded.value, updated_at = now()`;
	cache = undefined;
}
