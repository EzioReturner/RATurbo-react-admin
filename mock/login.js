import Mock from 'mockjs';

Mock.mock('/user/login', (req, res) => {
	console.log(req);
});
