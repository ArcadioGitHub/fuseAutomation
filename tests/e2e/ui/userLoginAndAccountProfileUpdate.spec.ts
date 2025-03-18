import LoginPageActions from "../../../shared/ui/expedia/pages/loginPage/LoginPage.actions";
import test, { expect } from "@playwright/test";
import LoginPageElements from "../../../shared/ui/expedia/pages/loginPage/LoginPage.elements";
import AccountDashboardPageActions from "../../../shared/ui/expedia/pages/accountDashboardPage/AccountDashboardPage.actions";
import {
  getRandomSixDigitString,
  getRandomTenDigitString,
} from "../../../shared/ui/utils/commonUtils";

/**
 * Test Case: User Story 3 - User Login and Account Profile Update
 * 
 * This test verifies that a user can log in, update their profile details, and sign out successfully.
 * 
 * Steps:
 * 1. Navigate to the login page and perform login.
 * 2. Verify successful login by checking the redirected URL.
 * 3. Navigate to the account dashboard.
 * 4. Update the user's basic information (name) and verify the update.
 * 5. Update the user's contact information (phone number) and verify the update.
 * 6. Sign out of the account and confirm successful logout.
 * 
 * Assertions:
 * - Ensure the user is redirected to the correct URL after login.
 * - Verify that the basic information (name) update reflects correctly on the UI.
 * - Verify that the contact information (phone number) update reflects correctly on the UI.
 * - Confirm that signing out redirects the user to the expected logout page.
 * 
 * @param {object} page - The Playwright page instance.
 * @throws {AssertionError} If any expected update, redirection, or logout behavior does not occur.
 */
test("User Story 3: User Login and Account Profile Update - @userAccount", async ({ page }) => {
  const loginPageAction = new LoginPageActions(page);
  const accountDashboardPageAction = new AccountDashboardPageActions(page);
  //Do Login
  await loginPageAction.goto();
  await loginPageAction.doLogin();
  expect(page.url()).toContain(`/?logout=1`);

  //Go to account dashboard page
  await accountDashboardPageAction.goto();
  expect(page.url()).toContain(`/account`);

  //Update basic info details
  const newName = "ArcadioFuse_".concat(getRandomSixDigitString());
  await accountDashboardPageAction.editBasicInfo(newName);
  //verify basic data was succesfully updated
  expect(page.getByText(`Hi, ${newName}`)).toBeVisible();
  expect(page.getByText(`${newName} Challenge`).nth(0)).toBeVisible();
  expect(page.getByText(`${newName} Challenge`).nth(1)).toBeVisible();

  //Update contact info details
  const newPhone = getRandomTenDigitString();
  await accountDashboardPageAction.editContactInfo(newPhone);
  //verify contact data was succesfully updated
  expect(page.getByText(`+1${newPhone}`)).toBeVisible();

  //Signing OUT
  await accountDashboardPageAction.signOut();
  //Verify sign out
  expect(page.url()).toContain(`/?logout=1`);
});

/**
 * Test Case: User Story 3 - User Login and Account Profile with Wrong Credentials
 * 
 * This test verifies that an error message is displayed when a user attempts to log in with incorrect credentials.
 * 
 * Steps:
 * 1. Navigate to the login page.
 * 2. Attempt to log in using a valid username but an incorrect password.
 * 3. Verify that the appropriate error message is displayed.
 * 
 * Assertions:
 * - Ensure the login attempt fails when incorrect credentials are provided.
 * - Verify that the expected error message is visible on the login page.
 * 
 * @param {object} page - The Playwright page instance.
 * @throws {AssertionError} If the error message is not displayed as expected.
 */
test("User Story 3: User Login and Account Profile with Wrong Credentials - @userAccount", async ({
  page,
}) => {
  const loginPageAction = new LoginPageActions(page);
  const loginPageElements = new LoginPageElements(page);
  //Do Login
  await loginPageAction.goto();
  await loginPageAction.doLogin(process.env.EXPEDIA_USER, "wrongPassword");
  expect(loginPageElements.wrongCredentialsMessage).toBeVisible();
});

/**
 * Test case for User Story 3: User Login and Account Profile with an empty email address.
 *
 * This test checks the behavior when a user tries to log in without entering an email address.
 * It expects the page to display an error message prompting the user to enter an email.
 *
 * @param page The Playwright Page object representing the current page in the browser.
 */
test("User Story 3: User Login and Account Profile with Empty email - @userAccount", async ({
  page,
}) => {
  const loginPageAction = new LoginPageActions(page);
  const loginPageElements = new LoginPageElements(page);
  //Do Login
  await loginPageAction.goto();
  await loginPageElements.signInButton.click();
  await loginPageElements.emailInput.click();
  await loginPageElements.emailInput.fill("");
  await loginPageElements.continueButton.click();
  await expect(page.getByText("Please enter your email address.")).toBeAttached();
});
