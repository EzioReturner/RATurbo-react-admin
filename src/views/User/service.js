import request from '@api/io';
import Mock from 'mockjs';

Mock.mock('/post/login', req => {
	const { userName, password } = JSON.parse(req.body);
	console.log(req);
	if (userName === 'ra' && password === 123) {
		return {
			message: 'ok'
		};
	} else {
		return {
			message: 'error'
		};
	}
});

export function postLogin({ userName, password }) {
	return request.sendRequest('post', {
		path: '/post/login',
		params: {
			userName,
			password
		}
	});
}
