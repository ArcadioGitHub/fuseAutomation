import BaseElements from "../../../BaseApp/BaseElements";

export default class AccountDashboardPageElements extends BaseElements {
  editBasicInfoButton = this.page.locator('button[aria-label="Edit basic information"]');
  editContactInfoButton = this.page.locator('button[aria-label="Edit contact information"]');
  firstNameInput = this.page.locator("#profile-first-name");
  saveButton = this.page.locator('button[type="submit"]');
  phoneNumberInput = this.page.locator("#universal-profile-field-phone-number");
  userMenuView = this.page.locator('div[data-testid="memberprofile-mediumview"]');
  signOutButton = this.page.locator('a[aria-label="Sign out"]');
}
