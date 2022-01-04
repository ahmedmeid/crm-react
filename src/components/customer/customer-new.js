import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import { PageHeader, Form, Input, Button } from 'antd';
import { instance } from '../../service/api-service';

const CustomerNew = () => {

  const [redirect, setRedirect] = useState(false);
  const [value, setValue] = useState({});

    const newCustomer = (customer) => {
         instance.post('/customers', customer)
         .then((response) => {
            if(response.status === 201){
               setValue(response.data);
               setRedirect(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    } 
    if(redirect){
       return (<Redirect to={{ pathname: "/customer/overview", state: { customer: value } }} />);
    }

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

    return (
        <>
            <PageHeader className="site-page-header" title="New Customer" />
            <Form {...layout} onFinish={newCustomer}> 
                <Form.Item
                    name={'firstName'}
                    label="First Name"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your first name!',
                        },
                      ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'lastName'}
                    label="Last Name"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your last name!',
                        },
                      ]}
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
                    name={'city'}
                    label="City"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'district'}
                    label="District"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'emailAddress'}
                    label="Email Address"
                    rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!',
                        },
                      ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'mobileNo'}
                    label="Mobile No."
                    rules={[
                        {
                          required: true,
                          message: 'Please input your mobile phone number!',
                        },
                      ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CustomerNew;