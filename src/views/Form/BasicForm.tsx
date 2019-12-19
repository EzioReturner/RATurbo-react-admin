import React from 'react';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Col,
  Card
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';

const { Option } = Select;
class BasicForm extends React.Component<FormComponentProps> {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  // TODO EVENT LACK
  normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <PageWrapper
        title={<FormatterLocale id="form.basicFormTitle" defaultMessage="基础表单" />}
        subTitle={
          <FormatterLocale
            id="form.basicSubtitle"
            defaultMessage="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
          />
        }
      >
        <Card bordered={false} className="fat-header">
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            style={{
              maxWidth: '750px',
              margin: '15px auto'
            }}
          >
            <Form.Item label="Plain Text">
              <span className="ant-form-text">China</span>
            </Form.Item>
            <Form.Item label="Select" hasFeedback>
              {getFieldDecorator('select', {
                rules: [{ required: true, message: 'Please select your country!' }]
              })(
                <Select placeholder="Please select a country">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Select[multiple]">
              {getFieldDecorator('select-multiple', {
                rules: [
                  { required: true, message: 'Please select your favourite colors!', type: 'array' }
                ]
              })(
                <Select mode="multiple" placeholder="Please select favourite colors">
                  <Option value="red">Red</Option>
                  <Option value="green">Green</Option>
                  <Option value="blue">Blue</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label="InputNumber">
              {getFieldDecorator('input-number', { initialValue: 3 })(
                <InputNumber min={1} max={10} />
              )}
              <span className="ant-form-text"> machines</span>
            </Form.Item>

            <Form.Item label="Switch">
              {getFieldDecorator('switch', { valuePropName: 'checked' })(<Switch />)}
            </Form.Item>

            <Form.Item label="Slider">
              {getFieldDecorator('slider')(
                <Slider
                  marks={{
                    0: 'A',
                    20: 'B',
                    40: 'C',
                    60: 'D',
                    80: 'E',
                    100: 'F'
                  }}
                />
              )}
            </Form.Item>

            <Form.Item label="Radio.Group">
              {getFieldDecorator('radio-group')(
                <Radio.Group>
                  <Radio value="a">item 1</Radio>
                  <Radio value="b">item 2</Radio>
                  <Radio value="c">item 3</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item label="Radio.Button">
              {getFieldDecorator('radio-button')(
                <Radio.Group>
                  <Radio.Button value="a">item 1</Radio.Button>
                  <Radio.Button value="b">item 2</Radio.Button>
                  <Radio.Button value="c">item 3</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item label="Checkbox.Group">
              {getFieldDecorator('checkbox-group', {
                initialValue: ['A', 'B']
              })(
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row>
                    <Col span={8}>
                      <Checkbox value="A">A</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox disabled value="B">
                        B
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="C">C</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="D">D</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="E">E</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              )}
            </Form.Item>

            <Form.Item label="Rate">
              {getFieldDecorator('rate', {
                initialValue: 3.5
              })(<Rate />)}
            </Form.Item>

            <Form.Item label="Upload" extra="longgggggggggggg">
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" />
                    <span>Click to upload</span>
                  </Button>
                </Upload>
              )}
            </Form.Item>

            <Form.Item label="Dragger">
              <div className="dropbox">
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                )}
              </div>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageWrapper>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'BasicForm' })(BasicForm);

export default WrappedNormalLoginForm;
