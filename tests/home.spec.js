import { test, expect } from '@playwright/test';

test.describe('Home screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the greeting form and quick actions', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Hello App' })).toBeVisible();
    await expect(page.getByPlaceholder('Enter your name...')).toBeVisible();
    await expect(page.getByRole('button', { name: /say hi/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^explore$/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^tasks$/i })).toBeVisible();
    await expect(page.getByText(/💡 Tip/)).toBeVisible();
  });

  test('keeps Say Hello disabled when input is empty or whitespace', async ({
    page,
  }) => {
    const button = page.getByRole('button', { name: /say hello/i });
    await expect(button).toBeDisabled();

    await page.getByPlaceholder('Enter your name...').fill('   ');
    await expect(button).toBeDisabled();
  });

  test('greets the user when a name is entered and the button is clicked', async ({
    page,
  }) => {
    await page.getByPlaceholder('Enter your name...').fill('Alice');
    const button = page.getByRole('button', { name: /say hello/i });
    await expect(button).toBeEnabled();
    await button.click();

    await expect(page.getByText('Hello, Alice!')).toBeVisible();
    await expect(page.getByText('Great to see you here.')).toBeVisible();
    await expect(page.getByRole('button', { name: /start over/i })).toBeVisible();
  });

  test('greets when Enter key is pressed', async ({ page }) => {
    await page.getByPlaceholder('Enter your name...').fill('Bob');
    await page.getByPlaceholder('Enter your name...').press('Enter');
    await expect(page.getByText('Hello, Bob!')).toBeVisible();
  });

  test('resets the form when Start Over is clicked', async ({ page }) => {
    await page.getByPlaceholder('Enter your name...').fill('Carol');
    await page.getByRole('button', { name: /say hello/i }).click();
    await page.getByRole('button', { name: /start over/i }).click();

    await expect(page.getByPlaceholder('Enter your name...')).toHaveValue('');
    await expect(page.getByRole('button', { name: /say hello/i })).toBeDisabled();
  });

  test('handles a long name without breaking', async ({ page }) => {
    const longName = 'A'.repeat(120);
    await page.getByPlaceholder('Enter your name...').fill(longName);
    await page.getByRole('button', { name: /say hello/i }).click();
    await expect(page.getByText(`Hello, ${longName}!`)).toBeVisible();
  });
});
