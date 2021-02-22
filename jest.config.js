const { defaults } = require('jest-config');

module.exports = {
  collectCoverage: true,
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001],
      },
    },
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  cacheDirectory: '/tmp/jest_insurance-frontend',
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: './test-reports', outputName: 'junit.xml' }],
    [
      'jest-sonar',
      {
        outputDirectory: './test-reports',
        outputName: 'sonar.xml',
      },
    ],
  ],
};
