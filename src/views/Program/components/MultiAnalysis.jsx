import React, { Component } from 'react';
import { Card } from 'antd';
import { multiAnalysisOption } from '@assets/chartOption';
import EchartsReact from '@components/Echarts';
import FormatterLocale from '@components/FormatterLocale';

class MultiAnalysis extends Component {
	render() {
		return (
			<Card
				className="fat-card"
				hoverable
				bordered={false}
				title={<FormatterLocale id="platform.MutliAnalysis" />}
			>
				<EchartsReact option={multiAnalysisOption} />
			</Card>
		);
	}
}

export default MultiAnalysis;
