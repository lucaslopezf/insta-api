import { logger } from './utils';
import { connectDb } from './config/db';
import { startServer } from './config/express';
import { createBrowser } from './config/browser';
import { LogEntry } from 'winston';

process.on('uncaughtException', (e) => {
  logger.error(e);
  process.exit(1);
});
process.on('unhandledRejection', (e) => {
  logger.log(e as LogEntry);
  process.exit(1);
});

startServer(+(process.env.HTTP_PORT || 8080));
connectDb();


