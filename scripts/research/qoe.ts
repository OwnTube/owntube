// Prints the player's QoE pings (error and state reports) for a page.
import { launch } from "../probe";
const { browser, ctx } = await launch({ bypassCSP: true });
const page = await ctx.newPage();
await page.route("**/*", (route) => {
	const u = route.request().url();
	if (u.includes("/api/stats/qoe") || u.includes("/api/stats/watchtime")) {
		const q = new URL(u).searchParams;
		const keep = [...q].filter(([k]) => !/^(fexp|cpn|cl|ns|el|seq|docid|ei|event|cmt|lact|rt|cbr|cbrver|c|cver|cplayer|cos|cplatform|hl|cr|len|fmt|afmt|vps|bh|bwm|bwe|bat|vis|view)$/.test(k));
		console.log(`${new URL(u).pathname} ${new URLSearchParams(keep).toString().slice(0, 1500)}`);
	}
	return new URL(u).host === "localhost:8080" ? route.continue() : route.abort();
});
await page.goto(`http://localhost:8080${process.argv[2] ?? "/watch?v=Ib21Xm-oD7h"}`);
await page.waitForTimeout(Number(process.argv[3] ?? 15000));
await browser.close();
