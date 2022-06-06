import './Header.scss';
import React, {useState} from 'react';
import {shortenAddress, useEthers} from '@usedapp/core';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import {EscrowCreateItemModal, EscrowInfoPopover} from './components';

const Header = () => {
  const {
    account,
    chainId,
    deactivate,
    activateBrowserWallet,
  } = useEthers();
  const [showCreateItemModal, setShowCreateItemModal] = useState(false);

  return (
      <>
        <Navbar collapseOnSelect
                expand="lg"
                className="header-container"
                bg="dark"
                variant="dark">
          <Container>
            <Navbar.Brand className="header-logo">
              <h2>Escrow</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto header-left">
                <EscrowInfoPopover placement={'bottom'}
                                   children={
                                     <Navbar.Text className="header-left__item">Escrow
                                       Information</Navbar.Text>}/>
                <Navbar.Text className="header-left__item ms-lg-2"
                             onClick={() => setShowCreateItemModal(true)}>Escrow
                  Create Item</Navbar.Text>
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
        <EscrowCreateItemModal show={showCreateItemModal}
                               setShow={setShowCreateItemModal}/>
      </>
  );
};

export default Header;