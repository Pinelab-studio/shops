import winston, { format, Logger } from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';
import { VendureLogger } from '@vendure/core';

const { combine, errors } = format;

export class CloudLogger implements VendureLogger {
  private readonly name: string;

  constructor(private logger: Logger) {
    this.name = process.env.K_SERVICE || 'local';
  }

  error(message: string, context?: string, trace?: string) {
    this.logger.error(message, { trace, labels: this.getLabels(context) });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { labels: this.getLabels(context) });
  }

  info(message: string, context?: string) {
    this.logger.info(message, { labels: this.getLabels(context) });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { labels: this.getLabels(context) });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { labels: this.getLabels(context) });
  }

  private getLabels(context?: string) {
    return { module: context, name: this.name };
  }
}

const cloudLoggingWinston = new LoggingWinston({
  logName: `winston_${process.env.LOG_FILE}`,
});

const winstonLogger = winston.createLogger({
  format: combine(errors({ stack: true })),
  level: 'info',
  transports: [cloudLoggingWinston],
});

export const cloudLogger = new CloudLogger(winstonLogger);
