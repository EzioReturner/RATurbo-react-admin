import React, { Component } from 'react';
import { Card, Input, Radio, List, Avatar, Progress } from 'antd';
import { getListData } from '@api/list';
import { getContact } from '@api/platform';
import styles from './listTable.module.scss';

const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ListTable extends Component {
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

  handleSearch = (value) => {
    console.log(value);
  }

  handleChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
  }

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
    )

    const ListContent = ({ data: { handler, date, progress } }) => (
      <div className={styles.content}>
        <div>
          <span>经办人</span>
          <p className={styles.pText}>{handler}</p>
        </div>
        <div className={styles.handleTime}>
          <span>处理时间</span>
          <p className={styles.pText}>{date}</p>
        </div>
        <Progress showInfo={false} percent={progress} className={`${styles.progress} ${progress < 40 ? 'warning' : 'success'}`} />
        <span>{progress}%</span>
      </div>
    )

    return <Card bordered={false} style={{ marginTop: '24px' }} className="fat-card"
      extra={Extra} title="标准列表">
      <List rowKey="id" loading={!list.length} dataSource={list}
        renderItem={item => (
          <List.Item actions={[<a >编辑</a>, <a >更多操作</a>]}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} shape="square" size="large" />}
              title={<a>{item.title}</a>}
              description={<div className={styles.detail}>{item.detail}</div>}
            />
            <ListContent data={item} />
          </List.Item>
        )
        } />
    </Card>
  }
}

export default ListTable;