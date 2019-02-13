import Loadable from 'react-loadable';
import Loading from '@components/Loading/Index';
import WrapComponent from '@components/WarpAnimation/Index';
import AsyncComponent from '@components/AsyncComponent/Index';
import React, { Fragment } from 'react';
//
// const WarpAnimationRender = (loaded, props) => {
// 	const C = loaded.default;
// 	return (
// 		<WrapComponent>
// 			<C {...props} />
// 		</WrapComponent>
// 	);
// };

const routeConfig = [
	{
		name: 'Dashboard',
		icon: 'pie-chart',
		path: '/dashboard',
		component: AsyncComponent(() => import('@pages/Dashboard/Index'))
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
				component: AsyncComponent(() => import('@pages/Analysis/Platform'))
			},
			{
				name: '监控页',
				path: '/analysis/monitor',
				component: AsyncComponent(() => import('@pages/Analysis/Monitor'))
			}
		]
	},
	{
		name: 'Map',
		icon: 'heat-map',
		path: '/map',
		component: AsyncComponent(() => import('@pages/Map/Index'))
	}
];
//
// const routeConfig = [
// 	{
// 		name: 'Dashboard',
// 		icon: 'pie-chart',
// 		path: '/dashboard',
// 		component: Loadable({
// 			loader: () => import('@pages/Dashboard/Index'),
// 			render: WarpAnimationRender,
// 			loading: Loading
// 		})
// 	},
// 	{
// 		path: '/',
// 		redirect: '/dashboard',
// 		hideMenu: true
// 	},
// 	{
// 		name: 'Analysis',
// 		icon: 'appstore',
// 		path: '/analysis',
// 		children: [
// 			{
// 				name: '工作台',
// 				path: '/analysis/platform',
// 				component: Loadable({
// 					loader: () => import('@pages/Analysis/Platform'),
// 					render: WarpAnimationRender,
// 					loading: Loading
// 				})
// 			},
// 			{
// 				name: '监控页',
// 				path: '/analysis/monitor',
// 				component: Loadable({
// 					loader: () => import('@pages/Analysis/Monitor'),
// 					render: WarpAnimationRender,
// 					loading: Loading
// 				})
// 			}
// 		]
// 	},
// 	{
// 		name: 'Map',
// 		icon: 'heat-map',
// 		path: '/map',
// 		component: Loadable({
// 			loader: () => import('@pages/Map/Index'),
// 			render: WarpAnimationRender,
// 			loading: Loading
// 		})
// 	}
// ];

export default routeConfig;
