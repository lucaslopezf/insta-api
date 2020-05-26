import {Page} from 'puppeteer';
import { HTTP400Error } from '../../utils/error/HTTP400Error';
import { getPage,authenticate } from '../puppeteer/service';
import { Post } from './Post';

export const publicMessage = async ({url,message}: Post): Promise<void> => {
  
  if (!isInstagram(url)) throw new HTTP400Error("Ingresar una url de instagram");
  
  const page = await getPage(url);
  await authenticate(process.env.INSTAGRAM_USERNAME,process.env.INSTAGRAM_PASSWORD);
  commentPost(page,message);
};


const commentPost = async (page: Page,message:string): Promise<void> => {
    
  await page.waitForSelector('textarea');
  await page.type('textarea', message);

  await page.click('button[type="submit"]');

  await page.waitFor(4000);
};

const isInstagram = (url:string): boolean => {
    return false;
};