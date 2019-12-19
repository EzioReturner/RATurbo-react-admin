import React, { useState } from 'react';
import { Card, Table, Divider, Tag, Progress, Modal, Button } from 'antd';
import FormatterLocale from '@components/FormatterLocale';

interface Record {
  name: string;
  key: string | number;
  amount: string;
  progress: number;
  tags: string[];
}

const confirm = Modal.confirm;

const SaleTable: React.FC = () => {
  const initTableData: Record[] = [
    {
      key: '1',
      name: 'John Brown',
      amount: '$ 32.77',
      progress: 60,
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      amount: '$ 72.11',
      progress: 82,
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      amount: '$ 56.21',
      progress: 30,
      tags: ['cool', 'teacher']
    }
  ];
  const [tableData, setTableData] = useState(initTableData);

  const showConfirm = ([type, record]: [string, any]) => {
    const { name } = record;
    const title = `Do you want to ${type} ${name}?`;
    confirm({
      title,
      content: `clicked the OK button, to confirm ${type}d`,
      onOk: () => {
        return new Promise(resolve => {
          // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          setTimeout(() => {
            if (type === 'invite') {
              handleInvite();
            } else {
              handleDelete(record);
            }
            resolve();
          }, 2000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {}
    });
  };

  const handleInvite = () => {};

  const handleDelete = ({ key }: { key: number }) => {
    tableData.splice(Number(key - 1), 1);
    const _t = tableData.map((res, index) => {
      return {
        ...res,
        key: index + 1
      };
    });
    setTableData(_t);
  };

  const _renderTags = (tags: string[]) => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        );
      })}
    </span>
  );

  const _renderAction = (record: Record) => {
    return (
      <span>
        <Button type="link" onClick={() => showConfirm(['invite', record])}>
          Invite {record.name}
        </Button>
        <Divider type="vertical" />
        <Button type="link" onClick={() => showConfirm(['delete', record])}>
          Delete
        </Button>
      </span>
    );
  };

  const _renderProgress = (progress: number) => {
    let status = progress < 40 ? 'warning' : 'normal';
    if (progress > 70) {
      status = 'success';
    }
    return (
      <div style={{ minWidth: '200px' }}>
        <Progress showInfo={false} percent={progress} className={status} />
      </div>
    );
  };

  const _renderText = (text: string) => <Button type="link">{text}</Button>;

  const columns = [
    {
      title: '#',
      dataIndex: 'key'
    },
    {
      title: <FormatterLocale id="dashboard.name" defaultMessage="名称" />,
      dataIndex: 'name',
      render: _renderText
    },
    {
      title: <FormatterLocale id="dashboard.amount" defaultMessage="数额" />,
      dataIndex: 'amount'
    },
    {
      title: <FormatterLocale id="dashboard.progress" defaultMessage="进度" />,
      dataIndex: 'progress',
      render: _renderProgress
    },
    {
      title: <FormatterLocale id="dashboard.tag" defaultMessage="标记" />,
      dataIndex: 'tags',
      render: _renderTags
    },
    {
      title: <FormatterLocale id="dashboard.action" defaultMessage="操作" />,
      key: 'action',
      render: _renderAction
    }
  ];

  return (
    <Card
      bordered={false}
      className="fat-card"
      title={<FormatterLocale id="dashboard.sales" defaultMessage="销售表单" />}
      hoverable
      bodyStyle={{
        overflow: 'auto'
      }}
    >
      <Table
        pagination={false}
        className="no-head-border"
        bordered
        columns={columns}
        dataSource={tableData}
      />
    </Card>
  );
};

export default SaleTable;
