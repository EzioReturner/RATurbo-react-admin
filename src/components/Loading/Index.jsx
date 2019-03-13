import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import './loading.scss';

/**
 * loading组件
 * @param {spinning} boolean 是否启用
 * @param {fixed} boolean 是否fixed覆盖全局
 */
@inject('layoutStore')
@observer
class Loading extends Component {
	render() {
		const { spinning, fixed } = this.props.layoutStore;
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
