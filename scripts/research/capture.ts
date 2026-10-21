// Research capture of youtube.com: HAR with bodies, individual youtubei/HTML
// responses, screenshots. Output goes to captures/<name>/ (gitignored, raw).
//   bun scripts/research/capture.ts <name> <url> [--steps steps.json] [--narrow]
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [name, url] = process.argv.slice(2);
const narrow = process.argv.includes("--narrow");
const out = join("captures", name);
mkdirSync(join(out, "bodies"), { recursive: true });
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", proxy, args: ["--autoplay-policy=no-user-gesture-required"] });
const ctx = await browser.newContext({
	recordHar: { path: join(out, "capture.har"), content: "embed" },
	viewport: narrow ? { width: 412, height: 860 } : { width: 1400, height: 900 },
	locale: "en-US",
	userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
	recordVideo: { dir: join(out, "video"), size: narrow ? { width: 412, height: 860 } : { width: 1400, height: 900 } },
});
const page = await ctx.newPage();
const log: string[] = [];
let n = 0;
page.on("console", (m) => log.push(`console.${m.type()}: ${m.text()}`));
page.on("pageerror", (e) => log.push(`pageerror: ${e.message}`));
page.on("response", async (r) => {
	const u = r.url();
	const req = r.request();
	log.push(`${r.status()} ${req.method()} ${u.slice(0, 300)}`);
	if (/\/youtubei\/v1\/|[?&]pbj=1/.test(u) || (req.resourceType() === "document")) {
		try {
			const body = await r.text();
			const file = `${String(++n).padStart(3, "0")}-${new URL(u).pathname.replace(/[^\w]+/g, "_").slice(0, 60)}`;
			writeFileSync(join(out, "bodies", file + ".resp"), body);
			writeFileSync(join(out, "bodies", file + ".req.json"), JSON.stringify({ url: u, method: req.method(), headers: req.headers(), post: req.postData() }, null, 1));
		} catch {}
	}
});
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(8000);
await page.screenshot({ path: join(out, "01-loaded.png") });
const steps = process.env.STEPS ? (await import(process.env.STEPS)).default : null;
if (steps) await steps(page, out);
writeFileSync(join(out, "log.txt"), log.join("\n"));
await ctx.close();
await browser.close();
console.log(`captured ${name}: ${log.length} log lines, ${n} bodies`);
