import { HTTP400Error,logger,random } from '../../utils';
import { getPage,authenticate } from '../puppeteer/service';
import { textAreaComment,buttonSubmit,buttonErrorComment,buttonLike,buttonFollowFromPost,buttonSavePost,buttonFollowingFromPost,buttonUnfollow} from '../../commons/constants';
import { Post,ErrorComment } from './models';
import { Page } from 'puppeteer';


export const publicComment = async ({url, customizableComments}: Post): Promise<void> => {
  const page = await getPage(url);
  logger.info(`Total comments to post: ${customizableComments.length}`);
  for (const comment of customizableComments) await commentPost(page,comment);
};

export async function makeAuth(): Promise<void> {
  const isAuth = await authenticate();
  if(!isAuth) throw new HTTP400Error("Inccorect username or password");
}

export async function likePost ({url} :Post): Promise<void>  {
  const page = await getPage(url);
  logger.info(`Like to: ${url}`);
  page.click(buttonLike); 
  await page.waitFor(2000);
}

export async function followUser ({url} :Post): Promise<void>  {
  const page = await getPage(url);
  logger.info(`Follow the url: ${url}`);
  page.click(buttonFollowFromPost);
  await page.waitFor(2000);
}

export async function savePost ({url} :Post): Promise<void>  {
  const page = await getPage(url);
  logger.info(`Save the url: ${url}`);
  page.click(buttonSavePost);
  await page.waitFor(2000);
}

export async function unfollowUser ({url} :Post): Promise<void>  {
  const page = await getPage(url);
  logger.info(`Unfollow the url: ${url}`);
  page.click(buttonFollowingFromPost); 
  await page.waitFor(2000);
  page.click(buttonUnfollow); 
  await page.waitFor(2000);
}

let commentCounter = 0;
let errorCounter = 0;
const commentPost = async (page: Page,message:string): Promise<void> => {
  const breakBot = 3;
  const comment = `${message}`;
  const timeWaitTypeComment = random(125,1324);
  const timeWaitBetweenComments = random(timeWaitTypeComment+5217,32542);

  const writeCommentResult = await writeComment(comment,page,timeWaitTypeComment);
  
  if(errorCounter >= breakBot) throw new Error("three or more comments failed");
  
  if(writeCommentResult) logger.info(`commentCounter: ${commentCounter}`);
  
  await page.waitFor(timeWaitBetweenComments);
};

const writeComment = async (comment:string,page:Page,timeWaitTypeComment:number = 111111): Promise<boolean> => {
  let result = true;

  await page.waitForSelector(textAreaComment);
  await page.type(textAreaComment, comment,{ delay: timeWaitTypeComment });
  
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