import { Headers } from '../commons/constants/';
import { Request, Response, Router, NextFunction } from 'express';
import parser from 'body-parser';
import compression from 'compression';
import { v1 as uuidv1 } from 'uuid';

export const handleBodyRequestParsing = (router: Router): void => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router: Router): void => {
  router.use(compression());
};

export const checkHeaders = (router: Router): void => {
  router.use((req: Request, res: Response, next: NextFunction) => {
    const correlationId = req.header(Headers.CorrelationId);

    !correlationId
      ? res.setHeader(Headers.CorrelationId, uuidv1())
      : res.setHeader(Headers.CorrelationId, correlationId);

    next();
  });
};
