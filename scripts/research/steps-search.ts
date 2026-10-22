// search: chips, the filters dialog, a filter link, scrolling (reads only)
export default async (page: any, out: string) => {
	const chip = async (name: string, shot: string) => {
		try {
			await page.locator("yt-chip-cloud-chip-renderer").filter({ hasText: name }).first().click({ timeout: 6000 });
			await page.waitForTimeout(3500);
			await page.screenshot({ path: `${out}/${shot}` });
		} catch {
			console.log(`no chip ${name}`);
		}
	};
	await chip("Videos", "02-videos.png");
	await chip("Recently uploaded", "03-recent.png");
	await chip("All", "04-all.png");
	for (let i = 0; i < 2; i++) {
		await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
		await page.waitForTimeout(3000);
	}
	try {
		await page.evaluate(() => window.scrollTo(0, 0));
		await page.locator("#filter-button button, ytd-search-header-renderer button").filter({ hasText: "Filters" }).first().click({ timeout: 6000 });
		await page.waitForTimeout(2000);
		await page.screenshot({ path: `${out}/05-filters.png` });
		await page.locator("ytd-search-filter-renderer").filter({ hasText: "Channels" }).first().click({ timeout: 6000 });
		await page.waitForTimeout(4000);
		await page.screenshot({ path: `${out}/06-channels.png` });
	} catch {
		console.log("no filters");
	}
};
