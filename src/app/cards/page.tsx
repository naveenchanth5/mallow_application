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
  useEffect(() => {
    fetchUsers().then((val: any) => {
      setuserData(val.data);
    });
  }, []);

  const fetchUsers = async (): Promise<User[]> => {
    return apiCall<User[]>("/users", "GET");
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
                  <Button type="primary" icon={<EditOutlined />} size="small">
                    Edit
                  </Button>
                  <Button danger icon={<DeleteOutlined />} size="small">
                    Delete
                  </Button>
                </div>
              </Card>
            </div>
       
        </Col>
           ))}
      </Row>
    </>
  );
};

export default HoverCard;
