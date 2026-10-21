// responseContext.mainAppWebResponseContext.trackingParam for player
// responses.
//
// The app checks every player response before handing it to the player
// (function LSY in the pinned build, an ad-block detection service): it
// runs trackingParam through an obfuscated string transform, base64-decodes
// the result into a protobuf list of {1: path, 2: value} assertions and
// compares each with the response. A missing or unreadable param replaces
// playabilityStatus with "Something went wrong. Please try again later.
// 282054944" over a player that is in fact playing.
//
// This instance answers with a param asserting videoDetails.videoId, encoded
// for the pinned build: the transform is taken from the archived bundle (it
// changes with builds), run in an isolated context, and inverted. Each
// output character depends on one to three input characters, so the
// inverse is found by fixing inputs in dependency order.

import { readFileSync } from "node:fs";
import vm from "node:vm";
import { recordMiss } from "../diagnostics";
import { archivePath, loadPin } from "./store";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

let transform: ((s: string) => string) | null | undefined;

function functionSource(text: string, name: string): string | undefined {
	const start = text.indexOf(`${name}=function(`);
	if (start < 0) return undefined;
	let i = text.indexOf("{", start);
	let depth = 0;
	for (; i < text.length; i++) {
		const c = text[i];
		if (c === '"' || c === "'") {
			const q = c;
			for (i++; text[i] !== q; i++) if (text[i] === "\\") i++;
		} else if (c === "{") depth++;
		else if (c === "}" && --depth === 0) return text.slice(start + name.length + 1, i + 1);
	}
	return undefined;
}

export function loadTransform(): ((s: string) => string) | null {
	if (transform !== undefined) return transform;
	transform = null;
	const pin = loadPin();
	if (!pin) return null;
	const main = readFileSync(archivePath(pin.app.jsUrl), "utf8");
	// the call site: y="";try{y=<fn>(trackingParam)}catch(u){return P.increment("C_ERROR")...
	const m = /\w="";try\{\w=([\w$]+)\(\w\)\}catch\(\w\)\{return \w\.increment\("C_ERROR"\)/.exec(main);
	const src = m && functionSource(main, m[1]);
	if (!src) {
		recordMiss("integrity: trackingParam transform not found in the pinned bundle");
		return null;
	}
	// defined in its own context with no globals; it only shuffles characters
	const fn = vm.runInNewContext(`(${src})`, Object.create(null), { timeout: 1000 }) as (s: string) => string;
	const probe = String(fn("AAAAAAAAAAAA"));
	if (probe.length !== 12) {
		recordMiss("integrity: trackingParam transform is not length-preserving");
		return null;
	}
	transform = (s) => String(fn(s));
	return transform;
}

function dependencies(f: (s: string) => string, len: number): Set<number>[] {
	const deps = Array.from({ length: len }, () => new Set<number>());
	const rnd = () => ALPHABET[Math.floor(Math.random() * 64)];
	for (let t = 0; t < 24; t++) {
		const base = Array.from({ length: len }, rnd);
		const out = f(base.join(""));
		for (let j = 0; j < len; j++) {
			const x = base.slice();
			x[j] = ALPHABET[(ALPHABET.indexOf(x[j]) + 1 + Math.floor(Math.random() * 63)) % 64];
			const o = f(x.join(""));
			for (let i = 0; i < len; i++) if (o[i] !== out[i]) deps[i].add(j);
		}
	}
	return deps;
}

const depCache = new Map<number, Set<number>[]>();

export function invert(f: (s: string) => string, target: string): string | undefined {
	const len = target.length;
	for (let attempt = 0; attempt < 3; attempt++) {
		let deps = depCache.get(len);
		if (!deps || attempt > 0) {
			deps = dependencies(f, len);
			depCache.set(len, deps);
		}
		const x: (string | undefined)[] = Array(len).fill(undefined);
		const cur = () => x.map((c) => c ?? "A").join("");
		let progress = true;
		while (progress && x.includes(undefined)) {
			progress = false;
			// outputs whose only unknown input is one position
			for (let i = 0; i < len; i++) {
				const unknown = [...deps[i]].filter((j) => x[j] === undefined);
				if (unknown.length !== 1) continue;
				const j = unknown[0];
				for (const c of ALPHABET) {
					x[j] = c;
					if (f(cur())[i] === target[i]) break;
					x[j] = undefined;
				}
				if (x[j] !== undefined) progress = true;
			}
			if (!progress) {
				// two unknowns: search pairs for the output with fewest
				const i = [...Array(len).keys()].map((k) => ({ k, u: [...deps[k]].filter((j) => x[j] === undefined) })).filter((o) => o.u.length).sort((a, b) => a.u.length - b.u.length)[0];
				if (!i || i.u.length > 2) break;
				const [a, b] = i.u;
				outer: for (const ca of ALPHABET)
					for (const cb of ALPHABET) {
						x[a] = ca;
						x[b] = cb;
						if (f(cur())[i.k] === target[i.k]) {
							progress = true;
							break outer;
						}
					}
				if (!progress) x[a] = x[b] = undefined;
			}
		}
		const result = cur();
		if (f(result) === target) return result;
	}
	return undefined;
}

function varint(n: number): number[] {
	const out = [];
	while (n > 127) {
		out.push((n & 127) | 128);
		n >>>= 7;
	}
	out.push(n);
	return out;
}
const field = (num: number, data: number[]) => [(num << 3) | 2, ...varint(data.length), ...data];
const str = (s: string) => [...Buffer.from(s)];

// protobuf { repeated Assertion 1 } with Assertion { string path = 1; string value = 2 }
export function assertionsBase64(pairs: [string, string][]): string {
	const bytes = pairs.flatMap(([p, v]) => field(1, [...field(1, str(p)), ...field(2, str(v))]));
	// unpadded: the client's base64 reader stops at the end of input, and "="
	// is outside the transform's alphabet
	return Buffer.from(bytes).toString("base64url");
}

const cache = new Map<string, string>();

export function trackingParamFor(videoId: string): string {
	const hit = cache.get(videoId);
	if (hit !== undefined) return hit;
	const f = loadTransform();
	if (!f) return "";
	const target = assertionsBase64([["videoDetails.videoId", videoId]]);
	const param = invert(f, target) ?? "";
	if (!param) recordMiss("integrity: could not encode trackingParam", videoId);
	if (cache.size > 10000) cache.clear();
	cache.set(videoId, param);
	return param;
}
