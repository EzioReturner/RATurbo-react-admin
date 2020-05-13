import React from 'react';
import { DatePicker, Radio } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

const { RangePicker } = DatePicker;

class PickerSizesDemo extends React.Component {
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
      <div>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="middle">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        <DatePicker size={size} />
        <br />
        <DatePicker size={size} picker="month" />
        <br />
        <RangePicker size={size} />
        <br />
        <DatePicker size={size} picker="week" />
        <br />
        <DatePicker bordered={false} />
      </div>
    );
  }
}
export default PickerSizesDemo;
