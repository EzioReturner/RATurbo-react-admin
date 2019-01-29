import React, {Component} from 'react';
import {Icon} from 'antd';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({date: new Date()});
  }
  render() {
    const {date} = this.state;
    return (<div className="clock">{date.toLocaleTimeString()}
      <span style={{
          marginLeft: '20px'
        }}>
        <Icon type="user" className="userIcon"/>
        zhev</span>
    </div>)
  }
}

export default Clock;
