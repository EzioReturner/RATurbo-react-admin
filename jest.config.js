const path = require('path');

module.exports = {
  verbose: true,
  rootDir: path.resolve(__dirname, './'),
  testRegex: './*\\.test\\.js$',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js'],
  preset: 'jest-puppeteer',
  moduleNameMapper: {
    '^@assets(.(js|ts|tsx|jsx|json))$': '<rootDir>/src/assets$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@models(.*)$': '<rootDir>/src/models$1',
    '^@config(.*)$': '<rootDir>/src/config$1',
    '^@store(.*)$': '<rootDir>/src/store$1',
    '^@api(.*)$': '<rootDir>/src/api$1',
    '\\.(css|less|scss|sass|jpg|jpeg|png)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(tsx|js|ts|jsx)?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  moduleFileExtensions: ['js', 'json', 'es6', 'ts', 'tsx', 'jsx', 'json', 'node']
};
