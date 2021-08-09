'use strict';

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const paths = require('./paths');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const styleLoaders = require('./style.loaders');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

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

function _resolve(track) {
  return path.join(__dirname, '..', track);
}

const isEnvDevelopment = process.env.NODE_ENV === 'development';

const baseConfig = {
  devtool: 'cheap-module-source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@': _resolve('./src'),
      '@components': _resolve('./src/components'),
      '@styles': _resolve('./src/styles'),
      '@utils': _resolve('./src/utils'),
      '@views': _resolve('./src/views'),
      '@constants': _resolve('./src/constants'),
      '@config': _resolve('./src/config'),
      '@store': _resolve('./src/store'),
      '@api': _resolve('./src/api'),
      '@assets': _resolve('./src/assets'),
      '@models': _resolve('./src/models')
    }
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: [/\.avif$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: imageInlineSizeLimit,
              mimetype: 'image/avif',
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: imageInlineSizeLimit,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              presets: [
                [
                  require.resolve('babel-preset-react-app'),
                  {
                    runtime: hasJsxRuntime ? 'automatic' : 'classic'
                  }
                ]
              ],
              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                      }
                    }
                  }
                ],
                isEnvDevelopment && require.resolve('react-refresh/babel')
              ].filter(Boolean),
              cacheDirectory: true,
              cacheCompression: false,
              compact: false
            }
          },
          {
            test: /\.(icon\.svg)(\?.*)?$/,
            use: [
              {
                loader: 'babel-loader'
              },
              {
                loader: '@svgr/webpack',
                options: {
                  babel: false,
                  icon: true
                }
              }
            ]
          },
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve('babel-preset-react-app/dependencies'),
                  { helpers: true }
                ]
              ],
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: shouldUseSourceMap,
              inputSourceMap: shouldUseSourceMap
            }
          },
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
    minimize: false,
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
          keep_classnames: false,
          keep_fnames: false,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        sourceMap: shouldUseSourceMap
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
        },
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }]
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      name: true
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    }
  },

  plugins: [
    new ModuleNotFoundPlugin(paths.appPath),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],

  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: false
};

module.exports = baseConfig;
