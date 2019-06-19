import React, { Component } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import FormatterLocale from 'components/FormatterLocale';
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
					<span>{subTitle || <FormatterLocale id="exception.backHome" />}</span>
					<Button type="primary" onClick={this.handleGoHome}>
						<FormatterLocale id="button.backHome" />
					</Button>
				</div>
			</div>
		);
	}
}

Exception.propTypes = {
	errorCode: PropTypes.oneOfType([
		PropTypes.string, PropTypes.number
	]),
	title: PropTypes.oneOfType([
		PropTypes.string, PropTypes.object
	]),
	subTitle: PropTypes.oneOfType([
		PropTypes.string, PropTypes.object
	]),
};

export default Exception;
