const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, './'),
  testRegex: './*\\.test\\.js$',
  setupFiles: ['<rootDir>/jest.setup.js'],
  preset: 'jest-puppeteer',
  moduleNameMapper: {
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@models(.*)$': '<rootDir>/src/models$1',
    '^@config(.*)$': '<rootDir>/src/config$1'
  },
  transform: {
    '^.+\\.(tsx|js|ts)?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  globals: {}
};
