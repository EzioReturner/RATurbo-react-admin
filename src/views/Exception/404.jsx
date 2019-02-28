import React, { Component } from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import './exception.scss';

@withRouter
class Exception404 extends Component {
	handleGoHome = () => {
		this.props.history.push('/dashboard');
	};

	render() {
		return (
			<div className="exception403">
				<h1>404</h1>
				<p>好像找不到你要访问的页面哦</p>
				<div>
					<span>回首页看看吧~</span>
					<Button type="primary" onClick={this.handleGoHome}>
						返回首页
					</Button>
				</div>
			</div>
		);
	}
}

export default Exception404;
