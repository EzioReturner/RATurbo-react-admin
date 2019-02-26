import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { getWeather } from '@api/dashboard';
import {
	RainSvg,
	SnowSvg,
	CloudySvg,
	OvercastSvg,
	ThunderSvg,
	SunSvg
} from '@components/SvgIcon';

class Weather extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			weekName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		};
	}

	componentDidMount() {
		getWeather().then(res => {
			const { status, forecasts } = res.data;
			if (Number(status) === 1) {
				this.setState({
					data: forecasts[0].casts.map(res => {
						const { daypower, daytemp, dayweather, week } = res;
						return {
							daypower,
							daytemp,
							dayweather,
							week
						};
					})
				});
			}
		});
	}

	getWeatherIcon(dayweather) {
		let icon = null;
		if (dayweather.indexOf('雷') >= 0) {
			icon = <ThunderSvg />;
		} else if (dayweather.indexOf('雨') >= 0) {
			icon = <RainSvg />;
		} else if (dayweather.indexOf('云') >= 0) {
			icon = <CloudySvg />;
		} else if (dayweather.indexOf('阴') >= 0) {
			icon = <OvercastSvg />;
		} else if (dayweather.indexOf('晴') >= 0) {
			icon = <SunSvg />;
		}

		return icon;
	}

	render() {
		const { data, weekName } = this.state;
		const bodyStyle = {
			padding: '0'
		};
		const weatherItem = data.map((res, index) => {
			const { week, daypower, daytemp, dayweather } = res;
			return (
				<div className="weakly-weather-item p-3" key={index}>
					<p className="mb-1">{weekName[Number(week - 1)]}</p>
					{this.getWeatherIcon(dayweather)}
					<p className="mb-0">{daypower + '° - ' + daytemp + '°'}</p>
				</div>
			);
		});

		return (
			<Card bordered={false} className="weather-card" bodyStyle={bodyStyle}>
				<div className="weather-body">
					<div className="weather-date-location">
						<h2>Monday</h2>
						<p className="text-muted">25 October, 2016 London, UK</p>
					</div>
					<div className="weather-data">
						<h1>21℃</h1>
						<p>Mostly Cloudy</p>
					</div>
				</div>
				<div className="weakly-weather">{weatherItem}</div>
			</Card>
		);
	}
}

export default Weather;
