// watch: scroll to comments, open replies, switch to Newest first, scroll related
export default async (page: any, out: string) => {
	await page.evaluate(() => window.scrollTo(0, 900)); await page.waitForTimeout(4000);
	await page.evaluate(() => window.scrollTo(0, 1600)); await page.waitForTimeout(4000);
	await page.screenshot({ path: out + "/02-comments.png" });
	try { await page.locator("ytd-comment-replies-renderer #more-replies button").first().click({ timeout: 5000 }); await page.waitForTimeout(3000); } catch { console.log("no replies button"); }
	await page.screenshot({ path: out + "/03-replies.png" });
	try { await page.locator("#sort-menu yt-sort-filter-sub-menu-renderer, #sort-menu").first().click({ timeout: 5000 }); await page.waitForTimeout(1000); await page.locator("tp-yt-paper-listbox a").nth(1).click({ timeout: 5000 }); await page.waitForTimeout(3000); } catch { console.log("no sort menu"); }
	await page.screenshot({ path: out + "/04-newest.png" });
	for (let i = 0; i < 3; i++) { await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(3000); }
	await page.screenshot({ path: out + "/05-scrolled.png" });
};
