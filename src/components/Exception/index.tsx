import React from 'react';
import { Button } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import FormatterLocale from '@components/FormatterLocale';
import styles from './exception.module.scss';

interface ExceptionProps extends RouteComponentProps<any> {
  errorCode: React.ReactNode;
  title: React.ReactNode;
  subTitle: React.ReactNode;
}

const Exception: React.FC<ExceptionProps> = props => {
  const handleGoHome = () => {
    props.history.push('/dashboard');
  };

  const { errorCode, title, subTitle } = props;
  return (
    <div className={styles.exception}>
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

export default withRouter(Exception);
