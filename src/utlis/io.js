import axios from 'axios';
import { notification } from 'antd';

class Request {
  instance;

  constructor() {
    this.instance = axios.create();
    this.initTnterceptors();
  }

  // 初始化拦截器
  initTnterceptors() {
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );
  }

  // 设置自定义头部
  setHeader = (key, val) => {
    this.instance.defaults.headers.common[key] = val;
  };

  // 错误notify
  notify(message) {
    notification.error({
      message: '请求错误',
      description: `${message ||
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'}`
    });
  }

  // 错误处理
  handleError = error => {
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

  sendRequest(method, data) {
    let { path, params, options } = data;
    const _query = options ? { ...options, params } : { params };
    return this.instance[method](path, _query).catch(this.handleError);
  }
}
const request = new Request();

export default request;
