import React, {useContext, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import 'antd/dist/antd.css';
import './layout.css';
import {Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    SearchOutlined,
    FileOutlined
} from '@ant-design/icons';

import CustomerSearch from '../customer/customers-search';
import CustomerOverview from '../customer/customer-overview';
import CustomerNew from '../customer/customer-new';
import {AuthContext} from "../../context/AuthContext";

const {Header, Sider, Content, Footer} = Layout;
const {SubMenu} = Menu;

const routes = [
    {
        path: "/customers/search",
        component: CustomerSearch
    },
    {
        path: "/customer/overview",
        render: (props) => (<CustomerOverview {...props} />)
    },
    {
        path: "/customer/new",
        component: CustomerNew
    }
]

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const authContext = useContext(AuthContext);

    const toggle = () => {
        setCollapsed(!collapsed);
    };
    if (!authContext.isAuthenticated()) {
        return (<Redirect to="/login"/>)
    }
    return (
        <Router>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} width="210">
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <SubMenu key="1" icon={<UserOutlined/>} title="Customers">
                            <Menu.Item key="2" icon={<SearchOutlined/>}><Link to="/customers/search">Search
                                customers</Link></Menu.Item>
                            <Menu.Item key="3" icon={<FileOutlined/>}><Link to="/customer/new">New
                                customer</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="4" icon={<VideoCameraOutlined/>}>
                            Products
                        </Menu.Item>
                        <Menu.Item key="5" icon={<UploadOutlined/>}>
                            Orders
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 600,
                        }}
                    >
                        <Switch>
                            {routes.map((obj, index) => (<Route key={index} {...obj} />))}
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>GoodJob Solutions ©2020 All rights reserved</Footer>
                </Layout>
            </Layout>
        </Router>
    );
}

export default AppLayout;