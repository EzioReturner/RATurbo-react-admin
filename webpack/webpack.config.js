const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

function _resolve(track) {
  return path.join(__dirname, '..', track);
}

const isEnvProduction = process.env.NODE_ENV === 'production';
module.exports = {
  entry: [paths.appIndexJs],
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
  module: {
    rules: [
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
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),

    new webpack.DefinePlugin({
      NODE_RA_ENV: JSON.stringify(process.env.NODE_LUCKY_ENV),
      REQUEST_SUCCESS: Number(0)
    }),

    new webpack.NamedModulesPlugin(),

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

    new AntDesignThemePlugin({
      antDir: _resolve('./node_modules/antd'),
      stylesDir: _resolve('./src/styles'),
      varFile: _resolve('./src/styles/variables.less'),
      mainLessFile: _resolve('./src/styles/entry.less'),
      outputFilePath: _resolve('./public/color.less'),
      themeVariables: ['@primary-color'],
      indexFileName: './public/index.html',
      generateOnce: false
    })
  ]
};
