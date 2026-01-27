import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  inventoryItems(): Locator {
    return this.page.locator('.inventory_item');
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async verifyAllProductsHaveNameAndPrice() {
    const items = this.inventoryItems();
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      await expect(items.nth(i).locator('.inventory_item_name')).toBeVisible();
      await expect(items.nth(i).locator('.inventory_item_price')).toBeVisible();
    }
  }

  async addProductByIndex(index: number) {
    await this.inventoryItems()
      .nth(index)
      .locator('button:has-text("Add to cart")')
      .click();
  }

  async removeProductByIndex(index: number) {
    await this.inventoryItems()
      .nth(index)
      .locator('button:has-text("Remove")')
      .click();
  }

  async verifyCartCount(expected: number) {
    const badge = this.page.locator('.shopping_cart_badge');
    if (expected === 0) {
      await expect(badge).toHaveCount(0);
    } else {
      await expect(badge).toHaveText(expected.toString());
    }
  }
}
