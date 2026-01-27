import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/pages/LoginPage';
import { InventoryPage } from '../models/items/inventory.page';

test.describe('Inventory Page – All Products Validation', () => {

  test('should validate all products and cart functionality', async ({ page }) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Login
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);

    // Verify all products have name and price
    await inventoryPage.verifyAllProductsHaveNameAndPrice();

    const productCount = await inventoryPage.inventoryItems().count();

    // Add each product one by one and verify cart count
    for (let i = 0; i < productCount; i++) {
      await inventoryPage.addProductByIndex(i);
      await inventoryPage.verifyCartCount(i + 1);
    }
    //add wait
    await page.waitForTimeout(3000);

    // Remove each product and verify cart count decreases
    for (let i = productCount - 1; i >= 0; i--) {
      await inventoryPage.removeProductByIndex(i);
      await inventoryPage.verifyCartCount(i);
    }
  });

});
