import { expect, Page, Locator } from "@playwright/test";

/**
 * Base class for all page objects
 */
export class BasePage {

    constructor(protected page: Page) {}

    async goto(url: string) {
        await this.page.goto(url);
    }

    async assertPageUrl(url: string | RegExp) {
        await expect(this.page).toHaveURL(url);
    }

    async assertPageTitle(title: string | RegExp) {
        await expect(this.page).toHaveTitle(title);
    }
}
