# 路由与菜单

RA中的路由为了方便管理，使用了中心化的方式，在 `router.config.js`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/src/config/router.config.js) 统一配置和管理。

## 运作模块

RA通过框架中的组件实现了以下几个模块：
- `路由管理` 按照约定的语法在 `router.config.js` 中配置路由信息。
- `菜单渲染` RA的菜单组件会根据路由信息生成菜单。
- `面包屑` 组件 `PageHeader`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/src/components/PageHeader/Breadcrumb.jsx) 中已完成内置的面包屑组件

### 路由

RA中的路由，通过 `router.config.js` 统一进行管理。我们提供了以下几个参数，来辅助生成菜单。其具体实现在 `components/RenderRoutes`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/src/components/RenderRoutes/index.jsx) 。

- `name` `icon` 分别对应生成菜单项的文本和图标。图标参数对应着 [ant.design](https://ant.design/components/icon-cn/) 本身的icon type。
- `hideMenu` 可以在列表中不显示这个菜单项，包括底下的子路由。
- `authority` 用于配置路由的权限。如果配置了该项那么权限组件 [Authority](/authority) 会对当前用户权限进行验证，并决定是否展示。

路由配置数据格式如下：

```javascript
{
  name: 'program',
  icon: 'appstore',
  path: '/program',
  routes: [
    {
      name: 'analysis',
      path: '/program/analysis',
      component: ['/views/Program/Analysis'],
      authority: ['admin']
    }
  ]
},
```

###  菜单

菜单会根据 `router.config.js` 自动生成，具体实现在 `components/Layout/SiderMenu.jsx`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/src/components/Layout/SiderMenu.jsx) 。

> 如果你的项目不需要菜单，你可以在 `src/layout/MainLayout`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/src/layout/MainLayout.jsx) 中移除 `Navigator` 组件的挂载

#### 从服务器请求菜单

todo...

### 面包屑

面包屑由 `PageHeader/Breadcrumb.jsx`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/src/components/PageHeader/Breadcrumb.jsx) 组件实现。挂载 `PageWrapper` 的组件将自动添加面包屑，面包屑不需要传入参数，面包屑的数据通过 `layoutStore`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/src/store/layoutStore.ts) 的 `breadcrumbList` 提供。

`breadcrumbList` 数据格式如下：

```javascript
{
  display: true
  name: "cardList"
  path: "/list/cardList"
}
```

> 如需要单独使用面包屑组件，在页面中挂载 `Breadcrumb` 组件即可。