import React, { Component } from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import styles from './cardList.module.scss';
import { Icon, Card, List, Button } from 'antd';
import { getListData } from '@api/list';
import { getContact } from '@api/platform';

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.initData();
  }

  async initData() {
    const { data: { results } } = await getContact();
    let { data: { data: _data } } = await getListData();
    _data = _data.map((res, index) => {
      return {
        ...res,
        avatar: results[index].picture.thumbnail
      }
    });
    this.setState({
      list: _data
    })
  }

  render() {
    const { list } = this.state;

    const ExtraContent = (
      <div className={styles.extraContent}>
        <img src={require('@assets/image/cardlist.png')} />
      </div>
    )

    const Content = (
      <div className={styles.content}>
        <a><Icon type="thunderbolt" />快速启动</a>
        <a><Icon type="info-circle" />产品简介</a>
      </div>
    )

    return <PageWrapper title={<FormatterLocale id="cardList.title" />}
      subTitle={<FormatterLocale id="cardList.subtitle" />}
      extraContent={ExtraContent} content={Content}>
      <List
        rowKey="id"
        loading={!list.length}
        grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
        dataSource={['', ...list]}
        renderItem={item =>
          item ? (
            <List.Item key={item.id}>
              <Card hoverable
                actions={[<a><Icon type="setting" /> 操作一</a>, <a><Icon type="edit" /> 操作二</a>]}>
                <Card.Meta
                  avatar={<img className={styles.images} alt="" src={item.avatar} />}
                  title={<a style={{
                    fontWeight: 'bold'
                  }}>{item.title}</a>}
                  description={
                    <div className={styles.description}>{item.detail}</div>
                  }
                />
              </Card>
            </List.Item>
          ) : (
              <List.Item>
                <Button type="dashed" className={styles.createButton}>
                  <Icon type="plus" /> 新建
                  </Button>
              </List.Item>
            )
        }
      />
    </PageWrapper>;
  }
}

export default CardList;
