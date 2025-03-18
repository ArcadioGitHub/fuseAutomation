import BaseElements from "../../../BaseApp/BaseElements";

export default class LoginPageElements extends BaseElements {
  signInButton = this.page.locator('//a[text()="Sign in"]');
  emailInput = this.page.locator("#loginFormEmailInput");
  continueButton = this.page.locator("#loginFormSubmitButton");
  enterPasswordButton = this.page.locator("#passwordButton");
  passwordInput = this.page.locator("#enterPasswordFormPasswordInput");
  loginButton = this.page.locator("#enterPasswordFormSubmitButton");
  wrongCredentialsMessage = this.page.getByText("Email and password don't match. Try again.");
}
