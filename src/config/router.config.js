import Loadable from 'react-loadable';
import Loading from '@components/Loading/Index';
const routeConfig = [
	{
		name: 'Dashboard',
		icon: 'pie-chart',
		path: '/dashboard',
		component: Loadable({
			loader: () => import('@pages/Dashboard/Index'),
			loading: Loading
		})
	},
	{
		name: 'Analysis',
		icon: 'appstore',
		path: '/analysis',
		children: [
			{
				name: '工作台',
				path: '/analysis/platform',
				component: Loadable({
					loader: () => import('@pages/Analysis/Platform'),
					loading: Loading
				})
			},
			{
				name: '监控页',
				path: '/analysis/monitor',
				component: Loadable({
					loader: () => import('@pages/Analysis/Monitor'),
					loading: Loading
				})
			}
		]
	},
	{
		name: 'Map',
		icon: 'heat-map',
		path: '/map',
		component: Loadable({
			loader: () => import('@pages/Map/Index'),
			loading: Loading
		})
	}
	// {
	// 	path: '/',
	// 	redirect: '/dashboard',
	// 	hideMenu: true
	// }
];

export default routeConfig;
