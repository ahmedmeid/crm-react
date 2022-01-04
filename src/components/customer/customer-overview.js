import React, { useState } from 'react';
import { Descriptions, Button, Modal, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CustomerUpdate from './cusomer-update';

const CustomerOverview = (props) => {

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => setVisible(true);
    const handleCancel = () => setVisible(false); 

    const [customer, setCustomer] = useState(props.location.state.customer);

    return (<>
        <Descriptions title="Customer Overview" column={1} bordered={true} size="small">
            <Descriptions.Item label="ID">{customer.id}</Descriptions.Item>
            <Descriptions.Item label="First Name">{customer.firstName}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{customer.lastName}</Descriptions.Item>
            <Descriptions.Item label="Home Address">{customer.homeAddress}</Descriptions.Item>
            <Descriptions.Item label="City">{customer.city}</Descriptions.Item>
            <Descriptions.Item label="District">{customer.district}</Descriptions.Item>
            <Descriptions.Item label="Email Address">{customer.emailAddress}</Descriptions.Item>
            <Descriptions.Item label="Mobile No.">{customer.mobileNo}</Descriptions.Item>
        </Descriptions>
         <br />
        <Button type="primary" icon={<EditOutlined />} onClick={showModal}> Edit</Button>

        <Modal title="Update Customer"
            visible={visible}
            onOk={()=> {
                         form.validateFields()
                         .then((values) => {
                                            form.submit();
                                            setVisible(false);
                                        });
                        }
                  }
            onCancel={handleCancel}>
            <CustomerUpdate customer={customer} form={form} callBack={setCustomer}/>
        </Modal>
        
    </>);
}

export default CustomerOverview;