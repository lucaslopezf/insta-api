import { Page } from 'puppeteer';
import {
  buttonErrorComment,
  buttonFollowBackFromPost,
  buttonFollowFromPost,
  buttonSubmit,
  textAreaComment,
} from '../../../commons/constants';
import { logger, random } from '../../../utils';
import { ErrorComment } from '../models';

export const followUserFromPage = async (page: Page, min: number = 12213, max: number = 35123): Promise<void> => {
  const buttonsFollow = await page.$x(buttonFollowFromPost);
  const timeWaitBetweenFollows = random(min, max);
  if (buttonsFollow) {
    for (const buttonFollow of buttonsFollow) {
      await buttonFollow.click();
      await page.waitFor(timeWaitBetweenFollows);
    }
  }

  const buttonsFollowBack = await page.$x(buttonFollowBackFromPost);
  if (buttonsFollowBack) {
    for (const buttonFollowBack of buttonsFollowBack) {
      await buttonFollowBack.click();
      await page.waitFor(timeWaitBetweenFollows);
    }
  }
};

//TODO: This is bad. Fix scope commentCounter,errorCounter
let commentCounter = 0;
let errorCounter = 0;
export const commentPost = async (page: Page, message: string): Promise<void> => {
  const breakBot = 3;
  const comment = `${message}`;
  const timeWaitTypeComment = random(125, 1324);
  const timeWaitBetweenComments = random(timeWaitTypeComment + 5217, 32542);

  const writeCommentResult = await writeComment(comment, page, timeWaitTypeComment);

  if (errorCounter >= breakBot) throw new Error('three or more comments failed');

  if (writeCommentResult) logger.info(`commentCounter: ${commentCounter}`);

  await page.waitFor(timeWaitBetweenComments);
};

export const writeComment = async (
  comment: string,
  page: Page,
  timeWaitTypeComment: number = 111111
): Promise<boolean> => {
  let result = true;

  await page.waitForSelector(textAreaComment);
  await page.type(textAreaComment, comment, { delay: timeWaitTypeComment });

  await page.click(buttonSubmit);

  const resultFindTryAgain = await findTryAgainButton(comment, page);

  if (!resultFindTryAgain) {
    commentCounter++;
    return result;
  }

  errorCounter++;
  const errorLog: ErrorComment = {
    comment: comment,
    commentCounter,
    errorCounter,
  };
  logger.error(errorLog);

  return false;
};

export const findTryAgainButton = async (comment: string, page: Page): Promise<boolean> => {
  const selector = `//${buttonErrorComment}`;
  let result = true;

  await page
    .waitForXPath(selector, {
      timeout: 4000,
    })
    .catch((error) => {
      result = false;
    });
  return result;
};
