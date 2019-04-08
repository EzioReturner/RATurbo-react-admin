import React, { Component } from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import styles from './list.module.scss';
import { Icon } from 'antd';

class CardList extends Component {
  render() {
    const extraContent = (
      <div className={styles.extraContent}>
        <img src={require('@assets/image/cardlist.png')} />
      </div>
    )
    const content = (
      <div className={styles.content}>
        <a><Icon type="thunderbolt" />快速启动</a>
        <a><Icon type="info-circle" />产品简介</a>
      </div>
    )
    return <PageWrapper title={<FormatterLocale id="cardList.title" />}
      subTitle={<FormatterLocale id="cardList.subtitle" />}
      extraContent={extraContent} content={content}>
      <div>123</div>

    </PageWrapper>;
  }
}

export default CardList;
