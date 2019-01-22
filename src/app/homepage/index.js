import React, {Component} from 'react'
import {Card, Row, Col, Icon} from 'antd';
import 'style/homepage.scss';
import {circleOption, barOption} from './chartOption';
import {initChart} from '../utlis/echartTools';

class EchartCard extends Component {
    constructor(props) {
        super(props);
        this.circleChart = null;
        this.barChart = null;
    }
    componentDidMount() {
        const chartArray = [
            {
                id: 'circleChart',
                option: circleOption
            }, {
                id: 'barChart',
                option: barOption
            }
        ]
        this.startInitChart(chartArray);
    }
    startInitChart(chart) {
        for (let i = 0; i < chart.length; i++) {
            initChart(chart[i]);
        }
    }
    render() {
        const headStyle = {
            borderBottomColor: '#f5f5f5'
        };
        const {title, id} = this.props;
        const CardTitle = <div className="titleNanme">{title}
            <div className="iconBar">
                <Icon type="redo"/>
                <Icon type="cloud-download" style={{
                        marginLeft: '10px'
                    }}/>
            </div>
        </div>
        return (<Card size="small" title={CardTitle} headStyle={headStyle} bordered={false}>
            <div id={id} className="chartDom"></div>
        </Card>)
    }
}

class controller extends Component {
    render() {
        return (<div></div>)
    }
}

class Content extends Component {
    render() {
        return (<div className="content">
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <EchartCard title="性别" id="circleChart"/>
                </Col>
                <Col className="gutter-row" span={12}>
                    <EchartCard title="年龄" id="barChart"/>
                </Col>
            </Row>
        </div>)
    }
}

export default Content;
