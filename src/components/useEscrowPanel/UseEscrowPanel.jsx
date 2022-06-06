import React, {useState, useEffect} from 'react';
import {
  EscrowCreateItemModal,
  EscrowPerformDeliveryModal,
  EscrowRequestItemModal, RefundItem, WithdrawFund,
} from './components';
import {Button} from 'react-bootstrap';
import {useEthers} from '@usedapp/core';
import {getEscAcc} from '../../utils/escrow';

const UseEscrowPanel = () => {
  const {
    account,
    chainId,
  } = useEthers();
  const [showCreateItemModal, setShowCreateItemModal] = useState(false);
  const [showRequestItemModal, setShowRequestItemModal] = useState(false);
  const [showPerformDeliveryModal, setShowPerformDeliveryModal] = useState(
      false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const [escAcc, setEscAcc] = useState('');

  useEffect(() => {
    const func = async () => {
      setEscAcc(await getEscAcc());
    };
    func();
  }, []);
  return (
      <>
        <div className="d-flex justify-content-end align-items-center mb-2">
          {
            account && chainId === 80001 ? (
                <>
                  <Button onClick={() => setShowCreateItemModal(true)}>Escrow
                    Create
                    Item</Button>
                  <Button className="ms-lg-2"
                          onClick={() => setShowRequestItemModal(true)}>Escrow
                    Request
                    Item</Button>
                  <Button className="ms-lg-2"
                          onClick={() => setShowPerformDeliveryModal(true)}>Escrow
                    Perform Delivery</Button>
                </>
            ) : (
                <></>
            )
          }
          {
            escAcc === account ? (
                <>
                  <Button className="ms-lg-2" variant="success"
                          onClick={() => setShowRefundModal(true)}>Refund
                    Item</Button>
                  <Button className="ms-lg-2" variant="success"
                          onClick={() => setShowWithdrawModal(true)}>Withdraw
                    Fund</Button>
                </>
            ) : (
                <></>
            )
          }
        </div>
        <EscrowCreateItemModal show={showCreateItemModal}
                               setShow={setShowCreateItemModal}/>
        <EscrowRequestItemModal show={showRequestItemModal}
                                setShow={setShowRequestItemModal}/>
        <EscrowPerformDeliveryModal show={showPerformDeliveryModal}
                                    setShow={setShowPerformDeliveryModal}/>
        <RefundItem show={showRefundModal} setShow={setShowRefundModal}/>
        <WithdrawFund show={showWithdrawModal} setShow={setShowWithdrawModal}/>
      </>
  );
};

export default UseEscrowPanel;