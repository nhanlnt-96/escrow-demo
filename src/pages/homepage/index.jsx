import React, { createContext, useEffect, useState } from "react";
import CurrencyList from "components/currencyList";
import CreateItem from "pages/createItem";
import { useEthers } from "@usedapp/core";
import SectionBanner from "components/sectionBanner";

export const HomepageContext = createContext(null);

const Homepage = () => {
  const { account, chainId, library } = useEthers();
  const [isShowChooseCurrencyModal, setIsShowCurrencyModal] = useState(true);
  const [fromCryptoValue, setFromCryptoValue] = useState(null);
  const [toCryptoValue, setToCryptoValue] = useState(null);

  useEffect(() => {
    const isShowedChooseCurrencyModal = window.sessionStorage.getItem(
      "isShowedChooseCurrencyModal"
    );
    if (Boolean(isShowedChooseCurrencyModal)) {
      setIsShowCurrencyModal(false);
    } else {
      window.sessionStorage.setItem("isShowedChooseCurrencyModal", "true");
    }
  }, []);

  const onSwapCurrencyBtnClick = () => {
    let flag = JSON.stringify(fromCryptoValue);
    setFromCryptoValue(toCryptoValue);
    setToCryptoValue(JSON.parse(flag));
  };

  const onChooseCurrencyBtnClick = (e) => {
    e.preventDefault();
    console.log(
      `from: ${fromCryptoValue.symbol} - to: ${toCryptoValue.symbol}`
    );
    onCloseModalBtnClick();
  };

  const onCloseModalBtnClick = () => {
    setIsShowCurrencyModal(false);
  };

  return (
    <HomepageContext.Provider
      value={{
        onCloseModalBtnClick,
        onSwapCurrencyBtnClick,
        onChooseCurrencyBtnClick,
        fromCryptoValue,
        setFromCryptoValue,
        toCryptoValue,
        setToCryptoValue,
      }}
    >
      <div className="homepage pb-6">
        {/*<SectionBanner title={"Currency List"} />*/}
        {account && chainId === 80001 ? (
          <CreateItem />
        ) : (
          <SectionBanner title={"Currency List"} />
        )}
        <div className="container px-3 xl:px-0 mx-auto">
          {/*<ChooseCurrencyHeader />*/}
          {account && chainId === 80001 && (
            <div className="my-2.5 flex justify-center items-center">
              <h6 className="font-bold text-white text-2xl md:text-5xl xl:text-6xl">
                Currency List
              </h6>
            </div>
          )}
          <CurrencyList />
        </div>
      </div>
      {/*{isShowChooseCurrencyModal && <ChooseCurrencyPopup />}*/}
    </HomepageContext.Provider>
  );
};

export default Homepage;
