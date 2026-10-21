// Prints the element path and key attributes around a visible text on a page.
import { launch, watchPage } from "../probe";
const [path, needle, wait] = process.argv.slice(2);
const { browser, ctx } = await launch();
const page = await ctx.newPage();
watchPage(page);
await page.goto(`${process.env.ORIGIN ?? "http://localhost:8080"}${path}`);
await page.waitForTimeout(Number(wait ?? 6000));
console.log(await page.evaluate((n) => {
	const out: string[] = [];
	const walk = (root: Document | ShadowRoot | Element) => {
		const it = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
		for (let t = it.nextNode(); t; t = it.nextNode()) {
			if (!t.textContent?.includes(n)) continue;
			const chain: string[] = [];
			for (let e: Element | null = t.parentElement; e && chain.length < 14; e = e.parentElement) chain.push(e.tagName.toLowerCase() + (e.id ? `#${e.id}` : "") + (typeof e.className === "string" && e.className ? `.${e.className.split(" ").slice(0, 3).join(".")}` : ""));
			out.push(chain.join(" < "));
		}
	};
	walk(document);
	return out.join("\n") || "not found";
}, needle));
await browser.close();
