import Loadable from 'react-loadable';
import Loading from '@components/Loading/Index';
import React, { Fragment } from 'react';

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
				name: 'Dashboard',
				icon: 'pie-chart',
				path: '/dashboard',
				component: [import('@views/Dashboard/Index')]
			},
			{
				path: '/',
				exact: true,
				redirect: '/dashboard',
				hideMenu: true
			},
			{
				name: 'Program',
				icon: 'appstore',
				path: '/program',
				routes: [
					{
						name: 'Analysis',
						path: '/program/analysis',
						component: [import('@views/Program/Analysis')],
						authority: ['admin']
					},
					{
						name: 'Monitor',
						path: '/program/monitor',
						component: [import('@views/Program/Monitor')]
					},
					{
						name: 'Platform',
						path: '/program/platform',
						component: [import('@views/Program/Platform')]
					}
				]
			},
			{
				name: 'Form',
				icon: 'form',
				path: '/form',
				routes: [
					{
						name: 'BasicForm',
						path: '/form/basicForm',
						component: [import('@views/Form/BasicForm')],
						authority: ['admin']
					},
					{
						name: 'StepForm',
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
				name: 'Map',
				icon: 'heat-map',
				path: '/map',
				component: [import('@views/Map/Index')],
				authority: ['admin']
			},
			{
				name: 'Gallery',
				icon: 'picture',
				path: '/gallery',
				component: [import('@views/Gallery/Index')],
				authority: ['admin']
			},
			{
				name: 'Exception',
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
						component: [import('@views/Exception/Index')],
						hideMenu: true
					}
				]
			}
		]
	}
];
export default routeConfig;
