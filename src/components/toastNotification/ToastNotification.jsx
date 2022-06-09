import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastNoti = ({ errorMsg, setErrMsg, position, titleNoti }) => {
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (errorMsg) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setErrMsg({
          title: "",
          content: "",
        });
      }, 2000);
    }
  }, [errorMsg]);
  return (
    <ToastContainer
      className="toast-container position-fixed"
      position={position ? position : "bottom-end"}
      style={{ zIndex: 9999 }}
    >
      <Toast show={showToast} className="p-0">
        <Toast.Header className="bg-dark text-white" closeButton={false}>
          <strong className="me-auto">{titleNoti ? titleNoti : ""}</strong>
        </Toast.Header>
        <Toast.Body className="p-3">{errorMsg}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNoti;
