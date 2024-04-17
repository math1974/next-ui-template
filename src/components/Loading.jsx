import React from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const LoadingComponent = () => {
  return (
    <div className="flex justify-center h-[100px]">
      <Loading3QuartersOutlined
        style={{ fontSize: "24px" }}
        spin={true}
      />
    </div>
  );
};

export default LoadingComponent;
