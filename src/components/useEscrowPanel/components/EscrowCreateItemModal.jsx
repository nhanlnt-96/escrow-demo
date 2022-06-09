import { Button, Form, Modal, Spinner } from "react-bootstrap";
import React, { useState } from "react";
import { createItem } from "../../../utils/escrow";
import { useEthers } from "@usedapp/core";
import ToastNotification from "../../toastNotification/ToastNotification";

export const EscrowCreateItemModal = ({ show, setShow }) => {
  const { account, library } = useEthers();
  const [purpose, setPurpose] = useState("");
  const [value, setValue] = useState("");
  const [notiMsg, setNotiMsg] = useState({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateItem = async () => {
    const valueAfterParse = parseFloat(value);
    setIsLoading(true);

    if (purpose === "" || value === 0 || isNaN(valueAfterParse)) {
      setNotiMsg({
        title: "Error",
        content: "Fill the fields",
      });
      return;
    }

    if (valueAfterParse < 0.001) {
      setNotiMsg({
        title: "Error",
        content: "Value should be more than 0.001",
      });
      return;
    }

    const res = await createItem(library.provider, account, purpose, value);
    console.log(res);
    setNotiMsg({
      title: "",
      content: res.message ? res.message : res,
    });

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShow(false);
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="bg-dark text-white" closeButton={false}>
          <Modal.Title>Escrow Create Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Purpose</Form.Label>
            <Form.Control
              type="text"
              placeholder="Purpose"
              onChange={(e) => setPurpose(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Value</Form.Label>
            <Form.Control
              type="text"
              placeholder="Value"
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={isLoading}
            onClick={() => setShow(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!value || !purpose || isLoading}
            onClick={handleCreateItem}
          >
            {isLoading ? (
              <>
                Creating
                <Spinner
                  animation="border"
                  variant="light"
                  size="sm"
                  className="ms-2"
                />
              </>
            ) : (
              "Create Item"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastNotification
        errorMsg={notiMsg.content}
        setErrMsg={setNotiMsg}
        titleNoti={notiMsg.title}
      />
    </>
  );
};
