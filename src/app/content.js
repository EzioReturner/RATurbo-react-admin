import React, {Component} from 'react'
import {Card} from 'antd';
import 'style/content.scss';
class Content extends Component {
    render() {
        return (<div className="content">
            <Card title="card"></Card>
            <Card title="card" style={{
                    marginTop: '23px'
                }}></Card>
        </div>)
    }
}

export default Content;
