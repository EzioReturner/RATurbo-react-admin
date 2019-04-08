<p align="center">
  <a href="https://github.com/EzioReturner/ra-turbo">
    <img alt="antd-admin" height="64" src="./public/favicon.ico">
  </a>
</p>

<h1 align="center">RA Turbo</h1>

<div align="center">
  A front-end solution web applications.
</div>

## Preview &nbsp; 预览

- <a href="http://ra-turbo.leanapp.cn" target="_blank">ra-turbo</a>

## wiki 文档  （施工中）

## dependencies &nbsp; 依赖模块

项目基于 create-react-app 搭建，相关依赖链接如下

- [react](https://facebook.github.io/react/) (我就不多说了吧~...)
- [react-router](https://react-guide.github.io/react-router-cn/)(<span style="color: rgb(243,121,52);">react路由，4.x的版本，如果还使用3.x的版本，请切换分支（ps:分支不再维护）</span>)
- [mobx](https://github.com/mobxjs/mobx)(Mobx是一个功能强大,上手非常容易的状态管理工具)
- [antd](https://ant.design/index-cn)(<span style="color: rgb(243,121,52);">蚂蚁金服开源的react ui组件框架</span>)
- [axios](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http请求模块</span>)
- [echarts](https://github.com/apache/incubator-echarts)(<span style="color: rgb(243,121,52);">百度开源可视化图表工具</span>)
- [nprogress](https://github.com/rstacruz/nprogress)(<span style="color: rgb(243,121,52);">顶部加载条</span>)
- [animate.css](http://daneden.me/animate)(<span style="color: rgb(243,121,52);">css动画库</span>)
- [moment](http://momentjs.cn/)(<span style="color: rgb(243,121,52);">时间工具库</span>)
- 其余省略

## function module &nbsp; 功能模块

- 首页
    - 完整布局
- 导航菜单
    - 顶部导航
    - 左侧菜单
- 组件
    - 路由
      - route 权限校验
      - 异常处理
      - 路由配置渲染route
      - 路由配置渲染菜单
    - 异步懒加载模块
    - loading遮罩模块
    - i18n 国际化
      - 支持多语言翻译
- UI组件
    - 场景
      - 分析页
      - 工作台
      - 监控台
    - 画廊
    - 表单页 
    - 列表页 (施工中)
    - 详情页 (施工中)
    - 结果页 (施工中)
    - 异常页
    - 个人页 (施工中)
- 图表
    - echarts图表
- 页面
    - 登录页面
    - 第三方登录 (施工中)
- 多分辨率 & 移动端适配 

## How to start &nbsp; 如何启动

1. Clone project code.

```bash
git clone https://github.com/EzioReturner/RATurbo-react-admin.git my-ra
cd my-ra
```

2. Installation dependence.

```bash
yarn install  Or  npm install
```

3. Start local server.

```bash
yarn run ra  Or  npm run ra
```

4. After the startup is completed, open your browser and visit [http://localhost:9527](http://localhost:9527), If you want to change the  port, you can configure it in the `.env` file.
