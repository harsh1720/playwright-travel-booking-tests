import { test, expect } from '@playwright/test';

test.describe('Date Picker Boundary Testing', () => {

  test('should not allow selecting a past departure date', async ({ page }) => {
    await page.goto('https://your-travel-site-url.com');

    // Click on date picker
    await page.getByLabel('Departure Date').click();

    // Try selecting yesterday
    const yesterday = new Date(Date.now() - 86400000); // -1 day
    const formatted = yesterday.toLocaleDateString('en-CA'); // format: yyyy-mm-dd

    // Try to select it or verify it's disabled
    const disabledDate = await page.locator(`[data-date='${formatted}']`).getAttribute('aria-disabled');
    expect(disabledDate).toBe('true');
  });

  test('should allow selecting a departure date up to one year in future', async ({ page }) => {
    await page.goto('https://your-travel-site-url.com');

    // Click on date picker
    await page.getByLabel('Departure Date').click();

    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const formatted = futureDate.toLocaleDateString('en-CA');

    const dateOption = page.locator(`[data-date='${formatted}']`);
    await expect(dateOption).toBeVisible();
    await dateOption.click();

    // Confirm the date got filled
    const selectedDate = await page.getByLabel('Departure Date').inputValue();
    expect(selectedDate).toContain(futureDate.getFullYear().toString());
  });

});
