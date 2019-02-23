import React, { Component } from 'react';
import { Form, Button, Input, Icon, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import { setAuthority } from '@utlis/authorityTools';
import './login.scss';

@withRouter
class FormContainer extends Component {
	state = {
		loading: false
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.setState({
					loading: true
				});
				return new Promise(resolve => {
					setTimeout(() => {
						setAuthority('admin');
						this.props.history.push('/dashboard');
						resolve();
					}, 1000);
				});
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { loading } = this.state;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<Form.Item>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }]
					})(
						<Input prefix={<Icon type="user" />} placeholder="Username: ra" />
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }]
					})(
						<Input
							prefix={<Icon type="lock" />}
							type="password"
							placeholder="Password: 123456"
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
		);
	}
}

class Login extends Component {
	render() {
		const WrapForm = Form.create({ name: 'login' })(FormContainer);
		return (
			<div className="login">
				<WrapForm />
			</div>
		);
	}
}

export default Login;
