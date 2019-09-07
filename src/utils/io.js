import Axios from 'axios';
import { Notification } from 'element-ui';

class Request {
  instance;

  constructor() {
    this.instance = Axios.create({
      withCredentials: true
    });
    this.initInterceptors();
  }

  // 拦截器
  initInterceptors() {
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error.response);
      }
    );
  }

  setHeader = (key, val) => {
    this.instance.defaults.headers.common[key] = val;
  };

  notify(message) {
    Notification({
      type: 'error',
      title: '接口异常',
      message
    });
  }

  handleError = error => {
    const {
      data: { message, name, msg },
      status
    } = error;
    if (message === 'SUCCESS' && status === 0) {
      return;
    }
    switch (status) {
      case 401:
        break;
      case 404:
        this.notify('接口地址 404， 请检查接口地址确认接口已发布' || error);
        break;
      case 500:
        this.notify(name || error);
        break;
      default:
        this.notify(message || msg || error);
        break;
    }
    return Promise.reject(error);
  };

  filterStatus = data => {
    const {
      data: { status }
    } = data;
    if (status !== 0) {
      return Promise.reject(data);
    }
    return data;
  };

  sendRequest(method, path, data = {}) {
    let { params, options = {} } = data;
    return this.instance[method](path, params, options)
      .then(this.filterStatus)
      .catch(this.handleError);
  }

  get(path, data = {}) {
    const { params } = data;
    let _path = path;
    if (params) {
      _path += '?';
      Object.keys(params).forEach(key => {
        _path += `${key}=${params[key]}&`;
      });
      _path = _path.replace(/&$/, '');
    }
    return this.sendRequest('get', _path, data);
  }

  post(path, data) {
    return this.sendRequest('post', path, data);
  }

  put(path, data) {
    return this.sendRequest('put', path, data);
  }

  patch(path, data) {
    return this.sendRequest('patch', path, data);
  }

  delete(path, data) {
    return this.sendRequest('delete', path, data);
  }
}

export default new Request();
