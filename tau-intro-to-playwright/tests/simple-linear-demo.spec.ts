import { test, expect } from '@applitools/eyes-playwright/fixture';

/**
 * This is an example of a test file without using the Page Object Model pattern.
 * It is not recommended to write tests like this, but it is useful to see how the code can be structured differently.
 */
test.describe('Simple Linear Demo - part 1', () => {

  test('@smoke - has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    await expect(page).toHaveURL(/.*intro/);
  });
});

test.describe('Simple Linear Demo - part 2', () => {

    test('check Java page', async ({ page }) => {
      await page.goto('https://playwright.dev/');
      await page.getByRole('link', { name: 'Get started' }).click();
      await page.getByRole('button', { name: 'Node.js'}).hover();
      await page.getByText('Java', {exact: true}).click();
      await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
      await expect(page.getByText('Installing Playwright', {exact: true})).not.toBeVisible();
      const javaDescription = 'Playwright is distributed as a set of Maven modules.';
      await expect(page.getByText(javaDescription)).toBeVisible();
  });
});
