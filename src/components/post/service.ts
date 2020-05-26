import {Page} from 'puppeteer';
import { HTTP400Error } from '../../utils/error/HTTP400Error';
import { getPage,authenticate } from '../puppeteer/service';
import { Post } from './Post';

export const publicMessage = async ({url,messages}: Post): Promise<void> => {
  
  if (!isInstagram(url)) throw new HTTP400Error("Ingresar una url de instagram");
  
  const isAuth = await authenticate();
  if(!isAuth) throw new HTTP400Error("Usuario y/o contraseña incorrecto");
  
  const page = await getPage(url);
  console.log(messages);
  //for (const message of messages) commentPost(page,message);
  await page.waitFor(10000);
};


const commentPost = async (page: Page,message:string): Promise<void> => {
  console.log(message);
  await page.waitForSelector('textarea');
  await page.type('textarea', message);

  await page.click('button[type="submit"]');

  await page.waitForNavigation();
};

const isInstagram = (url:string): boolean => {
    return true;
};