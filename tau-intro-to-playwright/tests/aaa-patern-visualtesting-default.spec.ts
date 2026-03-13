import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';
import { test } from '@playwright/test';
import { BatchInfo, BrowserType, Configuration, Eyes, Target, ClassicRunner, VisualGridRunner, EyesRunner } from '@applitools/eyes-playwright';
import dotenv from 'dotenv';

dotenv.config();

const URL = 'https://playwright.dev/';

// Page Objects
let homePage: HomePage;
let topMenuPage: TopMenuPage;

// Applitools Visual Testing
let eyes: Eyes;
const USE_ULTRAFAST_GRID = true;
const runner = getEyesRunner(!USE_ULTRAFAST_GRID);
const apiKey = getApiKey();
const config = new Configuration();

// Helper Actions
async function clickGetStarted() {
  await homePage.clickGetStarted();
}

function getEyesRunner(useUltraFastGrid: boolean): EyesRunner {
  // You can use the ClassicRunner or the VisualGridRunner
  if (useUltraFastGrid) {
    return new VisualGridRunner({ testConcurrency: 1 });
  }
  return new ClassicRunner();
}

function getEyes(runner: EyesRunner, config?: Configuration): Eyes {
  const eyes = new Eyes(runner);
  if (config) {
    eyes.setConfiguration(config);
  }
  return eyes;
}

function getApiKey(): string {
  if (!process.env.APPLITOOLS_API_KEY) {
    throw new Error('Missing APPLITOOLS_API_KEY environment variable');
  }
  return process.env.APPLITOOLS_API_KEY;
}

test.beforeAll(() => {

  config.setBatch(new BatchInfo({ name: 'Batch AAA Pattern' }));
  config.addBrowser(1024, 768, BrowserType.CHROME);
  config.setApiKey(apiKey);
});

test.beforeEach(async ({ page }, testInfo) => {

  eyes = getEyes(runner, config);

  await eyes.open(
    page,
    'Playwright',
    testInfo.title,
    { width: 1024, height: 768 }
  );

  await page.goto(URL);

  homePage = new HomePage(page);
});

test.afterEach(async ({ page }, testInfo) => {

  if (testInfo.status !== testInfo.expectedStatus) {
    console.log(`Did not run as expected, ended up at ${page.url()}`);
  }
  await eyes.close(false);
});

test.afterAll(async () => {

  const results = await runner.getAllTestResults(false);

  console.log('Visual test results:');
  console.log(results);
});

test.describe('AAA Pattern Demo with Visual Testing', () => {

  test('has title', async () => {

    // Assert
    await homePage.assertPageTitle(/Playwright/);

    // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings
    await eyes.check('Home Page', Target.window().fully());
  });

  test('get started link', async ({ page }) => {

    topMenuPage = new TopMenuPage(page);

    // Act
    await clickGetStarted();

    // Assert
    await topMenuPage.assertPageUrl(/.*intro/);
    await topMenuPage.assertPageHeading('Installation');

    // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings#region-match-levels
    // Layout: Check only the layout and ignore actual text and graphics.
    await eyes.check('Get Started Page', Target.window().fully().layout());
  });

  test('check Java page', async ({ page }) => {

    topMenuPage = new TopMenuPage(page);

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
