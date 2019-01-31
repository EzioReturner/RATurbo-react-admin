import React, {Component} from 'react';
import '@style/header.scss';
import {Icon} from 'antd';
import Clock from './clock';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  handleClick(query, e) {
    // console.log(this, query, e)
  }
  render() {
    return (<div className="header">
      <div className="controlBut">
        <Icon type="bars"/>
      </div>
      <span className="title" onClick={this.handleClick.bind(this, 'hahah')}>
        REACT-TURBO</span>
      <Clock/>
    </div>)
  }
}
export default Header;
