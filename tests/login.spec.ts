import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../utils/testdata';

test('Valid login should succeed', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const login = new LoginPage(page);
  await login.login(users.valid.username, users.valid.password);
  await login.verifyLoginSuccess();
});
