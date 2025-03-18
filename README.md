# FuseAutomation

## Overview
FuseAutomation is a test automation framework using [Playwright](https://playwright.dev/) for functional UI and API testing. The project includes formatting tools and logging utilities to support test execution.

## Installation
Before using the project, install the dependencies by running:

```sh
npm install
```

## Environment Setup
This project uses a `.env` file for configuration. To set up your environment variables:
1. Create a `.env` file at the root of the project.
2. Use the `.env.template` file as a reference for the required environment variables.

## Scripts

### Formatting Code
```sh
npm run format
```
Formats the project files using Prettier.

### Running Tests
#### E2E UI Tests
```sh
npm run e2e
```
Runs Playwright UI tests located in `e2e/ui`.

#### Functional UI Tests
```sh
npm run functional:ui
```
Runs Playwright UI tests located in `functional/ui`.

```sh
npm run ci
```
Runs tests tagged with @ci using BrowserStack integration.

#### Functional API Tests
```sh
npm run functional:api
```
Runs Playwright API tests located in `functional/api`.

#### Run All Functional Tests
```sh
npm run functional:all
```
Runs all functional tests in the `functional/` directory.

#### Playwright UI Mode
```sh
npm run uiMode
```
Runs Playwright in UI mode, allowing for interactive test execution and debugging.

### Test Reporting with Allure
#### Generate and Open Allure Report
```sh
npm run showAllureReport
```
Generates the Allure report from test results and opens it in the browser.

## Dependencies
- [Playwright](https://playwright.dev/) for UI and API testing
- [Allure Playwright](https://www.npmjs.com/package/allure-playwright) for test reporting
- [Prettier](https://prettier.io/) for code formatting
- [dotenv](https://www.npmjs.com/package/dotenv) for environment variable management
- [fs-extra](https://www.npmjs.com/package/fs-extra) for file system operations
- [winston](https://www.npmjs.com/package/winston) for logging

## Autor
Arcadio Buelvas
+573008974475
Arcadiobuelvas@gmail.com
