import { test, expect } from '@playwright/test';

test.describe('Tasks screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tasks');
  });

  test('renders the task list and progress bar', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
    await expect(page.getByText('1 of 4 completed')).toBeVisible();
    await expect(page.getByRole('progressbar', { name: /tasks progress/i })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Review app screens' })).toBeVisible();
  });

  test('toggles a task and updates progress', async ({ page }) => {
    await expect(page.getByText('1 of 4 completed')).toBeVisible();
    await page.getByRole('button', { name: 'Try the Explore tab' }).click();
    await expect(page.getByText('2 of 4 completed')).toBeVisible();
    await expect(page.getByText('50%')).toBeVisible();
  });

  test('shows completion message when all tasks are done', async ({ page }) => {
    const incomplete = [
      'Try the Explore tab',
      'Update profile info',
      'Check activity feed',
    ];

    for (const label of incomplete) {
      await page.getByRole('button', { name: label }).click();
    }

    await expect(page.getByText('All tasks complete!')).toBeVisible();
    await expect(page.getByText('4 of 4 completed')).toBeVisible();
  });
});
