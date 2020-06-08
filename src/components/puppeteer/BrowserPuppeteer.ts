import {Browser,launch as launchPuppeteer } from 'puppeteer';
import { launch } from 'puppeteer-core';

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
      const headless = false;
      const args = [process.env.AGENT_LANG || '--lang=en-US,en']; 
      
      if(process.env.BROWSER_PATH){
        return await launch({
          headless: headless,
          args: args,
          executablePath: process.env.BROWSER_PATH,
          userDataDir: "./user_data"
        }) 
      }
    
      return await launchPuppeteer({
      headless: headless,
      args: args,
      userDataDir: "./user_data"
    })
  };

}