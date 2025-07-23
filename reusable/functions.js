
//function to login

export async function login (page) {
    await page.goto('https://www.youtube.com/signin');
    await page.getByLabel('Email or phone').fill('SelTest72@proton.me');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Enter your password').fill('NiumTesting#75');
    await page.getByRole('button', { name: 'Next' }).click();
}

//screenshot function
export async function screenshot (page, testInfo, title){
    const screen = await page.screenshot();
    testInfo.attach(title, {
        body: screen,
        contentType: 'image/png',
    });
}