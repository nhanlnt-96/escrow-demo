import './Header.scss';
import React, {useState} from 'react';
import {shortenAddress, useEthers} from '@usedapp/core';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import {EscrowCreateItemModal, EscrowInfoPopover} from './components';
import {EscrowRequestItemModal} from './components/EscrowRequestItemModal';
import {
  EscrowPerformDeliveryModal,
} from './components/EscrowPerformDeliveryModal';

const Header = () => {
  const {
    account,
    chainId,
    deactivate,
    activateBrowserWallet,
  } = useEthers();
  const [showCreateItemModal, setShowCreateItemModal] = useState(false);
  const [showRequestItemModal, setShowRequestItemModal] = useState(false);
  const [showPerformDeliveryModal, setShowPerformDeliveryModal] = useState(
      false);

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
                {
                    account && chainId === 80001 && (
                        <>
                          <Navbar.Text className="header-left__item ms-lg-2"
                                       onClick={() => setShowCreateItemModal(true)}>Escrow
                            Create Item</Navbar.Text>
                          <Navbar.Text className="header-left__item ms-lg-2"
                                       onClick={() => setShowRequestItemModal(
                                           true)}>Escrow
                            Request Item</Navbar.Text>
                          <Navbar.Text className="header-left__item ms-lg-2"
                                       onClick={() => setShowPerformDeliveryModal(
                                           true)}>Escrow
                            Perform Delivery</Navbar.Text>
                        </>
                    )
                }
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
        <EscrowRequestItemModal show={showRequestItemModal}
                                setShow={setShowRequestItemModal}/>
        <EscrowPerformDeliveryModal show={showPerformDeliveryModal}
                                    setShow={setShowPerformDeliveryModal}/>
      </>
  );
};

export default Header;