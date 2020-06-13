import { HTTP400Error,logger,random,sleep } from '../../utils';
import { getPage,authenticate } from '../puppeteer/service';
import { separator,textTareaComment,buttonSubmit,buttonErrorComment} from '../../commons/constants';
import { Post,ErrorComment } from './models';
import { Page } from 'puppeteer';
import { permutations } from './combination';

const makePermutationsComments = (users:string[], quantity:number) : string[] => {
  let comments: string[] = quantity == 1 ? users : permutations(users,quantity-1);
  return comments.sort(() => Math.random() - 0.5);
}

export const publicComment = async ({url,quantity,comment : { customizableComments,users,hashtag},unique}: Post): Promise<void> => {
  
  const commentsPost = customizableComments ?? makePermutationsComments(users,quantity);
  
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
  //TODO: Poorly performance, refactor this 
  if(unique){
    const messageSplit = message.split(separator);
    let uniqueMessage = [...new Set(messageSplit)]; 
    if(uniqueMessage.length < messageSplit.length) return;
  }
  
  const breakBot = 3;
  const comment = `${hashtag} ${message}`;
  const timeWaitTypeComment = random(125,1324);
  const timeWaitBetweenComments = random(timeWaitTypeComment+5217,32542);

  const writeCommentResult = await writeComment(comment,page,timeWaitTypeComment);
  
  if(errorCounter >= breakBot) throw new Error("three or more comments failed");
  
  if(writeCommentResult) logger.info(`commentCounter: ${commentCounter}`);
  
  await page.waitFor(timeWaitBetweenComments);
};

const isInstagram = (url:string): boolean => {
    //TODO: Implementar
    return true;
};

const writeComment = async (comment:string,page:Page,timeWaitTypeComment:number = 111111): Promise<boolean> => {
  let result = true;

  await page.waitForSelector(textTareaComment);
  await page.type(textTareaComment, comment,{ delay: timeWaitTypeComment });
  
  await page.click(buttonSubmit);
  
  const resultFindTryAgain = await findTryAgainButton(comment,page);

  if(!resultFindTryAgain){
    commentCounter++;
    return result;
  } 
  
  errorCounter++;
  const errorLog : ErrorComment = {
    comment: comment,
    commentCounter,
    errorCounter
  }
  logger.error(errorLog)
    
  return false;
};


const findTryAgainButton = async (comment:string,page:Page): Promise<boolean> => {
  const selector = `//${buttonErrorComment}`;
  let result = true;
  
  await page.waitForXPath(selector , {
    timeout: 4000
  }).catch( error => {
    result = false;
  })
  return result;
};