const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('input[id="user-name"]').fill('standard_user');
  await page.locator('input[id="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
});

test('test1_check_items_after_login', async ({ page }) => {
  // "Products" text is displayed after login
  await expect(page.getByText('Products')).toBeVisible();
  // "Shopping Cart" text is displayed
  await expect(page.locator('a[class = "shopping_cart_link"]')).toBeVisible();
  // Product 1 is displayed after login
  await expect(page.locator("//div[@data-test='inventory-item'][1]")).toBeVisible();
  // Product 2 is displayed after login
  await expect(page.locator("//div[@data-test='inventory-item'][2]")).toBeVisible();
});

test('test2_add_2_items_to_shopping_cart', async ({ page }) => {
  //Add first item it the product list
  await page.locator('[data-test^="add-to-cart"]').nth(0).click();
  //Check that Shopping cart badge shows "1"
  await expect(page.locator("//span[@data-test='shopping-cart-badge'][text()='1']")).toBeVisible();
  // Navigate to Shopping Cart List
  await page.locator('[data-test="shopping-cart-link"]').click();
  // Check that item is shown on the Shopping Cart list
  await expect(page.locator("//div[@data-test='inventory-item'][1]")).toBeVisible();

});





