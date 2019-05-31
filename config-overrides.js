const {
  override,
  fixBabelImports,
  addBabelPlugin,
  addLessLoader,
  removeModuleScopePlugin,
} = require('customize-cra');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addBabelPlugin(
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ),
  addBabelPlugin(
    [
      "@babel/plugin-syntax-jsx",
    ]
  ),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#fb4491',
      '@link-color': '#fb4491',
      '@border-radius-base': '2px',
      '@font-size-base': '13px'
    },
  }),
  removeModuleScopePlugin()
);