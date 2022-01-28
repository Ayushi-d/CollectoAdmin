import React from 'react';
import { connect } from 'react-redux';
import {
  Form, Input, Button, Layout,
} from 'antd';

import Footer from '../../components/common/footer';
import { notificationType, openNotificationWithIcon } from '../../helpers';
// import {RoleCheck} from "../../constants";
import { userActions } from '../../action';
import { RoleCheck } from '../../constants';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const { Content } = Layout;

function AdminLogin(props) {
  const onFinish = (values) => {
    const { dispatch } = props;
    if (values.email && values.password) {
      const userData = {
        email: values.email,
        password: values.password,
        appType: RoleCheck.SUPER_ADMIN,
      };
      dispatch(userActions.authenticate(userData));
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (errorInfo.errorFields.length > 0) {
      // eslint-disable-next-line array-callback-return
      errorInfo.errorFields.map((item) => {
        if (item.errors.length > 0) {
          // eslint-disable-next-line array-callback-return
          item.errors.map((message) => {
            openNotificationWithIcon(notificationType.WARNING, message);
          });
        }
      });
    } else {
      openNotificationWithIcon(notificationType.WARNING, 'Please fill all valid/required data');
    }
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          `
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please enter your email id!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

function mapStateToProps(state) {
  const { loading } = state.authentication;
  return {
    loading,
  };
}

export default connect(mapStateToProps)(AdminLogin);
