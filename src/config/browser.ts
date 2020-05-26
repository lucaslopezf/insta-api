import {Browser,launch} from 'puppeteer';

export const createBrowser = async () : Promise<Browser>  => {
  const browser = await launch({
    headless: false,
    args: [process.env.AGENT_LANG || '--lang=en-US,en'],
  })
  return browser;
};