import React from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import { Card, Table, Button, Input, Divider } from 'antd';
import { getTableData } from '@api/list';
import styles from './list.module.scss';

interface BasicTableState {
  tableData: {
    date: string;
    domain: string;
    key: number;
    no: string;
    num: number;
    status: number;
  }[];
}

const Search = Input.Search;
class BasicTable extends React.Component<{}, BasicTableState> {
  status = ['正常', '维护', '已下线', '异常'];
  styles = ['progress', 'maintain', 'offline', 'error'];
  state = {
    tableData: []
  };

  componentDidMount() {
    getTableData().then((res: any) => {
      const data = res.data.data;
      this.setState({
        tableData: data
      });
    });
  }

  handleSearch = (value: any) => {
    console.log(value);
  };

  render() {
    const Extra = (
      <div>
        <Search
          placeholder="搜索"
          onSearch={this.handleSearch}
          style={{ width: 200, marginLeft: '8px' }}
        />
      </div>
    );

    const columns = [
      {
        title: '#',
        dataIndex: 'key'
      },
      {
        title: '编号',
        dataIndex: 'no'
      },
      {
        title: '域名',
        dataIndex: 'domain'
      },
      {
        title: '访问次数',
        dataIndex: 'num'
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (text: number) => {
          return (
            <span>
              <span className={`${styles.pointer} ${styles[this.styles[text]]}`} />
              {this.status[text]}
            </span>
          );
        }
      },
      {
        title: '更新时间',
        dataIndex: 'date'
      },
      {
        title: '操作',
        key: 'action',
        render: () => {
          return (
            <span>
              <Button type="link">配置</Button>
              <Divider type="vertical" />
              <Button type="link">Delete</Button>
            </span>
          );
        }
      }
    ];
    const { tableData } = this.state;
    return (
      <PageWrapper title={<FormatterLocale id="basicTable.title" />}>
        <Card
          title={<Button type="primary">新建</Button>}
          className="fat-card"
          bordered={false}
          extra={Extra}
        >
          <Table className="no-head-border" bordered columns={columns} dataSource={tableData} />
        </Card>
      </PageWrapper>
    );
  }
}

export default BasicTable;
