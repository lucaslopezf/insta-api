import { Response, NextFunction } from 'express';
import { HTTPClientError } from './HTTPClientError';
import { HTTP401Error, HTTP404Error } from './HTTP400Error';
import { logger } from '../';
import { HttpStatusErrorCode, Environment, ErrorDescription, ErrorCode } from '../../commons/constants';

export const notFoundError = (): void => {
  throw new HTTP404Error();
};

export const unauthorizedError = (): void => {
  throw new HTTP401Error();
};

export const clientError = (err: Error, res: Response, next: NextFunction): void => {
  if (err instanceof HTTPClientError) {
    logger.warn(err);
    res.status(err.statusCode).send({
      message: err.message,
      code: err.code,
    });
  } else {
    next(err);
  }
};

export const serverError = (err: Error, res: Response, next: NextFunction): void => {
  logger.error(err);
  if (process.env.NODE_ENV === Environment.Production) {
    res.status(HttpStatusErrorCode.InternalServerError).send(ErrorDescription.InternalServerError);
  } else {
    res.status(HttpStatusErrorCode.InternalServerError).send({
      message: err.message,
      code: ErrorCode.InternalServerError,
    });
  }
};
