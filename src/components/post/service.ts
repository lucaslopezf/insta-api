import { HTTP400Error,logger,random } from '../../utils';
import { getPage,authenticate } from '../puppeteer/service';
import { separator } from '../../commons/constants';
import { Post,ErrorComment } from './models';
import { Page } from 'puppeteer';
import { permutations } from './combination';

const makeComments = (users:string[], quantity:number) : string[] => {
  let comments: string[] = quantity == 1 ? users : permutations(users,quantity-1);
  return comments.sort(() => Math.random() - 0.5);
}

export const publicComment = async ({url,quantity,comment : { customizableComments,users,hashtag},unique}: Post): Promise<void> => {
  
  const commentsPost = customizableComments ?? makeComments(users,quantity);
  
  if (!isInstagram(url)) throw new HTTP400Error("Enter an instagram link");
  const isAuth = await authenticate();
  
  if(!isAuth) throw new HTTP400Error("Inccorect username or password");
  
  const page = await getPage(url);
  logger.info(`Total comments to post: ${commentsPost.length}`);
  for (const comment of commentsPost) await commentPost(page,comment,hashtag,unique);
  
};


let commentCounter = 0;
let errorCounter = 0;
const commentPost = async (page: Page,message:string,hashtag: string = '',unique:Boolean = true): Promise<void> => {
  if(unique){
    const messageSplit = message.split(separator);
    let uniqueMessage = [...new Set(messageSplit)]; 
    if(uniqueMessage.length < messageSplit.length) return;
  }
  const textTareaComment = 'textarea';
  const buttonSubmit = 'button[type="submit"]';
  const textErrorComment = 'Reintentar'
  const buttonErrorComment = `button[contains(text(), '${textErrorComment}')]`;
  const breakBot = 3;
  const timeWaitComment = random(125,1324);
  const timeWait = random(timeWaitComment+5217,32542);
  await page.waitForSelector(textTareaComment);
  const comment = `${hashtag} ${message}`;
  await page.type(textTareaComment, comment,{ delay: timeWaitComment });
  
  await page.click(buttonSubmit);
  commentCounter++;
  await page.click(buttonErrorComment).catch( error => {
    errorCounter++;
    commentCounter--;
    const errorLog : ErrorComment = {
      comment: comment,
      commentCounter,
      errorCounter
    }
    logger.error(errorLog)
  });
  if(errorCounter >= breakBot) throw new HTTP400Error("three or more comments failed");
  
  logger.info(`commentCounter: ${commentCounter}`);
  await page.waitFor(timeWait);
};

const isInstagram = (url:string): boolean => {
    //TODO: Implementar
    return true;
};