import { BasePage } from "./base.page";
import { Page, Locator, expect } from "@playwright/test";

export class CartPage extends BasePage {
  readonly _yourCartTitle: Locator;
  private readonly _checkoutButton: Locator;

  readonly expect: CartPageAssertions;

  getPageUrl(): string {
    return "/cart.html";
  }

  constructor(page: Page) {
    super(page);
    this.expect = new CartPageAssertions(this);
    this._yourCartTitle = this.page.getByText("Your Cart");
    this._checkoutButton = this.page.getByRole("button", { name: "Checkout" });
  }

  async checkout(): Promise<void> {
    await this._checkoutButton.click();
  }
}

class CartPageAssertions {
  constructor(readonly cartPage: CartPage) {}

  async toBeOnYourCartPage(): Promise<void> {
    await expect(this.cartPage._yourCartTitle).toBeVisible();
  }
}
