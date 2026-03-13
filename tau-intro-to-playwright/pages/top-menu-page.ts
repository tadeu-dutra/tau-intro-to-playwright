import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

/**
 * This is an example of a page object class representing the top menu of the Playwright website.
 * It extends the BasePage class and provides methods to interact with the top menu.
 */
export class TopMenuPage extends BasePage {

    readonly nodeLink: Locator;
    readonly javaLink: Locator;
    readonly nodeLabel: Locator;
    readonly javaLabel: Locator;
    readonly nodeDescription: string = 'Installing Playwright';
    readonly javaDescription: string = 'Playwright is distributed as a set of Maven modules';

    constructor (page: Page) {
        super(page);
        this.nodeLink = page.getByRole('button', {name: 'Node.js'});
        this.javaLink = page.getByRole('navigation', {name: 'Main'}).getByText('Java');
        this.nodeLabel = page.getByText(this.nodeDescription, { exact: true });
        this.javaLabel = page.getByText(this.javaDescription);
    }

    /**
     * Mouse over the language dropdown
     */
    async hoverNode() {
        await this.nodeLink.hover();
    }
    
    /**
     * Click at Java
     */
    async clickJava() {
        await this.javaLink.click();
    }

    /**
     * Check the text "Installing Playwright" is not being displayed
     */
    async assertNodeDescriptionNotVisible() {
        await expect(this.nodeLabel).not.toBeVisible();
    }

    /**
     * Check the following text is displayed: "Playwright is distributed as a set of Maven modules."
     */
    async assertJavaDescriptionVisible() {
        await expect(this.javaLabel).toBeVisible();
    }

    /**
     * Returns the heading locator based on the parameterized heading name.
     * @param heading 
     * @returns 
     */
    heading(heading: string): Locator {
        return this.page.getByRole('heading', { name: heading });
    }

    /**
     * Expects page to contain the parameterized heading.
     * @param heading
     */
    async assertPageHeading(heading: string) {
        await expect(this.heading(heading)).toBeVisible();
    }

     /**
     * Check the URL
     * @param pageUrl 
     */
    async assertPageUrl(pageUrl: RegExp) {
        await expect(this.page).toHaveURL(pageUrl);
    }
}
