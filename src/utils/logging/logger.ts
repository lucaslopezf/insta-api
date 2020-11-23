import winston, { createLogger, Logger, format } from 'winston';
import dotenv from 'dotenv';
dotenv.config();

export const transports = {
  console: new winston.transports.Console(),
};

const healthPath = process.env.LOGGER_APP_READINESS || '/health';
const pingPath = process.env.LOGGER_APP_LIVENESS || '/ping';
const levelLogger = process.env.LOGGER_APP_LEVEL || 'info';

export const logger: Logger = createLogger({
  level: levelLogger,
  defaultMeta: { service: process.env.SERVICE_NAME },
  format: format.combine(format.errors({ stack: true }), format.timestamp(), format.json()),
  transports: [transports.console],
});

winston.exceptions.handle(transports.console);

//Config log request and response
const formatMessage = 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}';
export const configLoggerRequestResponse = {
  ignoredRoutes: [healthPath, pingPath],
  transports: [transports.console],
  format: format.combine(format.timestamp(), format.metadata(), format.json()),
  meta: true,
  baseMeta: { service: process.env.SERVICE_NAME },
  msg: formatMessage,
};
