import echarts from 'echarts';
import debounce from './debounce';

class EchartsTool {
	displayChart = new Map();
	constructor() {}

	initChart({ id, option, otherOption }) {
		if (!id || !option) return;
		let myChart = echarts.getInstanceByDom(document.getElementById(id));

		if (myChart === undefined) {
			myChart = echarts.init(document.getElementById(id));
		}
		myChart.setOption(option);

		this.addResize(myChart);
		this.cacheDisplayChart(id);
		otherOption && myChart.setOption(otherOption);

		return myChart;
	}

	// 添加视窗size响应
	addResize(myChart) {
		myChart._windowResizeEvent = () => {
			myChart.resize();
		};
		debounce(window.addEventListener('resize', myChart._windowResizeEvent));
	}

	// 缓存chart
	cacheDisplayChart(id) {
		this.displayChart.set(id, '');
	}

	//触发图表resize
	resizeAllDisplayChart() {
		const ids = [...this.displayChart.keys()];
		setTimeout(() => {
			ids.forEach(id => {
				const _chart = echarts.getInstanceByDom(document.getElementById(id));
				console.log(_chart);
				_chart._windowResizeEvent();
			});
		}, 600);
	}

	// 解除chart
	dispose(id) {
		this.removeDisplayChart(id);
		this.removeResize(id);
	}

	removeDisplayChart(id) {
		this.displayChart.has(id) && this.displayChart.delete(id);
	}

	removeResize(id) {
		const myChart = echarts.getInstanceByDom(document.getElementById(id));
		window.removeEventListener('resize', myChart._windowResizeEvent);
	}
}

const ET = new EchartsTool();

export default ET;
