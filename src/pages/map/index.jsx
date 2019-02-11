import React, { Component } from "react";
import "./myMap.scss";
import BMap from "BMap";
class Map extends Component {
	componentDidMount() {
		const map = new BMap.Map("mapContainer");
		map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
		map.setCurrentCity("北京");
		map.enableScrollWheelZoom(true);
	}

	render() {
		return <div className="myMapContainer" id="mapContainer" />;
	}
}

export default Map;
