import winston, { createLogger, Logger } from 'winston';
import { serviceName, CommonPath } from '../../commons/constants';

export const transports = {
  console: new winston.transports.Console(),
};

const levelLogger = process.env.LOGGER_APP_LEVEL || 'info';

export const logger: Logger = createLogger({
  level: levelLogger,
  defaultMeta: { service: serviceName },
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [transports.console],
});

winston.exceptions.handle(transports.console);

//Config log request and response
const formatMessage = 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}';
export const configLoggerRequestResponse = {
  ignoredRoutes: [CommonPath.Health],
  transports: [transports.console],
  format: winston.format.combine(winston.format.timestamp(), winston.format.metadata(), winston.format.json()),
  meta: true,
  baseMeta: { service: serviceName },
  msg: formatMessage
};