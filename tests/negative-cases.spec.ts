// tests/negative-cases.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('should not proceed to booking if no flight is selected', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  // Skip selecting cities to simulate broken input
  await home.searchFlights();

  // Check that we didn’t land on results page
  await expect(page.locator('h3')).not.toHaveText(/Flights from/);
});

test('should not show confirmation when booking form is empty', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await home.selectDepartureAndDestination('Boston', 'London');
  await home.searchFlights();

  // Select first flight
  const chooseFlightButtons = page.locator('input[type="submit"]');
  await chooseFlightButtons.first().click();

  // Skip filling details and submit directly
  await page.click('input[type="submit"]');

  // Ideally, assert we didn’t reach the confirmation
  await expect(page.locator('h1')).not.toHaveText('Thank you for your purchase today!');
});
