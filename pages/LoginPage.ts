import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private username: Locator;
  private password: Locator;
  private loginBtn: Locator;
  private errorMsg: Locator;

  constructor(private page: Page) {
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
    this.errorMsg = page.locator('[data-test="error"]');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async verifyLoginError(message: string) {
    await expect(this.errorMsg).toHaveText(message);
  }
}
