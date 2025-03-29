import * as reactNative from 'react-native';

// Mock for react-native-logs
jest.mock('react-native-logs', () => {
  return {
    createLogger: jest.fn().mockImplementation(() => ({
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    })),
  };
});

// Mock for react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({}));

// Mock for navigation
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    })),
    useRoute: jest.fn(() => ({
      params: {
        catId: 'test-cat-id',
      },
    })),
  };
});

// Mock for axios
jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: {use: jest.fn(), eject: jest.fn()},
        response: {use: jest.fn(), eject: jest.fn()},
      },
      defaults: {
        baseURL: '',
        headers: {
          common: {},
        },
      },
    })),
  };
});

// Set up globals for React Native
global.__DEV__ = true;

// Global settings
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  log: jest.fn(),
};

// Use fake timers to ensure promises resolve in tests
jest.useFakeTimers();

// Suppress React Native console warnings
reactNative.LogBox.ignoreLogs = jest.fn();
