// End index (exclusive) of the JSON value starting at s[start], which must be
// '{' or '['. String-aware, so braces inside strings don't count.
export function jsonEnd(s: string, start: number): number {
	let depth = 0;
	let inStr = false;
	for (let i = start; i < s.length; i++) {
		const c = s[i];
		if (inStr) {
			if (c === "\\") i++;
			else if (c === '"') inStr = false;
		} else if (c === '"') inStr = true;
		else if (c === "{" || c === "[") depth++;
		else if (c === "}" || c === "]") {
			depth--;
			if (depth === 0) return i + 1;
		}
	}
	throw new Error("unterminated JSON");
}
