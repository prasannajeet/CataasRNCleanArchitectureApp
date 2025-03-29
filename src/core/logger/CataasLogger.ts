import {LoggerInterface, LogLevel} from './types';
import {RNLogsLoggerClient} from './RNLogsLoggerClient';

/**
 * CataasLogger - Main logging abstraction layer for the application
 * This class provides logging capabilities throughout the application,
 * hiding the implementation details of the actual logging library used.
 */
export class CataasLogger implements LoggerInterface {
  private static instance: CataasLogger;
  private client: LoggerInterface;

  private constructor() {
    // Currently using react-native-logs, but this could be changed to any other library
    // without affecting the rest of the application
    this.client = new RNLogsLoggerClient();
  }

  /**
   * Get singleton instance of CataasLogger
   */
  public static getInstance(): CataasLogger {
    if (!CataasLogger.instance) {
      CataasLogger.instance = new CataasLogger();
    }
    return CataasLogger.instance;
  }

  /**
   * Log a debug message
   */
  debug(message: string, context?: Record<string, any>): void {
    this.client.debug(message, context);
  }

  /**
   * Log an info message
   */
  info(message: string, context?: Record<string, any>): void {
    this.client.info(message, context);
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: Record<string, any>): void {
    this.client.warn(message, context);
  }

  /**
   * Log an error message
   */
  error(message: string | Error, context?: Record<string, any>): void {
    this.client.error(message, context);
  }

  /**
   * Log a fatal message
   */
  fatal(message: string | Error, context?: Record<string, any>): void {
    this.client.fatal(message, context);
  }

  /**
   * Set global context data to be included in all logs
   */
  setGlobalContext(context: Record<string, any>): void {
    this.client.setGlobalContext(context);
  }
}
