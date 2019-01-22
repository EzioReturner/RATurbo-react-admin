import echarts from 'echarts';

function initChart({id, option}) {
    if (!id || !option) 
        return
    let myChart = echarts.getInstanceByDom(document.getElementById(id));
    // console.log(myChart);
    if (myChart === undefined) {
        myChart = echarts.init(document.getElementById(id));
    }
    myChart.setOption(option);
    return myChart;
}

export {
    initChart
}
