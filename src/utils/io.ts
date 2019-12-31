import Axios from 'axios';
import { notification } from 'antd';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

class Request {
  instance: AxiosInstance;

  constructor() {
    this.instance = Axios.create();
    this.initInterceptors();
  }

  // 初始化拦截器
  initInterceptors() {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config;
      },
      (error: AxiosResponse) => {
        Promise.reject(error);
      }
    );
  }

  // 设置自定义头部
  setHeader = (key: string, val: string) => {
    this.instance.defaults.headers.common[key] = val;
  };

  // 错误notify
  notify(message: string | number) {
    notification.error({
      message: '请求错误',
      description: `${message ||
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'}`
    });
  }

  // 错误处理
  handleError = (error: any) => {
    const { message, status } = error;
    switch (status) {
      case 401:
        break;
      case 404:
        break;
      case 500:
        break;
      default:
        this.notify(message || error);
        break;
    }
    return Promise.reject(error);
  };

  sendRequest(method: Method, url: string, data: AxiosRequestConfig) {
    return this.instance
      .request({
        url,
        method,
        ...data
      })
      .catch(this.handleError);
  }

  get(path: string, data: AxiosRequestConfig = {}) {
    let _path: string = path;
    const params = data.params;
    if (params) {
      const keys = Object.keys(params);
      if (keys.length) {
        _path += '?';
        keys.forEach(key => {
          _path += params[key] ? `${key}=${params[key]}&` : '';
        });
      }
      _path = _path.replace(/&$/, '');
    }
    return this.sendRequest('get', _path, data);
  }

  post(path: string, data: AxiosRequestConfig) {
    return this.sendRequest('post', path, data);
  }

  put(path: string, data: AxiosRequestConfig) {
    return this.sendRequest('put', path, data);
  }

  patch(path: string, data: AxiosRequestConfig) {
    return this.sendRequest('patch', path, data);
  }

  delete(path: string, data: AxiosRequestConfig) {
    return this.sendRequest('delete', path, data);
  }
}
const request = new Request();

export default request;
