import { test, expect } from '@playwright/test';

test.describe('Flight Sorting & Filtering', () => {

  test('should sort flights by lowest price', async ({ page }) => {
    await page.goto('https://your-travel-site-url.com');

    // Search a one-way flight
    await page.getByLabel('From').fill('Paris');
    await page.getByLabel('To').fill('Barcelona');
    await page.getByLabel('Departure Date').click();
    await page.getByLabel('Departure Date').press('ArrowRight');
    await page.getByLabel('Departure Date').press('Enter');
    await page.getByRole('button', { name: /search flights/i }).click();

    // Select sort by "Lowest Price"
    await page.getByLabel('Sort By').selectOption('lowest-price');

    // Collect all visible prices
    const priceElements = await page.locator('.flight-price').allTextContents();
    const numericPrices = priceElements.map(p => parseFloat(p.replace(/[^0-9.]/g, '')));

    // Ensure prices are sorted ascending
    const sorted = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sorted);
  });

  test('should filter flights by specific airline', async ({ page }) => {
    await page.goto('https://your-travel-site-url.com');

    // Search a one-way flight
    await page.getByLabel('From').fill('Berlin');
    await page.getByLabel('To').fill('London');
    await page.getByLabel('Departure Date').click();
    await page.getByLabel('Departure Date').press('ArrowRight');
    await page.getByLabel('Departure Date').press('Enter');
    await page.getByRole('button', { name: /search flights/i }).click();

    // Apply filter: only show "SkyFly" airline
    await page.getByRole('checkbox', { name: /SkyFly/i }).check();

    // Verify only SkyFly airline flights are visible
    const visibleFlights = await page.locator('.flight-card .airline-name').allTextContents();
    for (const airline of visibleFlights) {
      expect(airline).toContain('SkyFly');
    }
  });

});
