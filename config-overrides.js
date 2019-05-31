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
const setting = require('./src/config/setting');
const workboxPlugin = require('workbox-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const Env = process.env.NODE_ENV;
const IsAnalyze = process.argv.pop().indexOf('analyze') > -1;
// 自定义修改 webpack 配置项
const editWebpackConfig = () => config => {
  config.plugins = [
    ...config.plugins,
    new DashboardPlugin(),
  ];
  if (Env === 'production') {
    clearConsole();
    config.plugins.push(
      new ProgressBarPlugin({
        format: ' RA building [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false,
        width: 150,
      })
    );
    const workboxConfigProd = {
      swSrc: path.join(__dirname, 'public', 'ra-service-worker.js'),
      swDest: 'ra-service-worker.js',
      importWorkboxFrom: 'disabled'
    };
    // 删除默认的WorkboxWebpackPlugin配置
    config = removePreWorkboxWebpackPluginConfig(config);
    // 加入配置
    config.plugins.push(new workboxPlugin.InjectManifest(workboxConfigProd));

    IsAnalyze && config.plugins.push(
      new BundleAnalyzerPlugin()
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
      modifyVars: setting.theme,
    }),
    // 移除 import src路径限制
    removeModuleScopePlugin(),
    // 编辑 webpack
    editWebpackConfig()
  )
}

// 此函数用来找出 默认配置中的 WorkboxWebpackPlugin， 并把它删除
function removePreWorkboxWebpackPluginConfig(config) {
  const preWorkboxPluginIndex = config.plugins.findIndex((element) => {
    return Object.getPrototypeOf(element).constructor.name === 'GenerateSW'
  })
  if (preWorkboxPluginIndex !== -1) {
    config.plugins.splice(preWorkboxPluginIndex, 1)
  }
  return config
}