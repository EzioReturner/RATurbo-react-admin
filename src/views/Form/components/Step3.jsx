import React, { PureComponent } from 'react';
import Result from '@components/Result';
import { Button } from 'antd';
import StepFormStore from './formStore';
import styles from '../form.module.scss';

class Step3 extends PureComponent {
  render() {
    const { initStep } = StepFormStore;
    return <div className={styles.step}>
      <Result type="success" title="操作成功" subTitle="我们很快就会收到消息啦!" />
      <div className={styles.buttonGroup}>
        <Button type="primary" onClick={initStep}>再填一单</Button>
        <Button style={{
          marginLeft: '8px'
        }}>查看记录</Button>
      </div>
    </div>
  }
}

export default Step3;