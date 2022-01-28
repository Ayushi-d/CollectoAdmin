import React, { useEffect, useState } from 'react';
import {Breadcrumb, Layout, Switch, Button, Table, Input, Space, Popconfirm} from 'antd';
import { connect } from 'react-redux';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import SideBarMenu from '../../components/common/sideBarMenu';
import {getToken, notificationType, openNotificationWithIcon} from "../../helpers";
import {userActions} from "../../action";
import { SearchOutlined } from '@ant-design/icons';
import {ACTION_END_POINTS, userConstants} from "../../constants";

const { Content, Sider } = Layout;

function Dashboard(props) {
    const { loading, dispatch, allUsers } = props;
    const [collapsed, setCollapsed] = useState(false);
    const [reloadChanges, setReloadChanges] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
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

    useEffect(() => {
        const token = getToken();
        if (token) {
            dispatch(userActions.getAllUsers(token, ACTION_END_POINTS.GetNewUsers));
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
                          title={status + ' this request'}
                          onConfirm={() => actionUser(record.id, status)}
                          okText='Yes'
                          cancelText='No'
                          okButtonProps={{loading: loading}}
                      >
                        <Button type='primary'>{status}</Button>
                      </Popconfirm>
                    </Space>
                  </span>
                );
            }
        },
    ];

    const actionUser = (id, status) => {
        if (id && status) {
            dispatch(userActions.enableDisableUser({id, status}));
        }
    }

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
                        <Breadcrumb.Item>Recent Users</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        className='site-layout-background'
                        style={{ padding: 24, minHeight: 360 }}
                    >
                        {!loading && (
                            <Table
                                key={allUsers.id}
                                columns={UserTableColumns}
                                dataSource={allUsers}
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

export default connect(mapStateToProps)(Dashboard);
