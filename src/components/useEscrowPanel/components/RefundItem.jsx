import {Button, Form, Modal, Spinner} from 'react-bootstrap';
import React, {useState} from 'react';
import {refundItem} from '../../../utils/escrow';
import {useEthers} from '@usedapp/core';
import ToastNotification from '../../toastNotification/ToastNotification';

export const RefundItem = ({
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

  const handleRefundItem = async () => {
    setIsLoading(true);
    const itemIdAfterParse = parseInt(itemId);
    if (isNaN(itemIdAfterParse)) {
      setNotiMsg({
        title: 'Error',
        content: 'Input Correctly',
      });
      return;
    }

    const res = await refundItem(library.provider, account, itemIdAfterParse);
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
            <Modal.Title>Refund Item</Modal.Title>
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
                    onClick={handleRefundItem}>
              {
                isLoading ? (
                    <>
                      Refunding
                      < Spinner animation="border"
                                variant="light"
                                size="sm"
                                className="ms-2"/>
                    </>
                ) : (
                    'Refund Item'
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