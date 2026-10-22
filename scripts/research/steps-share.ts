// a watch page's Share dialog (share/get_share_panel; nothing is shared).
// Start on the results page: direct watch-page loads meet a captcha
export default async (page: any, out: string) => {
	await page.waitForTimeout(4000);
	await page.locator('a#video-title[href*="aqz-KE-bpKQ"], a[href*="/watch?v=aqz-KE-bpKQ"]').first().click();
	await page.waitForTimeout(6000);
	await page.locator('ytd-watch-metadata button[aria-label="Share"]').first().click({ timeout: 15000 });
	await page.waitForTimeout(3000);
	await page.screenshot({ path: `${out}/02-share.png` });
};
