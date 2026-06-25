import { test, expect } from '@playwright/test';

test.describe('Profile screen', () => {
  test('renders user info and stats', async ({ page }) => {
    await page.goto('/profile');

    await expect(page.getByText('Guest User')).toBeVisible();
    await expect(page.getByText('guest@helloapp.dev')).toBeVisible();
    await expect(page.getByText('Your Stats')).toBeVisible();
    await expect(page.getByText('Sessions')).toBeVisible();
    await expect(page.getByText('Tasks Done')).toBeVisible();
    await expect(page.getByText('Streak')).toBeVisible();
    await expect(page.getByText('About')).toBeVisible();
  });
});
