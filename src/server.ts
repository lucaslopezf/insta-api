import { logger } from './utils';
import { startServer } from './config/express';
import dotenv from 'dotenv';
dotenv.config();

process.on('uncaughtException', (e) => {
  logger.error(e);
  process.exit(1);
});
process.on('unhandledRejection', (e) => {
  logger.error({ e });
  process.exit(1);
});

startServer(+(process.env.HTTP_PORT || 8080));
