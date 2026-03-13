import { Page, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';

/**
 * This is an example of a test file using the AAA (Arrange-Act-Assert) pattern.
 * It is recommended to write tests like this, as it helps to structure the code and make it more readable.
 */
const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;

// Arrange
test.beforeEach(async ({ page }) => {

    await page.goto(URL);
    homePage = new HomePage(page);
    topMenuPage = new TopMenuPage(page);
});

test.describe('AAA Pattern Demo', () => {

    test('has title', async () => {
        await homePage.assertPageTitle(/Playwright/);

    });

    test('get started link', async () => {

        // Act
        await clickGetStarted();

        // Assert
        await topMenuPage.assertPageUrl(/.*intro/);
        await topMenuPage.assertPageHeading('Installation');

    });

    test('check Docs link', async ({ page }) => {

        // Act
        await navigateToDocs(page);

        // Assert
        await validateDocs(page);
    });

    test('check Java page', async ({ page }) => {

        // Act
        await test.step('Act', async () => {
            await clickGetStarted();
            await topMenuPage.hoverNode();
            await topMenuPage.clickJava();
        });

        // Assert
        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(/.*intro/);
            await topMenuPage.assertPageHeading('Installation');
            await topMenuPage.assertNodeDescriptionNotVisible();
            await topMenuPage.assertJavaDescriptionVisible();
        });
    });
});

async function clickGetStarted() {
    await homePage.clickGetStarted();
}

async function navigateToDocs(page: Page) {
    await homePage.header.openDocs();
}

async function validateDocs(page: Page) {
    await topMenuPage.assertPageUrl(/.*intro/);
    await topMenuPage.assertPageHeading('Installation');
}