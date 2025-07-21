// tests/book-flight.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { BookingPage } from '../pages/BookingPage';

test('Book a flight from Boston to London', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await home.selectDepartureAndDestination('Boston', 'London');
  await home.searchFlights();

  // Select the first available flight
  const chooseFlightButtons = page.locator('input[type="submit"]');
  await chooseFlightButtons.first().click();

  const booking = new BookingPage(page);
  await booking.fillPassengerDetails();
  await booking.purchaseFlight();

  // Confirmation page assertions
  await expect(page.locator('h1')).toHaveText('Thank you for your purchase today!');
  await expect(page.locator('td')).toContainText(['Id', 'Amount', 'Card Number']);
});
