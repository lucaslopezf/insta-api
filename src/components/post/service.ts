import {Page} from 'puppeteer';
import { HTTP400Error,logger } from '../../utils';
import { getPage,authenticate } from '../puppeteer/service';
import { separator } from '../../commons/constants';
import { Post } from './Post';
import { permutaciones } from './combination';
import cron from 'node-cron';

const random = (min:number, max:number) : number => {
  return min + Math.random() * (max - min);
}

const makeComments = (users:string[], quantity:number) : string[] => {
  let comments: string[] = quantity == 1 ? users : permutaciones(users,quantity-1);
  return comments.sort(Math.random);
}

export const publicComment = async ({url,users,quantity,unique}: Post): Promise<void> => {
  
  const comments = makeComments(users,quantity);

  if (!isInstagram(url)) throw new HTTP400Error("Ingresar una url de instagram");
  const isAuth = await authenticate();
  
  if(!isAuth) throw new HTTP400Error("Usuario y/o contraseña incorrecto");
  let counterComments = 0;

  for (const comment of comments) { 
    await commentPost(url,comment,unique);
    counterComments++;
  }
  logger.info(`Total comments: ${counterComments}`);

  // cron.schedule(`31 */15 6 * * *`, async () :Promise<void> => {
  //   for (const message of messages) await commentPost(url,message,unique);
  // });
  
};


const commentPost = async (url: string,message:string,unique:Boolean = true): Promise<void> => {
  if(unique){
    const messageSplit = message.split(separator);
    let uniqueMessage = [...new Set(messageSplit)]; 
    if(uniqueMessage.length < messageSplit.length) return;
  }
  const page = await getPage(url);
  const timeWaitComment = random(123,1231);
  const timeWait = random(5123,13324);
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