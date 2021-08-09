'use strict';

const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require('./paths');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const appPackageJson = require(paths.appPackageJson);

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
    path: undefined,
    pathinfo: true,
    publicPath: '/',
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    jsonpFunction: `webpackJsonp${appPackageJson.name}`,
    globalObject: 'this',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: paths.appHtml
    }),

    new InterpolateHtmlPlugin({
      NODE_ENV: 'development',
      PUBLIC_URL: '',
      SITE_NAME: setting.siteName
    }),

    new webpack.HotModuleReplacementPlugin(),

    new ReactRefreshWebpackPlugin({
      overlay: {
        entry: webpackDevClientEntry,
        module: reactRefreshOverlayEntry,
        sockIntegration: false
      }
    }),

    new CaseSensitivePathsPlugin(),

    new WatchMissingNodeModulesPlugin(paths.appNodeModules),

    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync('typescript', {
        basedir: paths.appNodeModules
      }),
      async: true,
      checkSyntacticErrors: true,
      tsconfig: paths.appTsConfig,
      reportFiles: ['../**/src/**/*.{ts,tsx}', '**/src/**/*.{ts,tsx}'],
      silent: true,
      formatter: undefined
    }),

    new ESLintPlugin({
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      formatter: require.resolve('react-dev-utils/eslintFormatter'),
      eslintPath: require.resolve('eslint'),
      failOnError: false,
      context: paths.appSrc,
      cache: true,
      cacheLocation: path.resolve(paths.appNodeModules, '.cache/.eslintcache'),
      cwd: paths.appPath,
      resolvePluginsRelativeTo: __dirname,
      baseConfig: {
        extends: [require.resolve('eslint-config-react-app/base')],
        rules: {
          ...(!hasJsxRuntime && {
            'react/react-in-jsx-scope': 'error'
          })
        }
      }
    })
  ]
});
