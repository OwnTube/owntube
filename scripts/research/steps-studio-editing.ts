// Studio's Customization pages (editing/profile, editing/sections), reads
// only: channel_edit/get_channel_page_settings and the pages' own fetches.
import type { Page } from "playwright-core";

export default async function (page: Page, out: string) {
	await page.waitForTimeout(3000);
	const base = new URL(page.url()).pathname.match(/^\/channel\/[\w-]+/)?.[0];
	if (!base) return;
	for (const [i, tab] of ["profile", "sections"].entries()) {
		await page.goto(`https://studio.youtube.com${base}/editing/${tab}`, { waitUntil: "domcontentloaded" });
		await page.waitForTimeout(9000);
		await page.screenshot({ path: `${out}/${String(i + 2).padStart(2, "0")}-editing-${tab}.png`, fullPage: true });
	}
}
