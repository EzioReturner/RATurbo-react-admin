import Axios from 'axios';
import { notification } from 'antd';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

interface IoOptions extends AxiosRequestConfig {
  returnConfig?: boolean; // 是否返回req配置项
  options?: AxiosRequestConfig;
}

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

  sendRequest(method: Method, url: string, details: IoOptions) {
    const { params, returnConfig, data, options } = details;
    return this.instance
      .request({
        url,
        method,
        ...params,
        data,
        ...options
      })
      .then(res => (returnConfig ? res : res.data))
      .catch(this.handleError);
  }

  get(path: string, data: IoOptions = {}) {
    const { params } = data;
    let _path: string = path;
    if (params) {
      const keys = Object.keys(params);
      if (keys.length) {
        _path += `?${keys.map(key => `${key}=${params[key]}`).join('&')}`;
      }
    }
    return this.sendRequest('get', _path, data);
  }

  post(path: string, data: IoOptions) {
    return this.sendRequest('post', path, data);
  }

  put(path: string, data: IoOptions) {
    return this.sendRequest('put', path, data);
  }

  patch(path: string, data: IoOptions) {
    return this.sendRequest('patch', path, data);
  }

  delete(path: string, data: IoOptions) {
    return this.sendRequest('delete', path, data);
  }
}
const request = new Request();

export default request;
