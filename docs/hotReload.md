# 使用热替换

3.0版本中集成了 [react-hot-loader](https://github.com/gaearon/react-hot-loader) 热替换功能，可以在不刷新页面的前提下替换前端变更。

## babel 配置

```javascript
module.exports = {
  plugins: [
    ...
    'react-hot-loader/babel'
  ],
  presets: [
    ['@babel/preset-env', { targets: { browsers: 'last 2 versions' } }],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ]
};
```

## webpackdevserver

请确保配置中打开 `hot` 选项

```javascript
module.exports = function(proxy) {
  return {
    ...
    hot: true
  };
};
```

## 在react中使用

由于在RA中，默认使用了懒加载，所以需要对 export 的模块包裹 hot 组件，同步引入的组件则不需要此项操作。

```javascript
import { hot } from 'react-hot-loader';
const App = () => (
  <div>App</div>
);

export default hot(module)(App);
```

> 需要注意的是:在生产环境中，建议对export做判断 

```javascript
export default process.env.NODE_ENV === 'production' ? App : hot(module)(App);
```