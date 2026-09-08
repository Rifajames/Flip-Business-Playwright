import { expect, Locator, Page } from '@playwright/test';

export class SignupPage {
  readonly page: Page;

  readonly fullName: Locator;
  readonly businessEmail: Locator;
  readonly phone: Locator;
  readonly password: Locator;

  readonly individualBusinessType: Locator;
  readonly legalBusinessType: Locator;

  readonly businessName: Locator;
  readonly flipId: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.fullName = page.locator(
      "//input[@data-qaid='qa-name-field']"
    );

    this.businessEmail = page.locator(
      "//input[@data-qaid='qa-email-field']"
    );

    this.phone = page.locator(
      "//input[@data-qaid='qa-phone-field']"
    );

    this.password = page.locator(
      "//input[@data-qaid='qa-password-field']"
    );

    this.individualBusinessType = page.locator(
      "//input[@data-qaid='qa-guest-individual-business-type-radio-button']"
    );

    this.legalBusinessType = page.locator(
      "//input[@data-qaid='qa-guest-legal-business-type-radio-button']"
    );

    this.businessName = page.locator(
      "//input[@name='business_name']"
    );

    this.flipId = page.locator(
      "//input[@name='flip_id']"
    );

    this.submitButton = page.getByRole('button', {
      "//input[@data-qaid='qa-submit-button']"
    });
  }

  async goto() {
    await this.page.goto('/signup', {
      waitUntil: 'domcontentloaded',
    });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/signup/);
    await expect(this.fullName).toBeVisible();
    await expect(this.businessEmail).toBeVisible();
    await expect(this.phone).toBeVisible();
    await expect(this.password).toBeVisible();
  }

  async fillValidRegistration(data: RegistrationData) {
    await this.fullName.fill(data.fullName);
    await this.businessEmail.fill(data.businessEmail);
    await this.businessName.fill(data.businessName);
    await this.phone.fill(data.phone);
    await this.password.fill(data.password);
  }

  async selectBusinessType(type: BusinessType) {
    if (type === 'individual') {
      await this.individualBusinessType.check();
      return;
    }

    await this.legalBusinessType.check();
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectValidationMessage(message: RegExp) {
    await expect(
      this.page.getByText(message)
    ).toBeVisible();
  }
}

export type BusinessType =
  | 'individual'
  | 'legal';

export type RegistrationData = {
  fullName: string;
  businessEmail: string;
  businessName: string;
  businessType: BusinessType;
  flipId: string;
  phone: string;
  password: string;
};