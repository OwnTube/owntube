export default async (page: any, out: string) => {
	for (let i = 0; i < 3; i++) { await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(3000); }
	await page.screenshot({ path: out + "/02-scrolled.png" });
};
