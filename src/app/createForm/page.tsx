"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CreateForm = (props: any) => {
  const { visible ,cancel} = props;
  const [form] = Form.useForm();
 const [modal,setmodal]=useState (visible)
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    message.success("Form submitted successfully!");
  };

useEffect(()=>{
  handleCancel()
},[modal])

  const handleCancel=()=>{
    setmodal(false)
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <Modal
        title="User Information"
        open={visible}
        onCancel={cancel}
        footer={null} // Disable default footer
        width={600} // You can adjust the width
      >
        <Form
          form={form}
          name="user-form"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="pp"
            label="Profile Image Link"
            rules={[
              {
                required: true,
                message: "Please enter your Profile Image Link!",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateForm;
