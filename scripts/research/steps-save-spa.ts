// signed in: reach a watch page by in-app navigation and open the Save sheet
// (its playlist rows load through get_panel; nothing is saved)
export default async (page: any, out: string) => {
	const box = page.getByRole("combobox", { name: "Search" }).first();
	await box.fill("Big Buck Bunny 60fps 4K");
	await box.press("Enter");
	await page.waitForTimeout(5000);
	await page.locator('a#video-title[href*="aqz-KE-bpKQ"], a[href*="/watch?v=aqz-KE-bpKQ"]').first().click();
	await page.waitForTimeout(6000);
	console.log("buttons", await page.evaluate(() => Array.from(document.querySelectorAll("ytd-watch-metadata button")).map((b) => b.getAttribute("aria-label") || b.textContent?.trim()).filter(Boolean)));
	const save = page.locator('ytd-watch-metadata button[aria-label="Save to playlist"], ytd-watch-metadata button:has-text("Save")').first();
	if (!(await save.isVisible().catch(() => false))) {
		await page.locator('ytd-watch-metadata #actions ytd-menu-renderer > yt-button-shape button, ytd-watch-metadata button[aria-label="More actions"]').last().click({ timeout: 10000 });
		await page.waitForTimeout(1500);
		await page.screenshot({ path: `${out}/02-more.png` });
		console.log("menu", await page.evaluate(() => Array.from(document.querySelectorAll("tp-yt-iron-dropdown:not([aria-hidden=true]) ytd-menu-service-item-renderer, tp-yt-iron-dropdown yt-list-item-view-model")).map((e) => e.textContent?.trim().replace(/\s+/g, " "))));
		await page.locator('ytd-menu-service-item-renderer:has-text("Save"), yt-list-item-view-model:has-text("Save")').first().click({ timeout: 10000 });
	} else await save.click();
	await page.waitForTimeout(4000);
	await page.screenshot({ path: `${out}/02-save-sheet.png` });
	// the sheet's "New playlist" opens a client-side dialog
	const np = page.locator('button:has-text("New playlist"), yt-list-item-view-model:has-text("New playlist")').last();
	if (await np.isVisible().catch(() => false)) {
		await np.click();
		await page.waitForTimeout(1500);
		await page.screenshot({ path: `${out}/03-new-playlist.png` });
	}
};
