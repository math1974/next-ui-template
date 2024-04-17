import { Content, Footer, Header } from "antd/es/layout/layout";
import { useRouter } from "next/router";
import React from "react";
import HeaderComponent from "../components/Header";
import SidebarComponent from "../components/Sidebar";

const Layout = ({ children }) => {
  const router = useRouter();

  if (router.pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-screen">
      <HeaderComponent />

      <div
        className="flex h-full overflow-hidden"
        style={{ maxHeight: "calc(100vh - 60px)" }}
      >
        <SidebarComponent />

        <Content className="p-4 overflow-y-auto">{children}</Content>
      </div>
    </div>
  );
};

export default Layout;
