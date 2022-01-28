import React, { useState } from 'react';
import { Breadcrumb, Layout } from 'antd';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import SideBarMenu from '../../components/common/sideBarMenu';

const { Content, Sider } = Layout;

function Settings() {
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
        <Header style={{ margin: '0 16px' }} toggle={toggle} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Settings</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <p>Settings</p>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
export default Settings;
