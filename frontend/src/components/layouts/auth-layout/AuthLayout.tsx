import React from "react";
import { useStore } from "providers/StoreProvider";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";

import "./AuthLayout.scss";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { auth, changeAuth } = useStore();
  const AUTH_INFO = sessionStorage.getItem("AUTH_INFO");

  React.useEffect(() => {
    if (AUTH_INFO) {
      changeAuth(JSON.parse(AUTH_INFO));
    }
  }, [AUTH_INFO]);

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth]);

  return (
    <Layout className="auth-layout">
      <Content className="auth-content">
        <Outlet />
      </Content>
    </Layout>
  );
}
