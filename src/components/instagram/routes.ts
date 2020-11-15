import { Request, Response } from 'express';
import { publicComment, likePost, makeAuth, followUser, unfollowUser, savePost } from './service';
import { HttpStatusCode } from '../../commons/constants';
import { Paths } from './utils/Paths';

export default [
  {
    path: Paths.Logged,
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        await makeAuth();
        res.status(HttpStatusCode.Ok).send('ok');
      },
    ],
  },
  {
    path: Paths.MakeComments,
    method: 'post',
    handler: [
      async ({ body }: Request, res: Response): Promise<void> => {
        await publicComment(body);
        res.status(HttpStatusCode.Ok).send('ok');
      },
    ],
  },
  {
    path: Paths.SavePost,
    method: 'post',
    handler: [
      async ({ body }: Request, res: Response): Promise<void> => {
        await savePost(body);
        res.status(HttpStatusCode.Ok).send('ok');
      },
    ],
  },
  {
    path: Paths.Like,
    method: 'post',
    handler: [
      async ({ body }: Request, res: Response): Promise<void> => {
        await likePost(body);
        res.status(HttpStatusCode.Ok).send('ok');
      },
    ],
  },
  {
    path: Paths.Follow,
    method: 'post',
    handler: [
      async ({ body }: Request, res: Response): Promise<void> => {
        await followUser(body);
        res.status(HttpStatusCode.Ok).send('ok');
      },
    ],
  },
  {
    path: Paths.Unfollow,
    method: 'post',
    handler: [
      async ({ body }: Request, res: Response): Promise<void> => {
        await unfollowUser(body);
        res.status(HttpStatusCode.Ok).send('ok');
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
