import React, { Fragment, useState } from 'react';
import { Form, Button, Input, Icon, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { siteName } from '@config/setting';
import UserStore from '@store/userStore';
import { inject } from 'mobx-react';
import './login.scss';
import 'animate.css';

interface LoginFormProps extends FormComponentProps, RouteComponentProps {
  handleError: Function;
}

interface InjectedProps extends LoginFormProps {
  userStore: UserStore;
}

const LoginForm: React.FC<LoginFormProps> = props => {
  const [loading, setLoading] = useState(false);

  const injected = () => {
    return props as InjectedProps;
  };

  const handleError = () => {
    setLoading(false);
    props.handleError();
  };

  const handleSuccess = () => {
    props.history.push('/dashboard');
  };

  const { userStore } = injected();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields((err: any) => {
      if (!err) {
        setLoading(true);
        const { userName, password } = props.form.getFieldsValue(['userName', 'password']);
        return new Promise(() => {
          setTimeout(() => {
            userStore.handleUserLogin(userName, password).then(res => {
              if (res) {
                handleSuccess();
              } else {
                handleError();
              }
            });
          }, 800);
        });
      }
    });
  };

  const { getFieldDecorator } = props.form;
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
      <Form onSubmit={e => handleSubmit(e)} className="login-form">
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
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
            <span>Log in</span>
          </Button>
          Or <a href="/login">register now!</a>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default inject('userStore')(withRouter(LoginForm));
