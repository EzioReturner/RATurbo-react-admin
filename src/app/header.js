import React, {Component} from 'react';
import 'style/header.scss';
import {Icon} from 'antd';
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
        </div>)
    }
}
export default Header
