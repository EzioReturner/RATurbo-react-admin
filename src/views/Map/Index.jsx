import React, { Component } from 'react';
import './myMap.scss';
import BMap from 'BMap';
import { Card } from 'antd';
class Map extends Component {
	componentDidMount() {
		const map = new BMap.Map('mapContainer');
		map.centerAndZoom(new BMap.Point(108.154, 37.495), 5);
		map.enableScrollWheelZoom(true);
		// import('@assets/json/custom_map_config.json').then(res => {
		// 	map.setMapStyle({ styleJson: res });
		// });
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
					bodyStyle={{
						height: '100%',
						width: '100%',
						padding: '4px'
					}}
				>
					<div className="myMapContainer" id="mapContainer" />
				</Card>
			</div>
		);
	}
}

export default Map;
