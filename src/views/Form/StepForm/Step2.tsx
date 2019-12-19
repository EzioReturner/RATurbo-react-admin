import React from 'react';
import { Form, Button } from 'antd';
import { observer } from 'mobx-react';
import FormatterLocale from '@components/FormatterLocale';
import StepFormStore from './formStore';
import styles from './form.module.scss';

const Step2: React.FC = () => {
  const { data, submitting, onSubmit, onPrev } = StepFormStore;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 18,
        offset: 6
      }
    }
  };
  const StepForm: React.FC = () => (
    <Form {...formItemLayout}>
      <Form.Item {...formItemLayout} label={<FormatterLocale id="title" defaultMessage="标题" />}>
        {data.title}
      </Form.Item>
      <Form.Item {...formItemLayout} label={<FormatterLocale id="detail" defaultMessage="详情" />}>
        {data.detail}
      </Form.Item>
      <Form.Item {...formItemLayout} label={<FormatterLocale id="person" defaultMessage="任务" />}>
        {data.user}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" onClick={onSubmit} loading={submitting}>
          <FormatterLocale id="button.submit" defaultMessage="提交" />
        </Button>
        <Button
          onClick={onPrev}
          style={{
            marginLeft: '8px'
          }}
        >
          <FormatterLocale id="button.prevStep" defaultMessage="上一步" />
        </Button>
      </Form.Item>
    </Form>
  );
  const FormContainer = Form.create({ name: 'Step2' })(StepForm);
  return (
    <div className={styles.step}>
      <FormContainer />
    </div>
  );
};

export default observer(Step2);
