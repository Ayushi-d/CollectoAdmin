import React from 'react';
import { Table } from 'antd';

function TableComponent(props) {
  const {
    columns, data, rowKey, loading, expandable,
  } = props;
  return (
    <Table
      rowKey={rowKey}
      columns={columns}
      dataSource={data}
      loading={loading}
      expandable={expandable}
    />
  );
}

export default TableComponent;
