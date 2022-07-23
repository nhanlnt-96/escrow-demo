import "./CurrencyList.scss";
import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import {
  approveRequest,
  confirmDelivery,
  getItems,
  getRequested,
  toEther,
} from "utils";
import { currencyListTableHead } from "configs";
import BtcIcon from "assets/images/btc.svg";
import EthIcon from "assets/images/eth.svg";
import ButtonComp from "../buttonComp";
import { Pagination } from "../pagination";

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
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(0);
  const [receiverInput, setReceiverInput] = useState("");
  const { library, account } = useEthers();
  const [myItems, setMyItems] = useState([]);
  const [isGetMyItemsLoading, setIsGetMyItemsLoading] = useState(false);

  useEffect(() => {
    if (!account) {
      setMyItems([]);
    } else {
      (async () => {
        setIsGetMyItemsLoading(true);
        const res = await getItems(account);
        let items = [];
        if (res.length) {
          res.forEach((item) => {
            if (item.owner === account) {
              items.push(item);
            }
          });
          setMyItems(items);
          setIsGetMyItemsLoading(false);
        } else {
          setIsGetMyItemsLoading(false);
        }
      })();
    }
  }, [account]);

  const handleApproveRequest = async (id) => {
    if (receiverInput === "") {
      window.alert("Fill the fields");
      return;
    }
    const itemId = parseInt(id);
    const requested = await getRequested(receiverInput, itemId);
    if (!requested) {
      window.alert("Item not requested.");
      return;
    }
    const res = await approveRequest(
      library.provider,
      account,
      itemId,
      receiverInput
    );
    window.alert(res);
  };
  const handleConfirmDelivery = async (flag, itemId) => {
    const res = await confirmDelivery(
      library.provider,
      account,
      parseInt(itemId),
      flag
    );
    window.alert(res);
  };

  return (
    <>
      <div className="overflow-x-auto currency-list">
        <p className="text-left 2xl:text-right text-white mb-3.5 text-lg">
          Total items: {myItems.length}
        </p>
        <table className="w-350% sm:w-255% md:w-210% lg:w-155% xl:w-120% 2xl:w-full align-top border-collapse currency-list__table">
          <thead className="align-bottom">
            <tr>
              {currencyListTableHead.map((val, index) => (
                <th key={index}>
                  <p>{val}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isGetMyItemsLoading ? (
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
            ) : myItems.length ? (
              myItems.map(
                (item, index) =>
                  index < ITEM_PER_PAGE * currentPage &&
                  index >= ITEM_PER_PAGE * previousPage && (
                    <tr key={index}>
                      <th>{item.itemId}</th>
                      {/*<-- start for example -->*/}
                      <td>
                        <img src={BtcIcon} alt="btc-icon" className="mr-1.5" />
                        <span>BTC</span>
                      </td>
                      <td>
                        <img src={EthIcon} alt="btc-icon" className="mr-1.5" />
                        <span>ETH</span>
                      </td>
                      {/*<-- end for example -->*/}
                      <td>{item.purpose}</td>
                      <td>{toEther(item.amount)}</td>
                      <td>{status[item.status]}</td>
                      <td>
                        <ButtonComp label={"Buy"} />
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
      {myItems.length && (
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setPreviousPage={setPreviousPage}
          setTotalPage={setTotalPage}
          data={myItems}
          itemPerPage={ITEM_PER_PAGE}
        />
      )}
    </>
  );
};

export default CurrencyList;
