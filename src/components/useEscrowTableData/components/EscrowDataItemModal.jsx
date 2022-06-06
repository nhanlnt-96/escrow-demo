import {Button, Col, Dropdown, Modal, Row} from "react-bootstrap";
import React from "react";
import {toEther} from "../../../utils/utils";
import {statusLabel} from "../UseEscrowTableData";

export const EscrowDataItemModal = ({
                                      data,
                                      show,
                                      setShow
                                    }) => {
  const {
    itemId,
    purpose,
    amount,
    timestamp,
    owner,
    provider,
    status,
    provided,
    confirmed
  } = data;
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>[{itemId}]: {purpose}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm={12} lg={4}>
            <p className="text-center mb-1">ID</p>
            <h6 className="h6 text-center">{itemId}</h6>
          </Col>
          <Col sm={12} lg={4}>
            <p className="text-center mb-1">Purpose</p>
            <h6 className="h6 text-center">{purpose}</h6>
          </Col>
          <Col sm={12} lg={4}>
            <p className="text-center mb-1">Amount</p>
            <h6 className="h6 text-center">{toEther(amount)}</h6>
          </Col>
        </Row>
        <Dropdown.Divider/>
        <Row>
          <p className="text-center mb-1">Time</p>
          <h6 className="h6 text-center">{(new Date(parseInt(timestamp) * 1000)).toString()}</h6>
        </Row>
        <Dropdown.Divider/>
        <Row>
          <p className="text-center mb-1">Owner</p>
          <h6 className="h6 text-center">{owner}</h6>
        </Row>
        <Dropdown.Divider/>
        <Row>
          <Col sm={12} lg={6}>
            <p className="text-center mb-1">Provider</p>
            <h6 className="h6 text-center">{toEther(provider)}</h6>
          </Col>
          <Col sm={12} lg={6}>
            <p className="text-center mb-1">Status</p>
            <h6 className="h6 text-center">{statusLabel[status]}</h6>
          </Col>
        </Row>
        <Dropdown.Divider/>
        <Row>
          <Col sm={12} lg={6}>
            <p className="text-center mb-1">Provided</p>
            <h6 className="h6 text-center">{provided ? "true" : "false"}</h6>
          </Col>
          <Col sm={12} lg={6}>
            <p className="text-center mb-1">Confirmed</p>
            <h6 className="h6 text-center">{confirmed ? "true" : "false"}</h6>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};