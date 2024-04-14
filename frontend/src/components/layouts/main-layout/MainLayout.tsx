import React from "react";
import { Layout, Menu } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "providers/StoreProvider";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, changeAuth } = useStore();

  const [activeMenu, setActiveMenu] = React.useState("home");

  const AUTH_INFO = sessionStorage.getItem("AUTH_INFO");

  React.useEffect(() => {
    if (AUTH_INFO) {
      changeAuth(JSON.parse(AUTH_INFO));
    }
  }, [AUTH_INFO]);

  React.useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth]);

  React.useEffect(() => {
    if (location.pathname.includes("hotel-list")) {
      setActiveMenu("hotel-list");
    } else if (location.pathname === "/") {
      setActiveMenu("home");
    } else {
      setActiveMenu("");
    }
  }, [location]);

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeMenu]}
          items={[
            {
              key: "home",
              label: <Link to="/admin">Home</Link>,
            },
            {
              key: "hotels",
              label: <Link to="/admin/hotel/list">Hotels</Link>,
            },
          ]}
        />
      </Header>
      <Content className="app-content">
        <Outlet />
      </Content>
    </Layout>
  );
}
