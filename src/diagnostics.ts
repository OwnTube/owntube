// Counts requests the compatibility layer did not handle, grouped by a key
// such as "youtubei browse:FEunknown" or "asset fonts.gstatic.com/s/i/...".
// Samples are truncated and stripped of query strings that could carry
// tokens. Flushed to compat_misses every few seconds for /admin/diagnostics.

import { sql } from "./db";

const pending = new Map<string, { count: number; sample: string }>();
export const outbound: { at: string; url: string; allowed: boolean }[] = [];

function redact(sample: string): string {
	return sample
		.replace(/(SAPISIDHASH|Bearer)\s+\S+/gi, "$1 <redacted>")
		.replace(/("?(?:password|token|cookie|authorization|api_secret|visitorData)"?\s*[:=]\s*)"[^"]*"/gi, '$1"<redacted>"')
		.slice(0, 600);
}

export function recordMiss(key: string, sample = "") {
	const e = pending.get(key) ?? { count: 0, sample: redact(sample) };
	e.count++;
	pending.set(key, e);
	if (process.env.LOG_MISSES) console.log(`miss: ${key}`);
}

export async function flushMisses() {
	if (!pending.size) return;
	const batch = [...pending];
	pending.clear();
	for (const [key, { count, sample }] of batch)
		await sql`insert into compat_misses (key, count, sample) values (${key}, ${count}, ${sample})
			on conflict (key) do update set count = compat_misses.count + ${count}, last_seen = now(), sample = excluded.sample`.catch(() => {});
}

export function startDiagnostics() {
	setInterval(() => void flushMisses(), 3000);
}
