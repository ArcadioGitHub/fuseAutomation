import MainPageActions from "../../../shared/ui/expedia/pages/mainPage/MainPage.actions";
import HotelsResultsPageActions from "../../../shared/ui/expedia/pages/resultsPage/HotelsResultsPage.actions";
import test, { expect } from "@playwright/test";
import logger from "../../../shared/ui/utils/logger";
import {
  getRandomUSCity,
  getTodayDate,
  getTomorrowDate,
  isArraySortedLowToHigh,
} from "../../../shared/ui/utils/commonUtils";
import HotelsResultsPageElements from "../../../shared/ui/expedia/pages/resultsPage/HotelsResultsPage.elements";

/**
 * Test Case: User Story 1 - Search for a Hotel and Apply Filters
 * 
 * This test verifies that a user can search for hotels in a random US city 
 * and apply multiple filters to refine the results.
 * 
 * Steps:
 * 1. Navigate to the main page.
 * 2. Search for hotels in a random US city.
 * 3. Verify redirection to the hotel search results page.
 * 4. Validate that hotel results are displayed.
 * 5. Apply a date filter and verify the results update.
 * 6. Apply a guest rating filter ("Very good") and verify results update.
 * 7. Apply a star rating filter (4 stars) and verify results update.
 * 8. Apply a price range filter ($50 - $250) and verify results update.
 * 9. Sort the results by "Price: low to high" and verify sorting order.
 * 
 * Assertions:
 * - Ensure the user is successfully redirected to the Hotels results page.
 * - Verify that hotel results exist before and after applying each filter.
 * - Confirm that the results change appropriately after each filter is applied.
 * - Validate that sorting by price arranges results in ascending order.
 * 
 * @param {object} page - The Playwright page instance.
 * @throws {AssertionError} If any expected filter or sorting behavior does not occur.
 */
test("User Story 1: Search for a Hotel and Apply Filters - @hotels", async ({ page }) => {
  const mainPageActions = new MainPageActions(page);
  const hotelsResultsPageActions = new HotelsResultsPageActions(page);
  const city = await getRandomUSCity();

  await mainPageActions.goto();
  await mainPageActions.searchHotel(city);
  //Verify user has been successfully redirected to the Hotels results page
  expect(page.url()).toContain(`/Hotel-Search?destination=`);

  //Verify the results list
  const hotelTitles = await hotelsResultsPageActions.getHotelsTitles();
  logger.info("Number of Hotels in the List: " + hotelTitles.length);
  expect(hotelTitles.length).toBeGreaterThan(0);

  //Changing dates filter
  await hotelsResultsPageActions.selectDates(await getTodayDate(), await getTomorrowDate());
  const hotelTitlesAfterChangingTheDates = await hotelsResultsPageActions.getHotelsTitles();
  expect(hotelTitlesAfterChangingTheDates.length).toBeGreaterThan(0);

  //Verify the results list is different after applaying new Dates
  expect(hotelTitlesAfterChangingTheDates).not.toEqual(hotelTitles);
  const differencesAfterChangingDates = hotelTitles.filter(
    (item) => !hotelTitlesAfterChangingTheDates.includes(item)
  );
  logger.info(
    "Differences in the Hotels List after changing the Dates: " + differencesAfterChangingDates
  );
  logger.info(
    "Number of Hotels after changing the Dates: " + hotelTitlesAfterChangingTheDates.length
  );

  //Changing Guest Rating
  await hotelsResultsPageActions.selectGuestRating("Very good");
  const hotelTitlesAfterApplyingGuestRating = await hotelsResultsPageActions.getHotelsTitles();
  expect(hotelTitlesAfterApplyingGuestRating.length).toBeGreaterThan(0);
  expect(HotelsResultsPageElements.locateFilterByText(page, "Very good 8+")).toBeVisible();

  //Verify the results list is different after applaying Guest Rating
  expect(hotelTitlesAfterApplyingGuestRating).not.toEqual(hotelTitlesAfterChangingTheDates);
  const differencesAfterApplyingGuestRating = hotelTitlesAfterChangingTheDates.filter(
    (item) => !hotelTitlesAfterApplyingGuestRating.includes(item)
  );
  logger.info(
    "Differences in the Hotels List after applying Guest Rating: " +
      differencesAfterApplyingGuestRating
  );
  logger.info(
    "Number of Hotels afterapplying Guest Rating: " + hotelTitlesAfterApplyingGuestRating.length
  );

  //Changing Stars Rating
  await hotelsResultsPageActions.selectStarsRating("40");
  const hotelTitlesAfterApplyingStarsRating = await hotelsResultsPageActions.getHotelsTitles();
  expect(hotelTitlesAfterApplyingStarsRating.length).toBeGreaterThan(0);
  expect(HotelsResultsPageElements.locateFilterByText(page, "4 stars")).toBeVisible();

  //Verify the results list is different after applaying Stars Rating
  expect(hotelTitlesAfterApplyingStarsRating).not.toEqual(hotelTitlesAfterApplyingGuestRating);
  const differencesAfterApplyingStarsRating = hotelTitlesAfterApplyingGuestRating.filter(
    (item) => !hotelTitlesAfterApplyingStarsRating.includes(item)
  );
  logger.info(
    "Differences in the Hotels List after applying Stars Rating: " +
      differencesAfterApplyingStarsRating
  );
  logger.info(
    "Number of Hotels aftera pplying Stars Rating: " + hotelTitlesAfterApplyingStarsRating.length
  );

  //Applying a new Price Range
  await hotelsResultsPageActions.applyPriceRange("50", "250");
  const hotelTitlesAfterPriceRange = await hotelsResultsPageActions.getHotelsTitles();
  expect(hotelTitlesAfterPriceRange.length).toBeGreaterThan(0);
  expect(HotelsResultsPageElements.locateFilterByText(page, "$50 to $250")).toBeVisible();

  //Verify the results list is different after applaying Stars Rating
  expect(hotelTitlesAfterPriceRange).not.toEqual(hotelTitlesAfterApplyingStarsRating);
  const differencesAfterApplyingPriceRange = hotelTitlesAfterApplyingStarsRating.filter(
    (item) => !hotelTitlesAfterPriceRange.includes(item)
  );
  logger.info(
    "Differences in the Hotels List after applying Price Range: " +
      differencesAfterApplyingPriceRange
  );
  logger.info("Number of Hotels after Price Range: " + hotelTitlesAfterPriceRange.length);

  //Sorting by Price: low to high
  await hotelsResultsPageActions.sortBy("Price: low to high");
  const hotelPrices = await hotelsResultsPageActions.getHotelsPrices();

  //Verify Prices are: low to high
  expect(await isArraySortedLowToHigh(hotelPrices)).toBe(true);
  logger.info("Hotel Prices: " + hotelPrices);
  logger.info("Number of Hotels sorting by low to high: " + hotelPrices.length);
});
