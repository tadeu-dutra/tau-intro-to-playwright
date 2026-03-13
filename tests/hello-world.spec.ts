import { test, expect } from '@playwright/test';

/**
 * Most simple example. Used to show different uses of scripts section of the package.json file
 */
test('Open Playwright Website', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
