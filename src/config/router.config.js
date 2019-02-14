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
		name: 'Analysis',
		icon: 'appstore',
		path: '/analysis',
		children: [
			{
				name: '工作台',
				path: '/analysis/platform',
				component: AsyncComponent(() => [
					import('@pages/Analysis/Platform'),
					'@pages/Analysis/Platform'
				])
			},
			{
				name: '监控页',
				path: '/analysis/monitor',
				component: AsyncComponent(() => [
					import('@pages/Analysis/Monitor'),
					'@pages/Analysis/Monitor'
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
