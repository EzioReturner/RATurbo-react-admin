import React, { Component } from 'react';
import { Alert, Form } from 'antd';
import LoginForm from './LoginForm';
import './login.scss';
import 'animate.css';

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
    const WrapForm = Form.create({ name: 'login' })(LoginForm);
    const { apError, shake } = this.state;
    return (
      <div className="login">
        {apError && (
          <div className={shake ? 'animated shake' : ''} onAnimationEnd={this.handleAnimationEnd}>
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
