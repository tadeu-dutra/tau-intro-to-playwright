import { expect, Page } from '@playwright/test';
import { HeaderComponent } from '../components/header-component';
import { BasePage } from './base-page';
import { SearchModal } from '../components/search-modal';

/**
 * This is an example of a page object class representing the home page of the Playwright website.
 * It extends the BasePage class and provides methods to interact with the home page.
 */
export class HomePage extends BasePage {

    readonly header: HeaderComponent;
    readonly searchModal: SearchModal;
    
    constructor (page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.searchModal = new SearchModal(page);
    }

    async gotoHome() {
        await this.goto("https://playwright.dev/");
    }

    async clickGetStarted() {
        await this.page.getByRole('link', { name: 'Get started' }).click();
    }

    async assertPageTitle(title: RegExp) {
        await expect(this.page).toHaveTitle(title);
    }

    async assertUrl(url: RegExp) {
        await expect(this.page).toHaveURL(url);
    }

    async assertHeading(heading: string) {
        await expect(this.page.getByRole('heading', { level: 1 })).toContainText(heading);
    }
}
