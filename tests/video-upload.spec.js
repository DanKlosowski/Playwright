import {test, expect} from '@playwright/test';
import {login, screenshot} from "../reusable/functions";

test('MP4 video upload should be successful', async ({page}, testInfo) => {
    //test.setTimeout(120_000);
    await login(page);
    //Getting to the upload button and clicking on it
    await page.getByAltText('Avatar image').click();
    await page.getByRole('link', { name: 'YouTube Studio' }).click();
    await page.locator('#upload-button').getByRole('button', { name: 'Upload videos' }).click();

    //Uploading the file and selecting the required fields
    await page.locator('input[name="Filedata"]').setInputFiles('./upload-files/catvideomp4.mp4');
    await page.getByRole('radio', { name: 'No, it\'s not made for kids' }).check();
    await page.getByLabel('Next').click();
    await page.getByLabel('Next').click();
    await page.getByLabel('Next').click();
    await page.getByRole('radio', { name: 'PRIVATE' }).check();
    await page.getByLabel('Save').click();
    await  page.locator('#close-button > ytcp-button-shape > button > div').click();

    //Navigating to the upload page and checking that the video has been uploaded
    await page.waitForTimeout(3000);//need to wait for the upload to show up in the list
    await page.getByRole('button', { name: 'Content' }).click();
    expect (page.getByRole('link', { name: 'catvideomp4' }).first()).toBeVisible();
    screenshot(page, testInfo, "Video upload page");//using screenshot function because built in screenshot is only after the last step

    //deleting the video file to not interfere with future tests
    page.getByRole('link', { name: 'catvideomp4' }).first().hover();
    await page.getByLabel('Options').click();
    await page.getByText('Delete forever').click();
    await page.locator('#dialog-content-confirm-checkboxes').locator('#checkbox-container').check();
    await page.getByLabel('Delete forever').click();
    await page.waitForTimeout(500);//need to wait before the browser is closed in order for the delete to be successful
});

test('WebM video upload should be successful', async ({page}, testInfo) => {
    //test.setTimeout(120_000);
    await login(page);
    //Getting to the upload button and clicking on it
    await page.getByAltText('Avatar image').click();
    await page.getByRole('link', { name: 'YouTube Studio' }).click();
    await page.locator('#upload-button').getByRole('button', { name: 'Upload videos' }).click();

    //Uploading the file and selecting the required fields
    await page.locator('input[name="Filedata"]').setInputFiles('./upload-files/catvideowebm.webm');
    await page.getByRole('radio', { name: 'No, it\'s not made for kids' }).check();
    await page.getByLabel('Next').click();
    await page.getByLabel('Next').click();
    await page.getByLabel('Next').click();
    await page.getByRole('radio', { name: 'PRIVATE' }).check();
    await page.getByLabel('Save').click();
    await  page.locator('#close-button > ytcp-button-shape > button > div').click();

    //Navigating to the upload page and checking that the video has been uploaded
    await page.getByRole('button', { name: 'Content' }).click();
    await page.waitForTimeout(3000);//need to wait for the upload to show up in the list
    await page.getByRole('tab', { name: 'Shorts' }).click();
    expect (page.getByRole('link', { name: 'catvideowebm' }).first()).toBeVisible();
    screenshot(page, testInfo, "Shorts upload page");//using screenshot function because built in screenshot is only after the last step

    //deleting the video file to not interfere with future tests
    page.getByRole('link', { name: 'catvideowebm' }).first().hover();
    await page.getByLabel('Options').click();
    await page.getByText('Delete forever').click();
    await page.locator('#dialog-content-confirm-checkboxes').locator('#checkbox-container').check();
    await page.getByLabel('Delete forever').click();
    await page.waitForTimeout(500);//need to wait before the browser is closed in order for the delete to be successful
});

test('Jpg file upload should give an error message and nothing should be uploaded', async ({page}, testInfo) => {
    await login(page);
    //Getting to the upload button
    await page.getByAltText('Avatar image').click();
    await page.getByRole('link', { name: 'YouTube Studio' }).click();
    await page.locator('#upload-button').getByRole('button', { name: 'Upload videos' }).click();

    //Uploading the file
    await page.locator('input[name="Filedata"]').setInputFiles('./upload-files/catvideo.jpg');

    //Verifying the error message
    expect (page.getByText('Invalid file format.')).toBeVisible();
    screenshot(page, testInfo, "Error message");

    //Checking the upload pages to make sure that nothing was uploaded
    await page.getByRole('button', { name: 'Close' }).click();
    await page.waitForTimeout(1500);//need to wait for the upload to show up in the list
    await page.getByRole('button', { name: 'Content' }).click();
    expect (page.getByRole('link', { name: 'catvideo' }).first()).toBeHidden();
    await page.waitForTimeout(1500);
    await page.getByRole('tab', { name: 'Shorts' }).click();
    screenshot(page, testInfo, "Video upload page");
    expect (page.getByRole('link', { name: 'catvideo' }).first()).toBeHidden();
});

test('Txt file upload should give an error message and nothing should be uploaded', async ({page}, testInfo) => {
    await login(page);
    //Getting to the upload button
    await page.getByAltText('Avatar image').click();
    await page.getByRole('link', { name: 'YouTube Studio' }).click();
    await page.locator('#upload-button').getByRole('button', { name: 'Upload videos' }).click();

    //Uploading the file
    await page.locator('input[name="Filedata"]').setInputFiles('./upload-files/catvideo.txt');

    //Verifying the error message
    expect (page.getByText('Invalid file format.')).toBeVisible();
    screenshot(page, testInfo, "Error message");

    //Checking the upload pages to make sure that nothing was uploaded
    await page.getByRole('button', { name: 'Close' }).click();
    await page.waitForTimeout(1500);//need to wait for the upload to show up in the list
    await page.getByRole('button', { name: 'Content' }).click();
    expect (page.getByRole('link', { name: 'catvideo' }).first()).toBeHidden();
    await page.waitForTimeout(1500);
    await page.getByRole('tab', { name: 'Shorts' }).click();
    screenshot(page, testInfo, "Video upload page");
    expect (page.getByRole('link', { name: 'catvideo' }).first()).toBeHidden();
});

test('Xlsx file upload should give an error message and nothing should be uploaded', async ({page}, testInfo) => {
    await login(page);
    //Getting to the upload button
    await page.getByAltText('Avatar image').click();
    await page.getByRole('link', { name: 'YouTube Studio' }).click();
    await page.locator('#upload-button').getByRole('button', { name: 'Upload videos' }).click();

    //Uploading the file
    await page.locator('input[name="Filedata"]').setInputFiles('./upload-files/catvideo.xlsx');

    //Verifying the error message
    expect (page.getByText('Invalid file format.')).toBeVisible();
    screenshot(page, testInfo, "Error message");

    //Checking the upload pages to make sure that nothing was uploaded
    await page.getByRole('button', { name: 'Close' }).click();
    await page.waitForTimeout(1500);//need to wait for the upload to show up in the list
    await page.getByRole('button', { name: 'Content' }).click();
    expect (page.getByRole('link', { name: 'catvideo' }).first()).toBeHidden();
    await page.waitForTimeout(1500);
    await page.getByRole('tab', { name: 'Shorts' }).click();
    screenshot(page, testInfo, "Video upload page");
    expect (page.getByRole('link', { name: 'catvideo' }).first()).toBeHidden();
});