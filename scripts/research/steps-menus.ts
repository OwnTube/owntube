// signed-in home: open the account menu and the Create menu (reads only)
export default async (page: any, out: string) => {
	try { await page.locator("#avatar-btn, button#avatar-btn").first().click({ timeout: 8000 }); await page.waitForTimeout(3000); await page.screenshot({ path: out + "/02-account-menu.png" }); await page.keyboard.press("Escape"); await page.waitForTimeout(800); } catch { console.log("no avatar button"); }
	try { await page.locator('ytd-masthead button[aria-label="Create"], ytd-masthead #buttons ytd-button-renderer button').first().click({ timeout: 8000 }); await page.waitForTimeout(2000); await page.screenshot({ path: out + "/03-create-menu.png" }); await page.keyboard.press("Escape"); } catch { console.log("no create button"); }
	try { await page.locator("button#button[aria-label='Notifications'], ytd-notification-topbar-button-renderer button").first().click({ timeout: 8000 }); await page.waitForTimeout(3000); await page.screenshot({ path: out + "/04-notifications.png" }); await page.keyboard.press("Escape"); } catch { console.log("no notifications button"); }
};
