import { Request, Response } from 'express';
import { publicMessage } from './service';
import { HttpStatusCode } from '../../commons/constants';

export default [
  {
    path: '/post/',
    method: 'post',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        await publicMessage(req.body);
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
