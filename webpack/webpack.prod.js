const webpack = require('webpack');
const path = require('path');
const paths = require('./paths');
const baseConfig = require('./webpack.config');
const styleLoaders = require('./styleLoaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { module: _module, plugins } = baseConfig;

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const { original } = JSON.parse(process.env.npm_config_argv);
const useDll = original.includes('--dll');
const IsAnalyze = original.includes('--analyze');
const { library, libVersion } = require('../package.json');
const lib_version = libVersion.replace(/\./g, '_');

module.exports = function() {
  function _resolve(track) {
    return path.join(__dirname, '..', track);
  }
  const config = Object.assign(baseConfig, {
    mode: 'production',
    output: {
      publicPath: paths.servedPath,
      path: paths.appBuildDist,
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js'
    },
    devtool: shouldUseSourceMap ? 'source-map' : false,
    module: {
      rules: [
        {
          oneOf: [
            ..._module.rules,
            ...styleLoaders(),
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
          sourceMap: shouldUseSourceMap,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: shouldUseSourceMap
              ? {
                  inline: false,
                  annotation: true
                }
              : false
          }
        })
      ],
      splitChunks: {
        chunks: 'all',
        name: true,
        maxInitialRequests: Infinity,
        cacheGroups: {
          npmLib: {
            test: /[\\/]node_modules[\\/]/,
            minSize: 4000000,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: -8
          },
          components: {
            minSize: 100000,
            test: _resolve('./src/components'),
            name: 'components',
            minChunks: 2,
            reuseExistingChunk: true,
            priority: -11
          },
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: -9
          }
        }
      },
      runtimeChunk: true
    },
    plugins: [
      ...plugins,

      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),

      new InterpolateHtmlPlugin({
        NODE_ENV: 'production',
        PUBLIC_URL: paths.servedPath.slice(0, -1)
      }),

      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      }),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      IsAnalyze &&
        new BundleAnalyzerPlugin({
          analyzerPort: 8888
        })
    ].filter(Boolean)
  });

  useDll &&
    config.plugins.push(
      ...Object.keys(library).map(name => {
        return new webpack.DllReferencePlugin({
          manifest: require(`${paths.appDllManifest}/${name}.manifest.json`)
        });
      }),
      new AddAssetHtmlPlugin(
        Object.keys(library).map(name => {
          return {
            filepath: require.resolve(
              path.resolve(`${paths.appBuildDll}/${name}.${lib_version}.dll.js`)
            ),
            outputPath: 'static/dll',
            publicPath: './static/dll'
          };
        })
      )
    );

  return config;
};
