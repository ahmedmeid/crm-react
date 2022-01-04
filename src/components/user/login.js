import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Input, PageHeader, message} from 'antd';
import { instance } from '../../service/api-service';
import { AuthContext } from '../../context/AuthContext';


const Login = (props) => {

    const [redirect, setRedirect] = useState(false);

    const authContext = useContext(AuthContext);

    const performLogin = async (credentials) =>{
          instance.post('login', credentials)
                  .then((response) => {
                    if(response.status === 200){
                      authContext.setAuthState(response.data);
                      setRedirect(true);
                      console.log(response.data);
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                    message.error(error.message);
                  })
    }

    if(redirect){ return (<Redirect to="/" />)}

    return (
        <div className="login-div">
            <PageHeader title="Login" className="site-page-header"/>
            <Form onFinish={performLogin}>
                <Form.Item label="Username" name="username" rules={[
                        {
                          required: true,
                          message: 'Username is required',
                        },
                      ]}>
                    <Input>
                    </Input>
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[
                        {
                          required: true,
                          message: 'Password is required',
                        },
                      ]}>
                    <Input.Password>
                    </Input.Password>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;