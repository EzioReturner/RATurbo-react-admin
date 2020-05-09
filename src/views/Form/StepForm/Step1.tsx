import React from 'react';
import { Button, Select, Input, Divider, Form } from 'antd';
import FormatterLocale from '@components/FormatterLocale';
import StepFormStore from './formStore';
import styles from './form.module.less';

const Step1: React.FC = () => {
  const handleSubmit = (values: StoreKeyValue) => {
    StepFormStore.setValue(values as any);
    StepFormStore.nextStep();
  };

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

  const FormContainer = (
    <Form
      name="step1"
      initialValues={{
        detail: '那天我在海边看到一条鱼，它的头特别的大',
        title: '好嗨哟',
        user: 'noOne'
      }}
      onFinish={handleSubmit}
      {...formItemLayout}
    >
      <Form.Item
        name="title"
        label={<FormatterLocale id="step1.title" defaultMessage="起个题目吧" />}
      >
        <Input placeholder="something..." autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="detail"
        rules={[{ required: true, message: '请输入事件！' }]}
        label={<FormatterLocale id="step1.title" defaultMessage="起个题目吧" />}
      >
        <Input placeholder="something..." autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="user"
        label={<FormatterLocale id="step1.tellWho" defaultMessage="想告诉谁" />}
      >
        <Select placeholder="">
          <Select.Option value="me">
            <FormatterLocale id="step1.me" defaultMessage="我呀" />
          </Select.Option>
          <Select.Option value="noOne">
            <FormatterLocale id="step1.noOne" defaultMessage="谁也不说" />
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          <FormatterLocale id="button.nextStep" defaultMessage="下一步" />
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <div className={styles.step}>{FormContainer}</div>
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
