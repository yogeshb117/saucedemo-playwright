import { Page, Locator, expect } from '@playwright/test';

export class ProductItem {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  productByName(name: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: name });
  }

  async verifyProductName(name: string) {
    await expect(
      this.productByName(name).locator('.inventory_item_name')
    ).toHaveText(name);
  }

  async verifyProductPrice(name: string, price: string) {
    await expect(
      this.productByName(name).locator('.inventory_item_price')
    ).toHaveText(price);
  }

  async addProductToCart(name: string) {
    await this.productByName(name)
      .locator('button:has-text("Add to cart")')
      .click();
  }

  async removeProductFromCart(name: string) {
    await this.productByName(name)
      .locator('button:has-text("Remove")')
      .click();
  }

  async verifyCartCount(count: string) {
    const badge = this.page.locator('.shopping_cart_badge');

    if (count === '0') {
      await expect(badge).toHaveCount(0);
    } else {
      await expect(badge).toHaveText(count);
    }
  }
}
