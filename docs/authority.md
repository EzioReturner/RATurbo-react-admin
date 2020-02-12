# 权限控制

权限控制是中后台系统中常见的需求之一，RA提供了一套权限管理的方案，实现了一些基本的功能。

## 权限组件 Authorized

这是RA权限管理的基础，基本思路是通过比对当前权限与准入权限，决定展示正常渲染内容还是异常内容。其核心实现位于 `CheckPermission.jsx`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/src/components/Authorized/CheckPermission.jsx) 。

### 控制菜单和路由权限

如需对指定页面进行权限控制，那么只需在路由配置文件 `router.config.ts` 中设置 `authority` 参数即可，代表该路由接受的权限，不配置则表示接受所有权限都可进入。RA的 `MainLayout` 布局默认对所有的路由包裹了 `Authorized` 组件。

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

### 在项目中使用
`Authorized` 组件接收两个参数
- `authority`  接受的权限
- `unidentified` 权限不足时的异常处理显示页面

```javascript
import React, { Component, Suspense } from 'react';
import Authorized from '@components/Authorized';

ReactDOM.render(
  <Authorized authority="admin" unidentified={<Unidentified/>}>
    <div>不给你看</div>
  </Authorized>
)
```

### RA中的权限

RA模板中的权限操作实现在 `src/store/userStore`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/src/store/userStore.ts) 中，系统的权限保存在 `localStorage` 中，实际项目中可能需要从后台获取权限。


