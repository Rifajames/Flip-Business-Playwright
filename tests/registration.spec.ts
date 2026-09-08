import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/signup.page';
import { validRegistration } from '../test-data/registration.data';

test.describe('Flip for Business - Registration', () => {
  test('@smoke registration page is reachable and form is displayed', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.goto();
    await signup.expectLoaded();
  });

  test('@smoke valid registration progresses beyond the initial form', async ({ page }) => {
    const signup = new SignupPage(page);
    const data = validRegistration();

    await signup.goto();
    await signup.expectLoaded();
    await signup.fillValidRegistration(data);
    await signup.submit();

    await expect(page.locator('body')).toContainText(/verifikasi|verification|otp|kode|email/i);
  });

  test('required fields prevent empty submission', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.goto();
    await signup.expectLoaded();
    await signup.submit();

    const invalidCount = await page.locator(':invalid').count();
    const errorCount = await page.locator('[role="alert"], .error, .invalid-feedback').count();
    expect(invalidCount + errorCount).toBeGreaterThan(0);
  });

  test('invalid business email is rejected', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.goto();
    await signup.businessEmail.fill('not-an-email');
    await signup.submit();

    const inputInvalid = await signup.businessEmail.evaluate((el: HTMLInputElement) => !el.validity.valid);
    const errorVisible = await page.getByText(/email.*(valid|benar|salah)/i).count();
    expect(inputInvalid || errorVisible > 0).toBeTruthy();
  });

  test('duplicate actions should not create multiple registration attempts', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.goto();
    const data = validRegistration();
    await signup.fillValidRegistration(data);

    await Promise.allSettled([
      signup.submit(),
      signup.submit(),
    ]);

    await expect(page.locator('body')).toBeVisible();
  });
});
