import { Page, Locator } from "@playwright/test";
import BaseElements from "../../../BaseApp/BaseElements";

export default class MainPageElements extends BaseElements {
  closeCookiesButton = this.page.locator('div[id="onetrust-close-btn-container"]');
  whereToButton = this.page.locator('button[aria-label="Where to?"]');
  cityInput = this.page.locator('//div[@id="search-location-input-field"]//child::input');
  searchButton = this.page.locator("#search_button");
  leavingFromButton = this.page.locator('button[aria-label="Leaving from"]');
  goingToButton = this.page.locator('button[aria-label="Going to"]');

  static citiesList(page: Page, city: string): Locator {
    return page.locator(`//ul[@role="list"]//child::button[contains(@aria-label,'${city}')]`);
  }

  static goToMainTabByText(page: Page, tab: string): Locator {
    return page.locator(
      `//div[@class="uitk-tabs-container"]//child::li//child::span[text()='${tab}']`
    );
  }

  static selectFlightType(page: Page, flightType: string): Locator {
    return page.locator(`//span[text()='${flightType}']/..`);
  }
}
