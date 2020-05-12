import React from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import { Card, Table, Button, Input, Divider, Space } from 'antd';
import { getTableData } from '@api/list';
import styles from './list.module.less';
import { SearchOutlined } from '@ant-design/icons';

interface BasicTableState {
  tableData: {
    date: string;
    domain: string;
    key: number;
    no: string;
    num: number;
    status: number;
  }[];
  searchText: string;
}

const Search = Input.Search;
class BasicTable extends React.Component<{}, BasicTableState> {
  status = ['正常', '维护', '已下线', '异常'];
  styles = ['progress', 'maintain', 'offline', 'error'];
  state = {
    tableData: [],
    searchText: ''
  };
  searchInput: any = '';

  componentDidMount() {
    getTableData().then((res: any) => {
      const data = res.data;
      this.setState({
        tableData: data
      });
    });
  }

  getFilterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={node => {
          this.searchInput = node;
        }}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </Space>
    </div>
  );

  handleSearch = (selectedKeys: any, confirm: any) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0]
    });
  };

  handleReset = (clearFilters: Function) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  getStatusProps = () => ({
    render: (text: number) => {
      return (
        <span>
          <span className={`${styles.pointer} ${styles[this.styles[text]]}`} />
          {this.status[text]}
        </span>
      );
    },
    filters: [
      {
        text: '正常',
        value: 1
      },
      {
        text: '维护',
        value: 2
      },
      {
        text: '已下线',
        value: 3
      },
      {
        text: '异常',
        value: 4
      }
    ],
    onFilter: (value: any, record: any) => {
      return record.status === value;
    }
  });

  render() {
    const Extra = (
      <div>
        <Search placeholder="搜索" style={{ width: 200, marginLeft: '8px' }} />
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
        dataIndex: 'domain',
        filterDropdown: this.getFilterDropdown
      },
      {
        title: '访问次数',
        dataIndex: 'num',
        sorter: (a: any, b: any) => a.num - b.num
      },
      {
        title: '状态',
        dataIndex: 'status',
        ...this.getStatusProps()
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
