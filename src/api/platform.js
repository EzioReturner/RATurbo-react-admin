import request from '@utlis/io';
import Mock from 'mockjs';

export function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

const projectList = Mock.mock({
	'data|6-6': [
		{
			name: '@first',
			detail: '@paragraph(1)',
			domain: '@domain',
			time: '@boolean'
		}
	]
});

Mock.mock('/get/projectList', projectList);

export function getProjectList() {
	return request.sendRequest('get', {
		path: '/get/projectList'
	});
}

export function getContact() {
	return request.sendRequest('get', {
		path: 'https://randomuser.me/api/?inc=picture,name&results=15'
	});
}
