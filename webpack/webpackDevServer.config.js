'use strict';

const paths = require('./paths');

const protocol = process.env.HTTPS || 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function(proxy) {
  return {
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    publicPath: '/',
    quiet: true,
    https: protocol === 'https',
    host,
    open: false,
    overlay: {
      errors: true,
      warnings: false
    },
    inline: true,
    disableHostCheck: true
    // historyApiFallback: {
    //   disableDotRule: true
    // },
  };
};
