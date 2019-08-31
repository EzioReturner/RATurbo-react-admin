import request from '@utils/io';
import Mock from 'mockjs';

const listData = Mock.mock({
  'data|6-10': [
    {
      id: '@id',
      detail: '@paragraph(1)',
      title: '@name',
      handler: '@cname',
      date: '@date(yyyy-MM-dd HH:mm:ss)',
      progress: '@natural(1,100)'
    }
  ]
});

Mock.mock('/get/listData', listData);

const tableData = Mock.mock({
  'data|30-60': [
    {
      'key|+1': 1,
      no: '@string(10)',
      domain: '@domain',
      num: '@natural(1,100)',
      status: '@natural(0,3)',
      date: '@date(yyyy-MM-dd HH:mm:ss)'
    }
  ]
});

Mock.mock('/get/tableData', tableData);

export function getListData() {
  return request.sendRequest('get', {
    path: '/get/listData'
  });
}

export function getTableData() {
  return request.sendRequest('get', {
    path: '/get/tableData'
  });
}
