import { test, expect } from '@playwright/test';

test.describe('App navigation', () => {
  test('renders the bottom tab bar with all tabs', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: /primary/i });
    await expect(nav).toBeVisible();
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /explore/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /profile/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /tasks/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /settings/i })).toBeVisible();
  });

  test('renders each screen at its route', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Hello App' })).toBeVisible();

    await page.goto('/explore');
    await expect(page.getByRole('heading', { name: 'Explore' })).toBeVisible();

    await page.goto('/profile');
    await expect(page.getByText('Guest User')).toBeVisible();

    await page.goto('/tasks');
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();

    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

    await page.goto('/explore/2');
    await expect(page.getByRole('heading', { name: 'UI Components' })).toBeVisible();
  });

  test('navigates between tabs when a tab link is clicked', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Hello App' })).toBeVisible();

    await page.getByRole('link', { name: /settings/i }).click();
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  });

  test('marks the active tab with the active class', async ({ page }) => {
    await page.goto('/profile');
    const profileLink = page.getByRole('link', { name: /profile/i });
    await expect(profileLink).toHaveClass(/tab-item-active/);
  });
});
