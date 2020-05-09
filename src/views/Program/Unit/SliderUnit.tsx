import React from 'react';

import { Slider, Switch } from 'antd';

class SilderUnit extends React.Component {
  state = {
    disabled: false
  };

  handleDisabledChange = (disabled: any) => {
    this.setState({ disabled });
  };

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <Slider defaultValue={30} disabled={disabled} />
        <Slider range defaultValue={[20, 50]} disabled={disabled} />
        Disabled: <Switch size="small" checked={disabled} onChange={this.handleDisabledChange} />
      </div>
    );
  }
}

export default SilderUnit;
