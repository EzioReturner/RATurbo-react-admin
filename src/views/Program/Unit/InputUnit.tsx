import React from 'react';
import { Input, InputNumber } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search, TextArea } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff'
    }}
  />
);

const InputUnit = () => (
  <>
    <Input placeholder="Basic usage" />
    <br />
    <Search
      placeholder="input search text"
      onSearch={value => console.log(value)}
      style={{ width: 200 }}
    />
    <br />
    <Search
      placeholder="input search text"
      enterButton="Search"
      size="large"
      suffix={suffix}
      onSearch={value => console.log(value)}
    />
    <br />
    <InputNumber min={1} max={10} defaultValue={3} />
    <br />
    <TextArea rows={4} />
  </>
);

export default InputUnit;
