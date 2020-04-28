import React from 'react';
import { observer, inject } from 'mobx-react';
import LayoutStore from '@store/layoutStore';
import Bridge from './Test';
interface InjectedProps {
  layoutStore: LayoutStore;
}
class Test extends React.Component<InjectedProps> {
  state = {
    data: {
      title: 123
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: {
          title: 321
        }
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        <Bridge data={this.state.data} />
      </div>
    );
  }
}

export default inject('layoutStore')(observer(Test));
