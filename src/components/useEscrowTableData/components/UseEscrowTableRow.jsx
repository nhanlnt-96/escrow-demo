import { toEther } from "../../../utils/utils";
import { Badge, Button, Form, Spinner } from "react-bootstrap";
import { EscrowDataItemModal } from "./EscrowDataItemModal";
import React, { Fragment, useState } from "react";
import { statusLabel } from "../UseEscrowTableData";
import ToastNotification from "../../toastNotification/ToastNotification";
import {
  approveRequest,
  confirmDelivery,
  getRequested,
} from "../../../utils/escrow";

export const UseEscrowTableRow = ({ data, index, account, library }) => {
  const { itemId, purpose, amount, owner, status, provided } = data;

  const [receiver, setReceiver] = useState("");
  const [notiMsg, setNotiMsg] = useState({
    title: "",
    content: "",
  });
  const [showDataItemModal, setShowDataItemModal] = useState(false);
  const isLoadingInitialState = { status: false, itemId: null, type: null };
  const [isLoading, setIsLoading] = useState(isLoadingInitialState);
  const [isShowProviderAddressInput, setIsShowProviderAddressInput] =
    useState(false);

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

  return (
    <Fragment key={index}>
      <tr className="use-escrow-table__body__row">
        <td
          className="use-escrow-table__body__item item-hover"
          onClick={() => setShowDataItemModal(true)}
        >
          {purpose}
        </td>
        <td className="use-escrow-table__body__item">{toEther(amount)}</td>
        {/*<td className="use-escrow-table__body__item">{owner}</td>*/}
        <td className="use-escrow-table__body__item">
          <Badge bg={statusLabel?.[status].status}>
            {statusLabel?.[status].label}
          </Badge>
        </td>
        <td className="use-escrow-table__body__item">
          {status === "0" ? (
            <>
              {isShowProviderAddressInput && (
                <Form.Control
                  type="text"
                  placeholder="Provider Address"
                  className="mb-2"
                  onChange={(e) => setReceiver(e.target.value)}
                />
              )}
              <div>
                {isShowProviderAddressInput && (
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => setIsShowProviderAddressInput(false)}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  variant="primary"
                  disabled={isLoading.status && isLoading.itemId === itemId}
                  onClick={() => {
                    if (isShowProviderAddressInput) {
                      handleApproveRequest(itemId);
                    } else {
                      setIsShowProviderAddressInput(true);
                    }
                  }}
                >
                  {isLoading.status && isLoading.itemId === itemId ? (
                    <>
                      Approving Request
                      <Spinner
                        animation="border"
                        variant="light"
                        size="sm"
                        className="ms-2"
                      />
                    </>
                  ) : (
                    "Approve Request"
                  )}
                </Button>
              </div>
            </>
          ) : status === "2" && provided ? (
            <div>
              <Button
                variant="primary"
                disabled={
                  isLoading.status &&
                  isLoading.itemId === itemId &&
                  isLoading.type === "confirm"
                }
                onClick={() => handleConfirmDelivery(true, itemId)}
              >
                {isLoading.status &&
                isLoading.itemId === itemId &&
                isLoading.type === "confirm" ? (
                  <>
                    Confirming Delivery
                    <Spinner
                      animation="border"
                      variant="light"
                      size="sm"
                      className="ms-2"
                    />
                  </>
                ) : (
                  "Confirm Delivery"
                )}
              </Button>
              <Button
                variant="secondary"
                className="ms-2"
                disabled={
                  isLoading.status &&
                  isLoading.itemId === itemId &&
                  isLoading.type === "depute"
                }
                onClick={() => handleConfirmDelivery(false, itemId)}
              >
                Dispute
                {isLoading.status &&
                isLoading.itemId === itemId &&
                isLoading.type === "depute" ? (
                  <>
                    Disputing
                    <Spinner
                      animation="border"
                      variant="light"
                      size="sm"
                      className="ms-2"
                    />
                  </>
                ) : (
                  "Dispute"
                )}
              </Button>
            </div>
          ) : (
            ""
          )}
        </td>
      </tr>
      <EscrowDataItemModal
        data={data}
        show={showDataItemModal}
        setShow={setShowDataItemModal}
      />
      <ToastNotification
        errorMsg={notiMsg.content}
        setErrMsg={setNotiMsg}
        titleNoti={notiMsg.title}
      />
    </Fragment>
  );
};
