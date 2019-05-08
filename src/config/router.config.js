const routeConfig = [
	// user
	{
		path: '/user',
		component: [()=>import(/* webpackChunkName: "UserLayout" */ '../layout/UserLayout'), 'fadeRA'],
		routes: [
			{
				name: 'Login',
				path: '/user/login',
				component: [()=>import(/* webpackChunkName: "Login" */ '@views/User/Login')]
			}
		]
	},
	// app
	{
		path: '/',
		component: [()=>import(/* webpackChunkName: "MainLayout" */ '../layout/MainLayout'), 'fadeRA'],
		authority: ['admin', 'guest'],
		routes: [
			{
				name: 'dashboard',
				icon: 'pie-chart',
				path: '/dashboard',
				component: [()=>import(/* webpackChunkName: "Dashboard" */ '@views/Dashboard')]
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
						component: [()=>import(/* webpackChunkName: "Analysis" */ '@views/Program/Analysis')],
						authority: ['admin']
					},
					{
						name: 'monitor',
						path: '/program/monitor',
						component: [()=>import(/* webpackChunkName: "Monitor" */ '@views/Program/Monitor')]
					},
					{
						name: 'platform',
						path: '/program/platform',
						component: [()=>import(/* webpackChunkName: "Platform" */ '@views/Program/Platform')]
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
						component: [()=>import(/* webpackChunkName: "BasicForm" */ '@views/Form/BasicForm')],
						authority: ['admin']
					},
					{
						name: 'stepForm',
						path: '/form/stepForm',
						component: [()=>import(/* webpackChunkName: "StepForm" */ '@views/Form/StepForm')]
					},
					{
						name: '三级菜单',
						path: '/form/test',
						routes: [
							{
								name: '三级菜单',
								path: '/form/test/test1',
								component: [()=>import(/* webpackChunkName: "TestDetail" */ '@views/Form/TestDetail')]
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
						component: [()=>import(/* webpackChunkName: "BasicList" */ '@views/List/BasicList')],
					},
					{
						name: 'cardList',
						path: '/list/cardList',
						component: [()=>import(/* webpackChunkName: "CardList" */ '@views/List/CardList')],
					},
					{
						name: 'basicTable',
						path: '/list/basicTable',
						component: [()=>import(/* webpackChunkName: "BasicTable" */ '@views/List/BasicTable')],
					}
				]
			},
			{
				name: 'map',
				icon: 'heat-map',
				path: '/map',
				component: [()=>import(/* webpackChunkName: "Map" */ '@views/Map')],
				authority: ['admin']
			},
			{
				name: 'gallery',
				icon: 'picture',
				path: '/gallery',
				component: [()=>import(/* webpackChunkName: "Gallery" */ '@views/Gallery')],
				authority: ['admin']
			},
			{
				name: 'result',
				icon: 'check-circle',
				path: '/result',
				routes: [
					{
						name: 'successResult',
						path: '/result/successResult',
						component: [()=>import(/* webpackChunkName: "SuccessResult" */ '@views/Result/SuccessResult')],
					},
					{
						name: 'failedResult',
						path: '/result/failedResult',
						component: [()=>import(/* webpackChunkName: "FailedResult" */ '@views/Result/FailedResult')],
					}
				]
			},
			{
				name: 'exception',
				icon: 'warning',
				path: '/exception',
				routes: [
					{
						name: '403',
						path: '/exception/403',
						component: [()=>import(/* webpackChunkName: "403" */ '@views/Exception/403')]
					},
					{
						name: '404',
						path: '/exception/404',
						component: [()=>import(/* webpackChunkName: "404" */ '@views/Exception/404')]
					},
					{
						name: '500',
						path: '/exception/500',
						component: [()=>import(/* webpackChunkName: "500" */ '@views/Exception/500')]
					},
					{
						name: 'index',
						path: '/exception/home',
						component: [()=>import(/* webpackChunkName: "Exception" */ '@views/Exception')],
						hideMenu: true
					}
				]
			}
		]
	}
];
export default routeConfig;
