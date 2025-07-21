// pages/HomePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly fromCity: Locator;
  readonly toCity: Locator;
  readonly findFlightsBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromCity = page.locator('select[name="fromPort"]');
    this.toCity = page.locator('select[name="toPort"]');
    this.findFlightsBtn = page.locator('input[type="submit"]');
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
}
