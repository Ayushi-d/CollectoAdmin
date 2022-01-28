/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Breadcrumb } from 'antd';

class BreadCrumbComponent extends React.Component {
  render() {
    const { items } = this.props;
    if (items !== undefined) {
      return (
        <Breadcrumb style={{ margin: '16px 0' }}>
          {items.length > 0 && (items.map((item, index) => (
            <Breadcrumb.Item key={index}>{item.toString()}</Breadcrumb.Item>
          ))
          )}
        </Breadcrumb>
      );
    }
    return 0;
  }
}
export default BreadCrumbComponent;
