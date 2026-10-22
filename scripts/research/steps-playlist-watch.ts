// a watch page inside a playlist (the panel beside the player), reached by
// the playlist page's Play all; direct watch-page loads meet a captcha
export default async (page: any, out: string) => {
	await page.waitForTimeout(4000);
	await page.locator('text="Play all" >> visible=true').first().click({ timeout: 15000 });
	await page.waitForTimeout(7000);
	await page.screenshot({ path: `${out}/02-watch-playlist.png` });
};
