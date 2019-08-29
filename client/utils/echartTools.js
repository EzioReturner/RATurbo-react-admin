import echarts from 'echarts';
import debounce from './debounce';

class EchartsTool {
  displayChart = new Map();

  initChart(data) {
    if (!data || !data.id || !data.option) return;
    const { id, option, otherOption } = data;
    let myChart = this.getInstance(id);

    if (myChart === undefined) {
      myChart = echarts.init(document.getElementById(id));
    }
    myChart.setOption(option);

    this.addResize(myChart);
    this.cacheDisplayChart(id);
    otherOption && myChart.setOption(otherOption);

    return myChart;
  }

  getInstance(id) {
    return echarts.getInstanceByDom(document.getElementById(id));
  }

  registerMap(name, data) {
    echarts.registerMap(name, data);
  }

  // 添加视窗size响应
  addResize(myChart) {
    myChart._windowResizeEvent = () => {
      debounce(myChart.resize());
    };
    window.addEventListener('resize', myChart._windowResizeEvent);
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
        const _chart = this.getInstance(id);
        _chart._windowResizeEvent();
      });
    }, 700);
  }

  // 解除chart
  dispose(id) {
    this.removeDisplayChart(id);
    this.removeResize(id);
    echarts.dispose(this.getInstance(id));
  }

  removeDisplayChart(id) {
    this.displayChart.has(id) && this.displayChart.delete(id);
  }

  removeResize(id) {
    const myChart = this.getInstance(id);
    window.removeEventListener('resize', myChart._windowResizeEvent);
  }
}

const ET = new EchartsTool();

export default ET;
