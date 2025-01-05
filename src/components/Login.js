import React, { useState } from "react";
import { Button, Input, Form, Card, Typography, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "../css/login.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const registerUser = allUsers?.find(
      (user) => user?.email === values?.email
    );
    if (!registerUser) {
      notification.error({
        message: "Failed",
        description: "User not exist",
      });
      return;
    }
    if (registerUser?.password === values?.password) {
      localStorage.setItem("userLoggedIn", true);
      navigate("/dashboard");
    } else {
      notification.error({
        message: "Failed",
        description: "Password is invalid",
      });
    }
  };

  return (
    <div className="app">
      <Card className="card">
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Title level={3} style={{ textAlign: "center" }}>
            Login
          </Title>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
          <span>
            Don't have an account? <a href="/register">Signup</a>
          </span>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
