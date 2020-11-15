import {Page} from 'puppeteer';
import { BrowserPuppeteer } from './BrowserPuppeteer';
import * as dotenv from "dotenv";
import { logger} from '../../utils';

dotenv.config();

export const getPage = async function getPage(url:string) : Promise<Page> {
    let page: Page;
    const browser = await BrowserPuppeteer.getInstance();
    page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load' });
    return page;
}

export const authenticate = async () : Promise<boolean> =>  {
    const username = process.env.INSTAGRAM_USERNAME || 'no te toma el usuario';
    const password = process.env.INSTAGRAM_PASSWORD || '';
    const page = await getPage('https://www.instagram.com/accounts/login');
    
    const isAuth = await page.$(`a[href*='${username}']`);
    //TODO: Creo que nunca entra a este if, ni al de abajo. Verificar y elimianr o fixear.
    if(isAuth) return true;

    await page.waitForSelector('input[name="username"]');

    const usernameInput = await page.$('input[name="username"]');
    const passwordInput = await page.$('input[name="password"]');
    if(!usernameInput || !passwordInput) return false;

    await usernameInput.type(username, { delay: 100 });
    await passwordInput.type(password, { delay: 100 });
    
    await page.click('button[type="submit"]');
    //TODO: si la contra es incorrecta esto devuelve 500 por timeout
    const result = await page.waitForNavigation();
    return true;
};