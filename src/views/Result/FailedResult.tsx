import React from 'react';
import Result from '@components/Result';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import { Card, Button, Icon } from 'antd';
import styles from './styles.module.scss';

const FailedResult: React.FC = () => {
  const Extra = (
    <div>
      <h2>
        <FormatterLocale id="result.failed.tips" />
      </h2>
      <div className={styles.reason}>
        <Icon type="close-circle" className={styles.icon} />
        <FormatterLocale id="result.failed.reason1" />
        <Button type="link" className={styles.aButton}>
          申请权限
        </Button>
      </div>
      <div className={styles.reason}>
        <Icon type="close-circle" className={styles.icon} />
        <FormatterLocale id="result.failed.reason2" />
        <Button type="link" className={styles.aButton}>
          重新评估
        </Button>
      </div>
    </div>
  );

  const Actions = <Button type="primary">返回</Button>;
  return (
    <PageWrapper>
      <Card bordered={false}>
        <Result
          title={<FormatterLocale id="result.failed.title" />}
          subtitle={<FormatterLocale id="result.failed.subtitle" />}
          type="failed"
          style={{ marginTop: '32px' }}
          extra={Extra}
          actions={Actions}
        />
      </Card>
    </PageWrapper>
  );
};

export default FailedResult;
