import { test as base } from "@playwright/test";
import * as pages from "../pages";
import AxeBuilder from "@axe-core/playwright";

export const test = base.extend<{
  cartPage: pages.CartPage;
  inventoryPage: pages.InventoryPage;
  loginPage: pages.LoginPage;
  makeAxeBuilder: AxeBuilder;
}>({
  cartPage: async ({ page }, use) => {
    // Set up the fixture as needed
    // some action steps...
    // Use the fixture value in the test.
    await use(new pages.CartPage(page));
    // Clean up the fixture.
    // await cartPage.someAction()
  },
  inventoryPage: async ({ page }, use) => {
    await use(new pages.InventoryPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new pages.LoginPage(page));
  },
  makeAxeBuilder: async ({ page }, use) => {
    await use(
      new AxeBuilder({ page }).withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
      ])
    );
  },
});
export { expect } from "@playwright/test";
