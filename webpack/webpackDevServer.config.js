'use strict';

const ignoredFiles = require('react-dev-utils/ignoredFiles');
const paths = require('./paths');

const protocol = process.env.HTTPS || 'http';
const host = process.env.HOST || '0.0.0.0';
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/sockjs-node'
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = function() {
  return {
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    contentBasePublicPath: paths.publicUrlOrPath,
    watchContentBase: true,
    hot: true,
    transportMode: 'ws',
    injectClient: false,
    sockHost,
    sockPath,
    sockPort,
    publicPath: paths.publicUrlOrPath.slice(0, -1),
    quiet: true,
    watchOptions: {
      ignored: ignoredFiles(paths.appSrc)
    },
    https: protocol === 'https',
    host,
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicUrlOrPath
    }
  };
};
