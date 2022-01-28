import React, { useState } from 'react';
import { Breadcrumb, Layout } from 'antd';

import HeaderComponent from './header/Header';
import FooterComponent from './footer/Footer';
import SideBarMenu from './sidebar/SideBarMenu';

const { Content, Sider } = Layout;

function LayoutComponent() {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={toggle}>
        <div className="logo" style={{ textAlign: 'center', color: '#fff', padding: 24 }}>
          Logo
        </div>
        <SideBarMenu />
      </Sider>
      <Layout className="site-layout">
        <HeaderComponent style={{ margin: '0 16px' }} toggle={toggle} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
}
export default LayoutComponent;
