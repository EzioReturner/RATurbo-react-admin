import request from '@utlis/io';
import Mock from 'mockjs';

const listData = Mock.mock({
	'data|6-10': [
		{
			id: '@id',
			detail: '@paragraph(1)',
			title: '@name'
		}
	]
});

Mock.mock('/get/listData', listData);

export function getListData() {
	return request.sendRequest('get', {
		path: '/get/listData'
	});
}
