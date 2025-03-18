import MainPageActions from "../../../shared/ui/expedia/pages/mainPage/MainPage.actions";
import test, { expect } from "@playwright/test";
import {
  getRandomUSCity,
  getTodayDate,
  getTomorrowDate,
  switchToTab,
  waitForPageToFullyLoad,
} from "../../../shared/ui/utils/commonUtils";
import FlightsResultsPageActions from "../../../shared/ui/expedia/pages/resultsPage/FlightsResultsPage.actions";
import logger from "../../../shared/ui/utils/logger";
import FlightsResultsPageElements from "../../../shared/ui/expedia/pages/resultsPage/FlightsResultsPage.elements";

/**
 * Test Case: User Story 2 - Flight Booking with Round Trip Selection
 * 
 * This test automates the flight booking process for a round-trip selection on the Expedia website.
 * 
 * Steps:
 * 1. Navigate to the main page.
 * 2. Go to the "Flights" tab.
 * 3. Select "Roundtrip" flight type.
 * 4. Perform a flight search with randomly selected US cities.
 * 5. Verify that the user is redirected to the flight search results page.
 * 6. Capture the list of available flights.
 * 7. Update the departure and return dates.
 * 8. Verify that the flight list updates accordingly after changing dates.
 * 9. Select the first departure flight.
 * 10. Select the first return flight.
 * 11. Switch to the new tab containing the Flight Summary page.
 * 12. Verify that the user is on the Flight Summary page.
 * 
 * Assertions:
 * - Ensure the flight search redirects to the expected results page.
 * - Validate that flights are available before and after changing the dates.
 * - Ensure the flight list changes after updating the dates.
 * - Confirm the presence of the flight summary and price summary on the final booking page.
 * 
 * @param {object} page - The Playwright page instance.
 * @throws {AssertionError} If any step fails during execution.
 */
test("User Story 2: Flight Booking with Round Trip Selection - @flights", async ({ page }) => {
  const mainPageActions = new MainPageActions(page);
  const flightsResultsPageElements = new FlightsResultsPageElements(page);
  const flightsResultsPageActions = new FlightsResultsPageActions(page);

  const cityFrom = await getRandomUSCity();
  const cityTo = await getRandomUSCity();

  //Search Flight
  await mainPageActions.goto();
  await mainPageActions.goToMainTabByText("Flights");
  await mainPageActions.selectFlightType("Roundtrip");
  await mainPageActions.searchFlight(cityFrom, cityTo);

  //Verify user has been successfully redirected to the Flights results page
  expect(page.url()).toContain(`/Flights-Search?flight-type=`);

  //Getting the Flights resuls list
  const flightsList = await flightsResultsPageActions.getFlightsTitles();
  expect(flightsList.length).toBeGreaterThan(0);

  //Updating the flight Dates
  await flightsResultsPageActions.selectDates(await getTodayDate(), await getTomorrowDate());
  await waitForPageToFullyLoad(page);
  const flightsAfterChangingTheDates = await flightsResultsPageActions.getFlightsTitles();
  expect(flightsAfterChangingTheDates.length).toBeGreaterThan(0);

  //Verify the results list is different after applaying new Dates
  expect(flightsAfterChangingTheDates).not.toEqual(flightsList);
  const differencesAfterChangingDates = flightsList.filter(
    (item) => !flightsAfterChangingTheDates.includes(item)
  );
  logger.info(
    "Differences in the Flights List after changing the Dates: " + differencesAfterChangingDates
  );
  logger.info("Number of Flights after changing the Dates: " + flightsAfterChangingTheDates.length);

  //Select the first deaperture Flight in the list
  await flightsResultsPageActions.selectFlight();

  //Select the first returing Flight in the list
  await waitForPageToFullyLoad(page);
  await flightsResultsPageActions.selectFlight();

  //Verify user is in the new Tab and it's the Flight Summary Page
  const newPage = await switchToTab(page);
  expect(newPage.url()).toContain(`/Flight-Information?journeyContinuationId=`);
  await waitForPageToFullyLoad(page);
  await expect(newPage.locator(flightsResultsPageElements.flightSummaryBooking)).toBeVisible();
  await expect(newPage.locator(flightsResultsPageElements.priceSummaryBooking)).toBeVisible();
  logger.info("User is in the Flight Summary Page");
});

/**
 * Test Case: User Story 2 - Flight Booking with Round Trip Selection (Same Origin and Destination)
 * 
 * This test verifies that the Expedia flight search does not allow booking a round-trip flight 
 * with the same origin and destination.
 * 
 * Steps:
 * 1. Navigate to the main page.
 * 2. Go to the "Flights" tab.
 * 3. Select "Roundtrip" as the flight type.
 * 4. Attempt to search for a flight using the same city for both departure and arrival.
 * 5. Verify that appropriate error messages are displayed.
 * 
 * Assertions:
 * - Ensure an error message is displayed, prompting the user to correct the input.
 * - Validate that the system prevents searching for a round-trip flight with identical cities.
 * 
 * @param {object} page - The Playwright page instance.
 * @throws {AssertionError} If the expected error messages do not appear.
 */
test("User Story 2: Flight Booking with Round Trip Selecction with same origin and destination - @flights", async ({
  page,
}) => {
  const mainPageActions = new MainPageActions(page);
  const cityFrom = await getRandomUSCity();

  //Search Flight with same origin a destination
  await mainPageActions.goto();
  await mainPageActions.goToMainTabByText("Flights");
  await mainPageActions.selectFlightType("Roundtrip");
  await mainPageActions.searchFlight(cityFrom, cityFrom);

  //Verify error messages
  expect(page.getByText("Please correct the error to continue")).toBeVisible();
  expect(
    page.getByText("Please make sure your departure and arrival cities are different").first()
  ).toBeAttached();
});
