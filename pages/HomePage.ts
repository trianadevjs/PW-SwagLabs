import { Locator, Page } from '@playwright/test';

export class HomePage {
    public readonly productsTitle: Locator;

    constructor(page: Page) {
        this.productsTitle = page.getByText('Products').first();
    }
}