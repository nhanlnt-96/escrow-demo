import React, {useState} from "react";
import {DropdownComp} from "./components";
import {cryptoCurrencyList} from "configs";
import ButtonComp from "../buttonComp";

const ChooseCurrencyPopup = () => {
  const [fromCryptoValue, setFromCryptoValue] = useState(null);
  const [toCryptoValue, setToCryptoValue] = useState(null);
  const onSwapCurrencyBtnClick = () => {
    let flag = JSON.stringify(fromCryptoValue);
    setFromCryptoValue(toCryptoValue);
    setToCryptoValue(JSON.parse(flag));
  };
  const onChooseCryptoBtnClick = (e) => {
    e.preventDefault();
    console.log(`from: ${fromCryptoValue.symbol} - to: ${toCryptoValue.symbol}`);
  };
  return (
    <div className="overflow-y-auto bg-black-light overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full md:inset-0 h-modal md:h-full flex justify-center items-center">
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto flex justify-center items-center">
        <div className="relative bg-violet-light rounded-lg shadow text-white w-full">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-8 text-2xl text-center font-medium text-white">
              Choosing pair of crypto
            </h3>
            <form className="space-y-6" action="#">
              <div>
                <DropdownComp label={"From"}
                              data={cryptoCurrencyList.filter(val => val.name.trim().toLowerCase() !== toCryptoValue?.name.toLowerCase())}
                              defaultIndex={0}
                              value={fromCryptoValue}
                              setValue={setFromCryptoValue}/>
              </div>
              <div className="w-full flex justify-end items-center">
                <button type="button" disabled={!fromCryptoValue || !toCryptoValue} onClick={onSwapCurrencyBtnClick}
                        className={`text-white border border-white focus:ring-0 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center flex justify-center items-center ${(fromCryptoValue && toCryptoValue) ? "hover:bg-violet-hover-alt-color text-white" : "cursor-not-allowed"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg"
                       width="16"
                       height="16"
                       fill="currentColor"
                       className="bi bi-arrow-down-up"
                       viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                </button>
              </div>
              <div>
                <DropdownComp label={"To"}
                              data={cryptoCurrencyList.filter(val => val.name.trim().toLowerCase() !== fromCryptoValue?.name.toLowerCase())}
                              defaultIndex={1}
                              value={toCryptoValue}
                              setValue={setToCryptoValue}/>
              </div>
              <ButtonComp label={"Choose"}
                          btnAction={onChooseCryptoBtnClick}
                          isDisabled={!fromCryptoValue || !toCryptoValue}
                          isPrimary={true}/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseCurrencyPopup;
