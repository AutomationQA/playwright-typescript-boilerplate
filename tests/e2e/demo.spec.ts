import { test, expect } from "@playwright/test";
import { Logger } from "../../utls";
import { InventoryPage } from "../pages";

const logger = new Logger({ logName: "demo.spec" });
test.describe("Demo purposes", () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.navigateTo();
    await inventoryPage.expect.toHaveInventoryList();
  });

  test("should be able to logout from inventry page", async () => {
    logger.info("this is a demo test to login and then to logout");
    await inventoryPage.logout();
  });

  test("should be able to add item to cart", async () => {
    logger.info("this is a demo test to add item to cart");
    await inventoryPage.addToCartByItem("Sauce Labs Bike Light");
  });

  test("should be able to remove item to cart @smoke", async () => {
    logger.info(
      "this is a demo test to remove item after add the same item to cart"
    );
    await inventoryPage.addToCartByItem("Sauce Labs Bike Light");
    await inventoryPage.removeFromCartByItem("Sauce Labs Bike Light");
    await inventoryPage.expect.toHaveItemsInShoppingCart(0);
  });
});
