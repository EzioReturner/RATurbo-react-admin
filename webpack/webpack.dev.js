const webpack = require('webpack');
const path = require('path');
const paths = require('./paths');
const baseConfig = require('./webpack.config');
const styleLoaders = require('./style.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const setting = require('../src/config/setting');

const { module: _module, plugins } = baseConfig;
function _resolve(track) {
  return path.join(__dirname, '..', track);
}
module.exports = Object.assign(baseConfig, {
  mode: 'development',
  output: {
    path: paths.appBuildDist,
    publicPath: '/',
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: require.resolve('eslint-friendly-formatter'),
              eslintPath: require.resolve('eslint'),
              resolvePluginsRelativeTo: __dirname
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: _resolve('./src')
      },
      {
        oneOf: [
          ..._module.rules,
          ...styleLoaders(),
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                compact: false
              }
            }
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /(react|react-dom|react-dom-router|babel-polyfill|mobx)/,
          priority: 100,
          name: 'vendors'
        }
      }
    }
  },
  plugins: [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),

    new InterpolateHtmlPlugin({
      NODE_ENV: 'development',
      PUBLIC_URL: '',
      SITE_NAME: setting.siteName
    })
  ]
});
