import React from 'react';
import Result from '@components/Result';
import { Button } from 'antd';
import FormatterLocale from '@components/FormatterLocale';
import StepFormStore from './formStore';
import styles from './form.module.scss';

const Step3: React.FC = () => {
  const { initStep } = StepFormStore;
  return (
    <div className={styles.step}>
      <Result
        type="successed"
        title={<FormatterLocale id="action.success" defaultMessage="操作成功" />}
        subtitle={<FormatterLocale id="step3.soon" defaultMessage="已收到消息，将尽快处理~" />}
      />
      <div className={styles.buttonGroup}>
        <Button type="primary" onClick={initStep}>
          <FormatterLocale id="step3.oneMore" defaultMessage="再来一单" />
        </Button>
        <Button
          style={{
            marginLeft: '8px'
          }}
        >
          <FormatterLocale id="step3.checkList" defaultMessage="查看记录" />
        </Button>
      </div>
    </div>
  );
};

export default Step3;
