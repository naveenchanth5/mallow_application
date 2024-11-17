'use client'
import React, { useEffect, useState } from "react";
import { Card, Button, Avatar, Row, Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.css";
import apiCall from "../../app/commonFunctions/apiCall";

interface User {
  id: number;
  name: string;
  email: string;
}
const HoverCard = () => {
  const [userData, setuserData] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    fetchUsers().then((val: any) => {
      setuserData(val.data);
    });
  }, []);

  const fetchUsers = async (): Promise<User[]> => {
    return apiCall<User[]>("/users", "GET");
  };

    const handleCancel = () => {
    setIsModalVisible(false)
    setVisible(false);
  };

  // fetchUsers()
  //   .then((users) => console.log(users))
  //   .catch((error) => console.error(error.message));

  return (
    <>
      <Row > 
        {userData.map((val: any) => (
        <Col span={8} >
            <div className="card-container">
              <Card className="hover-card" hoverable key={val.id}>
                <div className="card-content">
                  <Avatar
                    src={val.avatar}
                    size={64}
                    style={{ marginTop: 20, marginBottom: 10 }}
                  />
                  <h3>{val.first_name}</h3>
                  <h3>{val.last_name}</h3>
                  <p>{val.email}</p>
                </div>
                <div className="card-actions">
                  <Button type="primary" icon={<EditOutlined />} size="small"  onClick={() => setVisible(true)}>
                    Edit
                  </Button>
                  <Button danger icon={<DeleteOutlined />} size="small" onClick={() => setIsModalVisible(true)}>
                    Delete
                  </Button>
                </div>
              </Card>
            </div>
       
        </Col>
           ))}
      </Row>
       <CreateForm visible={visible} cancel={handleCancel} />

      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        cancelButtonProps={{ type: "default" }}
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete</p>
      </Modal>
    </>
  );
};

export default HoverCard;
