module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-logs|react-native-gesture-handler|@shopify/flash-list)/)',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '\\.(jpg|jpeg|png|gif|webp)$': '<rootDir>/__mocks__/imageMock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
  testPathIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js|jsx)'],
  verbose: true,
};
