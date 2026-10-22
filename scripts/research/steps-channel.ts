// channel: open the About dialog (…more), then visit Home, Playlists and a channel search
export default async (page: any, out: string) => {
	const click = async (sel: string) => { try { await page.locator(sel).first().click({ timeout: 5000 }); await page.waitForTimeout(3000); } catch (e) { console.log(`no ${sel}`); } };
	await click("text=...more");
	await page.screenshot({ path: out + "/02-about.png" });
	await page.keyboard.press("Escape");
	await click('yt-tab-shape:has-text("Home")');
	await page.screenshot({ path: out + "/03-home.png" });
	await click('yt-tab-shape:has-text("Playlists")');
	await page.screenshot({ path: out + "/04-playlists.png" });
	await click('yt-tab-shape:has-text("Videos")');
	await click('chip-shape:has-text("Popular")');
	await page.screenshot({ path: out + "/05-popular.png" });
	for (let i = 0; i < 2; i++) { await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(3000); }
};
