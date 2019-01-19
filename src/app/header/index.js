import React, {Component} from 'react';
import 'style/header.scss';
import {Icon} from 'antd';
import Clock from './clock';
class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="header">
            <div className="controlBut">
                <Icon type="bars"/>
            </div>
            <span className="title">
                REACT-TURBO</span>
            <Clock/>
        </div>)
    }
}
export default Header;
