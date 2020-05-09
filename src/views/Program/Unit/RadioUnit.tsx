import React from 'react';
import { Radio } from 'antd';

class RadioUnit extends React.Component {
  state = {
    value: 1
  };

  onChange = (e: any) => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    return (
      <Radio.Group onChange={this.onChange} value={this.state.value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
    );
  }
}

export default RadioUnit;
