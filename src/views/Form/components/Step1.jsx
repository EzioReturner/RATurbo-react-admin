import React, { PureComponent, Fragment } from 'react';
import { Form, Button, Select, Input, Icon } from 'antd'
import styles from '../form.module.scss';

class StepForm extends PureComponent {
  handleSubmit() {

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return <Fragment>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="标题">
          {getFieldDecorator('title', {
            initialValue: '好嗨哦',
            rules: [
              { required: true, message: '请输入标题!' }
            ]
          })(
            <Input
              placeholder="写点什么吧"
              autoComplete="off"
            />
          )}
        </Form.Item>
        <Form.Item label="事件">
          {getFieldDecorator('title', {
            initialValue: '那天我在海边看到一条鱼，它的头特别的大',
            rules: [
              { required: true, message: '请输入事件！' }
            ]
          })(
            <Input
              placeholder="说说你碰到什么了吧~"
              autoComplete="off"
            />
          )}
        </Form.Item>
      </Form>
    </Fragment>
  }
}

class Step1 extends PureComponent {
  render() {
    const Form = Form.create({ name: 'Step1' })(StepForm);
    return <div className={styles.step}><Form /></div>
  }
}

export default Step1