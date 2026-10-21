// Applies every client patch to the pinned archive and checks the match
// counts. Exit code 1 on any mismatch (run after re-pinning a build).
import { checkPatches } from "../src/client/assets";

const results = await checkPatches();
for (const r of results) console.log(`${r.ok ? "ok      " : "MISMATCH"} ${r.id}: ${r.matches} match(es), expected ${r.expect}`);
process.exit(results.every((r) => r.ok) ? 0 : 1);
