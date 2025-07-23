import { test, expect } from '@playwright/test';

test.describe('Passenger Details Validation', () => {

  test('should show error when passenger details are incomplete', async ({ page }) => {
    await page.goto('https://your-travel-site-url.com');

    // Select one-way trip and enter minimal flight info
    await page.getByLabel('From').fill('Paris');
    await page.getByLabel('To').fill('Berlin');
    await page.getByLabel('Departure Date').click();
    await page.getByLabel('Departure Date').press('ArrowRight');
    await page.getByLabel('Departure Date').press('Enter');
    await page.getByRole('button', { name: /search flights/i }).click();

    // Select first available flight
    await page.getByRole('button', { name: /book now/i }).first().click();

    // Leave passenger 1 name empty and submit
    await page.getByLabel('Full Name - Passenger 1').fill('');
    await page.getByRole('button', { name: /confirm booking/i }).click();

    // Expect validation error
    await expect(page.getByText(/Name is required/i)).toBeVisible();
  });

  test('should validate age rules for infants', async ({ page }) => {
    await page.goto('https://your-travel-site-url.com');

    // Navigate to booking page with one infant
    await page.getByLabel('From').fill('Paris');
    await page.getByLabel('To').fill('Nice');
    await page.getByLabel('Departure Date').click();
    await page.getByLabel('Departure Date').press('ArrowRight');
    await page.getByLabel('Departure Date').press('Enter');
    await page.getByLabel('Passengers').selectOption('1 Adult, 1 Infant');
    await page.getByRole('button', { name: /search flights/i }).click();

    // Book the flight
    await page.getByRole('button', { name: /book now/i }).first().click();

    // Fill infant DOB older than 2 years (invalid)
    const invalidDOB = '2020-01-01';
    await page.getByLabel('Infant DOB').fill(invalidDOB);

    await page.getByRole('button', { name: /confirm booking/i }).click();

    // Expect age validation error
    await expect(page.getByText(/Infant must be under 2 years/i)).toBeVisible();
  });

});
