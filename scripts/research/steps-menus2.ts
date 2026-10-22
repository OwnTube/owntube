// the signed-out settings menu (⋮) and, signed in, the notifications panel (reads only)
export default async (page: any, out: string) => {
	const open = async (sel: string, shot: string) => {
		try {
			await page.locator(sel).first().click({ timeout: 8000 });
			await page.waitForTimeout(3500);
			await page.screenshot({ path: `${out}/${shot}` });
			await page.keyboard.press("Escape");
			await page.waitForTimeout(800);
		} catch (e) {
			console.log(`not found: ${sel}`);
		}
	};
	await open("ytd-masthead ytd-topbar-menu-button-renderer button, ytd-masthead #buttons yt-icon-button button", "02-settings-menu.png");
	await open("ytd-notification-topbar-button-renderer #button, ytd-notification-topbar-button-renderer button", "03-notifications.png");
};
