import { test, expect } from '@playwright/test';

test.describe('Multi-City Flight Booking', () => {

  test('should allow booking multi-city flights', async ({ page }) => {
    await page.goto('https://your-travel-site-url.com');

    // Select Multi-City tab
    await page.getByRole('tab', { name: /multi-city/i }).click();

    // Fill Leg 1: Paris → Rome
    await page.getByLabel('From - Leg 1').fill('Paris');
    await page.getByLabel('To - Leg 1').fill('Rome');
    await page.getByLabel('Departure Date - Leg 1').click();
    await page.getByLabel('Departure Date - Leg 1').press('ArrowRight'); // move to tomorrow
    await page.getByLabel('Departure Date - Leg 1').press('Enter');

    // Fill Leg 2: Rome → Berlin
    await page.getByRole('button', { name: /add leg/i }).click();
    await page.getByLabel('From - Leg 2').fill('Rome');
    await page.getByLabel('To - Leg 2').fill('Berlin');
    await page.getByLabel('Departure Date - Leg 2').click();
    await page.getByLabel('Departure Date - Leg 2').press('ArrowRight');
    await page.getByLabel('Departure Date - Leg 2').press('Enter');

    // Submit search
    await page.getByRole('button', { name: /search flights/i }).click();

    // Expect results for both legs
    await expect(page.getByText(/Paris to Rome/i)).toBeVisible();
    await expect(page.getByText(/Rome to Berlin/i)).toBeVisible();
  });

});
