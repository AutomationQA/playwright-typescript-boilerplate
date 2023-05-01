import { Logger } from "../../utls";
import { test } from "../helper/baseTest";

const logger = new Logger({ logName: "demo.spec" });
test.describe("Demo purposes", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigateTo();
    await inventoryPage.expect.toHaveInventoryList();
  });

  test("should be able to logout from inventry page", async ({
    inventoryPage,
  }) => {
    logger.info("this is a demo test to login and then to logout");
    await inventoryPage.logout();
  });

  test("should be able to add item to cart", async ({ inventoryPage }) => {
    logger.info("this is a demo test to add item to cart");
    await inventoryPage.addToCartByItem("Sauce Labs Bike Light");
  });

  test("should be able to remove item to cart @smoke", async ({
    inventoryPage,
  }) => {
    logger.info(
      "this is a demo test to remove item after add the same item to cart"
    );
    await inventoryPage.addToCartByItem("Sauce Labs Bike Light");
    await inventoryPage.removeFromCartByItem("Sauce Labs Bike Light");
    await inventoryPage.expect.toHaveItemsInShoppingCart(0);
  });
});
