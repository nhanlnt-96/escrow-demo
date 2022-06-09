import {Button, Form, Modal, Spinner} from 'react-bootstrap';
import React, {useState} from 'react';
import {requestItem} from '../../../utils/escrow';
import {useEthers} from '@usedapp/core';
import ToastNotification from '../../toastNotification/ToastNotification';

export const EscrowRequestItemModal = ({
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

  const handleRequestItem = async () => {
    setIsLoading(true);
    const itemIdAfterParse = parseInt(itemId);
    if (isNaN(itemIdAfterParse)) {
      setNotiMsg({
        title: 'Error',
        content: 'Input Correctly',
      });
      return;
    }
    const res = await requestItem(library.provider, account, itemId);
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
          <Modal.Header className="bg-dark text-white" closeButton={false}>
            <Modal.Title>Escrow Request Item</Modal.Title>
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
                    onClick={handleRequestItem}>
              {
                isLoading ? (
                    <>
                      Requesting
                      < Spinner animation="border"
                                variant="light"
                                size="sm"
                                className="ms-2"/>
                    </>
                ) : (
                    'Request Item'
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