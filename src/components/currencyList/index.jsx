import "./CurrencyList.scss";
import React, { useState, useMemo, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { approveRequest, confirmDelivery, getRequested, toEther } from "utils";
import { currencyListTableHead } from "configs";
import BtcIcon from "assets/images/btc.svg";
import EthIcon from "assets/images/eth.svg";
import { Pagination } from "../pagination";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyListHeader } from "./components";
import ToastNotification from "components/toastComp";
import { getEscrowItems, getEscrowItemsPending } from "store/account/selector";
import { fetchEscrowItems } from "store/account/fetchEscrowItems";

const status = [
  "OPEN",
  "PENDING",
  "DELIVERY",
  "CONFIRMED",
  "DISPUTTED",
  "REFUNDED",
  "WITHDRAWED",
];

const CurrencyList = () => {
  const ITEM_PER_PAGE = 10;
  const dispatch = useDispatch();
  const { library, account } = useEthers();
  const escrowItemsPending = useSelector(getEscrowItemsPending);
  const escrowItems = useSelector(getEscrowItems);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(0);
  const [receiverInput, setReceiverInput] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [notiMsg, setNotiMsg] = useState("");
  const [approvingAccount, setApprovingAccount] = useState(null);
  const [confirmingAccount, setConfirmingAccount] = useState(null);
  const [disputingAccount, setDisputingAccount] = useState(null);
  const filteredEscrowItems = useMemo(
    () =>
      filterBy
        ? escrowItems.filter((item) => status[item.status] === filterBy)
        : escrowItems,
    [escrowItems, filterBy]
  );

  useEffect(() => {
    dispatch(fetchEscrowItems(account));
  }, [account]);

  const handleApproveRequest = async (idOfItem) => {
    setApprovingAccount(idOfItem);
    if (receiverInput === "") {
      setNotiMsg("Fill the fields");
      setApprovingAccount(null);
      return;
    }
    const itemId = parseInt(idOfItem);
    const requested = await getRequested(receiverInput, itemId);
    if (!requested) {
      setNotiMsg("Item not requested.");
      setApprovingAccount(null);
      return;
    }
    const res = await approveRequest(
      library.provider,
      account,
      itemId,
      receiverInput
    );
    if (JSON.stringify(res).toLowerCase() === '"success"') {
      setNotiMsg(res);
      setReceiverInput("");
      dispatch(fetchEscrowItems(account));
    } else {
      setNotiMsg("Failed. Try again.");
      setReceiverInput("");
    }
    setApprovingAccount(null);
  };
  const handleConfirmDelivery = async (flag, itemId) => {
    if (flag) {
      setConfirmingAccount(itemId);
    } else {
      setDisputingAccount(itemId);
    }
    const res = await confirmDelivery(
      library.provider,
      account,
      parseInt(itemId),
      flag
    );
    if (JSON.stringify(res).toLowerCase() === '"success"') {
      setNotiMsg(res);
      setReceiverInput("");
      dispatch(fetchEscrowItems(account));
    } else {
      setNotiMsg("Failed. Try again.");
    }
    setConfirmingAccount(null);
    setDisputingAccount(null);
  };

  return (
    <>
      <div className="currency-list">
        <CurrencyListHeader
          status={status}
          isFilterBy={filterBy}
          setIsFilterBy={setFilterBy}
          totalItem={filteredEscrowItems.length}
        />
        <div className="overflow-x-auto">
          <table className="w-350% sm:w-255% md:w-210% lg:w-155% xl:w-120% 2xl:w-full align-top border-collapse currency-list__table">
            <thead className="align-bottom">
              <tr>
                {currencyListTableHead.map((val, index) => (
                  <th
                    key={index}
                    className={val.toLowerCase() === "purpose" ? "w-300px" : ""}
                  >
                    <p>{val}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {escrowItemsPending ? (
                <tr>
                  <td colSpan={currencyListTableHead.length}>
                    <div
                      role="status"
                      className="w-full flex justify-center items-center"
                    >
                      <svg
                        aria-hidden="true"
                        className="mr-2 w-8 h-8 text-gray-200 animate-spin"
                        viewBox="0 0 100 101"
                        fill="#571ce0"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span>Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredEscrowItems.length ? (
                filteredEscrowItems.map(
                  (item, index) =>
                    index < ITEM_PER_PAGE * currentPage &&
                    index >= ITEM_PER_PAGE * previousPage && (
                      <tr
                        key={index}
                        className="hover:bg-violet-light cursor-pointer transition-all"
                      >
                        <th>{item.itemId}</th>
                        {/*<-- start for example -->*/}
                        <td>
                          <img
                            src={BtcIcon}
                            alt="btc-icon"
                            className="mr-1.5"
                          />
                          <span>BTC</span>
                        </td>
                        <td>
                          <img
                            src={EthIcon}
                            alt="btc-icon"
                            className="mr-1.5"
                          />
                          <span>ETH</span>
                        </td>
                        {/*<-- end for example -->*/}
                        <td>
                          <p
                            title={item.purpose}
                            className="inline-block whitespace-nowrap overflow-hidden overflow-ellipsis w-300px"
                          >
                            {item.purpose}
                          </p>
                        </td>
                        <td>{toEther(item.amount)}</td>
                        <td>{status[item.status]}</td>
                        <td className="w-450px">
                          {item.status === "0" ? (
                            <div className="flex justify-center items-center w-full">
                              <input
                                onChange={(e) =>
                                  setReceiverInput(e.target.value)
                                }
                                type="text"
                                id="value"
                                placeholder="Provider address"
                                className="border outline-none py-2.5 px-5 bg-violet-input-bg rounded-10px border-violet-input-border w-full text-white mr-2"
                              />
                              <button
                                disabled={
                                  !receiverInput ||
                                  approvingAccount === item.itemId
                                }
                                className={`py-2.5 px-4 text-center transition-all border-violet-hover-color border rounded-3xl font-bold text-lg text-white capitalize bg-violet-hover-color w-3/12 ${
                                  !receiverInput ||
                                  approvingAccount === item.itemId
                                    ? "cursor-not-allowed"
                                    : "hover:bg-violet-hover-alt-color"
                                }`}
                                onClick={() =>
                                  handleApproveRequest(item.itemId)
                                }
                              >
                                {approvingAccount === item.itemId
                                  ? "Loading"
                                  : "Approve"}
                              </button>
                            </div>
                          ) : item.status === "2" && item.provided ? (
                            <div className="flex justify-center items-center">
                              <button
                                disabled={confirmingAccount === item.itemId}
                                className={`py-2.5 px-5 text-center transition-all border-violet-hover-color border rounded-3xl w-full font-bold text-lg text-white capitalize bg-violet-hover-color w-full mr-2 ${
                                  confirmingAccount === item.itemId
                                    ? "cursor-not-allowed"
                                    : "hover:bg-violet-hover-alt-color"
                                }`}
                                onClick={() =>
                                  handleConfirmDelivery(true, item.itemId)
                                }
                              >
                                {confirmingAccount === item.itemId
                                  ? "Loading"
                                  : "Confirm"}
                              </button>
                              <button
                                disabled={disputingAccount === item.itemId}
                                className={`py-2.5 px-5 text-center transition-all border-violet-hover-color border rounded-3xl w-full font-bold text-lg text-white capitalize bg-violet-hover-alt-color w-full ${
                                  disputingAccount === item.itemId
                                    ? "cursor-not-allowed"
                                    : "hover:bg-violet-hover-color"
                                }`}
                                onClick={() =>
                                  handleConfirmDelivery(false, item.itemId)
                                }
                              >
                                {disputingAccount === item.itemId
                                  ? "Loading"
                                  : "Dispute"}
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    )
                )
              ) : (
                <tr>
                  <td colSpan={currencyListTableHead.length}>
                    <p className="text-white text-center">No data</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {filteredEscrowItems.length ? (
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setPreviousPage={setPreviousPage}
          setTotalPage={setTotalPage}
          data={filteredEscrowItems}
          itemPerPage={ITEM_PER_PAGE}
        />
      ) : (
        ""
      )}
      <ToastNotification
        errorMsg={notiMsg}
        toastFor={notiMsg.toLowerCase()}
        setErrorMsg={setNotiMsg}
      />
    </>
  );
};

export default CurrencyList;
