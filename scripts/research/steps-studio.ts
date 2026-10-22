// Studio: wait for the upload dialog; nothing is selected or submitted
export default async (page: any, out: string) => {
	await page.waitForTimeout(6000);
	await page.screenshot({ path: out + "/02-upload-dialog.png" });
	console.log("url", page.url());
};
