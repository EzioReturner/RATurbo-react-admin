const path = require('path');
const config = require('../jest.config');

module.exports = Object.assign({}, config, {
  rootDir: path.resolve(__dirname, '../'),
  testRegex: './*\\.e2e\\.js$'
});
