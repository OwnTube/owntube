// signed in: reach a watch page by in-app navigation (search, then the
// result), scroll to the comments and open a reply thread (reads only)
export default async (page: any, out: string) => {
	const box = page.getByRole("combobox", { name: "Search" }).first();
	await box.fill("Big Buck Bunny 60fps 4K");
	await box.press("Enter");
	await page.waitForTimeout(5000);
	await page.locator('a#video-title[href*="aqz-KE-bpKQ"], a[href*="/watch?v=aqz-KE-bpKQ"]').first().click();
	await page.waitForTimeout(6000);
	for (const y of [900, 1600, 2200]) {
		await page.evaluate((v: number) => window.scrollTo(0, v), y);
		await page.waitForTimeout(3500);
	}
	await page.screenshot({ path: `${out}/02-comments.png` });
	const replies = page.getByRole("button", { name: /^\d+ repl(y|ies)$/ });
	console.log("reply buttons", await replies.count());
	try {
		await replies.first().click({ timeout: 8000 });
		await page.waitForTimeout(4000);
	} catch {
		console.log("no replies button");
	}
	await page.screenshot({ path: `${out}/03-replies.png` });
};
