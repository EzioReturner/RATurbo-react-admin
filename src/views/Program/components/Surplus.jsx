import React, { Component } from 'react';
import { Card } from 'antd';

class Surplus extends Component {
	render() {
		return (
			<Card
				title="Resource Surplus"
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
