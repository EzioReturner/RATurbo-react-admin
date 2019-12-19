import request from '@utils/io';
import Mock from 'mockjs';

const wordCloud = Mock.mock({
  'data|70-100': ['@word']
});

Mock.mock('/get/wordCloud', wordCloud);

export default function getWordCloud() {
  return request.sendRequest('get', {
    path: '/get/wordCloud'
  });
}
