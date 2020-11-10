import { Request, Response } from 'express';
import { publicComment, likePost, makeAuth, followUser, unfollowUser, savePost } from './service';
import { HttpStatusCode } from '../../commons/constants';

export default [
  {
    path: '/make_comments/',
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        await publicComment(req.body);
        res.status(HttpStatusCode.Ok).send('ok');
      },
    ],
  },
  {
    path: '/save_post/',
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        await savePost(req.body);
        res.status(HttpStatusCode.Ok).send('ok');
      },
    ],
  },
  {
    path: '/logged/',
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        await makeAuth();
        res.status(HttpStatusCode.Ok).send('ok');
      },
    ],
  },
  {
    path: '/like/',
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        await likePost(req.body);
        res.status(HttpStatusCode.Ok).send('ok');
      },
    ],
  },
  {
    path: '/follow/',
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        await followUser(req.body);
        res.status(HttpStatusCode.Ok).send('ok');
      },
    ],
  },
  {
    path: '/unfollow/',
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        await unfollowUser(req.body);
        res.status(HttpStatusCode.Ok).send('ok');
      },
    ],
  },
  {
    path: '/ping',
    method: 'get',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        res.status(HttpStatusCode.Ok).send('pong');
      },
    ],
  },
];
