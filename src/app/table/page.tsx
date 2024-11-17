"use client";
import React, { useEffect, useState } from "react";
import { Card, Button, Input, Table, Space, Avatar, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  LogoutOutlined,
  DownloadOutlined,
  TableOutlined,
  IdcardOutlined, // Icon for export
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import CreateForm from "../createForm/page";
import apiCall from "../commonFunctions/apiCall";
import { useRouter } from "next/navigation";
import HoverCard from "../cards/page";

const TableComponent = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState<any>(null);
  const [tabledata, setTabledata] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const router = useRouter();
  const [viewType, setViewType] = useState<"table" | "card">("table");

  interface User {
    id: number;
    name: string;
    year: string;
    color: string;
    pantone_value: string;
  }

  useEffect(() => {
    fetchUsers().then((val: any) => {
      setTabledata(val.data);
    });
  }, []);

  const fetchUsers = async (): Promise<User[]> => {
    return apiCall<User[]>("/users", "GET");
  };

  // Columns for the table
  const columns = [
    {
      title: "Photo",
      dataIndex: "avatar",
      key: "photo",
      render: (text: string) => <Avatar src={text} shape="circle" />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "lastName",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => setVisible(true)}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record)}
            icon={<DeleteOutlined />}
            type="primary"
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (record: any) => {
    setDeleteRecord(record); // Store record for deletion
    setIsModalVisible(true); // Show confirmation modal
  };

  const handleOk = () => {
    // Logic to delete the user from the data source
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal without deleting
    setVisible(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update the search query
  };

  const filteredData = tabledata.filter((user: any) => {
    return (
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleExport = () => {
    // Handle export logic, for example, downloading the data as CSV or JSON
    console.log("Exporting data...", tabledata);
  };

  const Logout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <div>
      <Header
        style={{
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <h1 style={{ color: "#fff", margin: 0 }}>Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#fff", fontSize: "16px" }}>Welcome, User</span>
          <Button
            type="primary"
            onClick={Logout}
            danger
            icon={<LogoutOutlined />}
          >
            Log Out
          </Button>
        </div>
      </Header>
      <Card style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Users</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              placeholder="Search users"
              style={{ width: 200 }}
              value={searchQuery} // Bind search input to the state
              onChange={handleSearchChange} // Update state on change
            />
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={() => setVisible(true)}
            >
              Create User
            </Button>
          </div>
        </div>
      </Card>

      {/* New Buttons Below Users Section */}
      <Card>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="default"
            icon={<TableOutlined />}
            onClick={() => setViewType("table")} // Set to table view
          >
            Table
          </Button>
          <Button
            type="default"
            icon={<IdcardOutlined />}
            onClick={() => setViewType("card")} // Set to card view
          >
            Card
          </Button>
        </div>
      </Card>

      {viewType === "table" ? (
        <Table dataSource={filteredData} columns={columns} />
      ) : (
        <>
          <HoverCard />
        </>
      )}

      <CreateForm visible={visible} cancel={handleCancel} />
      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        cancelButtonProps={{ type: "default" }}
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete {deleteRecord?.firstName}{" "}
          {deleteRecord?.lastName}?
        </p>
      </Modal>
    </div>
  );
};

export default TableComponent;
