import React, { Component } from 'react';
import { Card } from 'antd';
import { multiAnalysisOption } from '@assets/chartOption';
import ET from '@utlis/echartTools';

class MultiAnalysis extends Component {
	componentDidMount() {
		ET.initChart({ id: 'multiAnalysis', option: multiAnalysisOption });
	}
	render() {
		return (
			<Card
				className="fat-card"
				hoverable
				bordered={false}
				title="Multidimensional Analysis"
			>
				<div id="multiAnalysis">123</div>
			</Card>
		);
	}
}

export default MultiAnalysis;
