import { test, expect } from '@playwright/test';
import {login, screenshot} from "../reusable/functions";

test('login', async ({page}, testInfo) => {
    //test to verify that the user is able to login
    await login(page);
    //Checking that the login is successful by checking for the channel handle
    await page.getByAltText('Avatar image').click();
    await expect(page.getByText('@SelTestWright')).toBeVisible();
});

test('Failed login when the password is incorrect', async ({page}) => {
    //test to verify that an error message is displayed when the password is incorrect. Did not test wrong email because captcha is displayed in that scenario
    await page.goto('https://www.youtube.com/');
    await page.getByLabel('Sign in').click();
    await page.getByLabel('Email or phone').fill('SelTest72@proton.me');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Enter your password').fill('incorrect#75');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Wrong password. Try again or click Forgot password to reset it.')).toBeVisible();
});