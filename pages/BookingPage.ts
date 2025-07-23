// pages/BookingPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class BookingPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly cardTypeSelect: Locator;
  readonly cardNumberInput: Locator;
  readonly nameOnCardInput: Locator;
  readonly purchaseButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#inputName');
    this.addressInput = page.locator('#address');
    this.cityInput = page.locator('#city');
    this.stateInput = page.locator('#state');
    this.zipCodeInput = page.locator('#zipCode');
    this.cardTypeSelect = page.locator('select#cardType');
    this.cardNumberInput = page.locator('#creditCardNumber');
    this.nameOnCardInput = page.locator('#nameOnCard');
    this.purchaseButton = page.locator('input[type="submit"]');
    this.errorMessage = page.locator('.error-message');
  }

  async fillPassengerDetails(partial: boolean = false) {
    if (!partial) {
      await this.nameInput.fill('Harsh Tamakuwala');
    }
    await this.addressInput.fill('133 Rue Battant');
    await this.cityInput.fill('Paris');
    await this.stateInput.fill('Île-de-France');
    await this.zipCodeInput.fill('75006');
    await this.cardTypeSelect.selectOption('visa');
    await this.cardNumberInput.fill('4563738499928834');
    await this.nameOnCardInput.fill('Harsh Tamakuwala');
  }

  async purchaseFlight() {
    await this.purchaseButton.click();
  }

  async assertErrorVisible(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
}
