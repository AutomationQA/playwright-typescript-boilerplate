import { test, expect } from "@playwright/test";
import { Logger } from "../../utls";
import { InventoryPage, CartPage } from "../pages";

const logger = new Logger({ logName: "anotherDemo.spec" });
test.describe("Another Demo purposes", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
  });

  test("should be able to check with items in cart @smoke", async () => {
    logger.info("this is a demo test to checkout cart");
    await inventoryPage.navigateTo();
    await inventoryPage.expect.toHaveInventoryList();
    await inventoryPage.addToCartByItem("Sauce Labs Bike Light");
    await inventoryPage.openShippingCart();
    await cartPage.expect.toBeOnYourCartPage();
    await cartPage.checkout();
  });
});
