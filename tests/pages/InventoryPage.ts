import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly saucelabsBackPackImage: Locator;
  readonly menuButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.getByText("Products").first();
    this.saucelabsBackPackImage = page
      .locator(".inventory_item")
      .filter({ hasText: "Sauce Labs Backpack" })
      .locator(".inventory_item_img img");
    this.menuButton = page.getByText("Open Menu");
    this.logoutButton = page.getByText("Logout", { exact: true });
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutButton.click();
  }
}
