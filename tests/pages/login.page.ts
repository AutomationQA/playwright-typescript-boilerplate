import { BasePage } from "./base.page";
import { Page, Locator, expect } from "@playwright/test";

export class LoginPage extends BasePage {
  private readonly _usernameInputLocator: Locator;
  private readonly _passwordInputLocator: Locator;
  readonly _loginButtonLocator: Locator;
  readonly expect: LoginPageAssertions;

  getPageUrl(): string {
    return "/";
  }

  constructor(page: Page) {
    super(page);
    this.expect = new LoginPageAssertions(this);
    this._usernameInputLocator = this.page.locator("[data-test='username']");
    this._passwordInputLocator = this.page.locator("[data-test='password']");
    this._loginButtonLocator = this.page.locator("[data-test='login-button']");
  }

  async submitForm(): Promise<void> {
    await this._loginButtonLocator.click();
  }

  async setUserName(data: string): Promise<void> {
    await this._usernameInputLocator.fill(data);
  }

  async setUserPassword(data: string): Promise<void> {
    await this._passwordInputLocator.fill(data);
  }
}

class LoginPageAssertions {
  constructor(readonly page: LoginPage) {}

  async toHaveLoginButton(): Promise<void> {
    await expect(this.page._loginButtonLocator).toBeVisible();
  }
}
