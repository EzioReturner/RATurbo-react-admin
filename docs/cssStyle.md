# 样式与主题

## 系统样式

我们参考 Ant Design 视觉风格，并在其基础之上对部分样式进行了调整，如果对视觉风格有额外的要求，推荐使用以下的方式进行定制。

### antd样式覆盖

我们在 `src/style/antdStyle.scss` 中对部分 `antd` 的样式进行了重写，使其更贴近RA的整体风格，如需调整可在该文件中修改。

### RA样式

RA中提供了一些全局生效的css样式。例如：

- 颜色值，可在 `src/style/color.scss` 中找到

```css
...
$color-white:              #fff !default;
$color-white-dark:         #f3f3f3 !default;
$color-white-dark-extra:   darken($color-white, 6.5%) !default;
$color-white-darker:       darken($color-white, 13.5%) !default;
$color-white-darker-extra: darken($color-white, 20%) !default;
...
```

- 边距 字体 对齐方式，可在 `src/style/custom.scss` 中找到

```css
...
.warp-flex {
  display: flex;
}
.jus-b {
  justify-content: space-between;
}
.text-1 {
  font-size: 13px;
}
.ml-1 {
  margin-left: 4px;
}
.mr-1 {
  margin-right: 4px;
}
.p-1 {
  padding: 4px;
}
...
```

### 更换主题

我们基于 Ant Design React 进行开发，完全支持官方提供的 less 变量定制功能. 你可以在 `src/config/setting.js` 中对主题进行配置。

```javascript
...
theme: {
  'primary-color': '#fb4491',
  'link-color': '#fb4491',
  'border-radius-base': '2px',
  'font-size-base': '13px'
}
...
```