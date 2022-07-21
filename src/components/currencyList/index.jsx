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
            {myItems.length ? (
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
