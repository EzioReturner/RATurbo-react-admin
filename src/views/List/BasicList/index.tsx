import React from 'react';
import { Row, Col, Card } from 'antd';
import { inject, observer } from 'mobx-react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import ListTable from './ListTable';
import styles from './listTable.module.scss';
import LayoutStore from '@store/layoutStore';

interface BasicInjected {
  layoutStore: LayoutStore;
}

const BasicList: React.FC<BasicInjected> = props => {
  const list = [
    {
      title: '代办事项',
      num: '8个事项'
    },
    {
      title: '事项平均处理时间',
      num: '32分钟'
    },
    {
      title: '平均每周处理事项',
      num: '11个事项'
    }
  ];
  const RowInfo = () => (
    <Row gutter={24}>
      {list.map(col => {
        return (
          <Col xl={8} sm={24} xs={24} key={col.title}>
            <Card bordered={false}>
              <p className={styles.colTitle}>{col.title}</p>
              <span className={styles.colNum}>{col.num}</span>
            </Card>
          </Col>
        );
      })}
    </Row>
  );

  const DontShow = () => (
    <Card style={{ marginTop: '24px' }} bordered={false}>
      <div style={{ textAlign: 'center' }}>不给你看</div>
    </Card>
  );

  const { isMobile } = props.layoutStore;
  return (
    <PageWrapper title={<FormatterLocale id="basicList.title" />}>
      <RowInfo />
      {isMobile ? <DontShow /> : <ListTable />}
    </PageWrapper>
  );
};

export default inject('layoutStore')(observer(BasicList));
