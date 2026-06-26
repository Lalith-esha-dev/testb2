import { test, expect } from '@playwright/test';

test.describe('Settings screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
  });

  test('renders preference toggles and app info', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(page.getByText('Customize your experience')).toBeVisible();
    await expect(page.getByRole('switch', { name: 'Notifications' })).toBeChecked();
    await expect(page.getByRole('switch', { name: 'Dark Mode' })).not.toBeChecked();
    await expect(page.getByText('Version')).toBeVisible();
    await expect(page.getByText('1.0.0')).toBeVisible();
  });

  test('toggles a setting on and off', async ({ page }) => {
    const darkMode = page.getByRole('switch', { name: 'Dark Mode' });
    await expect(darkMode).not.toBeChecked();
    await darkMode.click();
    await expect(darkMode).toBeChecked();
    await darkMode.click();
    await expect(darkMode).not.toBeChecked();
  });
});
