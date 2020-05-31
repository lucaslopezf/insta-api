import { logger } from './utils';
import { startServer } from './config/express';

process.on('uncaughtException', (e) => {
  logger.error(e);
  process.exit(1);
});
process.on('unhandledRejection', (e) => {
  console.log(e);
  process.exit(1);
});

startServer(+(process.env.HTTP_PORT || 8080));