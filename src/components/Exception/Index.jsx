import React, { Component } from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import styles from './exception.module.scss';
import FormatterLocale from '@components/FormatterLocale';

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
					<span>{subTitle || <FormatterLocale id="exception.backHome" />}</span>
					<Button type="primary" onClick={this.handleGoHome}>
						<FormatterLocale id="button.backHome" />
					</Button>
				</div>
			</div>
		);
	}
}

export default Exception;
