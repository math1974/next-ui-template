import React, { useCallback } from "react";

import { Button, Layout, theme } from "antd";

import Swal from 'sweetalert2';

import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import NavigationUtils from "../utils/NavigationUtils";

const HeaderComponent = () => {
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = useCallback(() => {
    Swal.fire({
      title: "Tem certeza que deseja sair?",
      showCancelButton: true,
      icon: 'warning',
      iconColor: '#FF7700',
      confirmButtonColor: "#FF7700",
      cancelButtonText: 'Cancelar',
      confirmButtonText: "Sair",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();

        NavigationUtils.navigateTo(router, "/login");
      }
    });
  }, [router]);

  return (
    <Layout.Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colorBgContainer,
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
    >
      <p className="text-xl text-gray-600">Golden Candies</p>

      <Button
        type="secondary"
        shape="circle"
        title="Sair da conta"
        onClick={handleLogout}
        icon={<LogoutOutlined />}
      />
    </Layout.Header>
  );
};

export default HeaderComponent;
