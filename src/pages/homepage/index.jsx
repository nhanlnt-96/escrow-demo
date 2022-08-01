import React, { createContext, useEffect, useState } from "react";
import { ChooseCurrencyHeader, ChooseCurrencyPopup } from "./components";
import SectionBanner from "components/sectionBanner";
import CurrencyList from "components/currencyList";

export const HomepageContext = createContext(null);

const Homepage = () => {
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
        <SectionBanner title={"Currency List"} />
        <div className="container px-3 xl:px-0 mx-auto">
          <ChooseCurrencyHeader />
          <CurrencyList />
        </div>
      </div>
      {isShowChooseCurrencyModal && <ChooseCurrencyPopup />}
    </HomepageContext.Provider>
  );
};

export default Homepage;
