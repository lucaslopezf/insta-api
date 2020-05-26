import {Page} from 'puppeteer';
import { BrowserPuppeteer }from './BrowserPuppeteer';

export const getPage = async function getPage(url:string) : Promise<Page> {
    let page: Page;
    const browser = await BrowserPuppeteer.getInstance();
    page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load' });
    return page;
}

export const authenticate = async (username:string = '', password:string = '') : Promise<Boolean> =>  {
    const page = await getPage('https://www.instagram.com/accounts/login');
    await page.waitForSelector('input[name="username"]');

    const usernameInput = await page.$('input[name="username"]');
    const passwordInput = await page.$('input[name="password"]');

    if(!usernameInput || !passwordInput) return false;

    console.log(username);
    await usernameInput.type(username, { delay: 100 });
    await passwordInput.type(password, { delay: 100 });

    await page.click('button[type="submit"]');
    await page.waitFor(2000);
    return true;
};