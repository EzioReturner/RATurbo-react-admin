import React from 'react';
import Result from '@components/Result';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import { Card, Button, Steps, Row, Col, Icon } from 'antd';
import styles from './styles.module.scss';

const Step = Steps.Step;
const SuccessResult: React.FC = () => {
  const Desc = ({ name, extra }: { name: string; extra: React.ReactNode }) => {
    return (
      <div className={styles.desc}>
        <p className={styles.descName}>{name}</p>
        <span>{extra}</span>
      </div>
    );
  };

  const Extra = (
    <div>
      <Row className={styles.stepTitle}>
        <Col span={6}>项目名称: 哇哈哈哈哈哈</Col>
        <Col span={6}>
          负责人:{' '}
          <span role="img" aria-label="nothing">
            😓
          </span>{' '}
          囧snow
        </Col>
        <Col span={6}>处理时间: 2020-02-35 9:22:11</Col>
      </Row>
      <Steps progressDot current={1}>
        <Step
          title={<FormatterLocale id="result.success.createProject" />}
          description={<Desc name="小指头" extra="2020-02-30 9:22:11" />}
        />
        <Step
          title={<FormatterLocale id="result.success.leaderCheck" />}
          description={
            <Desc
              name="三傻"
              extra={
                <Button type="link">
                  <Icon type="mail" /> 催一下
                </Button>
              }
            />
          }
        />
        <Step title={<FormatterLocale id="result.success.financeCheck" />} />
        <Step title={<FormatterLocale id="result.success.finish" />} />
      </Steps>
    </div>
  );

  const Actions = (
    <div>
      <Button type="primary">返回项目</Button>
      <Button style={{ margin: '0px 8px' }}>查看详情</Button>
      <Button>打印</Button>
    </div>
  );

  return (
    <PageWrapper>
      <Card bordered={false}>
        <Result
          type="successed"
          title={<FormatterLocale id="result.success.title" />}
          subtitle={<FormatterLocale id="result.success.subtitle" />}
          extra={Extra}
          actions={Actions}
          style={{
            marginTop: '48px'
          }}
        />
      </Card>
    </PageWrapper>
  );
};

export default SuccessResult;
