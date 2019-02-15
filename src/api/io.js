import axios from 'axios';
import { notification } from 'antd';
const instance = axios.create();

export const setHeader = (key, val) => {
	instance.defaults.headers.common[key] = val;
};

function notify() {
	notification.error({
		message: '请求错误',
		description: `${message ||
			'This is the content of the notification. This is the content of the notification. This is the content of the notification.'}`
	});
}

function handleError(error) {
	const { message, status } = error;

	switch (status) {
		case 401:
			break;
		case 404:
			break;
		default:
			notify(message || error);
			break;
	}
	return Promise.reject(data);
}

instance.interceptors.request.use(
	config => config,
	error => {
		Promise.reject(error);
	}
);

export default {
	get(url, options = {}) {
		return instance.get(url, options).catch(handleError);
	},
	post(url, data = {}, config = {}) {
		return instance.post(url, data, config).catch(handleError);
	},
	put(url, data = {}, config = {}) {
		return instance.put(url, data, config).catch(handleError);
	},
	delete(url, options = {}) {
		return instance.delete(url, options).catch(handleError);
	},
	patch(url, options = {}) {
		return instance.patch(url, options).catch(handleError);
	}
};
