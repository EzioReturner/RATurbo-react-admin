import React from 'react';
import { Card, Input, Radio, List, Avatar, Progress, Button } from 'antd';
import { getListData } from '@api/list';
import { getContact } from '@api/platform';
import styles from './listTable.module.scss';

const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

interface ListState {
  date: string;
  id: string;
  avatar?: string;
  progress: number;
  handler: string;
  detail: string;
  title?: string;
}

interface ListTableState {
  list: ListState[];
}

class ListTable extends React.Component<{}, ListTableState> {
  state = {
    list: []
  };

  componentDidMount() {
    this.initData();
  }

  async initData() {
    const {
      data: { results }
    } = await getContact();
    let {
      data: { data: _data }
    } = await getListData();

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

  handleSearch = () => {
    // console.log(value);
  };

  handleChange = () => {
    // console.log(`radio checked:${e.target.value}`);
  };

  render() {
    const { list } = this.state;
    const Extra = (
      <div>
        <RadioGroup onChange={this.handleChange} defaultValue="a">
          <RadioButton value="a">全部</RadioButton>
          <RadioButton value="b">处理中</RadioButton>
          <RadioButton value="c">完毕</RadioButton>
        </RadioGroup>
        <Search
          placeholder="搜索"
          onSearch={this.handleSearch}
          style={{ width: 200, marginLeft: '8px' }}
        />
      </div>
    );

    const ListContent = ({ data: { handler, date, progress } }: { data: any }) => (
      <div className={styles.content}>
        <div>
          <span>经办人</span>
          <p className={styles.pText}>{handler}</p>
        </div>
        <div className={styles.handleTime}>
          <span>处理时间</span>
          <p className={styles.pText}>{date}</p>
        </div>
        <Progress
          showInfo={false}
          percent={progress}
          className={`${styles.progress} ${progress < 40 ? 'warning' : 'success'}`}
        />
        <span>{progress}%</span>
      </div>
    );

    return (
      <Card
        bordered={false}
        style={{ marginTop: '24px' }}
        className="fat-card"
        extra={Extra}
        title="标准列表"
      >
        <List
          rowKey="id"
          loading={!list.length}
          dataSource={list}
          renderItem={(item: ListState) => (
            <List.Item
              actions={[
                <Button key="first" type="link">
                  编辑
                </Button>,
                <Button key="second" type="link">
                  更多操作
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                title={<Button type="link">{item.title}</Button>}
                description={<div className={styles.detail}>{item.detail}</div>}
              />
              <ListContent data={item} />
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default ListTable;
