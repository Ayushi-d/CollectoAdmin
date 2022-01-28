import React from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

function HeaderComponent({ collapsed, toggle }) {
  return (
    <Header className="site-layout-background d-flex justify-content-between align-items-center" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger text-white',
        onClick: toggle,
      })}
    </Header>
  );
}

export default HeaderComponent;
