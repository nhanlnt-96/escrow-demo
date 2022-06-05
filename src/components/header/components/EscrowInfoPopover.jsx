import {Col, Dropdown, OverlayTrigger, Popover, Row} from "react-bootstrap";
import React from "react";
import {useEffect, useState} from "react";
import {
  getEscAcc,
  getEscAvailBal,
  getEscBal,
  getEscFee,
  getTotalConfirmed,
  getTotalDisputed, getTotalItems
} from "../../../utils/escrow";

export const EscrowInfoPopover = ({
                                    placement,
                                    children
                                  }) => {
  const [escAcc, setEscAcc] = useState("");
  const [escAvailBal, setEscAvailBal] = useState(0);
  const [escBal, setEscBal] = useState(0);
  const [escFee, setEscFee] = useState(0);
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalDisputed, setTotalDisputed] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  
  useEffect(() => {
    const func = async () => {
      setEscAcc(await getEscAcc());
      setEscAvailBal(await getEscAvailBal());
      setEscBal(await getEscBal());
      setEscFee(await getEscFee());
      setTotalConfirmed(await getTotalConfirmed());
      setTotalDisputed(await getTotalDisputed());
      setTotalItems(await getTotalItems());
    };
    func();
  }, []);
  
  return (
    <OverlayTrigger
      trigger="click"
      key={placement}
      placement={placement}
      overlay={
        <Popover id={`popover-positioned-${placement}`}>
          <Popover.Header as="h3">Escrow Information</Popover.Header>
          <Popover.Body>
            <Row>
              <p className="text-center mb-1">EscAcc</p>
              <h6 className="h6 text-center">{escAcc}</h6>
            </Row>
            <Dropdown.Divider/>
            <Row>
              <Col sm={12} lg={6}>
                <p className="text-center mb-1">EscAvailBal</p>
                <h6 className="h6 text-center">{escAvailBal}</h6>
              </Col>
              <Col sm={12} lg={6}>
                <p className="text-center mb-1">EscBal</p>
                <h6 className="h6 text-center">{escBal}</h6>
              </Col>
            </Row>
            <Dropdown.Divider/>
            <Row>
              <p className="text-center mb-1">EscFee</p>
              <h6 className="h6 text-center">{escFee}%</h6>
            </Row>
            <Dropdown.Divider/>
            <Row>
              <Col sm={12} lg={6}>
                <p className="text-center mb-1">TotalConfirmed</p>
                <h6 className="h6 text-center">{totalConfirmed}</h6>
              </Col>
              <Col sm={12} lg={6}>
                <p className="text-center mb-1">TotalDisputed</p>
                <h6 className="h6 text-center">{totalDisputed}</h6>
              </Col>
            </Row>
            <Dropdown.Divider/>
            <Row>
              <p className="text-center mb-1">TotalItems</p>
              <h6 className="h6 text-center">{totalItems}</h6>
            </Row>
          </Popover.Body>
        </Popover>
      }
    >
      {children}
    </OverlayTrigger>
  );
};