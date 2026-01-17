import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async completeCheckout() {
    await this.page.fill('#first-name', 'Yogesh');
    await this.page.fill('#last-name', 'Bharti');
    await this.page.fill('#postal-code', '560001');
    await this.page.click('#continue');
    await this.page.click('#finish');

    await expect(this.page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  }
}
