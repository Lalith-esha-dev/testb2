import { test, expect } from '@playwright/test';

test.describe('Detail screen', () => {
  test('renders explore item details', async ({ page }) => {
    await page.goto('/explore/2');
    await expect(page.getByRole('heading', { name: 'UI Components' })).toBeVisible();
    await expect(
      page.getByText('Explore reusable design patterns')
    ).toBeVisible();
    await expect(page.getByRole('button', { name: /go back/i })).toBeVisible();
  });

  test('shows not found for unknown items', async ({ page }) => {
    await page.goto('/explore/999');
    await expect(page.getByRole('heading', { name: 'Not Found' })).toBeVisible();
    await expect(
      page.getByText("We couldn't find the item you were looking for.")
    ).toBeVisible();
  });
});
