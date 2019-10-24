const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const getClientEnvironment = require('./env');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const setting = require('../src/config/setting');
const postcssNormalize = require('postcss-normalize');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const IsAnalyze = process.argv.pop().includes('analyze');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

function _resolve(track) {
  return path.join(__dirname, '..', track);
}

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const publicPath = isEnvProduction ? paths.servedPath : isEnvDevelopment && '/';

  const publicUrl = isEnvProduction ? publicPath.slice(0, -1) : isEnvDevelopment && '';

  const env = getClientEnvironment(publicUrl);

  const getStyleLoaders = (cssOption, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: publicPath === './' ? { publicPath: '../../' } : {}
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOption
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap,
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009'
              },
              stage: 3
            }),
            postcssNormalize()
          ]
        }
      }
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: Object.assign(
          {},
          {
            sourceMap: isEnvProduction && shouldUseSourceMap
          },
          preProcessor === 'less-loader'
            ? {
                javascriptEnabled: true,
                modifyVars: setting.theme
              }
            : undefined
        )
      });
    }
    if (preProcessor === 'sass-loader') {
      loaders.push({
        loader: 'sass-resources-loader',
        options: {
          resources: [_resolve('./src/styles/color.scss'), _resolve('./src/styles/var.scss')]
        }
      });
    }
    return loaders;
  };

  const config = {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: isEnvDevelopment ? 'cheap-module-eval-source-map' : false,
    entry: [
      isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
      paths.appIndexJs
    ].filter(Boolean),
    output: {
      publicPath: publicPath,
      path: paths.appBuildDist,
      //文件名
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
      alias: {
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
    externals: {
      BMap: 'BMap'
    },
    module: {
      strictExportPresence: true,
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },

        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname
              },
              loader: require.resolve('eslint-loader')
            }
          ],
          include: paths.appSrc
        },
        {
          oneOf: [
            {
              test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
              use: [
                /* config.module.rule('images').use('url-loader') */
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'static/img/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },
            /* config.module.rule('svg') */
            {
              test: /\.(svg)(\?.*)?$/,
              use: [
                /* config.module.rule('svg').use('file-loader') */
                {
                  loader: 'file-loader',
                  options: {
                    name: 'static/img/[name].[hash:8].[ext]'
                  }
                }
              ]
            },
            /* config.module.rule('media') */
            {
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              use: [
                /* config.module.rule('media').use('url-loader') */
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'static/media/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },
            /* config.module.rule('fonts') */
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
              use: [
                /* config.module.rule('fonts').use('url-loader') */
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'static/fonts/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.appSrc,
              use: [
                'cache-loader',
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    plugins: [
                      [
                        require.resolve('babel-plugin-named-asset-import'),
                        {
                          loaderMap: {
                            svg: {
                              ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                            }
                          }
                        }
                      ]
                    ],
                    cacheDirectory: true,
                    cacheCompression: isEnvProduction,
                    compact: isEnvProduction
                  }
                }
              ]
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              use: [
                'cache-loader',
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    babelrc: false,
                    configFile: false,
                    compact: false,
                    presets: [
                      [require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]
                    ],
                    cacheDirectory: true,
                    cacheCompression: isEnvProduction,
                    sourceMaps: false
                  }
                }
              ]
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap
              }),
              sideEffects: true
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: {
                  mode: 'local',
                  localIdentName: '[local]--[hash:base64:5]'
                }
              })
            },
            /* config.module.rule('scss|sass') */
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap
                },
                'sass-loader'
              ),
              sideEffects: true
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: {
                    mode: 'local',
                    localIdentName: '[local]--[hash:base64:5]'
                  }
                },
                'sass-loader'
              )
            },
            /* config.module.rule('less') */
            {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getStyleLoaders(
                {
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  importLoaders: 2
                },
                'less-loader'
              )
            },
            {
              test: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: {
                    mode: 'local',
                    localIdentName: '[local]--[hash:base64:5]'
                  }
                },
                'less-loader'
              )
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
      minimize: isEnvProduction,
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
        minSize: 100000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            }
          },
          commons: {
            test: _resolve('./src/components'),
            name: 'components',
            minChunks: 2,
            reuseExistingChunk: true
          }
        }
      },
      runtimeChunk: true
    },
    plugins: [
      new webpack.ProgressPlugin(),
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml
          },
          isEnvProduction
            ? {
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
              }
            : undefined
        )
      ),

      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

      new webpack.DefinePlugin(env.stringified),

      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),

      isEnvProduction &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        }),
      // Generate a manifest file which contains a mapping of all asset filenames
      // to their corresponding output file so that tools can pick it up without
      // having to parse `index.html`.
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: publicPath,
        generate: (seed, files) => {
          const manifestFiles = files.reduce(function(manifest, file) {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);

          return {
            files: manifestFiles
          };
        }
      }),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      isEnvProduction &&
        new WorkboxWebpackPlugin.InjectManifest({
          swSrc: path.join(__dirname, '../public', 'ra-service-worker.js'),
          swDest: 'ra-service-worker.js',
          importWorkboxFrom: 'disabled'
        }),

      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
      }),

      new ForkTsCheckerWebpackPlugin({
        tslint: false,
        formatter: 'codeframe',
        checkSyntacticErrors: false,
        tsconfig: paths.appTsConfig,
        watch: paths.appSrc
      }),

      IsAnalyze &&
        isEnvProduction &&
        new BundleAnalyzerPlugin({
          analyzerPort: 8889
        })
    ].filter(Boolean),

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

  return config;
};
