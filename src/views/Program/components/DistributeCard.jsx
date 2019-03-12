import React, { Component, Fragment } from 'react';
import { Card, Row, Col, Icon } from 'antd';
import ET from '@utlis/echartTools';
import { observer, inject } from 'mobx-react';
class ChartCard extends Component {
	render() {
		const { title, id } = this.props;
		const CardTitle = (
			<div className="titleNanme">
				{title}
				<div className="iconBar">
					<Icon type="redo" />
					<Icon
						type="cloud-download"
						style={{
							marginLeft: '10px'
						}}
					/>
				</div>
			</div>
		);
		return (
			<Card
				hoverable
				title={CardTitle}
				className="thin-card"
				bordered={false}
				bodyStyle={{ overflow: 'hidden' }}
			>
				<div id={id} className="chartDom" />
			</Card>
		);
	}
}

@inject('programStore')
@observer
class DistributeCard extends Component {
	paintChart() {
		const {
			circleOption,
			barOption,
			cityOption,
			provinceOption,
			lineOption
		} = this.props.programStore.getChartOption;
		this.startInitChart([
			{
				id: 'sexChart',
				option: circleOption
			},
			{
				id: 'ageChart',
				option: barOption
			},
			{
				id: 'cityChart',
				option: barOption,
				otherOption: cityOption
			},
			{
				id: 'provinceChart',
				option: barOption,
				otherOption: provinceOption
			},
			{
				id: 'channelChart',
				option: lineOption
			}
		]);
	}
	startInitChart(chart) {
		for (let i = 0; i < chart.length; i++) {
			ET.initChart(chart[i]);
		}
	}

	componentDidMount() {
		this.paintChart();
	}

	componentWillReact() {
		this.paintChart();
	}

	componentWillUnmount() {
		[
			'sexChart',
			'ageChart',
			'cityChart',
			'provinceChart',
			'channelChart'
		].forEach(id => {
			ET.dispose(id);
		});
	}

	render() {
		const { showUnDefined } = this.props.programStore;
		const style = {
			marginBottom: '24px'
		};
		return (
			<Fragment>
				<Row gutter={24} style={style}>
					<Col span={12}>
						<ChartCard title="性别" id="sexChart" />
					</Col>
					<Col span={12}>
						<ChartCard title="年龄" id="ageChart" />
					</Col>
				</Row>
				<Row style={style}>
					<Col>
						<ChartCard title="渠道" id="channelChart" />
					</Col>
				</Row>
				<Row gutter={24}>
					<Col span={12}>
						<ChartCard title="城市" id="cityChart" />
					</Col>
					<Col span={12}>
						<ChartCard title="省份" id="provinceChart" />
					</Col>
				</Row>
			</Fragment>
		);
	}
}
export default DistributeCard;
