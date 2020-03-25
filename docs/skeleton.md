# 骨架

`src/layout` 下默认提供了两种骨架，`MainLayout.tsx`为视图所用骨架。

## 视图骨架类型

视图骨架提供两种布局方式： 通过配置 `src/config/setting.js` 的 `inlineHeader` 字段来控制。

> `inlineHeader` 为 `true` 时，布局如下:

![inlineLayout](/media/inlineLayout.png)。

> `inlineHeader` 为 `false` 时，布局如下:

![splitLayout](/media/splitLayout.png)。

## 控制菜单与头部显示

通过控制 `store/layoutStore` 的 `showHeader` 与 `showMenu` 可以动态的配置菜单与头部显示。