const routeConfig = [
	// user
	{
		path: '/user',
		component: [import('../layout/UserLayout'), 'fadeRA'],
		routes: [
			{
				name: 'Login',
				path: '/user/login',
				component: [import('@views/User/Login')]
			}
		]
	},
	// app
	{
		path: '/',
		component: [import('../layout/MainLayout'), 'fadeRA'],
		authority: ['admin', 'guest'],
		routes: [
			{
				name: 'dashboard',
				icon: 'pie-chart',
				path: '/dashboard',
				component: [import('@views/Dashboard')]
			},
			{
				path: '/',
				exact: true,
				redirect: '/dashboard',
				hideMenu: true
			},
			{
				name: 'program',
				icon: 'appstore',
				path: '/program',
				routes: [
					{
						name: 'analysis',
						path: '/program/analysis',
						component: [import('@views/Program/Analysis')],
						authority: ['admin']
					},
					{
						name: 'monitor',
						path: '/program/monitor',
						component: [import('@views/Program/Monitor')]
					},
					{
						name: 'platform',
						path: '/program/platform',
						component: [import('@views/Program/Platform')]
					}
				]
			},
			{
				name: 'form',
				icon: 'form',
				path: '/form',
				routes: [
					{
						name: 'basicForm',
						path: '/form/basicForm',
						component: [import('@views/Form/BasicForm')],
						authority: ['admin']
					},
					{
						name: 'stepForm',
						path: '/form/stepForm',
						component: [import('@views/Form/StepForm')]
					},
					{
						name: 'test',
						path: '/form/test',
						routes: [
							{
								name: 'test',
								path: '/form/test/test1',
								component: [import('@views/Form/TestDetail')]
							}
						]
					}
				]
			},
			{
				name: 'list',
				icon: 'ordered-list',
				path: '/list',
				routes: [
					{
						name: 'basicList',
						path: '/list/basicList',
						component: [import('@views/List/BasicList')],
					},
					{
						name: 'cardList',
						path: '/list/cardList',
						component: [import('@views/List/CardList')],
					},
					{
						name: 'basicTable',
						path: '/list/basicTable',
						component: [import('@views/List/BasicTable')],
					}
				]
			},
			{
				name: 'map',
				icon: 'heat-map',
				path: '/map',
				component: [import('@views/Map')],
				authority: ['admin']
			},
			{
				name: 'gallery',
				icon: 'picture',
				path: '/gallery',
				component: [import('@views/Gallery')],
				authority: ['admin']
			},
			{
				name: 'exception',
				icon: 'exclamation-circle',
				path: '/exception',
				routes: [
					{
						name: '403',
						path: '/exception/403',
						component: [import('@views/Exception/403')]
					},
					{
						name: '404',
						path: '/exception/404',
						component: [import('@views/Exception/404')]
					},
					{
						name: '500',
						path: '/exception/500',
						component: [import('@views/Exception/500')]
					},
					{
						name: 'index',
						path: '/exception/home',
						component: [import('@views/Exception')],
						hideMenu: true
					}
				]
			}
		]
	}
];
export default routeConfig;
