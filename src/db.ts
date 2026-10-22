import { SQL } from "bun";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { DATABASE_URL } from "./config";

export const sql = new SQL(DATABASE_URL, { max: 20 });

// A list as one Postgres text[] literal, for `= any(${textArray(list)}::text[])`.
// Bun's `in ${sql(list)}` expansion has been seen binding a whole list as a
// single array-typed parameter, serialized without braces ("malformed array
// literal"); an explicit literal leaves nothing to infer.
export function textArray(values: readonly string[]): string {
	return `{${values.map((v) => `"${String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`).join(",")}}`;
}

const MIGRATIONS_DIR = join(import.meta.dir, "..", "migrations");

// Plain SQL files applied once each, in name order, inside a transaction.
export async function migrate() {
	await sql`create table if not exists schema_migrations (name text primary key, applied_at timestamptz not null default now())`;
	const done = new Set((await sql`select name from schema_migrations`).map((r: { name: string }) => r.name));
	for (const name of readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql")).sort()) {
		if (done.has(name)) continue;
		const text = readFileSync(join(MIGRATIONS_DIR, name), "utf8");
		await sql.begin(async (tx) => {
			await tx.unsafe(text);
			await tx`insert into schema_migrations (name) values (${name})`;
		});
		console.log(`migration applied: ${name}`);
	}
}
