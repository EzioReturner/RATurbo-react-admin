# create-react-app 脚手架 Override

> 注意：2.0版本将不再使用 override 方案来调整webpack配置，3.0中将不再基于CRA构建项目

RA采用的是 `react-app-rewired` + `customize-cra` 的方案来修改 `CRA` 中的配置项。所有项目中的配置项可以在
 `config-overrides.js`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/config-overrides.js) 中找到。

> RA默认提供如下几个参数：

### antd 按需加载

```javascript
...
fixBabelImports('import', {
  libraryName: 'antd',
  libraryDirectory: 'es',
  style: true,
})
...
```

### 装饰器支持

```javascript
...
addBabelPlugin(
  [
    "@babel/plugin-proposal-decorators",
    {
      "legacy": true
    }
  ]
)
...
```

### antd 主题色

其中 `setting.theme` 来自 [主题](/cssStyle?id=主题) 中的配置。

```javascript
...
addLessLoader({
  javascriptEnabled: true,
  modifyVars: setting.theme,
})
...
```

> 以及开发和部署过程中的展示优化配置：

```javascript
...
config.plugins = [
  ...config.plugins,
  new DashboardPlugin(),
  new ProgressBarPlugin(),
]

config.externals = {
  ...config.externals,
  BMap: 'BMap'
}
...
```