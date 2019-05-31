import React, { Component } from 'react';
import { Card } from 'antd';
import BMap from 'BMap';
import './myMap.scss';

class Map extends Component {
	componentDidMount() {
		const map = new BMap.Map('mapContainer');
		map.centerAndZoom(new BMap.Point(108.154, 37.495), 5);
		map.enableScrollWheelZoom(true);
	}

	render() {
		return (
			<div style={{ height: '100%', minHeight: '500px' }}>
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
