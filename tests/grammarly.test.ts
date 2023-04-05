import { test, expect } from '@playwright/test';
import * as OTPAuth from 'otpauth';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

let totp = new OTPAuth.TOTP({
  issuer: "Grammarly",
  label: "Grammarly",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: process.env.TOTP_SECRET
});



test('test', async ({ page }) => {
  await page.goto('https://www.grammarly.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill(process.env.EMAIL || "");
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill(process.env.PASSWORD || "");
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  let token= totp.generate();

  await page.locator('.input_code_input__dJJZ1').first().fill(token);
  await page.getByRole('button', { name: 'Sign in securely' }).click();
});