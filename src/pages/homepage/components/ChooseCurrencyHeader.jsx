import React, { useContext } from "react";
import { cryptoCurrencyList } from "configs";
import ButtonComp from "../../../components/buttonComp";
import { DropdownComp } from "./DropdownComp";
import { HomepageContext } from "pages/homepage";
import { useWindowSize } from "utils";

const arrowUpDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-down-up"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
    />
  </svg>
);

const arrowLeftRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-left-right"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
    />
  </svg>
);
export const ChooseCurrencyHeader = () => {
  const {
    onSwapCurrencyBtnClick,
    onChooseCurrencyBtnClick,
    fromCryptoValue,
    setFromCryptoValue,
    toCryptoValue,
    setToCryptoValue,
  } = useContext(HomepageContext);
  const currentWidth = useWindowSize();

  return (
    <div className="bg-violet-light rounded-3xl p-3 md:p-8 relative md:-top-100px">
      <h3 className="mb-8 font-bold text-2xl md:text-3xl text-center text-white">
        Choosing pair of crypto
      </h3>
      <form className="space-y-6 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col md:flex-row justify-center items-center">
          <div className="max-w-lg w-full">
            <DropdownComp
              label={"From"}
              data={cryptoCurrencyList.filter(
                (val) =>
                  val.name.trim().toLowerCase() !==
                  toCryptoValue?.name.toLowerCase()
              )}
              defaultIndex={0}
              value={fromCryptoValue}
              setValue={setFromCryptoValue}
            />
          </div>
          <div className="my-6 md:my-0 md:mx-3 flex justify-end items-center">
            <button
              type="button"
              disabled={!fromCryptoValue || !toCryptoValue}
              onClick={onSwapCurrencyBtnClick}
              className={`text-white border border-white focus:ring-0 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center flex justify-center items-center ${
                fromCryptoValue && toCryptoValue
                  ? "hover:bg-violet-hover-alt-color text-white"
                  : "cursor-not-allowed"
              }`}
            >
              {currentWidth >= 768 ? arrowLeftRight : arrowUpDown}
            </button>
          </div>
          <div className="max-w-lg w-full">
            <DropdownComp
              label={"To"}
              data={cryptoCurrencyList.filter(
                (val) =>
                  val.name.trim().toLowerCase() !==
                  fromCryptoValue?.name.toLowerCase()
              )}
              defaultIndex={1}
              value={toCryptoValue}
              setValue={setToCryptoValue}
            />
          </div>
        </div>
        <ButtonComp
          label={"Choose"}
          btnAction={(e) => onChooseCurrencyBtnClick(e, false)}
          isDisabled={!fromCryptoValue || !toCryptoValue}
          isPrimary={true}
        />
      </form>
    </div>
  );
};
