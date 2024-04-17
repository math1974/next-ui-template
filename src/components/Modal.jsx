import React from "react";
import { Modal } from "antd";

const ModalComponent = ({ children, ...props }) => {
  return <Modal {...props}>{children}</Modal>;
};

export default ModalComponent;
