import { HTTP400Error, logger, sleep } from '../../utils';
import { getPage, authenticate } from '../puppeteer/service';
import { buttonLike, buttonSavePost, buttonFollowingFromPost, buttonUnfollow } from '../../commons/constants';
import { Post } from './models';
import { commentPost, followUserFromPage } from './utils/functions';
import { FollowUser } from './models/FollowUser';
import { InstagramCommon } from './models/InstagramCommon';

export const makeAuth = async (): Promise<void> => {
  const isAuth = await authenticate();
  if (!isAuth) throw new HTTP400Error('Incorrect username or password');
};

export const publicComment = async ({ url, customizableComments }: Post): Promise<void> => {
  const page = await getPage(url);
  logger.info(`Total comments to post: ${customizableComments.length}`);
  for (const comment of customizableComments) await commentPost(page, comment);
};

export const followUser = async ({ url, timeWait, sleepTime = 0 }: FollowUser): Promise<void> => {
  const page = await getPage(url);
  logger.info(`Follow the url: ${url}`);
  await sleep(sleepTime);
  await followUserFromPage(page, timeWait?.min, timeWait?.max);
};

export const unfollowUser = async ({ url }: InstagramCommon): Promise<void> => {
  const page = await getPage(url);
  logger.info(`Unfollow the url: ${url}`);
  await page.click(buttonFollowingFromPost);
  await page.waitFor(2000);
  await page.click(buttonUnfollow);
};

export const likePost = async ({ url }: InstagramCommon): Promise<void> => {
  const page = await getPage(url);
  logger.info(`Like to: ${url}`);
  await page.click(buttonLike);
};

export const savePost = async ({ url }: InstagramCommon): Promise<void> => {
  const page = await getPage(url);
  logger.info(`Save the url: ${url}`);
  await page.click(buttonSavePost);
};
