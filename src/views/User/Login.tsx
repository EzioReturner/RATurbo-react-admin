import React, { useState } from 'react';
import { Alert } from 'antd';
import LoginForm from './LoginForm';
import './login.less';
import 'animate.css';

const Login: React.FC = () => {
  const [apError, setApError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleError = () => {
    setShake(true);
    setApError(true);
  };

  return (
    <div className="login">
      {apError && (
        <div className={shake ? 'animated shake' : ''} onAnimationEnd={() => setShake(false)}>
          <Alert
            message="账户或者密码错误 a:ra  p:123"
            type="error"
            showIcon
            style={{ marginBottom: '16px' }}
          />
        </div>
      )}
      <LoginForm handleError={handleError} />
    </div>
  );
};

export default Login;
