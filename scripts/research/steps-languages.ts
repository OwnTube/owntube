// Opens Playback and performance > Preferred languages (get_panel, a read).
import type { Page } from "playwright-core";

export default async function (page: Page, out: string) {
	await page.waitForTimeout(3000);
	await page.getByText("Add or edit languages").first().click().catch(() => {});
	await page.waitForTimeout(3000);
	await page.screenshot({ path: `${out}/languages.png` });
}
