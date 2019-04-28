import React, { Component } from 'react';
import { Card } from 'antd';
import FormatterLocale from '@components/FormatterLocale';

class Surplus extends Component {
	render() {
		return (
			<Card
				hoverable
				bordered={false}
				title={<FormatterLocale id="monitor.surplus" defaultMessage="资源盈余" />}
				className="fat-card"
				bodyStyle={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<div id="resource-surplus">
					<div className="wave" />
					<p>24%</p>
				</div>
			</Card>
		);
	}
}

export default Surplus;
