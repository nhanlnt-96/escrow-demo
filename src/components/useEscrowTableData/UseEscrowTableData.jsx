import "./UseEscrowTableData.scss";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Container, Form, Spinner, Table } from "react-bootstrap";
import { useEthers } from "@usedapp/core";
import {
  approveRequest,
  confirmDelivery,
  getItems,
  getRequested,
} from "../../utils/escrow";
import { toEther } from "../../utils/utils";
import ToastNotification from "../toastNotification/ToastNotification";
import { EscrowDataItemModal } from "./components/EscrowDataItemModal";
import UseEscrowPanel from "../useEscrowPanel/UseEscrowPanel";
import { UseEscrowTableRow } from "./components/UseEscrowTableRow";

export const statusLabel = [
  { status: "warning", label: "OPEN" },
  { status: "info", label: "PENDING" },
  { status: "primary", label: "DELIVERY" },
  { status: "success", label: "CONFIRMED" },
  { status: "secondary", label: "DISPUTTED" },
  { status: "success", label: "REFUNDED" },
  { status: "success", label: "WITHDRAWED" },
];

const UseEscrowTableData = () => {
  const { account, library } = useEthers();

  const [myItems, setMyItems] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [notiMsg, setNotiMsg] = useState({
    title: "",
    content: "",
  });
  const [showDataItemModal, setShowDataItemModal] = useState(false);
  const isLoadingInitialState = { status: false, itemId: null, type: null };
  const [isLoading, setIsLoading] = useState(isLoadingInitialState);

  const handleApproveRequest = async (itemIdInput) => {
    setIsLoading({ itemId: itemIdInput, status: true });
    if (receiver === "") {
      setNotiMsg({
        title: "Error",
        content: "Fill the fields",
      });
      setReceiver("");
      setIsLoading(isLoadingInitialState);
      return;
    }

    const itemId = parseInt(itemIdInput);
    const requested = await getRequested(receiver, itemId);
    if (!requested) {
      setNotiMsg({
        title: "Error",
        content: "Item not requested.",
      });
      setReceiver("");
      setIsLoading(isLoadingInitialState);
      return;
    }
    const res = await approveRequest(
      library.provider,
      account,
      itemId,
      receiver
    );
    setNotiMsg({
      title: "",
      content: res.message ? res.message : res,
    });
    setReceiver("");
    setIsLoading(isLoadingInitialState);
  };

  const handleConfirmDelivery = async (flag, itemIdInput) => {
    setIsLoading({
      status: true,
      itemId: itemIdInput,
      type: flag ? "confirm" : "dispute",
    });
    const res = await confirmDelivery(
      library.provider,
      account,
      parseInt(itemIdInput),
      flag
    );
    setNotiMsg({
      title: "",
      content: res.message ? res.message : res,
    });
    setIsLoading(isLoadingInitialState);
  };

  useEffect(() => {
    if (!account) return;
    const func = async () => {
      const res = await getItems(account);
      let items = [];
      res.forEach((item) => {
        if (item.owner === account) {
          items.push(item);
        }
      });
      setMyItems(items);
    };

    func();
  }, [account]);

  return (
    <Container fluid="xxl">
      <UseEscrowPanel />
      <Table responsive className="use-escrow-table___container">
        <thead className="use-escrow-table___head">
          <tr>
            <th>Purpose</th>
            <th>Amount</th>
            {/*<th>Owner</th>*/}
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="use-escrow-table___body">
          {account ? (
            myItems.map((val, index) => (
              <UseEscrowTableRow
                data={val}
                library={library}
                account={account}
                index={index}
                key={index}
              />
            ))
          ) : (
            <td
              colSpan={6}
              className="text-center fst-italic use-escrow-table__body__item"
            >
              No data.
            </td>
          )}
        </tbody>
      </Table>
      <ToastNotification
        errorMsg={notiMsg.content}
        setErrMsg={setNotiMsg}
        titleNoti={notiMsg.title}
      />
    </Container>
  );
};

export default UseEscrowTableData;
