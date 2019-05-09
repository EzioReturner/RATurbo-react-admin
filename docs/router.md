# 路由与菜单

RA中的路由为了方便管理，使用了中心化的方式，在 `src/config/router.config.js` 统一配置和管理。

## 运作模块

RA通过框架中的组件实现了以下几个模块：
- `路由管理` 按照约定的语法在 `router.config.js` 中配置路由信息。
- `菜单渲染` RA的菜单组件会根据路由信息生成菜单。
- `面包屑` 组件 `PageHeader` 中已完成内置的面包屑组件

### 路由

RA中的路由，通过 `router.config.js` 统一进行管理。我们提供了以下几个参数，来辅助生成菜单。其具体实现在 `components/RenderRoutes`。

- `name` `icon` 分别对应生成菜单项的文本和图标。
- `hideMenu` 可以在列表中不显示这个菜单项，包括底下的子路由。
- `authority` 用于配置路由的权限。如果配置了该项那么权限组件 [Authority](/authority) 会对当前用户权限进行验证，并决定是否展示。

>路由配置模板参见下方

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

### 路由