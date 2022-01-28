/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Table, Button, Space, Popconfirm, Image } from 'antd';

const ExpandedUser = ({ childrenData, handleDeleteSlot, loading }) => {
  const RequestTableColumns = [
    {
      title: 'Upload Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => text || '-',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => text || '-',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => text || '-',
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (text) =>
        text ? text.map((r, id) => <div key={id} className={'grid'}>
          <Image
              width={80}
              src={r}
          />
        </div>) : '-',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => (text ? `${text}` : '-'),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text) => (text ? `${text}` : '-'),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => (
        <Space size='middle'>
          <Popconfirm
            placement='left'
            title={'Detele this request'}
            onConfirm={() => handleDeleteSlot(record.id)}
            okText='Yes'
            cancelText='No'
            okButtonProps={{ loading: loading }}
          >
            <Button type='text' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={RequestTableColumns}
      dataSource={childrenData}
      pagination={false}
    />
  );
};

export default ExpandedUser;
