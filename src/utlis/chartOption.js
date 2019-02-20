const circleOption = {
	legend: {
		orient: 'vertical',
		right: 20,
		data: [
			{
				name: '男',
				icon: 'circle'
			},
			{
				name: '女',
				icon: 'circle'
			},
			{
				name: '未识别',
				icon: 'circle'
			}
		]
	},
	series: {
		name: '访问来源',
		type: 'pie',
		radius: ['40%', '75%'],
		center: ['45%', '50%'],
		avoidLabelOverlap: false,
		label: {
			normal: {
				show: true,
				position: 'outside',
				formatter: '{d}%',
				fontWeight: 'bold'
			},
			emphasis: {
				show: true,
				textStyle: {
					fontSize: '30',
					fontWeight: 'bold'
				}
			}
		},
		labelLine: {
			normal: {
				show: false
			}
		},
		data: [
			{
				value: 335,
				name: '男',
				itemStyle: {
					color: 'rgba(251, 68, 145, 0.8)'
				}
			},
			{
				value: 310,
				name: '女',
				itemStyle: {
					color: 'rgba(220, 91, 231, 0.8)'
				}
			},
			{
				value: 234,
				name: '未识别',
				itemStyle: {
					color: '#d9d9d9'
				}
			}
		]
	}
};

const barOption = {
	grid: {
		left: 10,
		right: 10,
		top: 40,
		bottom: 40
	},
	xAxis: {
		type: 'category',
		data: ['未识别', '0-17', '18-24', '25-34', '35-44', '45+'],
		axisLabel: {
			color: '#c9c9c9'
		},
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		type: 'value',
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			show: false
		},
		splitLine: {
			lineStyle: {
				color: '#f6f6f6'
			}
		}
	},
	series: [
		{
			barCategoryGap: '50%',
			data: [
				{
					value: 45,
					itemStyle: {
						color: '#d9d9d9'
					}
				},
				4.2,
				22.5,
				22.3,
				'8.00',
				2.53
			],
			type: 'bar',
			label: {
				show: true,
				position: 'top',
				color: '#c9c9c9',
				formatter: '{c}%'
			},
			itemStyle: {
				color: 'rgba(251, 68, 145, 0.8)'
			},
			z: 2
		},
		{
			type: 'bar',
			silent: true,
			data: [45, 45, 45, 45, 45, 45],
			barGap: '-100%',
			itemStyle: {
				color: '#f9f9f9'
			},
			z: 1
		}
	]
};

const cityOption = {
	xAxis: {
		data: ['未识别', '上海', '北京', '深圳', '广州', '杭州']
	},
	series: {
		data: [
			{
				name: '未识别',
				value: 45,
				itemStyle: {
					color: '#d9d9d9'
				}
			},
			14.2,
			2.5,
			7.3,
			'19.00',
			33.53
		]
	}
};

const provinceOption = {
	xAxis: {
		data: ['未识别', '四川', '福建', '广东', '浙江', '河南']
	},
	series: {
		data: [
			{
				name: '未识别',
				value: 45,
				itemStyle: {
					color: '#d9d9d9'
				}
			},
			18.2,
			22.5,
			33.3,
			'9.00',
			13.53
		]
	}
};

const lineOption = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
			label: {
				backgroundColor: '#6a7985'
			}
		}
	},
	legend: {
		data: ['未识别', '邮件营销', '视频广告', '直接访问', '搜索引擎']
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		axisLine: {
			lineStyle: {
				color: '#efefef'
			}
		},
		axisLabel: {
			color: 'rgba(0,0,0,0.7)',
			fontWeight: 'bold'
		},
		data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
	},
	yAxis: [
		{
			axisLabel: {
				color: 'rgba(0,0,0,0.7)',
				fontWeight: 'bold'
			},
			type: 'value',
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitLine: {
				lineStyle: {
					color: '#efefef',
					type: 'dashed'
				}
			}
		}
	],
	series: [
		{
			name: '未识别',
			type: 'line',
			smooth: true,
			data: [520, 682, 534, 534, 390, 820, 410],
			lineStyle: {
				color: '#efefef'
			},
			areaStyle: {
				color: 'rgba(239,239,239,0.7)'
			},
			itemStyle: {
				color: '#efefef'
			}
		},
		{
			name: '邮件营销',
			type: 'line',
			smooth: true,
			areaStyle: {},
			lineStyle: {
				color: 'rgba(220, 91, 231, 0.4)'
			},
			areaStyle: {
				color: 'rgba(220, 91, 231, 0.4)'
			},
			itemStyle: {
				color: 'rgba(220, 91, 231, 0.4)'
			},
			data: [220, 182, 191, 234, 290, 330, 310]
		},
		{
			name: '搜索引擎',
			type: 'line',
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			smooth: true,
			lineStyle: {
				color: 'rgb(251, 68, 145,0.9)'
			},
			areaStyle: {
				color: 'rgba(251, 68, 145, 0.3)'
			},
			itemStyle: {
				color: 'rgba(251, 68, 145, 1)'
			},
			data: [820, 432, 901, 234, 790, 630, 820]
		}
	]
};

export const globalTrendsOption = {
	tooltip: {
		trigger: 'axis'
	},
	grid: {
		left: '0%',
		right: '1%',
		bottom: '0%',
		top: '0%',
		containLabel: true
	},
	xAxis: [
		{
			show: false,
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		}
	],
	yAxis: [
		{
			show: false,
			type: 'value'
		}
	],
	series: [
		{
			smooth: true,
			name: '邮件营销',
			type: 'line',
			lineStyle: {
				color: '#c6f0fd'
			},
			itemStyle: {
				color: '#c6f0fd'
			},
			areaStyle: {
				color: '#c6f0fd'
			},
			data: [0, 132, 21, 184, 90, 230, 0]
		},
		{
			smooth: true,
			name: '联盟广告',
			type: 'line',
			lineStyle: {
				color: '#8ac3e8'
			},
			itemStyle: {
				color: '#8ac3e8'
			},
			areaStyle: {
				color: '#8ac3e8'
			},
			data: [0, 182, 191, 34, 290, 30, 0]
		},
		{
			smooth: true,
			name: '视频广告',
			type: 'line',
			lineStyle: {
				color: '#6bb3e5'
			},
			itemStyle: {
				color: '#6bb3e5'
			},
			areaStyle: {
				color: '#6bb3e5'
			},
			data: [0, 232, 121, 154, 190, 330, 0]
		}
	]
};

export const analysisOptions = {
	circleOption,
	barOption,
	cityOption,
	provinceOption,
	lineOption
};
