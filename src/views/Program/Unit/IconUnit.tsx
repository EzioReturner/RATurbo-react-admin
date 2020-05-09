import React from 'react';
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import Styles from './index.module.less';

export default () => (
  <div className={Styles.iconUnit}>
    <HomeOutlined />
    <SettingFilled />
    <SmileOutlined />
    <SyncOutlined spin />
    <SmileOutlined rotate={180} />
    <LoadingOutlined />
  </div>
);
