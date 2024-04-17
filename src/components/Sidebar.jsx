import React, { useCallback, useState } from "react";
import {
  SettingOutlined,
  DollarOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";

import { usePathname } from 'next/navigation'
import { useRouter } from "next/router";
import NavigationUtils from "../utils/NavigationUtils";

const { Sider } = Layout;

const SidebarComponent = () => {
  const routeName = usePathname();
  const router = useRouter();
  const getItem = useCallback(
    (label, page, icon, children) => {
      return {
        key: page,
        icon,
        children,
        onClick: !children?.length
          ? () => NavigationUtils.navigateTo(router, page)
          : null,
        label,
      };
    },
    [router]
  );

  const items = [
    getItem("Dashboard geral", "/dashboard", <BarChartOutlined />),
    getItem("Finanças", "/finances", <DollarOutlined />),
    getItem("Configurações", "/setting", <SettingOutlined />, [
      getItem("Produtos", "/products"),
      getItem("Clientes", "/customers"),
    ]),
  ];

  return (
    <Sider
      className="h-full"
      width={230}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        className="h-full"
        style={{ paddingTop: '16px' }}
        defaultSelectedKeys={["/dashboard"]}
        selectedKeys={[routeName]}
        mode="inline"
        defaultOpenKeys={["/setting"]}
        items={items}
      />
    </Sider>
  );
};

export default SidebarComponent;
