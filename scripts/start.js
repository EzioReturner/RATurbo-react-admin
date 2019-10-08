'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require('../build/env');

const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../build/paths');
const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const chalk = require('react-dev-utils/chalk');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('../build/webpack.config');
const createDevServerConfig = require('../build/webpackDevServer.config');
const { createCompiler } = require('./devUtils');

const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 9527;
const HOST = process.env.HOST || '0.0.0.0';

(function startClient() {
  const config = configFactory('development');
  const devServerConfig = createDevServerConfig();
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const urls = prepareUrls(protocol, HOST, DEFAULT_PORT);

  const devSocket = {
    warnings: warnings => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
    errors: errors => devServer.sockWrite(devServer.sockets, 'errors', errors)
  };
  const compiler = createCompiler(config, urls, devSocket);

  const devServer = new WebpackDevServer(compiler, devServerConfig);
  // Launch WebpackDevServer.
  devServer.listen(DEFAULT_PORT, HOST, err => {
    if (err) {
      return console.log(err);
    }
    if (isInteractive) {
      clearConsole();
    }

    console.log(chalk.cyan('Starting the development server...\n'));
    openBrowser(urls.localUrlForBrowser);
  });
})();
