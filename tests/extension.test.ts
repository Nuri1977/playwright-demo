import { test, expectExt } from './fixtures';

// test('example test', async ({ page }) => {
//   await page.goto('https://www.grammarly.com/');
//   await page.getByRole('link', { name: 'Log in' }).click();
//   await page.getByLabel('Email').click();
// });

test('popup page', async ({ page }) => {
  await page.goto(`chrome-extension://callobklhcbilhphinckomhgkigmfocg/popup.html`);
});