import React, { PureComponent, Fragment, Component } from 'react';
import { Form, Button } from 'antd';
import StepFormStore from './formStore';
import { observer } from 'mobx-react';
import styles from '../form.module.scss';

@observer
class StepForm extends Component {
  render() {
    const { data, submitting, onSubmit, onPrev } = StepFormStore;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 18,
          offset: 6,
        },
      }
    }
    return <Fragment>
      <Form {...formItemLayout}>
        <Form.Item {...formItemLayout} label="标题">
          {data.title}
        </Form.Item>
        <Form.Item {...formItemLayout} label="详情">
          {data.detail}
        </Form.Item>
        <Form.Item {...formItemLayout} label="人物">
          {data.user}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" onClick={onSubmit} loading={submitting}>提交</Button>
          <Button onClick={onPrev} style={{
            marginLeft: '8px'
          }}>上一步</Button>
        </Form.Item>
      </Form>
    </Fragment>
  }
}

class Step2 extends PureComponent {
  render() {
    const Form = Form.create({ name: 'Step2' })(StepForm);
    return <div className={styles.step}><Form /></div>
  }
}

export default Step2;