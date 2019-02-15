import axios from 'axios';
import { notification } from 'antd';

class Request {
  instance: any;

  constructor() {
    this.instance = axios.create();
  }

  setHeader = (key: 'stirng', val: any): void => {
    this.instance.defaults.headers.common[key] = val;
  };

  notify(message: 'string'): void {
    notification.error({
      message: '请求错误',
      description: `${message ||
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'}`
    });
  }

  handleError(error: any): Promise<string> {
    const { message, status } = error;

    switch (status) {
      case 401:
        break;
      case 404:
        break;
      default:
        this.notify(message || error);
        break;
    }
    return Promise.reject(error);
  }

  sendRequest(method: string, data: any): any {
    let { path, options } = data;

    return this.instance[method](path, options).catch(this.handleError);
  }
}
const request = new Request();

export default request;
