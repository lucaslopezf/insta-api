import http from 'http';
import express from 'express';
import 'express-async-errors';
import { applyMiddleware, applyRoutes, logger } from '../utils';
import middlewares from '../middlewares';
import errorHandlers from '../middlewares/errorHandlers';
import routes from '../components';

const app = express();

export const startServer = (port: number): void => {
  applyMiddleware(middlewares, app);
  applyRoutes(routes, app);
  applyMiddleware(errorHandlers, app);

  const server = http.createServer(app);
  server.listen(port, () => logger.info(`Server is running ${port}`));
};