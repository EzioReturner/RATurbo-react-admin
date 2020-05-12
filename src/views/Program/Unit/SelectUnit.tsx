import React from 'react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { Select, Radio } from 'antd';

const { Option } = Select;

const children: any = [];
for (let i = 10; i < 36; i++) {
  children.push(
    <Option
      value={Math.random()
        .toString(36)
        .substr(2)}
      key={i.toString(36) + i}
    >
      {i.toString(36) + i}
    </Option>
  );
}

function handleChange(value: any) {
  console.log(`Selected: ${value}`);
}

class SelectSizesDemo extends React.Component {
  state: {
    size: SizeType;
  } = {
    size: 'middle'
  };

  handleSizeChange = (e: any) => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="middle">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        <Select size={size} defaultValue="a1" onChange={handleChange} style={{ width: 200 }}>
          {children}
        </Select>
        <br />
        <Select
          mode="multiple"
          size={size}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {children}
        </Select>
        <br />
        <Select
          mode="tags"
          size={size}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {children}
        </Select>
      </>
    );
  }
}

export default SelectSizesDemo;
