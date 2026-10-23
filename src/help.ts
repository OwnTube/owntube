// /_ot/help.js on both origins: the stand-in for Google's help and feedback
// service (assets/help.js, patches *-help-service in src/client/patches.ts).

import { join } from "node:path";
import { PUBLIC_ORIGIN } from "./config";

const source = await Bun.file(join(import.meta.dir, "..", "assets", "help.js")).text();
const script = source.replace("__FEEDBACK_URL__", `${PUBLIC_ORIGIN}/feedback`);

export const helpScript = () => new Response(script, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-cache" } });
