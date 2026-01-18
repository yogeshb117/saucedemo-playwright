import { Page, Locator } from '@playwright/test';

export class CartPage {
  private checkoutBtn: Locator;

  constructor(private page: Page) {
    this.checkoutBtn = page.locator('#checkout');
  }

  async checkout() {
    await this.checkoutBtn.click();
  }
}
