import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './warp.scss';

class WrapComponent extends Component {
	state = {
		animateIn: false
	};

	componentDidMount() {
		this.setState({
			animateIn: true
		});
	}

	render() {
		const { children } = this.props;
		return (
			<CSSTransition
				in={this.state.animateIn}
				classNames="fade"
				timeout={1000}
				mountOnEnter
				unmountOnExit
			>
				{children}
			</CSSTransition>
		);
	}
}

export default WrapComponent;
