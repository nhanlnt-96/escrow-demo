import './Header.scss';
import React, {useState} from 'react';
import {shortenAddress, useEthers} from '@usedapp/core';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import {EscrowInfoModal} from './components';

const Header = () => {
  const {
    account,
    chainId,
    deactivate,
    activateBrowserWallet,
  } = useEthers();
  const [showEscrowInfoModal, setShowEscrowInfoModal] = useState(false);

  return (
      <>
        <Navbar collapseOnSelect
                expand="lg"
                className="header-container"
                bg="dark"
                variant="dark">
          <Container fluid="xxl">
            <Navbar.Brand className="header-logo">
              <h2>Escrow</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto header-left">
                <Navbar.Text className="header-left__item"
                             onClick={() => setShowEscrowInfoModal(true)}>Escrow
                  Information</Navbar.Text>
              </Nav>
              <Nav>
                {
                  account ? (
                      <>
                        <Navbar.Text>
                          Signed in as: {shortenAddress(account)}
                        </Navbar.Text>
                        <Button variant="primary" className="ms-2"
                                onClick={() => deactivate()}>Disconnect</Button>
                      </>
                  ) : (
                      <Button variant="primary"
                              onClick={() => activateBrowserWallet()}>Connect
                        Wallet</Button>
                  )
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {
            chainId !== 80001 && (
                <Navbar className="p-0" bg="warning" variant="warning">
                  <Container>
                    <Navbar.Collapse id="responsive-navbar-nav"
                                     className="justify-content-center">
                      <Navbar.Text className="text-white fw-bold">Wrong network.
                        Please change your
                        network.</Navbar.Text>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
            )
        }
        <EscrowInfoModal show={showEscrowInfoModal}
                         setShow={setShowEscrowInfoModal}/>
      </>
  );
};

export default Header;