import React from "react";
import {shortenAddress, useEthers} from "@usedapp/core";
import {Button, Container, Nav, Navbar} from "react-bootstrap";

const Header = () => {
  const {
    account,
    chainId,
    deactivate,
    activateBrowserWallet
  } = useEthers();
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Escrow</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="flex-fill justify-content-center align-items-center">
            {
              chainId !== 80001 && (
                <Navbar.Text className="text-danger">Wrong network. Please change your network.</Navbar.Text>
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
                        onClick={() => activateBrowserWallet()}>Connect Wallet</Button>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;