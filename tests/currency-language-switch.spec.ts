import { test, expect } from '@playwright/test';

test.describe('Currency and Language Switch', () => {

  test('should update prices when currency is changed', async ({ page }) => {
    await page.goto('https://your-travel-site-url.com');

    // Default should be USD or similar
    const usdPrice = await page.locator('.flight-price').first().textContent();
    expect(usdPrice).toMatch(/\$/);

    // Switch to EUR
    await page.getByLabel('Currency').selectOption('EUR');

    // Check price updates to €
    const eurPrice = await page.locator('.flight-price').first().textContent();
    expect(eurPrice).toMatch(/€/);
    expect(eurPrice).not.toEqual(usdPrice);
  });

  test('should update labels when language is changed', async ({ page }) => {
    await page.goto('https://your-travel-site-url.com');

    // Default should be English
    await expect(page.getByRole('heading', { name: /book your flight/i })).toBeVisible();

    // Switch to French
    await page.getByLabel('Language').selectOption('fr');

    // Confirm French label appears
    await expect(page.getByRole('heading', { name: /réservez votre vol/i })).toBeVisible();
  });

  test('should retain currency selection after refresh', async ({ page }) => {
    await page.goto('https://your-travel-site-url.com');

    await page.getByLabel('Currency').selectOption('EUR');
    await page.reload();

    // After reload, ensure currency still EUR
    const priceText = await page.locator('.flight-price').first().textContent();
    expect(priceText).toMatch(/€/);
  });

});
