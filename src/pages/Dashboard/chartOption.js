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

export { circleOption, barOption, cityOption, provinceOption };
