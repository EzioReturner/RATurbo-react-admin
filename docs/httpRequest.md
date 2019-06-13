# Http 请求

RA使用axios提供http请求服务，RA在其基础之上进行了封装，文件位于 `src/utlis/io.js`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/src/utlis/io.js)。

## 自定义Header 
通过调用 `setHeader` 方法可手动修改Header。
```javascript
setHeader = (key, val) => {
  this.instance.defaults.headers.common[key] = val;
};
```
> 例如，我们在头部将缓存策略设置为不缓存 no-cache

```javascript
import io from '@utlis/io';
function getSome() {
  io.setHeader('Cache-Control', 'no-cache');
  io.sendRequest('get',{url, query});
}
```

## 拦截器

io工具提供了拦截器的入口，可以针对不同的接口需要进行拦截设置。

```javascript
this.instance.interceptors.request.use(
  config => {
    {do something}
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
```

## 异常处理

io工具提供了接口请求异常的处理方法，针对restful风格的接口对不同状态码进行异常处理。

```javascript
handleError = error => {
  const { message, status } = error;
  switch (status) {
    case 401:
      {do something}
      break;
    case 404:
      {do something}
      break;
    case 500:
      {do something}
      break;
    default:
      this.notify(message || error);
      break;
  }
  return Promise.reject(error);
};
```