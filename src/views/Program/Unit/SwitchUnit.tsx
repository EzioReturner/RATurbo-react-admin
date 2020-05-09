import React from 'react';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const SwitchUnit = () => {
  return (
    <div>
      <Switch defaultChecked />
      <br />
      <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
      <br />
      <Switch checkedChildren="1" unCheckedChildren="0" />
      <br />
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked
      />
      <br />
      <Switch loading defaultChecked />
      <br />
      <Switch size="small" loading />
    </div>
  );
};

export default SwitchUnit;
