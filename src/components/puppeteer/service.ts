import {Browser,launch,Page} from 'puppeteer';

const createBrowser = async () : Promise<Browser>  => {
  const browser = await launch({
    headless: false,
    args: [process.env.AGENT_LANG || '--lang=en-US,en'],
  })
  return browser;
};



export const getPage = async function getPage(url:string) : Promise<Page> {
    const browser = await createBrowser();
    let page: Page;
    
    page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load' });
    return page;
}

export const authenticate = async (username:string = '', password:string = '') => {
    const page = await getPage('/accounts/login');
    await page.waitForSelector('input[name="username"]');

    const usernameInput = await page.$('input[name="username"]');
    const passwordInput = await page.$('input[name="password"]');

    if(!usernameInput || !passwordInput) return;

    await usernameInput.type(username, { delay: 100 });
    await passwordInput.type(password, { delay: 100 });

    const logInButtonSelector = await page.evaluate(() => {
      const { scraper } = window as any;

      const logInButton = scraper.findOneWithText({
        selector: 'button',
        text: 'Iniciar sesión',//Iniciar sesión
      });

      if (!logInButton) return;

      return logInButton
        .setscraperAttr('logInButton', 'logInButton')
        .getSelectorByscraperAttr('logInButton');
    });

    if (!logInButtonSelector) {
      throw new Error('Failed to auth');
    }

    const logInButton = await page.$(logInButtonSelector);
    if (!logInButton) return;
    await logInButton.click();
    await page.waitFor(2000);
};