<p align="center">
  <a href="https://github.com/EzioReturner/ra-turbo">
    <img alt="antd-admin" height="64" src="./public/favicon.ico">
  </a>
</p>

<h1 align="center">RA Turbo</h1>

<div align="center">
  A front-end solution web applications.
</div>

## 在线预览

- [ra-turbo](http://ra-turbo.leanapp.cn)

## 使用文档

- [wiki](https://ezioreturner.github.io/RATurbo-react-admin/#/)

## 依赖模块

项目基于 create-react-app v3.0 搭建，相关依赖链接如下

- [react](https://facebook.github.io/react/)(搭积木的必备玩具)
- [create-react-app](https://github.com/facebook/create-react-app)(官方推荐脚手架)
- [react-router](https://react-guide.github.io/react-router-cn/)(<span style="color: rgb(243,121,52);">react路由，4.x的版本</span>)
- [mobx](https://github.com/mobxjs/mobx)(Mobx是一个功能强大,上手非常容易的状态管理工具)
- [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard)(记住，要是背后有人偷看到这个画面，就假装在为美国国家航天局工作。)
- [antd](https://ant.design/index-cn)(<span style="color: rgb(243,121,52);">蚂蚁金服开源的react ui组件框架</span>)
- [axios](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http请求模块</span>)
- [echarts](https://github.com/apache/incubator-echarts)(<span style="color: rgb(243,121,52);">百度开源可视化图表工具</span>)
- [nprogress](https://github.com/rstacruz/nprogress)(<span style="color: rgb(243,121,52);">顶部加载条</span>)
- [animate.css](https://daneden.github.io/animate.css/)(<span style="color: rgb(243,121,52);">css动画库</span>)
- [moment](http://momentjs.cn/)(<span style="color: rgb(243,121,52);">时间工具库</span>)
- [lodash](https://www.lodashjs.com/)(<span style="color: rgb(243,121,52);">是一个一致性、模块化、高性能的 JavaScript 实用工具库。</span>)
- 其余省略


## 功能模块

- 首页
    - 完整布局
- 导航菜单
    - 顶部导航
    - 左侧菜单
      - 菜单伸缩
- 组件
    - 路由
      - route 权限校验
      - 异常处理
      - 路由配置渲染route
      - 路由配置渲染菜单
    - 过渡动画
    - 基础页面布局
    - 异步懒加载模块
    - loading遮罩模块
    - i18n 国际化
      - 支持多语言翻译
    - 简易封装了echarts
- UI组件
    - 场景
      - 分析页
      - 工作台
      - 监控台
    - 画廊
    - 表单页 
    - 列表页
    - 详情页 (施工中)
    - 结果页
    - 异常页
    - 个人页 (施工中)
- 图表
    - echarts图表
- 页面
    - 登录页面
    - 第三方登录 (施工中)
- 多分辨率 & 移动端适配 
- 支持TypeScript

## 如何启动

1. 下载或克隆项目源码

```bash
git clone https://github.com/EzioReturner/RATurbo-react-admin.git my-ra
cd my-ra
```

2. yarn 或者 npm安装相关包文件

```bash
yarn install  Or  npm install
```

3. 启动项目

```bash
yarn run ra  Or  npm run ra
```

4. 启动完成后打开浏览器访问 [http://localhost:9527](http://localhost:9527)，如果需要更改启动端口，可在 .env 文件中配置。

5. 打包项目

```bash
yarn build or npm run build
```

## 支持环境

现代浏览器。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | 
|IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions
