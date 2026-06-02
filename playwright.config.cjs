/* eslint-disable @typescript-eslint/no-require-imports */

const { defineConfig, devices } = require(
  `${process.env.PLAYWRIGHT_SHARED_ROOT || "/Users/davidellis/.local/share/coding-agents/playwright"}/node_modules/playwright/test`,
);

module.exports = defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
