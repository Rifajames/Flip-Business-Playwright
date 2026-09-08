import { test, expect } from '@playwright/test';

// Lightweight resilience checks that do not create an account.
test.describe('Registration resilience', () => {
  test('signup route returns a usable application shell', async ({ request }) => {
    const response = await request.get('/signup');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toMatch(/text\/html/i);
  });
});
