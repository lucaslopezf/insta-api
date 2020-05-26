import { configLoggerRequestResponse } from '../utils';
import { Router } from 'express';
import expressWinston from 'express-winston';

export const handleLogger = (router: Router): void => {
  // Log the whole request and response body
  const body = 'body';
  expressWinston.requestWhitelist.push(body);
  expressWinston.responseWhitelist.push(body);

  router.use(expressWinston.logger(configLoggerRequestResponse));
};
