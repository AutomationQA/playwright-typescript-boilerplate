import { test as setup, expect } from "@playwright/test";
import * as fs from "fs";
import { Logger, Config } from "../../utls";
import path from "path";

// for setup purposes only, so test flow is "hardcoded"
const storageState = ".auth/ui.login.setup.storageState.json";
const logger = new Logger({ logName: path.basename(__filename) });
const config = new Config();
setup("ui login flow", async ({ page }) => {
  const stats = fs.existsSync(storageState!.toString())
    ? fs.statSync(storageState!.toString())
    : null;
  if (
    stats &&
    stats.mtimeMs > new Date().getTime() - config.userSessionTimeoutMs
  ) {
    logger.info("User session login skipped since the token is NOT expired.");
    return;
  }
  logger.info("User session login started.");
  await page.goto("/");
  await page.locator("[data-test='username']").fill(config.setupUsername);
  await page.locator("[data-test='password']").fill(config.setupUserPassword);
  await page.locator("[data-test='login-button']").click();
  await expect(page.getByRole("button", { name: "Open Menu" })).toBeVisible();
  await page.context().storageState({ path: storageState });
});
