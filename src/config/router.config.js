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
			'fade'
		])
	},
	// app
	{
		path: '/',
		component: AsyncComponent(() => [
			import('../layout/MainLayout'),
			'../layout/MainLayout'
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
				path: '/login',
				hideMenu: true,
				component: AsyncComponent(() => [
					import('@views/Login/Index'),
					'@views/Login/Index'
				])
			},
			{
				name: 'Program',
				icon: 'appstore',
				path: '/program',
				routes: [
					{
						name: '分析页',
						path: '/program/analysis',
						component: AsyncComponent(() => [
							import('@views/Program/Analysis'),
							'@views/Program/Analysis'
						])
					},
					{
						name: '监控页',
						path: '/program/monitor',
						component: AsyncComponent(() => [
							import('@views/Program/Monitor'),
							'@views/Program/Monitor'
						])
					},
					{
						name: '工作台',
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
				])
			}
		]
	}
];
export default routeConfig;
