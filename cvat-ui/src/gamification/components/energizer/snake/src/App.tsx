import "./styles.css";
import { useState } from "react";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";
import Snake from "./snek";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        className={"modal"}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Snake />
      </Modal>
    </div>
  );
}
