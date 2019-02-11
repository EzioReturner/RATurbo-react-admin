import React, { Component } from "react";
import { Card, Row, Col, Icon } from "antd";
import Controller from "./Controller";
import "./dashboard.scss";
import {
	circleOption,
	barOption,
	cityOption,
	provinceOption
} from "./chartOption.js";
import { initChart } from "@utlis/echartTools";

class EchartCard extends Component {
	constructor(props) {
		super(props);
		this.circleChart = null;
		this.barChart = null;
	}

	render() {
		const headStyle = {
			borderBottomColor: "#f5f5f5"
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
							marginLeft: "10px"
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
			>
				<div id={id} className="chartDom" />
			</Card>
		);
	}
}

class Dashboard extends Component {
	componentDidMount() {
		const chartArray = [
			{
				id: "sexChart",
				option: circleOption
			},
			{
				id: "ageChart",
				option: barOption
			},
			{
				id: "cityChart",
				option: barOption,
				otherOption: cityOption
			},
			{
				id: "provinceChart",
				option: barOption,
				otherOption: provinceOption
			}
		];
		this.startInitChart(chartArray);
	}

	startInitChart(chart) {
		for (let i = 0; i < chart.length; i++) {
			initChart(chart[i]);
		}
	}

	render() {
		return (
			<div className="content">
				<Controller />
				<Row
					gutter={16}
					style={{
						marginBottom: "16px"
					}}
				>
					<Col className="gutter-row" span={12}>
						<EchartCard title="性别" id="sexChart" />
					</Col>
					<Col className="gutter-row" span={12}>
						<EchartCard title="年龄" id="ageChart" />
					</Col>
				</Row>
				<Row gutter={16}>
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
