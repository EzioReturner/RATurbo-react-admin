import React, {Component} from 'react'
import {Card, Row, Col} from 'antd';
import 'style/content.scss';

class CardTitle extends Component {
    render() {
        const {title} = this.props;
        return (<div className="titleNanme">{title}</div>)
    }
}

class EchartCard extends Component {
    render() {
        const headStyle = {
            borderBottomColor: '#f5f5f5'
        };
        const {title} = this.props;
        return (<Card size="small" title={<CardTitle title = {
                title
            } />} headStyle={headStyle} bordered={false}></Card>)
    }
}

class RowDom extends Component {
    render() {
        return (<Row gutter={16}>
            <Col className="gutter-row" span={12}>
                <EchartCard title="性别"/>
            </Col>
            <Col className="gutter-row" span={12}>
                <EchartCard title="年龄"/>
            </Col>
        </Row>)
    }
}

class Content extends Component {
    render() {
        return (<div className="content">
            <RowDom/>
        </div>)
    }
}

export default Content;
