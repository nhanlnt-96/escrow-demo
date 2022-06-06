import './UseEscrowTableData.scss';
import React, {Fragment, useEffect, useState} from 'react';
import {Button, Form, Table} from 'react-bootstrap';
import {useEthers} from '@usedapp/core';
import {
  approveRequest,
  confirmDelivery,
  getItems,
  getRequested,
} from '../../utils/escrow';
import {toEther} from '../../utils/utils';
import ToastNotification from '../toastNotification/ToastNotification';
import {EscrowDataItemModal} from './components/EscrowDataItemModal';

export const statusLabel = [
  'OPEN',
  'PENDING',
  'DELIVERY',
  'CONFIRMED',
  'DISPUTTED',
  'REFUNDED',
  'WITHDRAWED',
];

const UseEscrowTableData = () => {
  const {
    account,
    library,
  } = useEthers();

  const [myItems, setMyItems] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [notiMsg, setNotiMsg] = useState({
    title: '',
    content: '',
  });
  const [showDataItemModal, setShowDataItemModal] = useState(false);

  const handleApproveRequest = async (itemIdInput) => {
    if (receiver === '') {
      setNotiMsg({
        title: 'Error',
        content: 'Fill the fields',
      });
      return;
    }

    const itemId = parseInt(itemIdInput);
    const requested = await getRequested(receiver, itemId);
    if (!requested) {
      setNotiMsg({
        title: 'Error',
        content: 'Item not requested.',
      });
      return;
    }
    const res = await approveRequest(
        library.provider,
        account,
        itemId,
        receiver,
    );
    setNotiMsg({
      title: '',
      content: res.message ? res.message : res,
    });
  };

  const handleConfirmDelivery = async (flag, itemIdInput) => {
    const res = await confirmDelivery(library.provider, account,
        parseInt(itemIdInput), flag);
    setNotiMsg({
      title: '',
      content: res,
    });
  };

  useEffect(() => {
    if (!account) return;
    const func = async () => {
      const res = await getItems(account);
      let items = [];
      res.forEach(item => {
        if (item.owner === account) {
          items.push(item);
        }
      });
      setMyItems(items);
    };

    func();
  }, [account]);

  return (
      <div>
        <h2 className="h2 text-center my-4">My Data</h2>
        <Table responsive className="use-escrow-table___container">
          <thead className="use-escrow-table___head">
          <tr>
            <th>ID</th>
            <th>Purpose</th>
            <th>Amount</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody className="use-escrow-table___body">
          {
            account ? myItems.map((val, index) => {
              const {
                itemId,
                purpose,
                amount,
                owner,
                status,
                provided,
              } = val;
              return (
                  <Fragment key={index}>
                    <tr className="use-escrow-table__body__row">
                      <td className="use-escrow-table__body__item">{itemId}</td>
                      <td className="use-escrow-table__body__item item-hover"
                          onClick={() => setShowDataItemModal(
                              true)}>{purpose}</td>
                      <td className="use-escrow-table__body__item">{toEther(
                          amount)}</td>
                      <td className="use-escrow-table__body__item">{owner}</td>
                      <td className="use-escrow-table__body__item">{statusLabel[status]}</td>
                      <td className="use-escrow-table__body__item">
                        {
                          status === '0' ? (
                              <>
                                <Form.Control type="text"
                                              placeholder="Provider Address"
                                              className="mb-2"
                                              onChange={(e) => setReceiver(
                                                  e.target.value)}/>
                                <Button variant="primary"
                                        onClick={() => handleApproveRequest(
                                            itemId)}>Approve
                                  Request</Button>
                              </>
                          ) : status === '2' && provided ? (
                              <div>
                                <Button variant="primary"
                                        onClick={() => handleConfirmDelivery(
                                            true, itemId)}>Confirm
                                  Delivery</Button>
                                <Button variant="secondary" className="ms-2"
                                        onClick={() => handleConfirmDelivery(
                                            false, itemId)}>Dispute</Button>
                              </div>
                          ) : ''
                        }
                      </td>
                    </tr>
                    <EscrowDataItemModal data={val}
                                         show={showDataItemModal}
                                         setShow={setShowDataItemModal}/>
                  </Fragment>
              );
            }) : (
                <td colSpan={6}
                    className="text-center fst-italic use-escrow-table__body__item">No
                  data.</td>
            )
          }
          </tbody>
        </Table>
        <ToastNotification errorMsg={notiMsg.content}
                           setErrMsg={setNotiMsg}
                           titleNoti={notiMsg.title}/>
      </div>
  );
};

export default UseEscrowTableData;