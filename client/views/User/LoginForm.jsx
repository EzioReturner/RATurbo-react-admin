import React, { Component, Fragment } from 'react';
import { Form, Button, Input, Icon, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import { siteName } from '@config/setting';
import { inject } from 'mobx-react';
import './login.scss';
import 'animate.css';

@withRouter
@inject('userStore')
class LoginForm extends Component {
  state = {
    loading: false
  };

  handleError() {
    this.setState({
      loading: false
    });
    this.props.handleError();
  }

  handleSuccess() {
    this.props.history.push('/dashboard');
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(err => {
      if (!err) {
        this.setState({
          loading: true
        });
        const { userName, password } = this.props.form.getFieldsValue(['userName', 'password']);
        return new Promise(() => {
          setTimeout(() => {
            this.props.userStore.handleUserLogin(userName, password).then(res => {
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
          {siteName === 'RA-Turbo' ? (
            <React.Fragment>
              R<span>A</span>-TORBO
            </React.Fragment>
          ) : (
            siteName
          )}
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }]
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
              rules: [{ required: true, message: 'Please input your Password!' }]
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
            <a className="login-form-forgot" href="/login">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              <span>Log in</span>
            </Button>
            Or <a href="/login">register now!</a>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default LoginForm;
