import React from 'react';
import { Layout } from 'antd';
import Footer from '../../components/common/footer';
import PageNotFound from '../../components/common/pageNotFound';

const { Content } = Layout;

function NotFound() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          `
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <PageNotFound />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
export default NotFound;
