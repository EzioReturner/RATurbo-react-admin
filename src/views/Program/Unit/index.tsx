import React from 'react';
import Styles from './index.module.less';
import ButtonUnit from './ButtonUnit';
import IconUnit from './IconUnit';
import CheckboxUnit from './CheckboxUnit';
import RadioUnit from './RadioUnit';
import SwitchUnit from './SwitchUnit';
import SliderUnit from './SliderUnit';
import InputUnit from './InputUnit';
import SelectUnit from './SelectUnit';
import DateUnit from './DateUnit';
import AutoCompleteUnit from './AutoComplete';
import CascaderUnit from './Cascader';
import TreeSelectUnit from './TreeSelect';
import TableUnit from './TableUnit';
import { RLogo } from '@components/SvgIcon';
import { Pagination, Steps, Divider, Progress } from 'antd';

const { Step } = Steps;
const Unit: React.FC = () => {
  return (
    <div className={Styles.unit}>
      <div>
        <p className={Styles.title}>Button</p>
        <ButtonUnit />
      </div>
      <div>
        <p className={Styles.title}>CheckBox</p>
        <CheckboxUnit />
      </div>
      <div>
        <p className={Styles.title}>Switch</p>
        <SwitchUnit />
      </div>
      <div>
        <p className={Styles.title}>Slider</p>
        <SliderUnit />
      </div>
      <div>
        <p className={Styles.title}>Radio</p>
        <RadioUnit />
      </div>
      <div>
        <p className={Styles.title}>Select</p>
        <SelectUnit />
      </div>
      <div>{RLogo('#54bf99')}</div>
      <div>
        <p className={Styles.title}>Progress</p>
        <Progress percent={30} />
        <Progress percent={50} status="active" />
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
        <Progress percent={50} showInfo={false} />
      </div>
      <div>
        <p className={Styles.title}>Icon</p>
        <IconUnit />
      </div>
      <div>
        <p className={Styles.title}>Input</p>
        <InputUnit />
      </div>
      <div>
        <p className={Styles.title}>Date</p>
        <DateUnit />
      </div>
      <div>
        <p className={Styles.title}>AutoComplete</p>
        <AutoCompleteUnit />
      </div>
      <div>
        <p className={Styles.title}>Cascader</p>
        <CascaderUnit />
      </div>
      <div>
        <p className={Styles.title}>TreeSelect</p>
        <TreeSelectUnit />
      </div>
      <div>
        <p className={Styles.title}>Step</p>
        <Steps current={1}>
          <Step title="Finished" description="This is a description." />
          <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
        </Steps>
      </div>
      <div>
        <p className={Styles.title}>Pagination</p>
        <Pagination defaultCurrent={6} total={500} />
      </div>
      <div>
        <p className={Styles.title}>Table</p>
        <TableUnit />
      </div>
      <Divider />
    </div>
  );
};

export default Unit;
