// Instruments MediaSource/SourceBuffer in the page to see what the player appends.
import { launch, playerState, watchPage } from "../probe";
const { browser, ctx } = await launch();
const page = await ctx.newPage();
await page.addInitScript(() => {
	const log: string[] = ((window as any).__mse = []);
	const OMS = window.MediaSource;
	(window as any).__ms = [];
	window.MediaSource = class extends OMS {
		constructor() {
			super();
			(window as any).__ms.push(this);
			log.push("new MediaSource");
			for (const e of ["sourceopen", "sourceended", "sourceclose"]) this.addEventListener(e, () => log.push(`ms ${e}`));
		}
	} as any;
	(window.MediaSource as any).isTypeSupported = OMS.isTypeSupported.bind(OMS);
	const asb = OMS.prototype.addSourceBuffer;
	OMS.prototype.addSourceBuffer = function (t: string) {
		log.push(`addSourceBuffer ${t}`);
		const sb = asb.call(this, t);
		const ab = sb.appendBuffer;
		sb.appendBuffer = function (d: any) {
			const u8 = new Uint8Array(d.buffer ?? d, d.byteOffset ?? 0, d.byteLength);
			log.push(`append ${t.slice(0, 12)} ${u8.byteLength}B head=${[...u8.slice(0, 8)].map((x) => x.toString(16).padStart(2, "0")).join("")}`);
			return ab.call(this, d);
		};
		sb.addEventListener("error", () => log.push(`sb error ${t}`));
		return sb;
	};
	const of = window.fetch;
	window.fetch = async function (input: any, init?: any) {
		const u = String(input?.url ?? input);
		const r = await of.call(this, input, init);
		if (u.includes("videoplayback")) log.push(`fetch ${init?.method ?? "GET"} ${u.replace(/.*itag=(\d+).*range=([\d-]+).*/, "itag=$1 range=$2")} -> ${r.status} ${r.headers.get("content-type")} ${r.headers.get("content-length")} body=${!!r.body}`);
		return r;
	} as any;
	const xo = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function (m: string, u: string) {
		if (String(u).includes("videoplayback")) this.addEventListener("loadend", () => log.push(`xhr ${m} ${String(u).replace(/.*itag=(\d+).*range=([\d-]+).*/, "itag=$1 range=$2")} -> ${this.status} rt=${this.responseType} ${(this.response?.byteLength ?? this.response?.length) ?? "?"}`));
		return xo.apply(this, arguments as any);
	};
	const ist = OMS.isTypeSupported;
	(window.MediaSource as any).isTypeSupported = function (t: string) { const r = ist.call(this, t); if (/webm|mp4/.test(t)) log.push(`isTypeSupported ${t} ${r}`); return r; };
});
const report = watchPage(page);
await page.goto(`${process.env.ORIGIN ?? "http://localhost:8080"}${process.argv[2] ?? "/watch?v=Ib21Xm-oD7h"}`);
await page.waitForTimeout(10000);
console.log((await page.evaluate(() => (window as any).__mse)).slice(0, 60).join("\n"));
console.log(JSON.stringify(await playerState(page)));
console.log(await page.evaluate(() => JSON.stringify((window as any).__ms.map((m: any) => ({ rs: m.readyState, dur: m.duration, sbs: [...m.sourceBuffers].map((b: any) => ({ updating: b.updating, mode: b.mode, buf: b.buffered.length })) })))));
console.log(await page.evaluate(() => { const v = document.querySelector("video") as HTMLVideoElement; return JSON.stringify({ err: v?.error?.message, buffered: v ? [...Array(v.buffered.length)].map((_, i) => [v.buffered.start(i), v.buffered.end(i)]) : null }); }));
console.log(await page.evaluate(() => { const p: any = document.querySelector("#movie_player"); try { return JSON.stringify(p.getStatsForNerds?.()).slice(0, 1500); } catch (e) { return String(e); } }));
console.log(await page.evaluate(() => { const p: any = document.querySelector("#movie_player"); try { return p.getDebugText?.(true); } catch (e) { return String(e); } }));
console.log(report.pageErrors.join("\n"));
await browser.close();
