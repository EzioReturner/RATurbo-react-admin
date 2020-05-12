import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import FormatterLocale from '@components/FormatterLocale';
import './exception.less';

interface ExceptionProps {
  errorCode: React.ReactNode;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
}

const Exception: React.FC<ExceptionProps> = props => {
  const history = useHistory();
  const handleGoHome = () => {
    history.push('/dashboard');
  };

  const { errorCode, title, subTitle } = props;
  return (
    <div className="RA-exception">
      <h1>{errorCode}</h1>
      <p>{title}</p>
      <div>
        <span>{subTitle || <FormatterLocale id="exception.backHome" />}</span>
        <Button type="primary" onClick={handleGoHome}>
          <FormatterLocale id="button.backHome" />
        </Button>
      </div>
    </div>
  );
};

export default Exception;
