// tests/search-flights.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Flight Search', () => {
  test('should search for flights from Boston to London', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.selectDepartureAndDestination('Boston', 'London');
    await home.searchFlights();

    // Assert the results page loads
    await expect(page.locator('h3')).toHaveText(/Flights from Boston to London/);
    await expect(page.locator('table')).toBeVisible();
  });
});
