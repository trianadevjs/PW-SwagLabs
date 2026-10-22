import { Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly productsTitle: Locator;
    readonly saucelabsBackPackImage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsTitle = page.getByText('Products').first();
        this.saucelabsBackPackImage = page
            .locator('.inventory_item')
            .filter({ hasText: 'Sauce Labs Backpack' })
            .locator('.inventory_item_img img');
    }
}