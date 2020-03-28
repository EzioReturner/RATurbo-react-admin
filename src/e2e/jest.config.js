const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  testRegex: '.mainLayout/*\\.e2e\\.js$',
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
  globals: {
    window: {
      addEventListener: function() {}
    },
    navigator: {
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
    },
    document: {
      body: {}
    }
  }
};
