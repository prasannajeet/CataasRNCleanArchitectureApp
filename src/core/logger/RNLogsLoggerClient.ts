import {logger, consoleTransport} from 'react-native-logs';
import {LoggerInterface} from './types';
/**
 * Implementation of LoggerInterface using react-native-logs
 */
export class RNLogsLoggerClient implements LoggerInterface {
  private logger: any;
  private globalContext: Record<string, any> = {};

  constructor() {
    this.logger = this.initializeLogger();
  }

  private initializeLogger(): any {
    const loggerConfig = {
      severity: 'debug',
      transport: [consoleTransport],
      async: true,
      dateFormat: 'time',
      printLevel: true,
      printDate: true,
      enabled: true,
    };

    return logger.createLogger(loggerConfig);
  }

  /**
   * Add global context to the message context
   */
  private enrichContext(context?: Record<string, any>): Record<string, any> {
    return {
      ...this.globalContext,
      ...context,
    };
  }

  /**
   * Format error objects into strings
   */
  private formatError(message: string | Error): string {
    if (message instanceof Error) {
      return `${message.name}: ${message.message}`;
    }
    return message;
  }

  /**
   * Debug level log
   */
  debug(message: string, context?: Record<string, any>): void {
    this.logger.debug(message, this.enrichContext(context));
  }

  /**
   * Info level log
   */
  info(message: string, context?: Record<string, any>): void {
    this.logger.info(message, this.enrichContext(context));
  }

  /**
   * Warning level log
   */
  warn(message: string, context?: Record<string, any>): void {
    this.logger.warn(message, this.enrichContext(context));
  }

  /**
   * Error level log
   */
  error(message: string | Error, context?: Record<string, any>): void {
    const formattedMessage = this.formatError(message);
    const errorContext =
      message instanceof Error ? {...context, stack: message.stack} : context;

    this.logger.error(formattedMessage, this.enrichContext(errorContext));
  }

  /**
   * Fatal level log
   */
  fatal(message: string | Error, context?: Record<string, any>): void {
    const formattedMessage = this.formatError(message);
    const errorContext =
      message instanceof Error ? {...context, stack: message.stack} : context;

    this.logger.fatal(formattedMessage, this.enrichContext(errorContext));
  }

  /**
   * Set global context to be included with all logs
   */
  setGlobalContext(context: Record<string, any>): void {
    this.globalContext = {...this.globalContext, ...context};
  }
}
