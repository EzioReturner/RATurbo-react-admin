
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const {
  ProgressPlugin,
  // IgnorePlugin,
  NamedModulesPlugin,
  DefinePlugin,
  DllReferencePlugin
} = webpack;
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const postcssNormalize = require('postcss-normalize');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HappyPack = require('happypack');
const { library, libVersion } = require('../package.json');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const setting = require('../client/config/setting');
// const CompressionPlugin = require('compression-webpack-plugin');
// const notifier = require('node-notifier');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const lib_version = libVersion.replace(/\./g, '_');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const PORT = parseInt(process.env.PORT, 10) || 9528;
const HOST = process.env.HOST || '0.0.0.0';

const IsAnalyze = process.argv.pop().includes('analyze');

const { original } = JSON.parse(process.env.npm_config_argv);
const IsUseDll = original.pop().includes('useDll');

//拼接路径
function resolve(track) {
  return path.join(__dirname, '..', track);
}

module.exports = webpackEnv => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const publicPath = isEnvProduction
  ? paths.servedPath
    : isEnvDevelopment && '/';
  
  const publicUrl = isEnvProduction
    ? publicPath.slice(0, -1)
    : isEnvDevelopment && '';
  // Get environment variables to inject into our app.
  const env = getClientEnvironment(publicUrl);

  // const createHappyPlugin = (id, threads, loaders) =>
  //   new HappyPack({
  //     id: id,
  //     loaders: loaders,
  //     threads: threads
  //   });

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
    return loaders;
  };

  const config = {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    entry: resolve('./client/index.tsx'),
    resolve: {
      extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
      alias: {
        '@': resolve('./client'),
        '@components': resolve('./client/components'),
        '@styles': resolve('./client/styles'),
        '@utils': resolve('./client/utils'),
        '@views': resolve('./client/views'),
        '@constants': resolve('./client/constants'),
        '@config': resolve('./client/config'),
        '@store': resolve('./client/store'),
        '@api': resolve('./client/api'),
        '@assets': resolve('./client/assets')
      }
    },
    output: {
      publicPath: './',
      path: paths.appBuildDist,
      //文件名
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js'
    },
    externals: {
      BMap: 'BMap'
    },
    devtool: isEnvDevelopment ? 'cheap-module-eval-source-map' : false,
    module: {
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
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: paths.appSrc,
        },
        {
          oneOf: [
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                ),
                plugins: [
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
                        },
                      },
                    },
                  ],
                ],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                cacheCompression: isEnvProduction,
                compact: isEnvProduction,
              },
            },
            // Process any JS outside of the app with Babel.
            // Unlike the application JS, we only compile the standard ES features.
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
                    { helpers: true },
                  ],
                ],
                cacheDirectory: true,
                cacheCompression: isEnvProduction,
                // If an error happens in a package, it's possible to be
                // because it was compiled. Thus, we don't want the browser
                // debugger to show the original code. Instead, the code
                // being evaluated would be much more helpful.
                sourceMaps: false,
              },
            },
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
            /* config.module.rule('css') */
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
              }),
              sideEffects: true,
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]--[hash:base64:5]'
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
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                'sass-loader'
              ),
              sideEffects: true,
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: {
                    mode: 'local',
                    localIdentName: '[name]__[local]--[hash:base64:5]'
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
                    localIdentName: '[name]__[local]--[hash:base64:5]'
                  }
                },
                'less-loader'
              )
            }
          ]
        }
      ]
    },
    performance: {
      maxEntrypointSize: 2000000,
      maxAssetSize: 2000000
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
                  // `inline: false` forces the sourcemap to be output into a
                  // separate file
                  inline: false,
                  // `annotation: true` appends the sourceMappingURL to the end of
                  // the css file, helping the browser find the sourcemap
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
        minSize: 20000,
        cacheGroups: {
          // vendor: {
          //   test: /[\\/]node_modules[\\/]/,
          //   name(module) {
          //     // get the name. E.g. node_modules/packageName/not/this/part.js
          //     // or node_modules/packageName
          //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
          //     // npm package names are URL-safe, but some servers don't like @ symbols
          //     return `npm.${packageName.replace('@', '')}`;
          //   }
          // }
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'commons',
            chunks: 'all'
          }
        }
      },
      runtimeChunk: true
    },
    plugins: [

      // show rate of progress
      new ProgressPlugin(),


      // relative path
      new NamedModulesPlugin(),

      // module files mapping
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

      // // css minimized
      isEnvProduction &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        }),

      isEnvDevelopment &&
        new ForkTsCheckerWebpackPlugin({
          vue: true,
          tslint: false,
          formatter: 'codeframe',
          checkSyntacticErrors: false
        }),

      // html entry plugin
      new HtmlWebpackPlugin({
        title: 'WVTS',
        filename: 'index.html',
        template: paths.appHtml,
        inject: true
      }),

      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

      new DefinePlugin(env.stringified),

      // compile info plugin
      isEnvDevelopment &&
        new FriendlyErrorsPlugin({
          // compile success info setting
          compilationSuccessInfo: {
            messages: [
              `Your application is running at:` +
                '\n\n' +
                `\t- Local:   ${chalk.cyan(`http://localhost:${PORT}`)}  \n` +
                `\t- Network: ${chalk.cyan(`http://${HOST}:${PORT}`)} \n`
            ]
          },
          // when compile error
          onErrors: function(severity, errors) {
            if (severity !== 'error') {
              return;
            }
            // const error = errors[0];
            // const filename = error.file.split('!').pop();
            // // error notifier
            // notifier.notify({
            //   title: 'WVTS',
            //   message: severity + ': ' + error.name,
            //   subtitle: filename || '',
            //   icon: path.join(__dirname, 'WVTS.png')
            // });
          }
        }),

      IsAnalyze &&
        isEnvProduction &&
        new BundleAnalyzerPlugin({
          analyzerPort: 8889
        }),

      isEnvProduction && new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      // // gzip
      // isEnvProduction &&
      //   new CompressionPlugin({
      //     test: /\.js$|\.html$|.\css/,
      //     threshold: 10240,
      //     deleteOriginalAssets: false
      //   }),
    ].filter(Boolean)
  };
  IsUseDll &&
    config.plugins.push(
      ...Object.keys(library).map(name => {
        return new DllReferencePlugin({
          manifest: require(`./dll/${name}.manifest.json`)
        });
      }),
      new AddAssetHtmlPlugin(
        Object.keys(library).map(name => {
          return {
            filepath: require.resolve(path.resolve(`build/dll/${name}.${lib_version}.dll.js`)),
            outputPath: 'static/dll',
            publicPath: './static/dll'
          };
        })
      )
    );
  return config;
};
