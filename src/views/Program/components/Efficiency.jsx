import React, { Component } from 'react';
import { Card } from 'antd';
import EchartsReact from '@components/Echarts/Index';
import { guageOption } from '@assets/chartOption';

class Efficiency extends Component {
	render() {
		return (
			<Card hoverable bordered={false} className="fat-card" title="Guage">
				<EchartsReact option={guageOption} style={{ height: '200px' }} />
			</Card>
		);
	}
}

export default Efficiency;
