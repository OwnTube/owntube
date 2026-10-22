// Responses are built from YouTube's own responses. scripts/make-templates.ts
// reduces captured responses to templates (src/innertube/templates/*.json):
// tracking data and personal data removed, one sample item per kind, and the
// sample's own values (ids, titles, counts, images) replaced by tokens.
// Builders clone a template and fill the tokens from the database, so the
// structure the client receives is the one YouTube sends.
//
// Tokens inside strings:
//   {{NAME}}            the variable, as text
//   {{ek:NAME:TYPE}}    an entity key for the variable (proto.entityKey)
//   {{b64:NAME:BLOB}}   a base64 protobuf blob from the capture with the id
//                       blanked out as '~'s; the variable (same length) goes back in
//                       ({{b64:A+B:BLOB}}: two ids, blanked as '~'s and '^'s)
// A string that is exactly "{{NAME}}" is replaced by the variable's value
// whatever its type (image source arrays, numbers, booleans, objects).

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { recordMiss } from "../diagnostics";
import { entityKey } from "./proto";

const DIR = join(import.meta.dir, "templates");
const cache = new Map<string, unknown>();

export function tpl<T = any>(name: string): T {
	let t = cache.get(name);
	if (t === undefined) {
		t = JSON.parse(readFileSync(join(DIR, `${name}.json`), "utf8"));
		cache.set(name, t);
	}
	return structuredClone(t) as T;
}

export type Vars = Record<string, unknown>;

const TOKEN = /\{\{(ek:)?([A-Z0-9_]+)(?::(\d+))?\}\}/g;
const WHOLE = /^\{\{([A-Z0-9_]+)\}\}$/;

const B64 = /\{\{b64:([A-Z0-9_+]+):([A-Za-z0-9+/=%_-]+)\}\}/g;
// one blank character per id, in the order the token names them
const BLANKS = ["~", "^", "`"];

function refill(blob: string, values: string[]): string {
	let out = Buffer.from(decodeURIComponent(blob).replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("latin1");
	values.forEach((v, i) => (out = out.split(BLANKS[i].repeat(v.length)).join(v)));
	let enc = Buffer.from(out, "latin1").toString("base64");
	if (/[-_]/.test(blob)) enc = enc.replace(/\+/g, "-").replace(/\//g, "_");
	if (/%3D/.test(blob)) enc = enc.replace(/=/g, "%3D");
	else if (!/=$/.test(blob)) enc = enc.replace(/=+$/, "");
	return enc;
}

function fillString(s: string, vars: Vars, where: string): unknown {
	if (s.includes("{{b64:"))
		s = s.replace(B64, (_, names: string, blob) => {
			const missing = names.split("+").filter((n) => !(n in vars));
			if (missing.length) {
				recordMiss(`template token ${missing.join("+")} in ${where}`, "");
				return "";
			}
			return refill(blob, names.split("+").map((n) => String(vars[n])));
		});
	const whole = WHOLE.exec(s);
	if (whole && whole[1] in vars && typeof vars[whole[1]] !== "string") return vars[whole[1]];
	return s.replace(TOKEN, (_, ek, name, type) => {
		if (!(name in vars)) {
			recordMiss(`template token ${name} in ${where}`, "");
			return "";
		}
		return ek ? entityKey(String(vars[name]), Number(type)) : String(vars[name] ?? "");
	});
}

// fills tokens in place and returns the node
export function fill<T>(node: T, vars: Vars, where = "template"): T {
	const walk = (o: any): any => {
		if (typeof o === "string") return o.includes("{{") ? fillString(o, vars, where) : o;
		if (Array.isArray(o)) {
			for (let i = 0; i < o.length; i++) o[i] = walk(o[i]);
			return o;
		}
		if (o && typeof o === "object") {
			for (const k of Object.keys(o)) o[k] = walk(o[k]);
			return o;
		}
		return o;
	};
	return walk(node);
}

// clone + fill
export const make = <T = any>(name: string, vars: Vars): T => fill(tpl<T>(name), vars, name);

// first object (depth-first) that has `key`; returns that object
export function holder(o: any, key: string): any {
	if (!o || typeof o !== "object") return undefined;
	if (!Array.isArray(o) && key in o) return o;
	for (const v of Array.isArray(o) ? o : Object.values(o)) {
		const h = holder(v, key);
		if (h) return h;
	}
	return undefined;
}

export const find = (o: any, key: string): any => holder(o, key)?.[key];
