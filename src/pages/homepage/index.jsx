import React, { createContext, useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { getEscAcc } from "utils/escrow";
import SectionBanner from "components/sectionBanner";
import HomepageImage from "assets/images/section-header.png";
import EscrowInfo from "components/EscrowInfo";
import Ownerpannel from "components/Ownerpannel";
import UseEscrow from "components/UseEscrow";
import MyData from "components/MyData";
import { ChooseCurrencyHeader, ChooseCurrencyPopup } from "./components";
import CurrencyList from "../../components/currencyList";

export const HomepageContext = createContext(null);

const Homepage = () => {
  const { account } = useEthers();
  const [escAcc, setEscAcc] = useState("");
  const [isShowChooseCurrencyModal, setIsShowCurrencyModal] = useState(true);
  const [fromCryptoValue, setFromCryptoValue] = useState(null);
  const [toCryptoValue, setToCryptoValue] = useState(null);

  useEffect(() => {
    const func = async () => {
      setEscAcc(await getEscAcc());
    };
    func();
  }, []);

  const onSwapCurrencyBtnClick = () => {
    let flag = JSON.stringify(fromCryptoValue);
    setFromCryptoValue(toCryptoValue);
    setToCryptoValue(JSON.parse(flag));
  };

  const onChooseCurrencyBtnClick = (e, isModal = true) => {
    e.preventDefault();
    console.log(
      `from: ${fromCryptoValue.symbol} - to: ${toCryptoValue.symbol}`
    );
    if (isModal) {
      onCloseModalBtnClick();
    }
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
        <SectionBanner image={HomepageImage} title={"Currency List"} />
        <div className="container px-3 xl:px-0 mx-auto">
          <ChooseCurrencyHeader />
          <CurrencyList />
        </div>
      </div>
      {/*<EscrowInfo />*/}
      {/*<div className="line"></div>*/}

      {/*{escAcc === account ? (*/}
      {/*  <div>*/}
      {/*    <Ownerpannel />*/}
      {/*    <div className="line"></div>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  ""*/}
      {/*)}*/}

      {/*<UseEscrow />*/}
      {/*<div className="line"></div>*/}

      {isShowChooseCurrencyModal && <ChooseCurrencyPopup />}
    </HomepageContext.Provider>
  );
};

export default Homepage;
