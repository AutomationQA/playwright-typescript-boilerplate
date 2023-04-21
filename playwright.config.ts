import { defineConfig, devices, expect } from "@playwright/test";
import { Config } from "./utls";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
const config = new Config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  // Glob patterns or regular expressions that match test files.
  // testMatch: '**/*.spec.ts',
  // Each test is given 30 seconds.
  timeout: config.testTimeoutMs,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://www.saucedemo.com",

    // Capture screenshot after each test failure.
    screenshot: "only-on-failure",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    // // browser type options
    // launchOptions: {
    //   slowMo: 100,
    // },
  },

  /* Configuration for the expect assertion library. */
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: config.expectTimeoutMs,

    // toHaveScreenshot: {
    //   // An acceptable amount of pixels that could be different, unset by default.
    //   maxDiffPixels: 10,
    // },

    // toMatchSnapshot:  {
    //   // An acceptable ratio of pixels that are different to the total amount of pixels, between 0 and 1.
    //   maxDiffPixelRatio: 10,
    // },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "ui.login.setup",
      testMatch: "**/ui.login.setup.ts",
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/ui.login.setup.storageState.json",
      },
      dependencies: ["ui.login.setup"],
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => "passed",
        pass: true,
      };
    } else {
      return {
        message: () => "failed",
        pass: false,
      };
    }
  },
});
