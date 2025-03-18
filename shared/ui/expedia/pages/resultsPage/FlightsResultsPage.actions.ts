import { expect, Page } from "@playwright/test";
import BasePage from "../../../BaseApp/BasePage";
import FlightsResultsPageElements from "./FlightsResultsPage.elements";
import logger from "../../../utils/logger";
import { waitForPageToFullyLoad } from "../../../utils/commonUtils";

export default class FlightsResultsPageActions extends BasePage {
  elements: FlightsResultsPageElements;

  constructor(page: Page) {
    super(page);
    this.elements = new FlightsResultsPageElements(page);
  }

  async goto(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async waitForPageToLoad(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async refresh(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getFlightsTitles(): Promise<string[]> {
    await expect(this.elements.flightsListContainer).toBeVisible({ timeout: 25000 });
    await waitForPageToFullyLoad(this.page);
    const flightTitles = await this.elements.flightsList.allTextContents();
    return flightTitles;
  }

  async selectDates(checkIn: number, checkOut: number) {
    await this.elements.datesButton.click();
    await FlightsResultsPageElements.pickDateInCurrentMonth(this.page, checkIn).click();
    await (
      checkOut == 1
        ? FlightsResultsPageElements.pickDateInNextMonth(this.page, checkOut)
        : FlightsResultsPageElements.pickDateInCurrentMonth(this.page, checkOut)
    ).click();
    await this.elements.doneButton.click();
    logger.info("User has updated the Flight dates");
  }

  async selectFlight() {
    await expect(this.elements.flightsListContainer).toBeVisible({ timeout: 25000 });
    await this.elements.firstFlight.click();
    await expect(this.elements.selectFlightButton.first()).toBeVisible({ timeout: 5000 });
    await this.elements.selectFlightButton.first().click();
    logger.info("User has selected the first Flight in the list");
  }
}
