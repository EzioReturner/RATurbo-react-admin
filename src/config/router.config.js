import Loadable from 'react-loadable';
import Loading from '@components/Loading/Index';
import AsyncComponent from '@components/AsyncComponent/Index';
import React, { Fragment } from 'react';

const routeConfig = [
	// user
	{
		path: '/user',
		component: AsyncComponent(() => [
			import('../layout/UserLayout'),
			'../layout/UserLayout',
			'fadeRA'
		]),
		routes: [
			{
				name: 'Login',
				path: '/user/login',
				component: AsyncComponent(() => [
					import('@views/User/Login'),
					'@views/User/Login'
				])
			}
		]
	},
	// app
	{
		path: '/',
		component: AsyncComponent(() => [
			import('../layout/MainLayout'),
			'../layout/MainLayout',
			'fadeRA'
		]),
		authority: ['admin', 'guest'],
		routes: [
			{
				name: 'Dashboard',
				icon: 'pie-chart',
				path: '/dashboard',
				component: AsyncComponent(() => [
					import('@views/Dashboard/Index'),
					'@views/Dashboard/Index'
				])
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
						component: AsyncComponent(() => [
							import('@views/Program/Analysis'),
							'@views/Program/Analysis'
						]),
						authority: ['admin']
					},
					{
						name: 'Monitor',
						path: '/program/monitor',
						component: AsyncComponent(() => [
							import('@views/Program/Monitor'),
							'@views/Program/Monitor'
						])
					},
					{
						name: 'Platform',
						path: '/program/platform',
						component: AsyncComponent(() => [
							import('@views/Program/Platform'),
							'@views/Program/Platform'
						])
					}
				]
			},
			{
				name: 'Map',
				icon: 'heat-map',
				path: '/map',
				component: AsyncComponent(() => [
					import('@views/Map/Index'),
					'@views/Map/Index'
				]),
				authority: ['admin']
			}
		]
	}
];
export default routeConfig;
