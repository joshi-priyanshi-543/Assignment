import React, { useState } from "react";
import {
  Button,
  Input,
  Form,
  Card,
  Typography,
  message,
  notification,
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import "../css/register.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === values.email);
    if (userExists) {
      notification.error({
        message: "Failed",
        description: "User already register.",
      });
    } else {
      const allUser = [...users, values];
      localStorage.setItem("users", JSON.stringify(allUser));

      notification.success({
        message: "Success",
        description: "User register successfully.",
      });
      navigate("/login");
    }
  };

  return (
    <div className="app">
      <Card className="card">
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Title level={3} style={{ textAlign: "center" }}>
            Register
          </Title>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please enter your username!" },
              {
                min: 3,
                message: "Username must be at least 3 characters long.",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long.",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
          <span>
            Already have an account? <a href="/login">Login</a>
          </span>
        </Form>
      </Card>
    </div>
  );
};

// Simulated API call
const fakeRegisterAPI = async (values) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.username !== "error") {
        resolve({ user: { name: values.username } });
      } else {
        reject(new Error("Registration failed"));
      }
    }, 1000);
  });
};

export default Registration;
