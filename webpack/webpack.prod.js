const webpack = require('webpack');
const path = require('path');
const paths = require('./paths');
const baseConfig = require('./webpack.config');
const styleLoaders = require('./style.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');
const setting = require('../src/config/setting');

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
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              exclude: [/node_modules/, /\.test.js$/],
              use: {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  cacheCompression: true,
                  compact: true
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
        chunks: 'initial', // 默认只对入口文件进行split chunks，使用 all 时会引起路由懒加载拆出过多子组件，增加请求数
        name: true,
        cacheGroups: {
          // 体积较大的chunk单独打包
          npmLib: {
            chunks: 'async',
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            minSize: 4000000,
            priority: 20
          },
          // 入口共享chunks
          vendors: {
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            name: 'vendors'
          },
          // 异步共享chunks
          'async-vendors': {
            chunks: 'async',
            test: /[\\/]node_modules[\\/]/,
            name: 'async-vendors',
            priority: 5
          },
          // RA组件chunks
          components: {
            chunks: 'all',
            test: _resolve('./src/components'),
            name: 'components',
            minChunks: 2,
            reuseExistingChunk: true,
            priority: 15
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
        },
        // 内联runtimeChunk
        inlineSource: 'runtime~.+\\.js'
      }),

      new InlineSourcePlugin(),

      new InterpolateHtmlPlugin({
        NODE_ENV: 'production',
        PUBLIC_URL: paths.servedPath.slice(0, -1),
        SITE_NAME: setting.siteName
      }),

      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      }),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  });

  IsAnalyze &&
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 8888
      })
    );

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
