import { Target } from '@applitools/eyes-playwright';
import { test } from '@applitools/eyes-playwright/fixture';

/**
 * Applitools Visual Testing Demo
 */
const URL = 'https://demo.applitools.com';
test.describe('Applitools Demo Website', () => {
    
    test('log into applitools demo page', async ({ page, eyes }) => {
        
        await page.goto(URL);
        await eyes.check('Login page', Target.window().fully());
        await page.locator('id=username').fill('tadeu');
        await page.locator('id=password').fill('happyTesting');
        await page.locator('id=log-in').click();
        await eyes.check('Main page', Target.window().fully().layout());
    });
});