import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/pages/LoginPage.ts';
import { ProductItem } from '../models/items/ProductItem.ts';
import { users } from '../utils/testdata';

test.describe('Single Product Test using POM', () => {

  test('Validate Sauce Labs Backpack product', async ({ page }) => {
    await page.goto('/');
    // await new LoginPage(page).login(users.valid.username, users.valid.password);
    const loginPage = new LoginPage(page);
    const inventoryPage = new ProductItem(page);

    // Login
    await loginPage.login(users.valid.username, users.valid.password);

    // Verify navigation
    await expect(page).toHaveURL(/inventory.html/);

    // Product validations
    await inventoryPage.verifyProductName('Sauce Labs Backpack');
    await inventoryPage.verifyProductPrice('Sauce Labs Backpack', '$29.99');

    // Cart actions
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.verifyCartCount('1');

    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    await inventoryPage.verifyCartCount('0');
  });

});
