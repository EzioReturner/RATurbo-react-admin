const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  testRegex: '.mainLayout/*\\.e2e\\.js$',
  preset: 'jest-puppeteer',
  moduleNameMapper: {
    // 主要用于与webpack的resolve.alias匹配，注意正则写法
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '^@components(.*)$': '<rootDir>/src/components$1'
  },
  transform: {
    '^.+\\.(tsx|js|ts)?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  }
};
