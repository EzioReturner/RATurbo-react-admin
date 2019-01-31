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
    const marginRight = {
      sx: {
        marginRight: '16px'
      },
      et: {
        marginRight: '8px'
      }
    }

    const ControlHead = (<div className="headerContent">
      <Icon type="filter"/>
      <span className="headerTextSpan">筛选条件</span>
      <Select placeholder="全部APP" size="small">
        {this.getOptions()}
      </Select>
      <Select placeholder="双平台" size="small">
        {this.getOptions()}
      </Select>
      <DatePicker size="small" style={marginRight.sx}/>
      <Button type="primary" size="small">查询</Button>
    </div>)

    return (<div>
      <Card size="small" title={ControlHead} bordered={false} className="controlHead" bodyStyle={{
          display: 'flex',
          alignItems: 'center'
        }}>
        <Switch defaultChecked={true} style={marginRight.et}/>
        <span className="headerTextSpan">未识别</span>
        <span className="headerTextSpan rightSpace">符合当前筛选条件的总用户数为：21,312,393<Icon type="question-circle"/></span>
      </Card>
    </div>)
  }
}

export default Controller;
