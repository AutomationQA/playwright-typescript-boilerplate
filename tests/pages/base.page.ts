import { Page } from "@playwright/test";

export abstract class BasePage {
  constructor(readonly page: Page) {}

  abstract getPageUrl(): string;

  async navigateTo(path?: string): Promise<void> {
    if (path) {
      await this.page.goto(path);
    } else {
      await this.page.goto(this.getPageUrl());
    }
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
