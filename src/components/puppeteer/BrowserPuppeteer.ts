import {Browser,launch} from 'puppeteer';

export class BrowserPuppeteer {
  private static browser: Browser;

  private constructor() {
    
  }

  static getInstance = async () => {
    if (!BrowserPuppeteer.browser) {
        BrowserPuppeteer.browser = await BrowserPuppeteer.createBrowser();
    }

    return BrowserPuppeteer.browser;
  }
  

    static createBrowser = async () => {
    const browser = await launch({
      headless: false,
      args: [process.env.AGENT_LANG || '--lang=en-US,en'],
    })
    return browser;
  };

}