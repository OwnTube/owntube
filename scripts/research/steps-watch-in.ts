// signed-in watch: open Save sheet, scroll to comments (reads only)
export default async (page: any, out: string) => {
	try { await page.locator('#top-level-buttons-computed button[aria-label="More actions"], ytd-menu-renderer #button-shape button').first().click({ timeout: 8000 }); await page.waitForTimeout(2000); await page.screenshot({ path: out + "/02-more.png" }); } catch { console.log("no more button"); }
	try { await page.locator('tp-yt-paper-listbox ytd-menu-service-item-renderer, yt-list-item-view-model').filter({ hasText: "Save" }).first().click({ timeout: 5000 }); await page.waitForTimeout(3000); await page.screenshot({ path: out + "/03-save.png" }); await page.keyboard.press("Escape"); } catch { console.log("no save item"); }
	for (const y of [900, 1600]) { await page.evaluate((v: number) => window.scrollTo(0, v), y); await page.waitForTimeout(3500); }
	await page.screenshot({ path: out + "/04-comments.png" });
};
