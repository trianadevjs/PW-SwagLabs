import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

test.describe(
  "Login",
  {
    tag: ["@login"],
  },
  () => {
    test.describe(
      "Login positive scenarios",
      {
        tag: ["@positive"],
      },
      () => {
        test(
          "AUTH-001.-should redirect to the inventory page with valid credentials",
          {
            tag: ["@smoke"],
          },
          async ({ page }) => {
            const loginPage = new LoginPage(page);
            const inventoryPage = new InventoryPage(page);

            const username = "standard_user";
            const password = "secret_sauce";

            await page.goto("/");
            await loginPage.login(username, password);

            await expect(page).toHaveURL(/\/inventory\.html$/);
            await expect(inventoryPage.productsTitle).toHaveText("Products");
          },
        );

        test("AUTH-011.- should redirect to login page when I logout", async ({
          page,
        }) => {
          const loginPage = new LoginPage(page);
          const inventoryPage = new InventoryPage(page);

          await page.goto("/");

          await loginPage.login();
          await expect(inventoryPage.productsTitle).toBeVisible();
          await inventoryPage.logout();

          await expect(page).toHaveURL("https://www.saucedemo.com/");
          await expect(loginPage.swaglabsTitle).toBeVisible();
          await expect(loginPage.swaglabsTitle).toHaveText("Swag Labs");
        });

        test.describe(
          "AUTH-009.-Login with special users credentials",
          {
            tag: ["@special"],
          },
          () => {
            test('should redirect to the inventory page with "problem_user" username but product images display a wrong picture', async ({
              page,
            }) => {
              const loginPage = new LoginPage(page);
              const inventoryPage = new InventoryPage(page);

              const username = "problem_user";
              const password = "secret_sauce";

              await page.goto("/");
              await loginPage.login(username, password);

              await expect(inventoryPage.productsTitle).toBeVisible();
              await expect(inventoryPage.saucelabsBackPackImage).toBeVisible();
              await expect(
                inventoryPage.saucelabsBackPackImage,
              ).toHaveAttribute("src", "/assets/sl-404-Cq1a9k9X.jpg");
            });

            test('AUTH-010.-should redirect to the inventory page with "performance_glitch_user" username with a delay', async ({
              page,
            }) => {
              const loginPage = new LoginPage(page);
              const inventoryPage = new InventoryPage(page);

              const username = "performance_glitch_user";
              const password = "secret_sauce";

              await page.goto("/");
              await loginPage.login(username, password);

              await expect(page).toHaveURL(/\/inventory\.html$/);
              await expect(inventoryPage.productsTitle).toBeVisible();
              await expect(inventoryPage.productsTitle).toHaveText("Products");
            });
          },
        );
      },
    );

    test.describe(
      "Login negative scenarios",
      {
        tag: ["@negative"],
      },
      () => {
        test("AUTH-002.-should display a required-field error when username is empty", async ({
          page,
        }) => {
          const loginPage = new LoginPage(page);

          const username = "";
          const password = "secret_sauce";

          await page.goto("/");
          await loginPage.login(username, password);
          await expect(loginPage.usernameRequiredMessage).toBeVisible();
        });

        test("AUTH-003.-should display a required-field error when password is empty", async ({
          page,
        }) => {
          const loginPage = new LoginPage(page);

          const username = "standard_user";
          const password = "";

          await page.goto("/");
          await loginPage.login(username, password);
          await expect(loginPage.passwordRequiredMessage).toBeVisible();
        });

        test("AUTH-004.-should display an authentication failed error when username is incorrect", async ({
          page,
        }) => {
          const loginPage = new LoginPage(page);

          const username = "standard_users";
          const password = "secret_sauce";

          await page.goto("/");
          await loginPage.login(username, password);
          await expect(loginPage.invalidCredentialMessage).toBeVisible();
        });

        test("AUTH-005.-should display an authentication failed error when password is incorrect", async ({
          page,
        }) => {
          const loginPage = new LoginPage(page);

          const username = "standard_user";
          const password = "secret_sauces";

          await page.goto("/");
          await loginPage.login(username, password);
          await expect(loginPage.invalidCredentialMessage).toBeVisible();
        });

        test("AUTH-006.-should display an authentication failed error when username and password are incorrect", async ({
          page,
        }) => {
          const loginPage = new LoginPage(page);

          const username = "standard_users";
          const password = "secret_sauces";

          await page.goto("/");
          await loginPage.login(username, password);
          await expect(loginPage.invalidCredentialMessage).toBeVisible();
        });

        test("AUTH-007.-should display an authentication failed error when username has a space", async ({
          page,
        }) => {
          const loginPage = new LoginPage(page);

          const username = "standard_users ";
          const password = "secret_sauce";

          await page.goto("/");
          await loginPage.login(username, password);
          await expect(loginPage.invalidCredentialMessage).toBeVisible();
        });

        test('AUTH-008.-should display a locked error message when username is "locked_out_user"', async ({
          page,
        }) => {
          const loginPage = new LoginPage(page);

          const username = "locked_out_user";
          const password = "secret_sauce";

          await page.goto("/");
          await loginPage.login(username, password);
          await expect(loginPage.lockedOutUserMessage).toBeVisible();
          await expect(loginPage.lockedOutUserMessage).toHaveText(
            "Epic sadface: Sorry, this user has been locked out.",
          );
        });
      },
    );
  },
);
