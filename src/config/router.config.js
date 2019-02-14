import Loadable from 'react-loadable';
import Loading from '@components/Loading/Index';
import AsyncComponent from '@components/AsyncComponent/Index';
import React, { Fragment } from 'react';

const routeConfig = [
	{
		name: 'Dashboard',
		icon: 'pie-chart',
		path: '/dashboard',
		component: AsyncComponent(() => [
			import('@pages/Dashboard/Index'),
			'@pages/Dashboard/Index'
		])
	},
	{
		path: '/',
		redirect: '/dashboard',
		hideMenu: true
	},
	{
		name: 'Program',
		icon: 'appstore',
		path: '/program',
		children: [
			{
				name: '分析页',
				path: '/program/analysis',
				component: AsyncComponent(() => [
					import('@pages/Program/Analysis'),
					'@pages/Program/Analysis'
				])
			},
			{
				name: '工作台',
				path: '/program/platform',
				component: AsyncComponent(() => [
					import('@pages/Program/Platform'),
					'@pages/Program/Platform'
				])
			},
			{
				name: '监控页',
				path: '/program/monitor',
				component: AsyncComponent(() => [
					import('@pages/Program/Monitor'),
					'@pages/Program/Monitor'
				])
			}
		]
	},
	{
		name: 'Map',
		icon: 'heat-map',
		path: '/map',
		component: AsyncComponent(() => [
			import('@pages/Map/Index'),
			'@pages/Map/Index'
		])
	}
];
export default routeConfig;
