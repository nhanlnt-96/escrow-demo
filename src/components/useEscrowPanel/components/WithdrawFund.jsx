import {Button, Form, Modal, Spinner} from 'react-bootstrap';
import React, {useState} from 'react';
import {withdrawFund} from '../../../utils/escrow';
import {useEthers} from '@usedapp/core';
import ToastNotification from '../../toastNotification/ToastNotification';

export const WithdrawFund = ({
                               show,
                               setShow,
                             }) => {
  const {account, library} = useEthers();
  const [toReceiver, setToReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [notiMsg, setNotiMsg] = useState({
    title: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdrawFund = async () => {
    if (toReceiver === '' || isNaN(parseFloat(amount)) || parseFloat(amount) ===
        0) {
      setNotiMsg({
        title: 'Error',
        content: 'Input Correctly',
      });
      return;
    }

    const res = await withdrawFund(library.provider, account, toReceiver,
        amount);
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
            <Modal.Title>Withdraw Fund</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>To</Form.Label>
              <Form.Control type="text"
                            placeholder="To"
                            onChange={(e) => setToReceiver(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text"
                            placeholder="Amount"
                            onChange={(e) => setAmount(e.target.value)}/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"
                    disabled={isLoading}
                    onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary"
                    disabled={!toReceiver || !account || isLoading}
                    onClick={handleWithdrawFund}>
              {
                isLoading ? (
                    <>
                      Withdrawing
                      < Spinner animation="border"
                                variant="light"
                                size="sm"
                                className="ms-2"/>
                    </>
                ) : (
                    'Withdraw Fund'
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