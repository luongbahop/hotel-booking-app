import React from "react";
import { Layout, Menu } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "providers/StoreProvider";
import { IUser } from "interfaces/user.interface";

export default function PublicLayout() {
  const location = useLocation();
  const { auth, changeAuth } = useStore();

  const [activeMenu, setActiveMenu] = React.useState("home");

  const AUTH_INFO = sessionStorage.getItem("AUTH_INFO");

  React.useEffect(() => {
    if (AUTH_INFO) {
      changeAuth(JSON.parse(AUTH_INFO));
    }
  }, [AUTH_INFO]);

  React.useEffect(() => {
    if (location.pathname.includes("hotel-list")) {
      setActiveMenu("hotel-list");
    } else if (location.pathname.includes("profile")) {
      setActiveMenu("profile");
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
              label: <Link to="/">Home</Link>,
            },
            // {
            //   key: "hotel-list",
            //   label: <Link to="/hotel-list">Hotels</Link>,
            // },
            ...(!auth.isAuthenticated
              ? [{ key: "login", label: <Link to="/auth/login">Login</Link> }]
              : [
                  {
                    key: "profile",
                    label: <Link to="/profile">Profile</Link>,
                  },
                  {
                    key: "logout",
                    label: (
                      <Link
                        to="/"
                        onClick={() => {
                          changeAuth({
                            isAuthenticated: false,
                            userInfo: {} as IUser,
                          });
                          sessionStorage.clear();
                        }}
                      >
                        Logout
                      </Link>
                    ),
                  },
                ]),
          ]}
        />
      </Header>
      <Content className="app-content">
        <Outlet />
      </Content>
    </Layout>
  );
}
