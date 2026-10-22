// Studio's app bundle, reassembled from the pinned per-module pieces the
// way its module server combines them: one _F_installCss call carrying the
// stylesheets of every module in the answer, then one wrapper around their
// code.
//
//   /s/_/creatorstudio/_/js/k=<key>/ck=../am=../d=1/exm=a,b/excm=../ed=1/rs=../m=x,y

import { existsSync, readFileSync } from "node:fs";
import { recordMiss } from "../diagnostics";
import { type StudioPin, closure, parseGraph, studioModulePath } from "../client/store";

const CSS_HEAD = '"use strict";_F_installCss("';
const CSS_TAIL = '");\n';
const WRAP_HEAD = 'this.default_cs=this.default_cs||{};(function(_){var window=this;\n';
const WRAP_TAIL = "}).call(this,this.default_cs);\n// Google Inc.\n";
const SENTINEL = "sentinel{}";

type Piece = { css: string; js: string };
const pieces = new Map<string, Piece>();

function piece(name: string): Piece {
	const hit = pieces.get(name);
	if (hit) return hit;
	const p = studioModulePath(name);
	if (!existsSync(p)) {
		recordMiss(`studio module ${name}`, name);
		return { css: "", js: "" };
	}
	let t = readFileSync(p, "utf8");
	let css = "";
	if (t.startsWith(CSS_HEAD)) {
		const end = t.indexOf(CSS_TAIL + WRAP_HEAD);
		css = t.slice(CSS_HEAD.length, end);
		if (css.endsWith(SENTINEL)) css = css.slice(0, -SENTINEL.length);
		t = t.slice(end + CSS_TAIL.length);
	} else if (t.startsWith('"use strict";')) t = t.slice('"use strict";'.length);
	const start = t.indexOf(WRAP_HEAD);
	const end = t.lastIndexOf(WRAP_TAIL);
	const readable = start === 0 && end >= WRAP_HEAD.length;
	// some modules are empty: the wrapper with no code
	const out = { css, js: readable ? t.slice(WRAP_HEAD.length, end) : "" };
	if (!readable) recordMiss(`studio module ${name} unreadable`, name);
	pieces.set(name, out);
	return out;
}

export function segments(path: string): Record<string, string> {
	return Object.fromEntries(path.split("/").filter((s) => s.includes("=")).map((s) => [s.slice(0, s.indexOf("=")), s.slice(s.indexOf("=") + 1)]));
}

// the code for a module request, or undefined when it asks for the initial
// bundle (served as the archived file)
export function studioModules(pin: StudioPin, path: string): string | undefined {
	const seg = segments(path);
	const wanted = (seg.m ?? "").split(",").filter(Boolean);
	if (wanted.includes("core")) return undefined;
	const graph = parseGraph(pin.app.graph);
	const have = closure(graph, [...pin.app.initial, ...(seg.exm ?? "").split(",").filter(Boolean)]);
	// The graph lists every module after its dependencies. Upstream picks
	// another dependency-respecting order; the bytes are the same.
	const need = closure(graph, wanted);
	const order = graph.names.filter((n) => need.has(n) && !have.has(n));
	const ps = order.map(piece);
	const css = ps.map((p) => p.css).join("");
	return `${css ? `${CSS_HEAD}${css}${SENTINEL}${CSS_TAIL}` : '"use strict";'}${WRAP_HEAD}${ps.map((p) => p.js).join("")}${WRAP_TAIL}`;
}
