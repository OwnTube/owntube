// channel: open the About panel from the header description
export default async (page: any, out: string) => {
	try { await page.locator("yt-description-preview-view-model").first().click({ timeout: 8000 }); await page.waitForTimeout(4000); } catch (e) { console.log("no description preview"); }
	await page.screenshot({ path: out + "/02-about.png" });
};
