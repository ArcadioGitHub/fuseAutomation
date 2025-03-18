import { Locator, Page, expect } from "@playwright/test";

export async function waitForPageLoad(page: Page, locator: Locator): Promise<void> {
  await expect(locator).toBeAttached({ timeout: 10000 });
  await expect(locator).toBeVisible({ timeout: 10000 });
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
}

export async function highlightElement(locator: Locator) {
  const element = locator;
  const isVisible = await element.isVisible();
  if (isVisible) {
    await element.first().evaluate((node: HTMLElement) => {
      node.style.outline = "2px solid red";
    });
  }
}

export async function waitForPageToFullyLoad(page: Page) {
  await page.waitForTimeout(4000);
  await page.waitForLoadState("domcontentloaded");
  page.waitForLoadState("load");
}

export async function getTodayDate(): Promise<number> {
  const today = new Date();
  return today.getDate();
}

export async function getTomorrowDate(): Promise<number> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.getDate();
}

export async function isArraySortedLowToHigh(arr: string[]): Promise<boolean> {
  for (let i = 0; i < arr.length - 1; i++) {
    if (parseInt(arr[i]) > parseInt(arr[i + 1])) {
      return false;
    }
  }
  return true;
}

export async function getRandomUSCity(): Promise<string> {
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Miami",
    "San Francisco",
    "Las Vegas",
    "Orlando",
    "Seattle",
    "Boston",
    "San Diego",
    "Denver",
    "Atlanta",
    "Dallas",
    "Phoenix",
    "Philadelphia",
    "Honolulu",
    "New Orleans",
    "Nashville",
  ];

  return cities[Math.floor(Math.random() * cities.length)];
}

export async function switchToTab(page: Page): Promise<Page> {
  const context = page.context();
  const newTab = await context.waitForEvent("page");
  await newTab.waitForLoadState();
  await newTab.bringToFront();
  return newTab;
}

export function getRandomSixDigitString(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getRandomTenDigitString(): string {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}
