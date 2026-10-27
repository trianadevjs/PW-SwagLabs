import { Locator, Page } from "@playwright/test";

export class LoginPage {
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginInput: Locator;
  readonly swaglabsTitle: Locator;
  readonly usernameRequiredMessage: Locator;
  readonly passwordRequiredMessage: Locator;
  readonly invalidCredentialMessage: Locator;
  readonly lockedOutUserMessage: Locator;

  constructor(page: Page) {
    this.userNameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginInput = page.getByRole("button", { name: "Login" });
    this.swaglabsTitle = page.getByText("Swag Labs", { exact: true });
    this.usernameRequiredMessage = page.getByText(
      "Epic sadface: Username is required",
      { exact: true },
    );
    this.passwordRequiredMessage = page.getByText(
      "Epic sadface: Password is required",
      { exact: true },
    );
    this.invalidCredentialMessage = page.getByText(
      "Epic sadface: Username and password do not match any user in this service",
      { exact: true },
    );
    this.lockedOutUserMessage = page.getByText(
      "Epic sadface: Sorry, this user has been locked out.",
      { exact: true },
    );
  }

  async login(
    username: string = "standard_user",
    password: string = "secret_sauce",
  ) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginInput.click();
  }
}
