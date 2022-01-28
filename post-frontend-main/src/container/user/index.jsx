import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Breadcrumb, Button, Input, Layout, Popconfirm, Space, Switch, Table} from 'antd';
import { userActions } from '../../action';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import SideBarMenu from '../../components/common/sideBarMenu';
// import TableComponent from '../../components/common/table';
import { getToken } from '../../helpers';
import ExpandedUser from './expandable';
import { userServices } from '../../services';
import { notificationType, openNotificationWithIcon } from '../../helpers';
import { SearchOutlined } from '@ant-design/icons';
import {userConstants} from "../../constants";

const { Content, Sider } = Layout;

function User(props) {
  const { loading, dispatch, allUsers } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [reloadChanges, setReloadChanges] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const handleDeleteSlot = (id) => {
    setDeleteLoading(true);
    const token = getToken();
    userServices
      .deleteUpload(id, token)
      .then((res) => {
        if (res.data.success) {
          return openNotificationWithIcon(
            notificationType.SUCCESS,
            'Post deleted'
          );
        } else {
          return openNotificationWithIcon(
            notificationType.WARNING,
            'Unable to delete post'
          );
        }
      })
      .catch((_e) => {
        return openNotificationWithIcon(
          notificationType.ERROR,
          'Something went wrong'
        );
      });
    setDeleteLoading(false);
    setReloadChanges(!reloadChanges);
  };

  let searchInput;

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
              ref={node => {
                searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
            >
              Filter
            </Button>
          </Space>
        </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
        record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
        searchedColumn === dataIndex ? (
            <p style={{ backgroundColor: '#ffc069', padding: 0 }}>{text ? text.toString() : ''}</p>
        ) : (
            text
        ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
    setSearchedColumn('');
  };

  const actionUser = (id, status) => {
    if (id && status) {
      dispatch(userActions.enableDisableUser({id, status}));
    }
  }

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(userActions.getAllUsers(token));
    }
    // eslint-disable-next-line no-unused-vars
  }, [dispatch, reloadChanges]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const UserTableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      responsive: ['xs', 'md', 'lg'],
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['md'],
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Enabled',
      key: 'enabled',
      render: (record) => {
        const status = record.enabled ? userConstants.DISABLE : userConstants.ENABLE;
        return (
          <span>
            <Space size='middle'>
              <Popconfirm
                placement='left'
                title={status+' this request'}
                onConfirm={() => actionUser(record.id, status)}
                okText='Yes'
                cancelText='No'
                okButtonProps={{ loading: loading }}
              >
                <Button type='primary' >{status}</Button>
              </Popconfirm>
            </Space>
          </span>
        );
      }
    },
  ];

  allUsers.map((item, index) => {
    item.key = item.id;
    return item;
  })

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
      >
        <div
          className='logo'
          style={{ textAlign: 'center', color: '#fff', padding: 24 }}
        >
          Logo
        </div>
        <SideBarMenu />
      </Sider>
      <Layout className='site-layout'>
        <Header style={{ margin: '0 16px' }} toggle={toggle} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Users</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}
          >
            {!loading && (
              <Table
                key={'test'}
                columns={UserTableColumns}
                dataSource={allUsers}
                expandable={{
                  expandedRowRender: (record) => {
                    return(
                      <ExpandedUser
                          key={record.id}
                          childrenData={record.uploads}
                          handleDeleteSlot={handleDeleteSlot}
                          loading={deleteLoading}
                      />
                    );
                  },
                  rowExpandable: (record) => {
                    return record.id;
                  },
                }}
              />
            )}
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

function mapStateToProps(state) {
  const { loading, allUsers } = state.authentication;
  return {
    loading,
    allUsers,
  };
}

export default connect(mapStateToProps)(User);
