import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  private addToCartBtn: Locator;
  private cartIcon: Locator;
  private productPageTitle: Locator;

  constructor(private page: Page) {

    this.productPageTitle = page.getByAltText('Sauce Labs Backpack', { exact: true });
    this.addToCartBtn = page.getByText('Add to cart', { exact: true });
    this.cartIcon = page.locator('.shopping_cart_link');
  }
  async verifyOnProductsPage() {
    await this.productPageTitle.click();
    await expect(this.page).toHaveURL(/inventory-item\.html/);
  }

  async addFirstProductToCart() {
    await this.addToCartBtn.click();
  }

  async goToCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }
}
