const webpack = require('webpack');
const path = require('path');
const paths = require('./paths');
const baseConfig = require('./webpack.config');
const styleLoaders = require('./style.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const setting = require('../src/config/setting');

const webpackDevClientEntry = require.resolve(
  'react-dev-utils/webpackHotDevClient'
);

const reactRefreshOverlayEntry = require.resolve(
  'react-dev-utils/refreshOverlayInterop'
);

const baseConfig = require('./webpack.base');

const { plugins, resolve: _resolve } = baseConfig;

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

module.exports = Object.assign(baseConfig, {
  mode: 'development',
  bail: false,
  entry: [webpackDevClientEntry, paths.appIndexJs],
  resolve: {
    ..._resolve,
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [
        paths.appPackageJson,
        reactRefreshOverlayEntry
      ])
    ]
  },
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
