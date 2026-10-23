// Studio's account menu and its Switch account page (account/account_menu
// and GET /getAccountSwitcherEndpoint on studio.youtube.com, both reads).
import type { Page } from "playwright-core";

export default async function (page: Page, out: string) {
	await page.waitForTimeout(4000);
	await page.click("#avatar-btn").catch(() => {});
	await page.waitForTimeout(2500);
	await page.screenshot({ path: `${out}/studio-account-menu.png` });
	await page.locator("ytd-compact-link-renderer", { hasText: "Switch account" }).first().click().catch(() => {});
	await page.waitForTimeout(3500);
	await page.screenshot({ path: `${out}/studio-switch-account.png` });
}
