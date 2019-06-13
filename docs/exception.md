# 异常处理

在用户使用过程中，可能遇到各种异常情况，比如页面 404，申请结果失败，请求的返回异常等等，这篇文档会按照报错形式的不同，分别介绍下相应的处理建议。

## 页面级报错

### 应用场景

- 路由直接引导到报错页面，比如你输入的网址没有匹配到任何页面，可以由路由引导到预设的 404 页面。
- 代码控制跳转到报错页面，比如根据请求返回的数据，将没有权限的用户引导到 403 页面。

### 实现

针对页面级的报错，我们提供了两个业务组件供你选择，可以很方便地实现一个报错页面：

- [Exception 异常页](http://ra-turbo.leanapp.cn/#/exception/404)

```javascript
<Exception errorCode="404"/>
```

默认支持 404，403，500 三种错误，也可自定义文案等内容。

- [Result 结果页](http://ra-turbo.leanapp.cn/#/result/successResult)

```javascript
<Result 
  title="title"
  subtitle="subtitle"
  type="failed"
  style={{ marginTop: '32px' }}
  extra={Extra}
  actions={
    <Button size="large" type="primary">
      返回修改
    </Button>
  }
/>
```

这个组件一般用在提交结果展示，文案操作等均可自定义。

## 提示性报错

### 应用场景

- 表单项校验报错。
- 操作反馈。
- 网络请求错误。

### 实现

在单页应用中，最常见的需求就是处理网络错误信息，我们可以利用 message 和 notification 来吐出响应的接口/网络/业务数据错误。

RA 提供了工具类 `io.js` 统一处理请求，提供了默认的错误处理以及提示。请求中的异常处理可见 [异常处理](/httpRequest?id=异常处理)