import React, {useEffect, useState} from "react";
import MyData from "../components/MyData";
import UseEscrow from "../components/UseEscrow";
import {useEthers} from "@usedapp/core";
import Ownerpannel from "../components/Ownerpannel";
import {getEscAcc} from "./../utils/escrow";

export default function Escrow() {
  const {account} = useEthers();
  const [escAcc, setEscAcc] = useState("");
  
  useEffect(() => {
    const func = async () => {
      setEscAcc(await getEscAcc());
    };
    func();
  }, []);
  
  return (
    <div className="Escrow">
      {
        escAcc === account ?
          <div>
            <Ownerpannel/>
            <div className="line"></div>
          </div>
          : ""
      }
      <UseEscrow/>
      <MyData/>
    </div>
  );
}
