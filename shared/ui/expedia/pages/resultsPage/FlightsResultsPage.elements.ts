import { Page, Locator } from "@playwright/test";
import BaseElements from "../../../BaseApp/BaseElements";

export default class FlightsResultsPageElements extends BaseElements {
  flightsListContainer = this.page.locator('ul[data-test-id="listings"]');
  flightsList = this.page.locator('div[data-stid="secondary-section"]');
  datesButton = this.page.locator('button[data-name="startDate"]');
  doneButton = this.page.locator('button[data-stid="apply-date-picker"]');
  selectFlightButton = this.page.locator('button[stid="select-button"]');
  firstFlight = this.page.locator('(//button[@data-test-id="select-link"])[1]');
  priceSummaryBooking = 'div[data-test-id="price-summary"]';
  flightSummaryBooking = 'div[data-test-id="journey-summary"]';

  static pickDateInCurrentMonth(page: Page, date: number): Locator {
    return page.locator(
      `(//td[contains(@class,'uitk-date-picker-day-number')]//child::button[@data-day="${date}"])[1]`
    );
  }

  static pickDateInNextMonth(page: Page, date: number): Locator {
    return page.locator(
      `(//td[contains(@class,'uitk-date-picker-day-number')]//child::button[@data-day="${date}"])[1]`
    );
  }
}
