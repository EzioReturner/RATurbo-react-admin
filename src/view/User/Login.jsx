import React, { Component, Fragment } from 'react';
import { Form, Button, Input, Icon, Checkbox, Alert } from 'antd';
import { withRouter } from 'react-router-dom';
import { inject } from 'mobx-react';
import './login.scss';
import 'animate.css';
import { siteName } from '@src/config/setting';

@withRouter
@inject('userStore')
class FormContainer extends Component {
	state = {
		loading: false
	};

	handleError() {
		this.setState({
			loading: false
		});
		this.props.handleError();
	}

	handleSuccess(data) {
		this.props.history.push('/dashboard');
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					loading: true
				});
				const { userName, password } = this.props.form.getFieldsValue([
					'userName',
					'password'
				]);
				return new Promise(resolve => {
					setTimeout(() => {
						this.props.userStore
							.handleUserLogin(userName, password)
							.then(res => {
								if (res) {
									this.handleSuccess();
								} else {
									this.handleError();
								}
							});
					}, 800);
				});
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { loading } = this.state;
		return (
			<Fragment>
				<div className="loginTitle">
					{
						siteName === 'RA-Turbo' ? <React.Fragment>R<span>A</span>-TORBO</React.Fragment> : siteName
					}
				</div>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator('userName', {
							rules: [
								{ required: true, message: 'Please input your username!' }
							]
						})(
							<Input
								prefix={<Icon type="user" />}
								placeholder="Username: admin | guest"
								autoComplete="off"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [
								{ required: true, message: 'Please input your Password!' }
							]
						})(
							<Input
								prefix={<Icon type="lock" />}
								type="password"
								placeholder="Password: 123"
								autoComplete="off"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true
						})(<Checkbox>Remember me</Checkbox>)}
						<a className="login-form-forgot" href="">
							Forgot password
						</a>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							loading={loading}
						>
							Log in
						</Button>
						Or <a href="">register now!</a>
					</Form.Item>
				</Form>
			</Fragment>
		);
	}
}

class Login extends Component {
	state = {
		apError: false,
		shake: false
	};

	handleError = () => {
		this.setState({
			apError: true,
			shake: true
		});
	};

	handleAnimationEnd = () => {
		this.setState({
			shake: false
		});
	};

	render() {
		const WrapForm = Form.create({ name: 'login' })(FormContainer);
		const { apError, shake } = this.state;
		return (
			<div className="login">
				{apError && (
					<div
						className={shake ? 'animated shake' : ''}
						onAnimationEnd={this.handleAnimationEnd}
					>
						<Alert
							message="账户或者密码错误 a:ra  p:123"
							type="error"
							showIcon
							style={{ marginBottom: '16px' }}
						/>
					</div>
				)}
				<WrapForm handleError={this.handleError} />
			</div>
		);
	}
}

export default Login;
