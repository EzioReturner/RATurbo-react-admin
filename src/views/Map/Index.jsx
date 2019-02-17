import React, { Component } from 'react';
import './myMap.scss';
import BMap from 'BMap';
import { Card } from 'antd';
class Map extends Component {
	componentDidMount() {
		const map = new BMap.Map('mapContainer');
		map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
		map.setCurrentCity('北京');
		map.enableScrollWheelZoom(true);
		map.setMapStyle({ style: 'midnight' });
	}

	render() {
		return (
			<Card
				title="地图"
				bodyStyle={{
					height: 'calc(100% - 48px)',
					width: '100%',
					padding: '24px'
				}}
			>
				<div className="myMapContainer" id="mapContainer" />
			</Card>
		);
	}
}

export default Map;
