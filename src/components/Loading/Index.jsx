import React, { Component } from 'react';
import './loading.scss';

class Loading extends Component {
	render() {
		return (
			<div className="loading">
				<div className="content">
					<div className="circle" />
					<span>LOADING</span>
				</div>
			</div>
		);
	}
}

export default Loading;
