# 样式与主题

## 样式

### Less

RA使用 less 作为样式语言，建议在使用前或者遇到疑问时学习一下 [less](http://lesscss.cn/) 的相关特性。

### CSS Modules

在样式开发过程中，有两个问题比较突出：

`全局污染`，`选择器复杂` 为解决这两个问题，RA提供了CSS Modules 模块化方案，使用方法如下：

> 默认webpack只对 `.module.scss` 命名的文件解析为 css modules

```javascript
import styles from './style.module.less';

<div className={styles.title}>{title}</div>
```

在上面的样式中，.title只会在本文件生效。如果需要一个全局生效的样式，可以使用 `:global` 。

```css
/* 定义全局样式 */
:global(.text) {
  font-size: 16px;
}

/* 定义多个全局样式 */
:global {
  .footer {
    color: #ccc;
  }
  .sider {
    background: #ebebeb;
  }
}
```

### 系统样式

我们参考 Ant Design 视觉风格，并在其基础之上对部分样式进行了调整，如果对视觉风格有额外的要求，推荐使用以下的方式进行定制。

### Antd样式覆盖

我们在 `src/styles/antdStyle.less` 中对部分 `antd` 的样式进行了重写，使其更贴近RA的整体风格，如需调整可在该文件中修改。

### RA样式

RA中提供了一套全局生效的css样式。可在 `src/styles/mainVars.less` 中找到，例如：

- 颜色值

```css
...
@text-color: rgba(0, 0, 0, 0.65);
@text-color-lighten: rgba(0, 0, 0, 0.45);
@text-color-darken: rgba(0, 0, 0, 0.85);

@shadow-gray-color: 0 3px 8px 0 rgba(189, 189, 189, 0.6);
...
```

- 边距 字体 对齐方式

```css
...
@spacing-mini: 4px;
@spacing-small: 8px;
@spacing-normal: 12px;
@spacing-middle: 16px;
@spacing-large: 24px;
@spacing-huge: 36px;
...
```

> 值得注意的是：RA利用了 `sass-resources-loader`[![](/media/link.svg)](https://github.com/shakacode/sass-resources-loader) 插件，方便直接在 less 文件中使用 `mainVars.less` 与 `customClass.less` 中声明的样式。

## 主题

RA基于 Ant Design React V4 进行开发，完全支持官方提供的 less 变量定制功能. 你可以在 `src/config/setting.js` 中对主题进行配置。需要注意的是
由于RA借用了less的浏览器编译能力支持动态调整主题色，故 `@primary-color` 字段会被动态替换详见下文。

```javascript
...
theme: {
  '@primary-color': '#fb4491',
  '@link-color': '#fb4491',
  '@border-radius-base': '2px',
  '@font-size-base': '13px'
}
...
```

### 动态主题色

RA借助 css 变量以及 less 的能力实现动态主题色变化，antd 组件部分使用 `antd-theme-webpack-plugin`[![](/media/link.svg)](https://github.com/mzohaibqc/antd-theme-webpack-plugin) 插件进行替换。

为了方便用户使用我们约定，不变量 less 参数，放置在 `src/styles/mainVars.less` 中，动态变量请使用 css 变量，放置于 `src/styles/variables.less` 中。

- [mainVars.less](/cssStyle?id=ra样式) 

- variables.less

```css
...
@import '~antd/lib/style/themes/default.less';

@primary-color: #fb4491;

:root,
body {
  --primary: @primary-color;
  --primary-lighten: lighten(@primary-color, 8%);
  --primary-lightener: lighten(@primary-color, 20%);
  --primary-lightener-extra: lighten(@primary-color, 33.5%);
  --primary-darken: darken(@primary-color, 8%);

  --antd-slider-active: tint(@primary-color, 50%);
  --antd-slider-focus: tint(@primary-color, 20%);
  --antd-slider-focus-shadow: fade(@primary-color, 12%);
  --antd-select-focus-shadow: fade(@primary-color, 20%);
}
...
```

- 如何使用？

直接在 css 文件中调用 `var(--primary)` 即可。

```css
...
.yourClass {
  color: var(--primary);
  font-size: 20px;
}
...
```

> 另外， `antd-theme-webpack-plugin` 插件并不能完全替换所有的样式。遗漏部分已在 `styles/antdStyles.less` 中补充。

```css
...
.ant-slider-dot-active {
  border-color: var(--antd-slider-active) !important;
}

.ant-slider-handle:focus {
  border-color: var(--antd-slider-focus);
  box-shadow: 0 0 0 5px var(--antd-slider-focus-shadow);
}

.ant-picker-focused,
.ant-input:focus,
.ant-input-focused,
.ant-select-focused .ant-select-selector {
  box-shadow: 0 0 0 2px var(--antd-select-focus-shadow) !important;
}
...
```