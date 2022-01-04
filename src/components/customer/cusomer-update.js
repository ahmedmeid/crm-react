import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { instance } from '../../service/api-service';


const CustomerUpdate = (props) => {

    const [data,setData] = useState({});

    const updateCustomer = async (params) => {
        await instance.put('/customers/' + props.customer.id, data)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    props.callBack(response.data);
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleChangeValues = (changedValues, allValues) =>{
        let x = {...data};
        Object.entries(changedValues)
        .map(([k,v])=> {
                         x[k] = v;
                         return x;
                        });
        setData(x);
    }

    useEffect(() => {
        props.form.setFieldsValue({
            firstName: props.customer.firstName,
            lastName: props.customer.lastName,
            homeAddress: props.customer.homeAddress,
            city: props.customer.city,
            district: props.customer.district,
            emailAddress: props.customer.emailAddress,
            mobileNo: props.customer.mobileNo
        });
    }, [props]);

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
        },
    };
    
    return (
        <Form {...layout} form={props.form} onValuesChange={handleChangeValues} onFinish={updateCustomer}>
            <Form.Item
                name={'firstName'}
                label="First Name"
                rules={[
                    {
                      required: true,
                      message: 'First name is a mandatory field.',
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
                      message: 'Last name is a mandatory field.',
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
                      message: 'Invalid Email Address!',
                    },
                    {
                      required: true,
                      message: 'Email address is a mandatory field',
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
                      message: 'Mobile phone number is a mandatory field.',
                    },
                  ]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default CustomerUpdate;