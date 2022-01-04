import React, { useState, createRef } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Form, Input, Button, Table, message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { instance } from '../../service/api-service';
import 'antd/dist/antd.css';

const CustomerSearch = (props) => {

    const [dataSource, setDataSource] = useState([{}]);
    const [searchIsPerformed, setSearchIsPerformed] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadingIcon = <LoadingOutlined style={{ fontSize: 38 }} spin />;

    const columns = [
        {
            title: 'ID',
            key: 'id',
            render: (text, record) => (<Link to={{
                pathname: "/customer/overview", state: { customer: record }
            }}>{record.id}</Link>)
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Home Address',
            dataIndex: 'homeAddress',
            key: 'homeAddress',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'District',
            dataIndex: 'district',
            key: 'district',
        },
        {
            title: 'Email Address',
            dataIndex: 'emailAddress',
            key: 'emailAddress',
        },
        {
            title: 'Mobile No.',
            dataIndex: 'mobileNo',
            key: 'mobileNo',
        }

    ];

    const layout = {
        labelCol: {
            span: 2,
        },
        wrapperCol: {
            span: 10,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 2,
            span: 10,
        },
    };

    const searchCustomers = async (params) => {
        setLoading(true);
        await instance.get('/customers', {
            params,
            paramsSerializer: (params) => {
                return Object.entries(params)
                    .filter(([k, v]) => ((v != null) && (v !== '')))
                    .map(([k, v]) => `${k}=${v}`)
                    .join('&');
            },
        withCredentials: true
        }).then((response) => {
            setDataSource(response.data);
            setSearchIsPerformed(true);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            message.error(error.message);
        });
    }

    let searchResults;

    if (searchIsPerformed) {
        searchResults = (<><h3>Search results:</h3><Table dataSource={dataSource}
            rowKey={(record) => record.id}
            columns={columns}
            pagination={{
                hideOnSinglePage: true,
                position: ["bottomLeft"]
            }} />
        </>);
    }

    const form = createRef();

    const resetForm = () => {
        form.current.resetFields();
    }


    return (
        <Spin spinning={loading} tip="Loading..." size="large" indicator={loadingIcon}>
            <PageHeader className="site-page-header"
                title="Search customers" />
            <Form {...layout} ref={form} onFinish={searchCustomers}>
                <Form.Item
                    name={'firstName'}
                    label="First Name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'lastName'}
                    label="Last Name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'homeAddress'}
                    label="Home Address"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'emailAddress'}
                    label="Email Address"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'mobileNo'}
                    label="Mobile No."
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <span>&nbsp;</span>
                    <Button htmlType="button" onClick={resetForm}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
            {searchResults}
        </Spin>
    );
};


export default CustomerSearch;