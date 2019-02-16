import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import './loading.scss';

class Loading extends Component {
	render() {
		const { spinning, fixed } = this.props;
		return (
			<div
				className={classNames('loading', {
					hide: !spinning,
					fixed
				})}
			>
				<div className="content">
					<div className="circle" />
					<span>LOADING</span>
				</div>
			</div>
		);
	}
}

export default Loading;
