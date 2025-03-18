import { Page } from "@playwright/test";
import BasePage from "../../../BaseApp/BasePage";
import logger from "../../../utils/logger";
import { urlPaths } from "../../../../assets/pathUrls";
import AccountDashboardPageElements from "./AccountDashboardPage.elements";

export default class AccountDashboardPageActions extends BasePage {
  elements: AccountDashboardPageElements;

  constructor(page: Page) {
    super(page);
    this.elements = new AccountDashboardPageElements(page);
  }

  async goto(): Promise<void> {
    const accountDashboardPage = urlPaths.paths.ui.expediaAccountDashboardPage().toString();
    await this.page.goto(accountDashboardPage);
    logger.info("User is in the Main Page: " + accountDashboardPage);
  }

  async waitForPageToLoad(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async refresh(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async editBasicInfo(name: string) {
    await this.elements.editBasicInfoButton.click();
    await this.elements.firstNameInput.clear();
    await this.elements.firstNameInput.fill(name);
    await this.elements.saveButton.click();
    logger.info("User has updated the first name: " + name);
  }

  async editContactInfo(phoneNumber: string) {
    await this.elements.editContactInfoButton.click();
    await this.elements.phoneNumberInput.clear();
    await this.elements.phoneNumberInput.fill(phoneNumber);
    await this.elements.saveButton.click();
    logger.info("User has updated the phoneNumber: " + phoneNumber);
  }

  async signOut() {
    await this.elements.userMenuView.click();
    await this.elements.signOutButton.click();
    logger.info("User has signed out");
  }
}
