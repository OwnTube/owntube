// watch: scroll to the comments and open the first reply thread (reads only)
export default async (page: any, out: string) => {
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
