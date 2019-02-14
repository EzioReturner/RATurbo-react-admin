import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Grid, Button } from 'antd';
import './monitor.scss';

class Monitor extends Component {
	state = {
		name: '',
		showValidationMessage: false,
		showValidationButton: true
	};

	componentDidMount() {
		this.setState({
			showValidationMessage: true
		});
	}

	render() {
		const { name, showValidationMessage, showValidationButton } = this.state;
		return (
			<div>
				<CSSTransition
					in={showValidationMessage}
					timeout={300}
					appear
					classNames="star"
					unmountOnExit
				>
					<div className="star">⭐</div>
				</CSSTransition>
			</div>
		);
	}
}

export default Monitor;
