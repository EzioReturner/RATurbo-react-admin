import React, { Component } from 'react';
import { Card, Row, Col, Icon } from 'antd';
import Controller from './Controller';
import { observer } from 'mobx-react';
import dashboardState from './model';
import './dashboard.scss';

import { initChart } from '@utlis/echartTools';

class EchartCard extends Component {
	render() {
		const headStyle = {
			borderBottomColor: '#f5f5f5'
		};
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
				size="small"
				title={CardTitle}
				headStyle={headStyle}
				bordered={false}
				hoverable
			>
				<div id={id} className="chartDom" />
			</Card>
		);
	}
}

@observer
class Dashboard extends Component {
	constructor(props) {
		super(props);
	}
	paintChart() {
		const {
			circleOption,
			barOption,
			cityOption,
			provinceOption
		} = dashboardState.getChartOption;
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
			}
		]);
	}

	startInitChart(chart) {
		for (let i = 0; i < chart.length; i++) {
			initChart(chart[i]);
		}
	}

	componentDidMount() {
		this.paintChart();
	}

	componentWillReact() {
		this.paintChart();
	}

	render() {
		const { showUnDefined } = dashboardState;
		return (
			<div className="content">
				<Controller showUnDefined={showUnDefined} store={dashboardState} />
				<Row
					gutter={24}
					style={{
						marginBottom: '24px'
					}}
				>
					<Col className="gutter-row" span={12}>
						<EchartCard title="性别" id="sexChart" />
					</Col>
					<Col className="gutter-row" span={12}>
						<EchartCard title="年龄" id="ageChart" />
					</Col>
				</Row>
				<Row gutter={24}>
					<Col className="gutter-row" span={12}>
						<EchartCard title="城市" id="cityChart" />
					</Col>
					<Col className="gutter-row" span={12}>
						<EchartCard title="省份" id="provinceChart" />
					</Col>
				</Row>
			</div>
		);
	}
}

export default Dashboard;
