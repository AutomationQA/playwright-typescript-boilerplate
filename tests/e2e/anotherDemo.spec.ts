import { Logger } from "../../utls";
import { test } from "../helper/baseTest";

const logger = new Logger({ logName: "anotherDemo.spec" });
test.describe("Another Demo purposes", () => {
  test("should be able to check with items in cart @smoke", async ({
    inventoryPage,
    cartPage,
  }) => {
    logger.info("this is a demo test to checkout cart");
    await test.step("add to cart", async () => {
      await inventoryPage.navigateTo();
      await inventoryPage.expect.toHaveInventoryList();
      await inventoryPage.addToCartByItem("Sauce Labs Bike Light");
    });
    await test.step("checkout cart", async () => {
      await inventoryPage.openShippingCart();
      await cartPage.expect.toBeOnYourCartPage();
      await cartPage.checkout();
    });
    logger.info(
      "only for test github action purpose, will remove/rever this line"
    );
  });
});
