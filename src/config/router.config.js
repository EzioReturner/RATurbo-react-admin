const routeConfig = [
	{
		path: "/",
		redirect: "/dashboard",
		hideMenu: true
	},
	{
		name: "Dashboard",
		icon: "pie-chart",
		path: "/dashboard",
		component: "@pages/dashboard/index"
	},
	{
		name: "Analysis",
		icon: "appstore",
		path: "/analysis",
		children: [
			{
				name: "工作台",
				path: "/analysis/platform",
				component: "@pages/analysis/platform"
			},
			{
				name: "监控页",
				path: "/analysis/monitor",
				component: "@pages/analysis/monitor"
			}
		]
	},
	{
		name: "Map",
		icon: "heat-map",
		path: "/map",
		componet: "@pages/map/index"
	}
];

export default routeConfig;
