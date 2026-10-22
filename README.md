# SauceDemo UI Automation — Playwright

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Testing](https://img.shields.io/badge/Testing-UI%20Automation-blue)

## Project Overview

This project focuses on automating end-to-end (E2E) and functional UI tests for [SauceDemo](https://www.saucedemo.com/), a sample e-commerce application provided by Sauce Labs.

The main goal is to build a maintainable and scalable test automation suite using **Playwright with TypeScript**, following established QA automation practices.

The test suite covers authentication, product inventory, sorting, shopping cart operations, checkout validation, purchase completion, and user-specific behaviors.

This project also serves as a practical demonstration of test design, automation architecture, reusable components, and automated regression testing.

## Objectives

- Automate critical user journeys and business flows.
- Validate positive and negative scenarios.
- Apply the Page Object Model (POM) design pattern.
- Use reliable locators and explicit assertions.
- Organize test cases by functionality.
- Validate UI elements, product information, images, and calculations.
- Support independent test execution and debugging.
- Generate automated test reports and failure artifacts.
- Explore data-driven testing and special user behaviors.

## Tech Stack

| Technology        | Purpose                                          |
| ----------------- | ------------------------------------------------ |
| Playwright        | Browser automation and UI testing                |
| TypeScript        | Test implementation                              |
| Node.js           | JavaScript runtime                               |
| Playwright Test   | Test runner, assertions, fixtures, and reporting |
| Page Object Model | Separation of page interactions and test logic   |
| Git & GitHub      | Version control and project collaboration        |

## Application Under Test

**Website:** https://www.saucedemo.com/

The application simulates an online shopping experience with authentication, product browsing, shopping cart management, and checkout functionality.

### Test Credentials

The following accounts are provided by the application for testing.

| Username                  | Purpose                                       |
| ------------------------- | --------------------------------------------- |
| `standard_user`           | Standard application behavior                 |
| `locked_out_user`         | Authentication failure due to account lockout |
| `problem_user`            | UI and functionality issue scenarios          |
| `performance_glitch_user` | Delayed application responses                 |
| `error_user`              | Error-related application behaviors           |
| `visual_user`             | Visual inconsistency scenarios                |

**Password:** `secret_sauce`

These are public demonstration credentials, not production credentials.

## Test Strategy

Test cases are grouped by functionality and assigned a priority based on their business impact.

| Priority | Description                                                       |
| -------- | ----------------------------------------------------------------- |
| Critical | Essential business flows whose failure blocks a core user journey |
| High     | Important functionality and validation scenarios                  |
| Medium   | Secondary functionality and edge cases                            |
| Low      | Additional visual or non-critical behavior checks                 |

### Test Suites

- **Smoke:** A small set of tests validating that the main application flows work.
- **Regression:** A broader collection of functional tests executed after changes.
- **Negative Testing:** Invalid input, missing data, and rejected operations.
- **E2E:** Complete user journeys across multiple application pages.
- **Visual Testing:** UI appearance and screenshot comparisons.

---

## Test Cases

The following test cases define the initial automation backlog. They represent planned coverage, not a claim that all tests have already been implemented.

### 1. Authentication — `login.spec.ts`

| ID       | Test Case                                                | Expected Result                                | Priority |
| -------- | -------------------------------------------------------- | ---------------------------------------------- | -------- |
| AUTH-001 | Login with valid credentials                             | User is redirected to the inventory page       | Critical |
| AUTH-002 | Login with an empty username                             | Required-field error is displayed              | High     |
| AUTH-003 | Login with an empty password                             | Required-field error is displayed              | High     |
| AUTH-004 | Login with both fields empty                             | Required-field error is displayed              | High     |
| AUTH-005 | Login with an invalid username                           | Authentication error is displayed              | High     |
| AUTH-006 | Login with an invalid password                           | Authentication error is displayed              | High     |
| AUTH-007 | Login with `locked_out_user`                             | Account-locked error is displayed              | High     |
| AUTH-008 | Login with leading or trailing whitespace in credentials | Authentication behavior is handled as expected | Medium   |
| AUTH-009 | Logout successfully                                      | User returns to the login page                 | High     |
| AUTH-010 | Attempt to access inventory after logout                 | Protected page access is prevented             | High     |

### 2. Inventory — `inventory.spec.ts`

| ID      | Test Case                          | Expected Result                                         | Priority |
| ------- | ---------------------------------- | ------------------------------------------------------- | -------- |
| INV-001 | Verify inventory page is displayed | Inventory page and Products title are visible           | Critical |
| INV-002 | Verify the number of products      | Six products are displayed                              | High     |
| INV-003 | Verify product names               | Every product displays its expected name                | High     |
| INV-004 | Verify product prices              | Every product displays a valid price                    | High     |
| INV-005 | Verify product images              | All product images load successfully                    | High     |
| INV-006 | Add one product to the cart        | Cart badge displays `1`                                 | Critical |
| INV-007 | Add multiple products to the cart  | Cart badge matches the number of selected products      | High     |
| INV-008 | Remove a product from inventory    | Product is removed from the cart                        | High     |
| INV-009 | Verify product descriptions        | Each product displays a description                     | Medium   |
| INV-010 | Verify product action button state | Button label changes after adding or removing a product | Medium   |

### 3. Product Sorting — `sorting.spec.ts`

| ID       | Test Case                          | Expected Result                               | Priority |
| -------- | ---------------------------------- | --------------------------------------------- | -------- |
| SORT-001 | Sort products by name A–Z          | Names appear in ascending alphabetical order  | Medium   |
| SORT-002 | Sort products by name Z–A          | Names appear in descending alphabetical order | Medium   |
| SORT-003 | Sort products by price low to high | Prices appear in ascending order              | High     |
| SORT-004 | Sort products by price high to low | Prices appear in descending order             | High     |

### 4. Product Details — `product-details.spec.ts`

| ID       | Test Case                             | Expected Result                          | Priority |
| -------- | ------------------------------------- | ---------------------------------------- | -------- |
| PROD-001 | Open a product detail page            | Correct product detail page is displayed | Medium   |
| PROD-002 | Verify product name                   | Name matches the selected inventory item | Medium   |
| PROD-003 | Verify product price and description  | Information matches the inventory item   | Medium   |
| PROD-004 | Verify product image                  | Image is visible and loaded successfully | Medium   |
| PROD-005 | Add a product from its detail page    | Cart badge is updated correctly          | High     |
| PROD-006 | Remove a product from its detail page | Product is removed from the cart         | Medium   |
| PROD-007 | Return to inventory                   | Inventory page is displayed              | Medium   |

### 5. Shopping Cart — `cart.spec.ts`

| ID       | Test Case                       | Expected Result                            | Priority |
| -------- | ------------------------------- | ------------------------------------------ | -------- |
| CART-001 | Open an empty cart              | Cart page is displayed without products    | Medium   |
| CART-002 | Verify an added product         | Correct product appears in the cart        | Critical |
| CART-003 | Verify product name and price   | Values match the inventory selection       | High     |
| CART-004 | Add multiple products           | All selected products appear in the cart   | High     |
| CART-005 | Remove a product from the cart  | Selected product disappears                | High     |
| CART-006 | Remove all products             | Cart contains no products                  | Medium   |
| CART-007 | Continue shopping               | User returns to inventory                  | Medium   |
| CART-008 | Verify cart badge after removal | Badge reflects the remaining cart contents | High     |

### 6. Checkout Information — `checkout-information.spec.ts`

| ID      | Test Case                                | Expected Result                        | Priority |
| ------- | ---------------------------------------- | -------------------------------------- | -------- |
| CHK-001 | Start checkout with a product            | Checkout information page is displayed | Critical |
| CHK-002 | Continue with valid customer information | User advances to checkout overview     | Critical |
| CHK-003 | Submit with an empty first name          | Required-field error is displayed      | High     |
| CHK-004 | Submit with an empty last name           | Required-field error is displayed      | High     |
| CHK-005 | Submit with an empty postal code         | Required-field error is displayed      | High     |
| CHK-006 | Submit with all fields empty             | Required-field error is displayed      | High     |
| CHK-007 | Cancel checkout                          | User returns to inventory              | Medium   |

### 7. Checkout Overview — `checkout-overview.spec.ts`

| ID      | Test Case                            | Expected Result                            | Priority |
| ------- | ------------------------------------ | ------------------------------------------ | -------- |
| CHK-008 | Verify selected products in overview | All selected products are displayed        | High     |
| CHK-009 | Verify item subtotal                 | Subtotal matches the sum of product prices | Critical |
| CHK-010 | Verify tax calculation               | Tax matches the application's calculation  | High     |
| CHK-011 | Verify final total                   | Total equals subtotal plus tax             | Critical |
| CHK-012 | Cancel checkout from overview        | User returns to inventory                  | Medium   |

### 8. End-to-End Purchase — `purchase.spec.ts`

| ID      | Test Case                                     | Expected Result                                 | Priority |
| ------- | --------------------------------------------- | ----------------------------------------------- | -------- |
| E2E-001 | Complete a purchase with one product          | Purchase confirmation is displayed              | Critical |
| E2E-002 | Complete a purchase with multiple products    | All selected products are included in the order | Critical |
| E2E-003 | Verify the order confirmation message         | Successful order confirmation is visible        | Critical |
| E2E-004 | Return to inventory after purchase            | Inventory page is displayed                     | Medium   |
| E2E-005 | Verify cart state after completing a purchase | Cart badge is cleared                           | High     |

### 9. Special User Behavior

| ID       | Test Case                                       | Expected Result                                         | Priority |
| -------- | ----------------------------------------------- | ------------------------------------------------------- | -------- |
| USER-001 | Login with `problem_user`                       | Login succeeds and the inventory page is displayed      | Medium   |
| USER-002 | Validate product behavior with `problem_user`   | Known product UI or interaction issues are detected     | Medium   |
| USER-003 | Login with `performance_glitch_user`            | Login eventually succeeds within an appropriate timeout | Medium   |
| USER-004 | Validate product interactions with `error_user` | Unexpected behavior is identified and documented        | Medium   |
| USER-005 | Validate inventory visuals with `visual_user`   | Relevant visual inconsistencies are detected            | Medium   |

Special-user tests should validate documented or observed behavior rather than assume that every user must behave exactly like `standard_user`.

### 10. Visual and UI Validation

| ID      | Test Case                         | Expected Result                             | Priority |
| ------- | --------------------------------- | ------------------------------------------- | -------- |
| VIS-001 | Capture login page screenshot     | Screenshot matches the approved baseline    | Low      |
| VIS-002 | Capture inventory page screenshot | Screenshot matches the approved baseline    | Low      |
| VIS-003 | Capture shopping cart screenshot  | Screenshot matches the approved baseline    | Low      |
| VIS-004 | Capture checkout screenshot       | Screenshot matches the approved baseline    | Low      |
| VIS-005 | Validate product image rendering  | Images load without broken-image indicators | High     |

Visual regression tests require a controlled baseline and consistent browser, viewport, and rendering conditions.

---

## Smoke Test Suite

The initial smoke suite should focus on critical functionality and provide fast feedback after changes.

| ID       | Test                            |
| -------- | ------------------------------- |
| AUTH-001 | Login with valid credentials    |
| INV-001  | Verify inventory page           |
| INV-006  | Add one product to the cart     |
| CART-002 | Verify added product            |
| CHK-001  | Start checkout                  |
| CHK-002  | Continue with valid information |
| CHK-009  | Verify subtotal                 |
| CHK-011  | Verify final total              |
| E2E-001  | Complete a purchase             |
| AUTH-009 | Logout successfully             |

## Installation and Execution

### Prerequisites

- Node.js installed.
- npm available.
- Git installed (recommended).

### Install dependencies

```bash
npm install
npx playwright install
```

### Run all tests

```bash
npx playwright test
```

### Run a specific test suite

```bash
npx playwright test tests/login/login.spec.ts
npx playwright test tests/inventory/
npx playwright test tests/e2e/purchase.spec.ts
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Open the HTML report

```bash
npx playwright show-report
```

These commands assume the test files follow the proposed project structure and the default Playwright Test configuration.

## Future Improvements

- Add reusable fixtures for authenticated and unauthenticated scenarios.
- Implement data-driven testing for credentials and checkout validation.
- Add test tagging for smoke, regression, and E2E suites.
- Configure CI execution with GitHub Actions.
- Publish Playwright HTML reports as build artifacts.
- Add cross-browser execution for Chromium, Firefox, and WebKit.
- Introduce visual regression testing with approved baselines.
- Track test coverage and flaky-test rates.

## Disclaimer

This is an educational QA automation project using a publicly available demonstration application. It is not affiliated with or endorsed by Sauce Labs.

The test cases describe the intended testing scope and may require adjustments as the application or its behavior changes.
