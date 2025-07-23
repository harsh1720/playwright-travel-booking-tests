// pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly fromCity: Locator;
  readonly toCity: Locator;
  readonly findFlightsBtn: Locator;
  readonly currencySelect: Locator;
  readonly languageSelect: Locator;
  readonly flightPriceElements: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromCity = page.locator('select[name="fromPort"]');
    this.toCity = page.locator('select[name="toPort"]');
    this.findFlightsBtn = page.locator('input[type="submit"]');
    this.currencySelect = page.locator('select#currency');
    this.languageSelect = page.locator('select#language');
    this.flightPriceElements = page.locator('.flight-price');
  }

  async goto() {
    await this.page.goto('https://blazedemo.com');
  }

  async selectDepartureAndDestination(from: string, to: string) {
    await this.fromCity.selectOption({ label: from });
    await this.toCity.selectOption({ label: to });
  }

  async searchFlights() {
    await this.findFlightsBtn.click();
  }

  async changeCurrency(currencyCode: string) {
    await this.currencySelect.selectOption(currencyCode);
  }

  async changeLanguage(langCode: string) {
    await this.languageSelect.selectOption(langCode);
  }

  async getVisiblePrices(): Promise<number[]> {
    const prices = await this.flightPriceElements.allTextContents();
    return prices.map(p => parseFloat(p.replace(/[^0-9.]/g, '')));
  }
}
