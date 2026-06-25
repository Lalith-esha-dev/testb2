import { test, expect } from '@playwright/test';

test.describe('Explore screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/explore');
  });

  test('renders the header and filter chips', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Explore' })).toBeVisible();
    await expect(
      page.getByText('Discover topics and features')
    ).toBeVisible();
    await expect(page.getByRole('group', { name: /filters/i })).toBeVisible();
    for (const label of ['All', 'Guides', 'UI', 'Tips']) {
      await expect(page.getByRole('button', { name: label, exact: true })).toBeVisible();
    }
  });

  test('filters explore items by tag', async ({ page }) => {
    await expect(page.getByText('Getting Started')).toBeVisible();
    await expect(page.getByText('UI Components')).toBeVisible();

    await page.getByRole('button', { name: 'UI', exact: true }).click();
    await expect(page.getByText('UI Components')).toBeVisible();
    await expect(page.getByText('Getting Started')).not.toBeVisible();
  });

  test('navigates to a detail screen when an item is clicked', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /UI Components/i }).click();
    await expect(page).toHaveURL(/\/explore\/2$/);
    await expect(page.getByRole('heading', { name: 'UI Components' })).toBeVisible();
  });
});
