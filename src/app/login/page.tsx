"use client";
import { Form, Input, Button, Checkbox, Card, FormInstance } from "antd";
import apiCall from "../commonFunctions/apiCall";
import { useRouter } from "next/navigation";
import { encryptToken } from "../commonFunctions/commonFunction";

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

interface Token {
  id: number;
  name: string;
  email: string;
}
const LoginPage: React.FC = () => {
  const router = useRouter();
  const onFinish = (values: LoginFormValues) => {
    apiCall<Token[]>("/login", "POST", values).then((values) => {
      console.log(values, "login");
      if(values){
        encryptToken(values);
        router.push("/table");
      }
      
    });
  };

 
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 600,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
         
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
