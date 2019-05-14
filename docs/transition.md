# 过渡效果

RA中提供了，两种过渡类组件，分别是 `WrapAnimation` 过渡动画组件，`loading` 过渡遮罩组件。

## WrapAnimation 过渡动画组件

`WrapAnimation` 组件基于 [react-transition-group](https://github.com/reactjs/react-transition-group) 封装，RA的路由实现中，将会默认对所有的路由包裹 `WrapAnimation` 组件，支持 [animate.css](https://daneden.github.io/animate.css/) 库，与自定义过渡。

### 使用自定义过渡

 - 将过渡效果css放置在 `WrapAnimation/wrapAnimation.scss`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/tree/master/src/style/wrapAnimation.scss) 中，格式如下：
 ```css
  .my-node-enter {
    opacity: 0;
  }
  .my-node-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }
  .my-node-exit {
    opacity: 1;
  }
  .my-node-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
 ```
 - 在路由中配置过渡样式名
 ```javascript
  {
    name: 'dashboard',
    icon: 'pie-chart',
    path: '/dashboard',
    component: ['/views/Dashboard', 'my-node']
  }
  ```

### 使用 animate.css 库

只需要在配置项中写入animate.css库中的过渡效果并加上 `-animated` 后缀即可：
```javascript
{
  name: 'dashboard',
  icon: 'pie-chart',
  path: '/dashboard',
  component: ['/views/Dashboard', 'bounceIn-animated']
}
```


> 如不需要添加过渡效果，可在路由中配置 `notAnimate` 。

```javascript
{
  name: 'dashboard',
  icon: 'pie-chart',
  path: '/dashboard',
  component: ['/views/Dashboard', 'notAnimate']
}
```

## loading 过渡遮罩

RA提供了可独立使用的 遮罩组件 `loading` ，接收下列两个参数：

- `spining` 控制是否显示遮罩 
- `fixed` 控制是否覆盖父级全局，该属性只在 `MainLayout` 文件中挂载生效。
- `style` 向组件添加额外的样式属性

![loading](/media/loading.gif)