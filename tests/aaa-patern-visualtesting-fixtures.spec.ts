import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';
import { Target } from '@applitools/eyes-playwright';
import { test } from '@applitools/eyes-playwright/fixture'

/**
 * This is an example of a test file using the AAA (Arrange-Act-Assert) pattern.
 * It is recommended to write tests like this, as it helps to structure the code and make it more readable.
 */
const URL = 'https://playwright.dev/';

// Page Objects
let homePage: HomePage;
let topMenuPage: TopMenuPage;

// Helper Action
async function clickGetStarted() {
    await homePage.clickGetStarted();
}

test.beforeEach(async ({ page }, testInfo) => {

    await page.goto(URL);

    homePage = new HomePage(page);
    topMenuPage = new TopMenuPage(page);
});

test.describe('AAA Pattern Demo with Visual Testing', () => {

    test('has title', async ({ page, eyes }) => {

        await homePage.assertPageTitle(/Playwright/);

        await eyes.check('Home Page', Target.window().fully()); // Visual checkpoint for the entire page (with scrollin)
    });

    test('get started link', async ({ page, eyes }) => {

        // Act
        await clickGetStarted();

        // Assert
        await topMenuPage.assertPageUrl(/.*intro/);
        await topMenuPage.assertPageHeading('Installation');

        await eyes.check('Get Started Page', Target.window().fully().layout());
    });

    test('check Java page', async ({ page, eyes }) => {

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

            await eyes.check('Java Page', Target.window().fully().ignoreColors());
        });
    });
});
