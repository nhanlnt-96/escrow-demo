import React, {useEffect, useState} from 'react';
// import MyData from "../components/exampleCode/MyData";
// import UseEscrowExample from "../components/UseEscrow";
import {useEthers} from '@usedapp/core';
import Ownerpannel from '../components/Ownerpannel';
import {getEscAcc} from './../utils/escrow';
import UseEscrowTableData
  from '../components/useEscrowTableData/UseEscrowTableData';

export default function Escrow() {
  const {account} = useEthers();
  const [escAcc, setEscAcc] = useState('');

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
              </div>
              : ''
        }
        {/*<UseEscrowExample/>*/}
        <UseEscrowTableData/>
        {/*<MyData/>*/}
      </div>
  );
}
