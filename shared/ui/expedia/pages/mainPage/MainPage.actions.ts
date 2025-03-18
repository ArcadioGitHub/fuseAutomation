import { Page } from "@playwright/test";
import MainPageElements from "./MainPage.elements";
import BasePage from "../../../BaseApp/BasePage";
import { urlPaths } from "../../../../assets/pathUrls";
import { waitForPageLoad } from "../../../utils/commonUtils";
import logger from "../../../utils/logger";

export default class MainPageActions extends BasePage {
  elements: MainPageElements;

  constructor(page: Page) {
    super(page);
    this.elements = new MainPageElements(page);
  }

  async goto(): Promise<void> {
    const mainPage = urlPaths.paths.ui.expediaMainPage().toString();
    await this.page.goto(mainPage);
    logger.info("User is in the Main Page: " + mainPage);
    await waitForPageLoad(this.page, this.elements.closeCookiesButton);
  }

  async waitForPageToLoad(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async refresh(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async goToMainTabByText(tab: string) {
    await MainPageElements.goToMainTabByText(this.page, tab).click();
    logger.info("User has gone to tab: " + tab);
  }

  async searchHotel(city: string) {
    await this.elements.closeCookiesButton.click();
    await this.elements.whereToButton.click();
    await this.elements.cityInput.fill(city);
    await MainPageElements.citiesList(this.page, city).first().click();
    await this.elements.searchButton.click();
    logger.info("User has made a search for City: " + city);
  }

  async selectFlightType(flightType: string) {
    await waitForPageLoad(this.page, MainPageElements.selectFlightType(this.page, flightType));
    await MainPageElements.selectFlightType(this.page, flightType).click();
    logger.info("User has selected Flight type: " + flightType);
  }

  async searchFlight(cityFrom: string, cityTo: string) {
    await this.elements.leavingFromButton.click();
    await this.elements.cityInput.fill(cityFrom);
    await MainPageElements.citiesList(this.page, cityFrom).first().click();
    await this.elements.goingToButton.click();
    await this.elements.cityInput.fill(cityTo);
    await MainPageElements.citiesList(this.page, cityTo).first().click();
    await this.elements.searchButton.click();
    logger.info("User has searched for a flight");
  }
}
