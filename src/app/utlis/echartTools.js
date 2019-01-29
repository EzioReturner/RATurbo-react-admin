import echarts from 'echarts';

function initChart({id, option, otherOption}) {
  if (!id || !option) 
    return
  let myChart = echarts.getInstanceByDom(document.getElementById(id));
  // console.log(myChart);
  if (myChart === undefined) {
    myChart = echarts.init(document.getElementById(id));
  }
  myChart.setOption(option);
  otherOption && myChart.setOption(otherOption);
  return myChart;
}

export {
  initChart
}
