import { BasePage } from "./base.page";
import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage extends BasePage {
  readonly _openMenuButton: Locator;
  readonly _closeMenuButton: Locator;
  readonly _inventoryListContainer: Locator;
  readonly _logoutButton: Locator;
  private readonly _inventoryItemDescription: Locator;
  private readonly _addToCartButton: Locator;
  private readonly _removeButton: Locator;
  readonly _shoppingCartLink: Locator;
  readonly expect: InventoryPageAssertions;

  getPageUrl(): string {
    return "/inventory.html";
  }

  constructor(page: Page) {
    super(page);
    this.expect = new InventoryPageAssertions(this);
    this._openMenuButton = this.page.getByRole("button", { name: "Open Menu" });
    this._closeMenuButton = this.page.getByRole("button", {
      name: "Close Menu",
    });
    this._inventoryListContainer = this.page.locator(
      "#inventory_container.inventory_container"
    );
    this._logoutButton = this.page.getByRole("link", { name: "Logout" });
    this._inventoryItemDescription = this.page.locator(
      "div.inventory_item_description"
    );
    this._addToCartButton = this.page.getByRole("button", {
      name: "Add to cart",
    });
    this._removeButton = this.page.getByRole("button", {
      name: "Remove",
    });
    this._shoppingCartLink = this.page.locator("a.shopping_cart_link");
  }

  async logout(): Promise<void> {
    const logoutBtnVisible = await this._logoutButton.isVisible();
    if (logoutBtnVisible) {
      await this._logoutButton.click();
    } else {
      await this._openMenuButton.click();
      await this._logoutButton.click();
    }
  }

  async addToCartByItem(name: string): Promise<void> {
    await this._inventoryItemDescription
      .filter({ hasText: name })
      .locator(this._addToCartButton)
      .click();
  }

  async removeFromCartByItem(name: string): Promise<void> {
    await this._inventoryItemDescription
      .filter({ hasText: name })
      .locator(this._removeButton)
      .click();
  }

  async openShippingCart(): Promise<void> {
    await this._shoppingCartLink.click();
  }
}

class InventoryPageAssertions {
  constructor(readonly inventoryPage: InventoryPage) {}

  async toHaveInventoryList(): Promise<void> {
    await expect(this.inventoryPage._inventoryListContainer).toBeVisible();
  }

  async toHaveItemsInShoppingCart(items: number): Promise<void> {
    const itemsText: string = items === 0 ? "" : items.toString();
    await expect(this.inventoryPage._shoppingCartLink).toHaveText(itemsText);
  }
}
