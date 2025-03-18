import { Page } from "@playwright/test";
import BasePage from "../../../BaseApp/BasePage";
import LoginPageElements from "./LoginPage.elements";
import logger from "../../../utils/logger";
import { urlPaths } from "../../../../assets/pathUrls";
import { waitForPageToFullyLoad } from "../../../utils/commonUtils";

export default class LoginPageActions extends BasePage {
  elements: LoginPageElements;

  constructor(page: Page) {
    super(page);
    this.elements = new LoginPageElements(page);
  }

  async goto(): Promise<void> {
    const mainPage = urlPaths.paths.ui.expediaMainPage().toString();
    await this.page.goto(mainPage);
    logger.info("User is in the Main Page: " + mainPage);
  }

  async waitForPageToLoad(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async refresh(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async doLogin(userName?: string, password?: string) {
    userName ??= process.env.EXPEDIA_USER;
    password ??= process.env.EXPEDIA_PASS;
    if (userName == null)
      throw new Error("Login user required. Should be set by parameters or env var EXPEDIA_USER");
    if (password == null)
      throw new Error("Login user required. Should be set by parameters or env var EXPEDIA_PASS");
    await this.elements.signInButton.click();
    await waitForPageToFullyLoad(this.page);
    await this.elements.emailInput.fill(userName);
    await this.elements.continueButton.click();
    await this.elements.enterPasswordButton.click();
    await this.elements.passwordInput.fill(password);
    await waitForPageToFullyLoad(this.page);
    await this.elements.loginButton.click();
    logger.info("User is logged in the APP");
  }
}
