const webpack = require('webpack');
const { DllPlugin } = webpack;
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const paths = require('./paths');
const { library, libVersion } = require('../package.json');
const lib_version = libVersion ? libVersion.replace(/\./g, '_') : null;

module.exports = {
  entry: library,
  output: {
    filename: `[name].${lib_version}.dll.js`,
    path: paths.appBuildDll,
    library: '_dll_[name]'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        cache: true,
        sourceMap: false,
        parallel: true
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: paths.appBuildDll
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: paths.appDllManifest
    }),
    new DllPlugin({
      name: '_dll_[name]',
      path: path.join(paths.appDllManifest, '[name].manifest.json')
    })
  ]
};
