import { Page } from "@playwright/test";

/**
 * This is an example of a component class representing the search modal of the Playwright website.
 * It provides methods to interact with the search modal.
 */
export class SearchModal {

    constructor (private page: Page) {}

    async search(text: string) {
        await this.page.getByRole('searchbox').fill(text);
        await this.page.keyboard.press('Enter');
    }
}
