import React, { useEffect, useState } from "react";
import EscrowInfo from "../components/EscrowInfo";
import MyData from "../components/MyData";
import UseEscrow from "../components/UseEscrow";
import { useEthers } from "@usedapp/core";
import Ownerpannel from "../components/Ownerpannel";
import { getEscAcc } from "utils/escrow";
import ChooseCurrencyPopup from "../components/chooseCurrencyPopup";

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
    <div className="Escrow">
      <div className="">

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

      {/*<MyData />*/}
      {isShowChooseCurrencyModal && (
        <ChooseCurrencyPopup setIsVisible={setIsShowCurrencyModal} />
      )}
    </div>
  );
}
