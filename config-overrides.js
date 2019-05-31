const {
  override,
  fixBabelImports,
  addBabelPlugin,
  addLessLoader,
  removeModuleScopePlugin,
} = require('customize-cra');
const clearConsole = require('react-dev-utils/clearConsole');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const Env = process.env.NODE_ENV;
// 自定义修改 webpack 配置项
const editWebpackConfig = () => config => {
  config.plugins = [
    ...config.plugins,
    new DashboardPlugin(),
  ]

  if (Env === 'production') {
    clearConsole();
    config.plugins.push(
      new ProgressBarPlugin({
        format: ' RA building [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false,
        width: 150,
      })
    )
  }

  config.externals = {
    ...config.externals,
    BMap: 'BMap'
  }

  return config;
}

module.exports = {
  webpack: override(
    // 添加 antd 按需加载
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    // 添加装饰器支持
    addBabelPlugin(
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ),
    // jsx 支持
    addBabelPlugin(
      [
        "@babel/plugin-syntax-jsx",
      ]
    ),
    // 配置 antd 主题色
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#fb4491',
        '@link-color': '#fb4491',
        '@border-radius-base': '2px',
        '@font-size-base': '13px'
      },
    }),
    // 移除 import src路径限制
    removeModuleScopePlugin(),
    // 编辑 webpack
    editWebpackConfig()
  )
}