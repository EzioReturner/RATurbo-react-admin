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
      antDir: _resolve('./node_modules/antd'), //antd包位置
      stylesDir: _resolve('./src/styles/theme'), //主题文件所在文件夹
      varFile: _resolve('./src/styles/theme/variables.less'), // 自定义默认的主题色
      mainLessFile: _resolve('./src/styles/theme/index.less'), // 项目中其他自定义的样式（如果不需要动态修改其他样式，该文件可以为空）
      outputFilePath: _resolve('./public/color.less'), //提取的less文件输出到什么地方
      themeVariables: ['@primary-color', '@link-color'], //要改变的主题变量
      indexFileName: './public/index.html', // index.html所在位置
      generateOnce: false
    })
  ]
};
