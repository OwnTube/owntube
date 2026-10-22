// Opens the account menu's Switch account page (GET /getAccountSwitcherEndpoint, a read).
import type { Page } from "playwright-core";

export default async function (page: Page, out: string) {
	await page.click("#avatar-btn").catch(() => {});
	await page.waitForTimeout(2000);
	await page.locator("ytd-compact-link-renderer", { hasText: "Switch account" }).first().click().catch(() => {});
	await page.waitForTimeout(3000);
	await page.screenshot({ path: `${out}/switch-account.png` });
}
