/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  AppstoreFilled,
} from '@ant-design/icons';
import { routeConstants } from '../../constants';
import { commonLogout } from '../../helpers';

const { SubMenu } = Menu;

class SideBarMenu extends React.Component {
  render() {
    return (
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Dashboard
          <Link to={routeConstants.DASHBOARD_URL} />
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
          <Menu.Item key="2" icon={<UserOutlined />}>
            All
            <Link to={routeConstants.SHOW_ALL_USER_URL} />
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" icon={<FileOutlined />} title="Account">
          <Menu.Item key="7" onClick={() => commonLogout()}>
            Logout
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
export default SideBarMenu;
