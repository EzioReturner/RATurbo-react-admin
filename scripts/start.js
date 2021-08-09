'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.PORT = 9527;

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const createDevServerConfig = require('../webpack/webpackDevServer.config');
const createCompiler = require('./utils/createCompiler');
const devConfig = require('../webpack/webpack.dev');
const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 9527;
const HOST = process.env.HOST || '0.0.0.0';

(function startClient() {
  const devServerConfig = createDevServerConfig();

  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const urls = prepareUrls(protocol, HOST, DEFAULT_PORT);

  const devSocket = {
    warnings: warnings =>
      devServer.sockWrite(devServer.sockets, 'warnings', warnings),
    errors: errors => devServer.sockWrite(devServer.sockets, 'errors', errors)
  };

  const compiler = createCompiler(devConfig, urls, devSocket);
  const devServer = new WebpackDevServer(compiler, devServerConfig);

  devServer.listen(DEFAULT_PORT, HOST, err => {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.cyan('\nStarting the development server...\n'));

    openBrowser(urls.localUrlForBrowser);
  });
})();
