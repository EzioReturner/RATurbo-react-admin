import React, {Component} from 'react'
import {
  Card,
  Select,
  Button,
  DatePicker,
  Icon,
  Switch
} from 'antd';
const {Option} = Select;

class Controller extends Component {

  constructor(props) {
    super(props);
  }

  getOptions() {
    return Array(5).fill(1).map((res, index) => {
      return <Option key={index}>{Math.random().toString(36).substr(2)}</Option>
    })
  }

  render() {
    const ControlHead = (<div className="headerContent">
      <Icon type="filter"/>
      <span>筛选条件</span>
      <Select placeholder="全部APP" style={{
          width: '100px',
          marginRight: '16px'
        }} size="small">
        {this.getOptions()}
      </Select>
      <Select placeholder="双平台" style={{
          width: '100px'
        }} size="small">
        {this.getOptions()}
      </Select>
      <DatePicker size="small"/>
      <Button type="primary" size="small">查询</Button>
    </div>)

    return (<div>
      <Card size="small" title={ControlHead} bordered={false} className="controlHead" bodyStyle={{
          display: 'flex'
        }}>
        <Switch defaultChecked={true}/>
      </Card>
    </div>)
  }
}

export default Controller;
