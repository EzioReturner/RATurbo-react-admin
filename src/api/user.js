import request from '@utils/io';
import Mock from 'mockjs';

const userInfo = Mock.mock({
  'data|1-1': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime'
    }
  ]
});

Mock.mock('/post/login', req => {
  const {
    params: { userName, password }
  } = JSON.parse(req.body);
  if ((userName === 'admin' || userName === 'guest') && Number(password) === 123) {
    return {
      message: 'ok',
      userInfo
    };
  } else {
    return {
      message: 'error'
    };
  }
});

Mock.mock('/get/userInfo', userInfo);

export function postLogin(userName, password) {
  return request.sendRequest('post', {
    path: '/post/login',
    params: {
      userName,
      password
    }
  });
}

export function getUserInfo() {
  return request.sendRequest('get', {
    path: '/get/userInfo'
  });
}
