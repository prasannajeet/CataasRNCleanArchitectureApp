import {CataasLogger} from './CataasLogger';

export const setupCataasLogger = (): CataasLogger => {
  // Configure logger with custom settings if needed
  const logger = CataasLogger.getInstance();

  if (__DEV__) {
    // Set up development logging configuration
  } else {
    // Set up production logging configuration
  }

  return logger;
};

export const cataasLogger = setupCataasLogger();
