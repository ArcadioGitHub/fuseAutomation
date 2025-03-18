import { Page, Locator } from "@playwright/test";
import BaseElements from "../../../BaseApp/BaseElements";

export default class HotelsResultsPageElements extends BaseElements {
  hotelsList = this.page.locator(
    '//div[@data-stid="lodging-card-responsive"]//child::h3[contains(@class,"uitk-layout-grid-item")]'
  );
  messageCard = this.page.locator('div[data-stid="one-key-message-card"]');
  datesButton = this.page.locator('button[data-testid="uitk-date-selector-input1-default"]');
  doneButton = this.page.locator('button[data-stid="apply-date-selector"]');
  todayDate = this.page.locator('div[aria-label="Today"]');
  minPriceInput = this.page.locator("#price-min");
  maxPriceInput = this.page.locator("#price-max");
  sortBySelect = this.page.locator("#sort-filter-dropdown-sort");
  hotelPrices = this.page.locator(
    '//div[@data-stid="lodging-card-responsive"]//child::div[contains(@class,"uitk-text-emphasis-theme")]'
  );

  static pickDateInCurrentMonth(page: Page, date: number): Locator {
    return page.locator(
      `(//div[contains(@class,'uitk-day-selectable')]//child::div[text()="${date}"])[1]`
    );
  }

  static pickDateInNextMonth(page: Page, date: number): Locator {
    return page.locator(
      `(//div[contains(@class,'uitk-day-selectable')]//child::div[text()="${date}"])[2]`
    );
  }

  static selectStarsRating(page: Page, rating: string): Locator {
    return page.locator(`//input[@type="checkbox" and @value="${rating}"]`);
  }

  static selectGuestRating(page: Page, rating: string): Locator {
    return page.locator(
      `//span[contains(text(),"${rating}") and @class="uitk-radio-button-label-content"]`
    );
  }

  static locateFilterByText(page: Page, filter: string): Locator {
    return page.locator(`//div[@role="group"]//span[contains(text(),"${filter}")]`);
  }
}
