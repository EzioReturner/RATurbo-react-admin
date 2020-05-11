import React from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import { Card, List, Button } from 'antd';
import { getListData } from '@api/list';
import { getContact } from '@api/platform';
import styles from './list.module.less';
import {
  ThunderboltOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
interface ListState {
  date: string;
  id: string;
  avatar?: string;
  progress: number;
  handler: string;
  detail: string;
}

interface CardListState {
  list: ListState[];
}

class CardList extends React.Component<{}, CardListState> {
  state = {
    list: []
  };

  componentDidMount() {
    this.initData();
  }

  async initData() {
    const { results } = await getContact();
    let { data: _data } = await getListData();

    _data = _data.map((res: ListState, index: number) => {
      return {
        ...res,
        avatar: results[index].picture.thumbnail
      };
    });
    this.setState({
      list: _data
    });
  }

  render() {
    const { list } = this.state;

    const ExtraContent = (
      <div className={styles.extraContent}>
        <img alt="" src={require('@assets/image/cardlist.png').default} />
      </div>
    );

    const Content = (
      <div className={styles.content}>
        <Button type="link">
          <ThunderboltOutlined />
          快速启动
        </Button>
        <Button type="link">
          <InfoCircleOutlined />
          产品简介
        </Button>
      </div>
    );

    return (
      <PageWrapper
        title={<FormatterLocale id="cardList.title" />}
        subTitle={<FormatterLocale id="cardList.subtitle" />}
        extraContent={ExtraContent}
        content={Content}
      >
        <List
          rowKey="id"
          loading={!list.length}
          grid={{ gutter: 24, xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={['', ...list]}
          renderItem={(item: ListState | any) =>
            item ? (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  actions={[
                    <Button type="link" key={item.id + 1}>
                      <SettingOutlined /> 操作一
                    </Button>,
                    <Button type="link" key={item.id + 2}>
                      <EditOutlined /> 操作二
                    </Button>
                  ]}
                >
                  <Card.Meta
                    avatar={<img className={styles.images} alt="" src={item.avatar} />}
                    title={
                      <Button
                        type="link"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        {item.title}
                      </Button>
                    }
                    description={<div className={styles.description}>{item.detail}</div>}
                  />
                </Card>
              </List.Item>
            ) : (
              <List.Item>
                <Button type="dashed" className={styles.createButton}>
                  <PlusOutlined /> 新建
                </Button>
              </List.Item>
            )
          }
        />
      </PageWrapper>
    );
  }
}

export default CardList;
