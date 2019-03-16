import React, { Component } from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import styles from './exception.module.scss';

@withRouter
class Exception extends Component {
	handleGoHome = () => {
		this.props.history.push('/dashboard');
	};

	render() {
		const { errorCode, title, subTitle } = this.props;
		return (
			<div className={styles.exception}>
				<h1>{errorCode}</h1>
				<p>{title}</p>
				<div>
					<span>{subTitle || '回首页看看吧~'}</span>
					<Button type="primary" onClick={this.handleGoHome}>
						返回首页
					</Button>
				</div>
			</div>
		);
	}
}

export default Exception;
