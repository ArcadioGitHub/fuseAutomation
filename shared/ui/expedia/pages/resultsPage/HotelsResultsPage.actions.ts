import { Page } from "@playwright/test";
import BasePage from "../../../BaseApp/BasePage";
import { waitForPageLoad, waitForPageToFullyLoad } from "../../../utils/commonUtils";
import logger from "../../../utils/logger";
import HotelsResultsPageElements from "./HotelsResultsPage.elements";

export default class HotelsResultsPageActions extends BasePage {
  elements: HotelsResultsPageElements;

  constructor(page: Page) {
    super(page);
    this.elements = new HotelsResultsPageElements(page);
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

  async getHotelsTitles(): Promise<string[]> {
    await waitForPageLoad(this.page, this.elements.messageCard);
    await waitForPageToFullyLoad(this.page);
    const hotelTitles = await this.elements.hotelsList.allTextContents();
    return hotelTitles;
  }

  async selectDates(checkIn: number, checkOut: number) {
    await this.elements.datesButton.click();
    await HotelsResultsPageElements.pickDateInCurrentMonth(this.page, checkIn).click();
    await (
      checkOut == 1
        ? HotelsResultsPageElements.pickDateInNextMonth(this.page, checkOut)
        : HotelsResultsPageElements.pickDateInCurrentMonth(this.page, checkOut)
    ).click();
    await this.elements.doneButton.click();
    logger.info("User has selected the checkIn and checkOut dates");
  }

  async selectGuestRating(rating: string) {
    await HotelsResultsPageElements.selectGuestRating(this.page, rating).click();
    logger.info("User has selected Guest Rating: " + rating);
  }

  async selectStarsRating(rating: string) {
    await HotelsResultsPageElements.selectStarsRating(this.page, rating).click();
    logger.info("User has selected Stars Rating: " + rating);
  }

  async applyPriceRange(min: string, max: string) {
    await this.elements.minPriceInput.click();
    await this.elements.minPriceInput.fill(min);
    await this.elements.maxPriceInput.click();
    await this.elements.maxPriceInput.fill(max);
    await this.page.keyboard.press("Enter");
    logger.info("User has put a new price range");
  }

  async sortBy(value: string) {
    await this.elements.sortBySelect.selectOption(value);
    logger.info("User has sorted by: " + value);
  }

  async getHotelsPrices(): Promise<string[]> {
    await waitForPageLoad(this.page, this.elements.messageCard);
    await waitForPageToFullyLoad(this.page);
    const hotelPrices = await this.elements.hotelPrices.allTextContents();
    return hotelPrices;
  }
}
