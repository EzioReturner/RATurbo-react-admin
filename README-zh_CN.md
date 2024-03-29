<p align="center">
  <a href="https://github.com/EzioReturner/ra-turbo">
    <img alt="RATurbo-admin" height="64" src="./public/favicon.ico">
  </a>
</p>

<h1 align="center">RA Turbo</h1>

<div align="center">
  基于react，antd的前端中后台解决方案
</div>

[English](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/README-zh_CN.md) | 简体中文

## 在线预览

- [ra-turbo](https://ezioreturner.github.io/RATurbo-dist/dist/index.html#/dashboard)

## 文档

- [wiki](http://docs.raturbo.com)


## 依赖模块

- [react](https://facebook.github.io/react/)(<span style="color: rgb(243,121,52);">搭积木的必备玩具)
- [react-router](https://react-guide.github.io/react-router-cn/)(<span style="color: rgb(243,121,52);">react路由，5.x的版本</span>)
- [react-hot-loader](https://github.com/gaearon/react-hot-loader)(<span style="color: rgb(243,121,52);">react热替换工具</span>)
- [mobx](https://github.com/mobxjs/mobx)(<span style="color: rgb(243,121,52);">Mobx是一个功能强大,上手非常容易的状态管理工具</span>)
- [antd](https://ant.design/index-cn)(<span style="color: rgb(243,121,52);">蚂蚁金服开源的react ui组件框架</span>)
- [axios](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http请求模块</span>)
- [echarts](https://github.com/apache/incubator-echarts)(<span style="color: rgb(243,121,52);">百度开源可视化图表工具</span>)
- [nprogress](https://github.com/rstacruz/nprogress)(<span style="color: rgb(243,121,52);">顶部加载条</span>)
- [animate.css](https://daneden.github.io/animate.css/)(<span style="color: rgb(243,121,52);">css动画库</span>)
- [moment](http://momentjs.cn/)(<span style="color: rgb(243,121,52);">时间工具库</span>)
- [lodash](https://www.lodashjs.com/)(<span style="color: rgb(243,121,52);">是一个一致性、模块化、高性能的 JavaScript 实用工具库。</span>)
- 其余省略

## 功能模块

- layout
- navigator
- components
    - router
    - layout setting
    - transition hoc
    - async loader
    - loading 
    - i18n
- UI component
    - program
    - gallery
    - form page
    - list page
    - result page
    - exception page
- visual chart
- view
    - sign in
    - dashboard
- scalable & mobile support 
- base on TypeScript

## 如何启动

1. 下载或克隆项目源码

```bash
git clone https://github.com/EzioReturner/RATurbo-react-admin.git my-ra
cd my-ra
```

2. yarn 或者 npm安装相关包文件

```bash
yarn install
```

3. 启动项目

```bash
yarn start
```

4. 启动完成后打开浏览器访问 [http://localhost:9527](http://localhost:9527)，如果需要更改启动端口，可在 .env 文件中配置。

5. 打包项目

```bash
yarn build
```

## 支持环境

现代浏览器。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | 
|IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions
