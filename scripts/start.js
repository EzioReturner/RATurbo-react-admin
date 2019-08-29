'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.PORT = 9528;

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfigFactory = require('../build/webpack.config');
const createDevServerConfig = require('../build/webpackDevServer.config');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 9528;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(`If this was unintentional, check that you haven't mistakenly set it in your shell.`);
  console.log(`Learn more here: ${chalk.yellow('https://bit.ly/CRA-advanced-config')}`);
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

  // const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  // const urls = prepareUrls(protocol, HOST, port);
  // // Load proxy config
  // const proxySetting = require(paths.appPackageJson).proxy;
  // const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
  // // Serve webpack assets generated by the compiler over a web server.
  // const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);
})();
