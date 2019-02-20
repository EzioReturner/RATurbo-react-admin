import React, { Component } from 'react';
import './myMap.scss';
import BMap from 'BMap';
import { Card } from 'antd';
class Map extends Component {
	componentDidMount() {
		const map = new BMap.Map('mapContainer');
		map.centerAndZoom(new BMap.Point(118.204, 24.465), 11);
		map.setCurrentCity('厦门');
		map.enableScrollWheelZoom(true);
	}

	render() {
		return (
			<div>
				<Card
					style={{
						height: '100%'
					}}
					bordered
					className="thin-card"
					title="地图"
					bodyStyle={{
						height: 'calc(100% - 48px)',
						width: '100%',
						padding: '24px'
					}}
				>
					<div className="myMapContainer" id="mapContainer" />
				</Card>
			</div>
		);
	}
}

export default Map;
