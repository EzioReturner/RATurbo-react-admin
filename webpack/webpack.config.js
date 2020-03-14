const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const postcssNormalize = require('postcss-normalize');
const setting = require('../src/config/setting');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { library, libVersion } = require('../package.json');
const lib_version = libVersion.replace(/\./g, '_');
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const { original } = JSON.parse(process.env.npm_config_argv);
const useDll = original.includes('--dll');
const IsAnalyze = original.includes('--analyze');
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

function _resolve(track) {
  return path.join(__dirname, '..', track);
}

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const publicPath = isEnvProduction ? paths.servedPath : isEnvDevelopment && '/';

  const publicUrl = isEnvProduction ? publicPath.slice(0, -1) : isEnvDevelopment && '';

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
    entry: [paths.appIndexJs],
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
      modules: ['node_modules'],
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
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
    externals: {
      BMap: 'BMap'
    },
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map',
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
            {
              test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
              use: [
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
              test: /\.(svg)(\?.*)?$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: 'static/img/[name].[hash:8].[ext]'
                  }
                }
              ]
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  cacheCompression: isEnvProduction,
                  compact: isEnvProduction
                }
              }
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
      new webpack.ProgressPlugin(),

      new webpack.NamedModulesPlugin(),

      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),

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

      new InterpolateHtmlPlugin({
        NODE_ENV: process.env.NODE_ENV || 'development',
        PUBLIC_URL: publicUrl
      }),

      new ForkTsCheckerWebpackPlugin({
        tslint: false,
        formatter: 'codeframe',
        checkSyntacticErrors: false,
        tsconfig: paths.appTsConfig,
        watch: paths.appSrc
      }),

      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order/
      }),

      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        }),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      IsAnalyze &&
        isEnvProduction &&
        new BundleAnalyzerPlugin({
          analyzerPort: 8888
        })
    ].filter(Boolean)
  };
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
