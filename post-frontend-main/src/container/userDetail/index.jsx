import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import SideBarMenu from '../../components/common/sideBarMenu';
import BreadCrumbComponent from '../../components/common/breadCrumb';

const { Content, Sider } = Layout;

function UserDetail(props) {
  const { loading, dispatch, token } = props;
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (token) {
      // dispatch(userActions.getAllUsers(token, RoleCheck.APP_PASSENGER));
    }
    // eslint-disable-next-line no-unused-vars
  }, [dispatch, token]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
      >
        <div
          className="logo"
          style={{ textAlign: 'center', color: '#fff', padding: 24 }}
        >
          Logo
        </div>
        <SideBarMenu />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ margin: '0 16px' }} toggle={toggle} />
        <Content style={{ margin: '0 16px' }}>
          <BreadCrumbComponent
            items={['Dashboard', 'Passenger', 'Detail View']}
          />
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {loading ? 'loading' : '...'}
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

function mapStateToProps(state) {
  const { loading, token, allUsers } = state.authentication;
  return {
    loading,
    token,
    allUsers,
  };
}

export default connect(mapStateToProps)(UserDetail);
