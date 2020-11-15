import { HTTP400Error, logger, sleep } from '../../utils';
import { getPage, authenticate } from '../puppeteer/service';
import { buttonLike, buttonSavePost, buttonFollowingFromPost, buttonUnfollow } from '../../commons/constants';
import { Post } from './models';
import { commentPost, followUserFromPage } from './utils/functions';

export const makeAuth = async (): Promise<void> => {
  const isAuth = await authenticate();
  if (!isAuth) throw new HTTP400Error('Incorrect username or password');
};

export const publicComment = async ({ url, customizableComments }: Post): Promise<void> => {
  const page = await getPage(url);
  logger.info(`Total comments to post: ${customizableComments.length}`);
  for (const comment of customizableComments) await commentPost(page, comment);
};

export const followUser = async ({ url, timeWait: { min, max } }: Post): Promise<void> => {
  const page = await getPage(url);
  logger.info(`Follow the url: ${url}`);
  //await sleep(2000);
  await followUserFromPage(page, min, max);
};

export const unfollowUser = async ({ url }: Post): Promise<void> => {
  const page = await getPage(url);
  logger.info(`Unfollow the url: ${url}`);
  await sleep(10000);
  await page.click(buttonFollowingFromPost);
  await page.waitFor(2000);
  await page.click(buttonUnfollow);
  await page.waitFor(2000);
};

export const likePost = async ({ url }: Post): Promise<void> => {
  const page = await getPage(url);
  logger.info(`Like to: ${url}`);
  await page.click(buttonLike);
  await page.waitFor(2000);
};

export const savePost = async ({ url }: Post): Promise<void> => {
  const page = await getPage(url);
  logger.info(`Save the url: ${url}`);
  await page.click(buttonSavePost);
  await page.waitFor(2000);
};
