import React from 'react';
import { Form, Button, Select, Input, Divider } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FormatterLocale from '@components/FormatterLocale';
import StepFormStore from './formStore';
import styles from './form.module.scss';

const Step1: React.FC = () => {
  const StepForm = (props: FormComponentProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          StepFormStore.setValue(values);
          StepFormStore.nextStep();
        }
      });
    };
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label={<FormatterLocale id="step1.title" defaultMessage="起个题目吧" />}>
          {getFieldDecorator('title', {
            initialValue: '好嗨哦',
            rules: [{ required: true, message: '请输入标题!' }]
          })(<Input placeholder="写点什么吧" autoComplete="off" />)}
        </Form.Item>
        <Form.Item label={<FormatterLocale id="step1.event" defaultMessage="事件" />}>
          {getFieldDecorator('detail', {
            initialValue: '那天我在海边看到一条鱼，它的头特别的大',
            rules: [{ required: true, message: '请输入事件！' }]
          })(<Input placeholder="说说你碰到什么了吧~" autoComplete="off" />)}
        </Form.Item>
        <Form.Item label={<FormatterLocale id="step1.tellWho" defaultMessage="想告诉谁" />}>
          {getFieldDecorator('user', {
            initialValue: 'noOne',
            rules: [{ required: true, message: '请选择！' }]
          })(
            <Select placeholder="">
              <Select.Option value="me">我呀</Select.Option>
              <Select.Option value="noOne">谁也不说</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            <FormatterLocale id="button.nextStep" defaultMessage="下一步" />
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const FormContainer = Form.create({ name: 'Step1' })(StepForm);
  return (
    <div>
      <div className={styles.step}>
        <FormContainer />
      </div>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.descript}>
        <h3>
          <FormatterLocale id="step1.attention" defaultMessage="请注意" />
        </h3>
        <h4>
          <FormatterLocale id="step1.divider" defaultMessage="这里是分割线" />
        </h4>
        <p>
          <FormatterLocale
            id="step1.nothing"
            defaultMessage="其实没啥想说的，其实没啥想说的，其实没啥想说的，其实没啥想说的，其实没啥想说的"
          />
        </p>
      </div>
    </div>
  );
};

export default Step1;
