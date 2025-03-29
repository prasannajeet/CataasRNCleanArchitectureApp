/**
 * Log levels supported by JobberLogger
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

/**
 * Log message with metadata
 */
export interface LogMessage {
  message: string;
  level: LogLevel;
  timestamp?: Date;
  context?: Record<string, any>;
}

/**
 * Logger interface that any implementation must satisfy
 */
export interface LoggerInterface {
  /**
   * Log a debug message
   */
  debug(message: string, context?: Record<string, any>): void;

  /**
   * Log an info message
   */
  info(message: string, context?: Record<string, any>): void;

  /**
   * Log a warning message
   */
  warn(message: string, context?: Record<string, any>): void;

  /**
   * Log an error message
   */
  error(message: string | Error, context?: Record<string, any>): void;

  /**
   * Log a fatal message
   */
  fatal(message: string | Error, context?: Record<string, any>): void;

  /**
   * Set global context for all log messages
   */
  setGlobalContext(context: Record<string, any>): void;

}