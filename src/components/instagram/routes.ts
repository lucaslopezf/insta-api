import { Request, Response } from 'express';
import { publicComment, likePost, makeAuth, followUser, unfollowUser, savePost } from './service';
import { HttpStatusCode } from '../../commons/constants';
import { Paths } from './utils/constants';

export default [
  {
    path: Paths.Logged,
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        res.status(HttpStatusCode.Ok).send('ok');
        await makeAuth();
      },
    ],
  },
  {
    path: Paths.MakeComments,
    method: 'post',
    handler: [
      async ({ body }: Request, res: Response): Promise<void> => {
        res.status(HttpStatusCode.Ok).send('ok');
        await publicComment(body);
      },
    ],
  },
  {
    path: Paths.SavePost,
    method: 'post',
    handler: [
      async ({ body }: Request, res: Response): Promise<void> => {
        res.status(HttpStatusCode.Ok).send('ok');
        await savePost(body);
      },
    ],
  },
  {
    path: Paths.Like,
    method: 'post',
    handler: [
      async ({ body }: Request, res: Response): Promise<void> => {
        res.status(HttpStatusCode.Ok).send('ok');
        await likePost(body);
      },
    ],
  },
  {
    path: Paths.Follow,
    method: 'post',
    handler: [
      async ({ body }: Request, res: Response): Promise<void> => {
        res.status(HttpStatusCode.Ok).send('ok');
        await followUser(body);
      },
    ],
  },
  {
    path: Paths.Unfollow,
    method: 'post',
    handler: [
      async ({ body }: Request, res: Response): Promise<void> => {
        res.status(HttpStatusCode.Ok).send('ok');
        await unfollowUser(body);
      },
    ],
  },
  {
    path: Paths.Ping,
    method: 'get',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        res.status(HttpStatusCode.Ok).send('pong');
      },
    ],
  },
];
