// Capture steps for the settings pages not in steps-site-all.ts and the
// account menu's Switch account page (account/accounts_list, a read).
import type { Page } from "playwright-core";

export default async function (page: Page, out: string) {
	for (const path of ["/account_time_management"]) {
		await page.goto(`https://www.youtube.com${path}`, { waitUntil: "domcontentloaded" });
		await page.waitForTimeout(4000);
		await page.screenshot({ path: `${out}/settings${path.replace(/\W+/g, "_")}.png` });
	}
	await page.goto("https://www.youtube.com/", { waitUntil: "domcontentloaded" });
	await page.waitForTimeout(4000);
	await page.click("#avatar-btn").catch(() => {});
	await page.waitForTimeout(2000);
	await page.screenshot({ path: `${out}/menu.png` });
	await page.locator("ytd-compact-link-renderer", { hasText: "Switch account" }).first().click().catch(() => {});
	await page.waitForTimeout(3000);
	await page.screenshot({ path: `${out}/switch-account.png` });
}
