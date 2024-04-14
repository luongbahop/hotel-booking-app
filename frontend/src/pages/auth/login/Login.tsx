import React from "react";
import axios from "axios";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { useStore } from "providers/StoreProvider";
import getEnvVars from "environment";

import "./Login.scss";

const CONFIGS = getEnvVars();

interface ILoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const { changeAuth } = useStore();

  const onFinish = async (values: ILoginFormValues) => {
    setLoading(true);
    try {
      const body = {
        username: values.username,
        password: values.password,
      };
      const response = await axios({
        method: "post",
        url: `${CONFIGS.API_URL}/api/v1/auth/login`,
        data: body,
      });
      const authInfo = {
        isAuthenticated: true,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        userInfo: response.data.data,
      };

      setLoading(false);
      sessionStorage.setItem("AUTH_INFO", JSON.stringify(authInfo));
      changeAuth({ ...authInfo, isAuthenticated: true });
      navigate("/");
    } catch (error) {
      console.log("error", error);
      notification.error({
        message: "Login Failed!",
        description: get(
          error,
          "response.data.error",
          "Internal Server Error!"
        ),
      });
      setLoading(false);
    }
  };
  return (
    <div className="login-form">
      <h3>Login Form</h3>
      <p>Please input username and password!</p>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input placeholder="Username" disabled={loading} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" disabled={loading} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
