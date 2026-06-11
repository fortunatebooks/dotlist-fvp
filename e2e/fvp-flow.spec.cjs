/* eslint-disable @typescript-eslint/no-require-imports */

const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/app");
  await page.evaluate(() => {
    window.localStorage.clear();
  });
  await page.reload();
});

test("guides the canonical FVP dotted chain after completing the last dotted task", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Inbox", exact: true }).click();
  const input = page.getByLabel("New task");

  for (const title of ["Email", "In-Tray", "Voicemail", "Tidy Desk", "Back Up"]) {
    await input.fill(title);
    await page.getByRole("button", { name: "Add task" }).click();
  }

  await page.getByRole("button", { name: "Select", exact: true }).first().click();
  await page.locator(".selectionActions").getByRole("button", { name: "Select", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: 'Do you want to do "In-Tray" more than "Email"?' }),
  ).toBeVisible();
  await expect(page.locator(".compareGrid").filter({ hasText: "Email" })).toBeVisible();

  await page.getByRole("button", { name: "Skip" }).click();
  await page.locator(".selectionActions").getByRole("button", { name: "Select", exact: true }).click();
  await expect(page.locator(".compareGrid").filter({ hasText: "Voicemail" })).toBeVisible();

  await page.locator(".selectionActions").getByRole("button", { name: "Select", exact: true }).click();
  await page.getByRole("button", { name: "Chain", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Tidy Desk" })).toBeVisible();

  await page.getByRole("button", { name: "Start Focus" }).click();
  await expect(page.getByRole("heading", { name: "Tidy Desk" })).toBeVisible();
  await page.getByRole("button", { name: "Finished" }).click();
  await page.getByRole("button", { name: "Mark done" }).click();

  await expect(
    page.getByRole("heading", { name: 'Do you want to do "Back Up" more than "Voicemail"?' }),
  ).toBeVisible();
  await expect(page.getByText("Looking below Tidy Desk")).toBeVisible();
  await expect(page.locator(".compareGrid").getByText("Back Up", { exact: true })).toBeVisible();
});

test("put back at the end completes the original and appends a linked copy", async ({ page }) => {
  await page.getByRole("button", { name: "Inbox", exact: true }).click();
  const input = page.getByLabel("New task");

  await input.fill("Draft report");
  await page.getByRole("button", { name: "Add task" }).click();
  await page.getByRole("button", { name: "Select", exact: true }).first().click();
  await page.locator(".selectionActions").getByRole("button", { name: "Select", exact: true }).click();
  await page.getByRole("button", { name: "Start Focus" }).click();
  await page.getByRole("button", { name: "Finish later" }).click();
  await page.getByRole("button", { name: "Put back at the end" }).click();

  await page.getByRole("button", { name: "Inbox", exact: true }).click();
  await expect(page.locator(".taskRow").filter({ hasText: "put back at the end" })).toHaveCount(1);
  await page.getByRole("button", { name: "Review", exact: true }).click();
  await expect(page.locator(".historyRow").filter({ hasText: "put back at the end" })).toBeVisible();
});

test("inbox supports drag reorder and the first selection follows the new order", async ({ page }) => {
  await page.getByRole("button", { name: "Inbox", exact: true }).click();
  const input = page.getByLabel("New task");

  for (const title of ["Email", "In-Tray", "Voicemail"]) {
    await input.fill(title);
    await page.getByRole("button", { name: "Add task" }).click();
  }

  await page.locator(".taskRow").nth(2).dragTo(page.locator(".taskRow").first());

  await page.getByRole("button", { name: "Select", exact: true }).first().click();
  await expect(page.locator(".compareGrid").filter({ hasText: "Voicemail" })).toBeVisible();
});
