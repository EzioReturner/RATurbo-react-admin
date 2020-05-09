import React from 'react';
import Styles from './index.module.less';
import ButtonUnit from './ButtonUnit';
import IconUnit from './IconUnit';
import { Pagination, Steps } from 'antd';

const { Step } = Steps;
const Unit: React.FC = () => {
  return (
    <div className={Styles.unit}>
      <div>
        <p className={Styles.title}>Button</p>
        <ButtonUnit />
      </div>
      <div>
        <p className={Styles.title}>Icon</p>
        <IconUnit />
      </div>
      <div>
        <p className={Styles.title}>Pagination</p>
        <Pagination defaultCurrent={6} total={500} />
      </div>
      <div>
        <p className={Styles.title}>Step</p>
        <Steps current={1}>
          <Step title="Finished" description="This is a description." />
          <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
        </Steps>
      </div>
    </div>
  );
};

export default Unit;
