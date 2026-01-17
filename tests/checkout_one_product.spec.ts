import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../utils/testdata';

test('End-to-end checkout flow', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await new LoginPage(page).login(users.valid.username, users.valid.password);

    const products = new ProductsPage(page);
    await products.verifyOnProductsPage();
    await products.addFirstProductToCart();
    //wait for 2 seconds
    await page.waitForTimeout(2000);
    await products.goToCart();
    //wait for 2 seconds
    await page.waitForTimeout(2000);

    await new CartPage(page).checkout();
    //wait for 2 seconds
    await page.waitForTimeout(2000);
    await new CheckoutPage(page).completeCheckout();
});
