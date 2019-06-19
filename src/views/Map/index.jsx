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
			<div>
				<Card
					bordered
					className="thin-card"
					bodyStyle={{
						height: 'calc(100vh - 146px)',
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
