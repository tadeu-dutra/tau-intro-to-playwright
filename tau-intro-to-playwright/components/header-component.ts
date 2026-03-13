import { Page } from "@playwright/test";

/**
 * This is an example of a component class representing the header of the Playwright website.
 * It provides "in-line" methods to interact with the header.
 */
export class HeaderComponent {

    constructor (private page: Page) {}

    async openDocs() {
        await this.page.getByRole('link', { name: 'Docs', exact: true}).click();
    }

    async openAPI() {
        await this.page.getByRole('link', { name: 'API', exact: true}).click();
    }

    async openLanguageMenu() {
        await this.page.locator('[class*="dropdown--hoverable"]').hover();
    }

    async openLanguageMenuItem(language: string) {
        await this.page.locator('.dropdown__menu').getByText(language, { exact: true }).click();
    }

    async selectLanguageMenuItem(language: string) {
        await this.page.locator('[class*="dropdown--hoverable"]').hover();
        const dropdown = this.page.locator('[class="dropdown__menu"]');
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.getByText(language, { exact: true }).click();
    }

    async openCommunity() {
        await this.page.getByRole('link', { name: 'Community', exact: true}).click();
    }

    async openGitHub() {
        await this.page.getByRole('link', { name: 'GitHub repository', exact: true}).click();
    }

    async openDiscord() {
        await this.page.getByRole('link', { name: 'Discord server', exact: true}).click();
    }

    async switchSystemMode() {
        await this.page.locator('[title="system mode"]').click();
    }

    async openSearchModal() {
        await this.page.locator('.DocSearch').click();
    }
}
