import {Button, Form, Modal, Spinner} from 'react-bootstrap';
import React, {useState} from 'react';
import {
  getItem,
  performDelivery,
} from '../../../utils/escrow';
import {useEthers} from '@usedapp/core';
import ToastNotification from '../../toastNotification/ToastNotification';

export const EscrowPerformDeliveryModal = ({
                                             show,
                                             setShow,
                                           }) => {
  const {account, library} = useEthers();
  const [itemId, setItemId] = useState('');
  const [notiMsg, setNotiMsg] = useState({
    title: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlePerformDelivery = async () => {
    setIsLoading(true);
    const itemIdAfterParse = parseInt(itemId);
    if (isNaN(itemIdAfterParse)) {
      setNotiMsg({
        title: 'Error',
        content: 'Input Correctly',
      });
      return;
    }

    const item = await getItem(itemIdAfterParse);
    if (item.provider !== account) {
      setNotiMsg({
        title: 'Error',
        content: 'Service not awarded to you',
      });
      handleCloseModal();
      return;
    }
    if (item.provided) {
      setNotiMsg({
        title: 'Error',
        content: 'Service already provided',
      });
      handleCloseModal();
      return;
    }
    if (item.confirmed) {
      setNotiMsg({
        title: 'Error',
        content: 'Service already confirmed',
      });
      handleCloseModal();
      return;
    }

    const res = await performDelivery(library.provider, account, itemId);
    setNotiMsg({
      title: '',
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
          <Modal.Header closeButton>
            <Modal.Title>Escrow Perform Delivery</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Item Id</Form.Label>
              <Form.Control type="text"
                            placeholder="Item Id"
                            onChange={(e) => setItemId(e.target.value)}/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"
                    disabled={isLoading}
                    onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary"
                    disabled={!itemId || isLoading}
                    onClick={handlePerformDelivery}>
              {
                isLoading ? (
                    <>
                      Performing
                      < Spinner animation="border"
                                variant="light"
                                size="sm"
                                className="ms-2"/>
                    </>
                ) : (
                    'Perform Delivery'
                )
              }
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastNotification errorMsg={notiMsg.content}
                           setErrMsg={setNotiMsg}
                           titleNoti={notiMsg.title}/>
      </>
  );
};