import "./Homepage.scss";
import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { getEscAcc } from "utils/escrow";
import SectionBanner from "components/sectionBanner";
import HomepageImage from "assets/images/section-header.png";

export default function Escrow() {
  const { account } = useEthers();
  const [escAcc, setEscAcc] = useState("");
  const [isShowChooseCurrencyModal, setIsShowCurrencyModal] = useState(true);

  useEffect(() => {
    const func = async () => {
      setEscAcc(await getEscAcc());
    };
    func();
  }, []);

  return (
    <div className="homepage">
      <SectionBanner image={HomepageImage} title={"Currency Bet"} />
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

      {/*<MyData />*/}
      {/*{isShowChooseCurrencyModal && (*/}
      {/*  <ChooseCurrencyPopup setIsVisible={setIsShowCurrencyModal} />*/}
      {/*)}*/}
    </div>
  );
}
