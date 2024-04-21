import React, { useState } from "react";
import { Modal } from "antd";
export default function BuildingModal(props) {
  const { showModal, handleExitModal, buildingName, eventData } = props;

  console.log(eventData);

  return (
    <Modal
      title={"Events for " + buildingName}
      open={showModal}
      onOk={handleExitModal}
      onCancel={handleExitModal}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
