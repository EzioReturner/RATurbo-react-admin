import React, { PureComponent } from 'react';
import { Card } from 'antd';
import ET from '@utlis/echartTools';
import EchartsReact from '@components/Echarts/Index';
import { globalTrendsOption } from '@assets/chartOption';

class GlobalTrends extends PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		return (
			<Card
				hoverable
				bordered={false}
				className="fat-card global-trends"
				bodyStyle={{ overflow: 'hidden' }}
				title="Global Trends"
			>
				<EchartsReact
					style={{ height: '350px', width: '100%' }}
					option={globalTrendsOption}
				/>
			</Card>
		);
	}
}

export default GlobalTrends;
