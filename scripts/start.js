'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.PORT = 9009;

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfigFactory = require('../webpack/webpack.config');
const createDevServerConfig = require('../webpack/webpackDevServer.config');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 9009;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log();
}

(function startClient() {
  const config = webpackConfigFactory('development');
  const devServerConfig = createDevServerConfig();
  const compiler = Webpack(config);
  const devServer = new WebpackDevServer(compiler, devServerConfig);

  devServer.listen(DEFAULT_PORT, HOST, err => {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.cyan('\n\nStarting the development server...\n'));
  });
})();
