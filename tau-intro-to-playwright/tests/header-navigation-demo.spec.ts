import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";

/**
 * Data-Driven Testing Example
 */
test.describe('Header Navigation Demo', () => {

    const links = [
        { name: 'Docs', method: (home: HomePage) => home.header.openDocs(), url: /docs/, pageTitle: /Installation/ },
        { name: 'API', method: (home: HomePage) => home.header.openAPI(), url: /api/, pageTitle: /Playwright/ },
        { name: '.NET', method: (home: HomePage) => home.header.selectLanguageMenuItem(".NET"), url: /.*dotnet.*/, pageTitle: /Installation | Playwright .NET/},
        { name: 'Python', method: (home: HomePage) => home.header.selectLanguageMenuItem("Python"), url: /.*python.*/, pageTitle: /Installation | Playwright/},
        { name: 'Java', method: (home: HomePage) => home.header.selectLanguageMenuItem("Java"), url: /.*java.*/, pageTitle: /Installation | Playwright Java/},
        { name: 'Node.js', method: (home: HomePage) => home.header.selectLanguageMenuItem("Node.js"), url: /.*intro/, pageTitle: /Playwright Library | Playwright/},
        { name: 'Community', method: (home: HomePage) => home.header.openCommunity(), url: /community/, pageTitle: /Welcome/ }
    ];

    for (const link of links) {
        test(`navigate to ${link.name}`, async ({ page }) => {
            const home = new HomePage(page);
            await home.gotoHome();
            await home.clickGetStarted();
            await link.method(home);
            await home.assertUrl(link.url);
            await home.assertPageTitle(link.pageTitle);
        });
    }
    
    test('search Test term', async ({ page }) => {
        const home = new HomePage(page);
        await home.gotoHome();
        await home.header.openSearchModal();
        await home.searchModal.search('Test');
    });
});

test.beforeEach(() => {
    console.log('Running test: ' + test.info().title);
});

test.afterEach(() => {
    console.log('Finished test ' + test.info().title + ' with duration of ' + test.info().duration);
});