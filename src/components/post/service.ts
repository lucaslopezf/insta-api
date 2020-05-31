import {Page} from 'puppeteer';
import { HTTP400Error } from '../../utils/error/HTTP400Error';
import { getPage,authenticate } from '../puppeteer/service';
import { Post } from './Post';
import { permutaciones } from './combination';
import cron from 'node-cron';

const random = (min:number, max:number) : number => {
  return min + Math.random() * (max - min);
}

export const publicMessage = async ({url,users}: Post): Promise<void> => {
  const messages = permutaciones(users,users.length-1)

  if (!isInstagram(url)) throw new HTTP400Error("Ingresar una url de instagram");
  const isAuth = await authenticate();
  
  if(!isAuth) throw new HTTP400Error("Usuario y/o contraseña incorrecto");

  const timeWaitSchedule = random(1000,2000);

  cron.schedule(`0 */${timeWaitSchedule} * * * *`, async () :Promise<void> => {
    for (const message of messages) await commentPost(url,message);
  });
  
};


const commentPost = async (url: string,message:string): Promise<void> => {
  const page = await getPage(url);
  const timeWaitComment = random(123,1231);
  const timeWait = random(2123,15431);
  const textTareaComment = 'textarea';

  await page.waitForSelector(textTareaComment);
  await page.type(textTareaComment, message,{ delay: timeWaitComment });
  
  await page.click('button[type="submit"]');
  await page.waitFor(timeWait);
};

const isInstagram = (url:string): boolean => {
    //TODO: Implementar
    return true;
};