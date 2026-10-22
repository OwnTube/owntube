// watch: scroll to comments and expand the first reply thread
export default async (page: any, out: string) => {
	for (const y of [900, 1600, 2200]) { await page.evaluate((v: number) => window.scrollTo(0, v), y); await page.waitForTimeout(3500); }
	const b = page.locator("ytd-comment-thread-renderer button").filter({ hasText: /^\s*\d+\s+repl/ });
	console.log("reply buttons", await b.count());
	try { await b.first().click({ timeout: 8000 }); await page.waitForTimeout(4000); } catch { console.log("no replies button"); }
	await page.screenshot({ path: out + "/02-replies.png" });
	try { await page.locator('ytd-comment-thread-renderer button:has-text("Show more replies")').first().click({ timeout: 5000 }); await page.waitForTimeout(3000); } catch { console.log("no more replies"); }
};
