import React, { PureComponent, Fragment } from 'react';
import { Form, Button, Select, Input, Divider } from 'antd';
import StepFormStore from './formStore';
import styles from '../form.module.scss';

class StepForm extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        StepFormStore.setValue(values);
        StepFormStore.nextStep();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="起个题目把">
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
          {getFieldDecorator('detail', {
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
        <Form.Item label="想告诉谁">
          {getFieldDecorator('user', {
            initialValue: 'noOne',
            rules: [
              { required: true, message: '请选择！' }
            ]
          })(
            <Select placeholder="">
              <Option value="me">我呀</Option>
              <Option value="noOne">谁也不说</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">下一步</Button>
        </Form.Item>
      </Form>
    </Fragment>
  }
}

class Step1 extends PureComponent {
  render() {
    const Form = Form.create({ name: 'Step1' })(StepForm);
    return <div>
      <div className={styles.step}><Form /></div>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.descript}>
        <h3>请注意</h3>
        <h4>这里是分割线</h4>
        <p>其实没啥想说的，其实没啥想说的，其实没啥想说的，其实没啥想说的，其实没啥想说的</p>
      </div>
    </div>
  }
}

export default Step1