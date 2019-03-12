import React, { Component } from 'react';
import { Card } from 'antd';
import { multiAnalysisOption } from '@assets/chartOption';
import EchartsReact from '@components/Echarts/Index';

class MultiAnalysis extends Component {
	render() {
		return (
			<Card
				className="fat-card"
				hoverable
				bordered={false}
				title="Multidimensional Analysis"
			>
				<EchartsReact option={multiAnalysisOption} />
			</Card>
		);
	}
}

export default MultiAnalysis;
