import React, { Fragment, useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Input, Checkbox, message, Form } from 'antd';
import { siteName } from '@config/setting';
import UserStore from '@store/userStore';
import { inject } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import './login.less';
import 'animate.css';

interface LoginFormProps {
  handleError: Function;
}
interface InjectedProps extends LoginFormProps {
  userStore: UserStore;
}

const LoginForm: React.FC<LoginFormProps> = props => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { handleError: propsHandleError, userStore } = props as InjectedProps;

  const handleError = () => {
    setLoading(false);
    propsHandleError();
  };

  const handleSuccess = () => {
    history.push('/dashboard');
  };

  const handleSubmit = (values: StoreKeyValue) => {
    setLoading(true);
    const { username, password } = values;
    return new Promise(() => {
      userStore.handleUserLogin(username, password).then(res => {
        if (res) {
          message.success('login success');
          setTimeout(() => {
            handleSuccess();
          }, 800);
        } else {
          handleError();
        }
      });
    });
  };

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
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username: admin | guest"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password: 123"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>
              <span>Remember me</span>
            </Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            id="login_button"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
          <span> Or </span>
          <a href="">register now!</a>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default inject('userStore')(LoginForm);
