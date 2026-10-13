import { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly productsTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsTitle = page.getByText('Products').first();
    }
}