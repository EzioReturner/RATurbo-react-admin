import React, { Component } from 'react';
import { Card } from 'antd';
import { getWeather } from '../service';

class Weather extends Component {
	componentDidMount() {
		getWeather().then(res => {
			console.log(res);
		});
	}

	render() {
		return (
			<Card bordered={false}>
				<div>123</div>
			</Card>
		);
	}
}

export default Weather;
