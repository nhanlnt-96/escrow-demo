import React, { useState } from "react";
import SectionBanner from "components/sectionBanner";
import ButtonComp from "components/buttonComp";
import ToastNotification from "components/toastComp";
import { useEthers } from "@usedapp/core";
import { withdrawFund } from "utils";

const OwnerPannelWithdrawFund = () => {
  const { account, library } = useEthers();
  const [toInput, setToInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [notiMsg, setNotiMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdrawFund = async () => {
    setIsLoading(true);
    if (
        toInput === "" ||
        isNaN(parseFloat(amountInput)) ||
        parseFloat(amountInput) === 0
    ) {
      setNotiMsg("Input Correctly");
      setIsLoading(false);
      return;
    }

    const res = await withdrawFund(
        library.provider,
        account,
        toInput,
        amountInput
    );
    if (JSON.stringify(res).toLowerCase() === '"success"') {
      setAmountInput("");
      setToInput("");
      setNotiMsg(res);
    } else {
      setNotiMsg("Failed. Try again.");
    }
    setIsLoading(false);
  };

  return (
      <div className="refund-item">
        <SectionBanner title={"Owner Pannel - Withdraw Fund"} />
        <div className="container px-3 xl:px-0 mx-auto">
          <div className="bg-violet-light rounded-3xl p-3 md:p-8 relative md:-top-100px">
            <h3 className="mb-8 font-bold text-2xl md:text-3xl text-center text-white">
              Withdraw Fund
            </h3>
            <form className="space-y-6 flex flex-col justify-center items-center">
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full lg:w-6/12 flex flex-col justify-center items-center lg:items-start my-4">
                  <label htmlFor="to" className="text-white text-lg mb-1">
                    To
                  </label>
                  <input
                      value={toInput}
                      onChange={(e) => setToInput(e.target.value)}
                      type="text"
                      id="to"
                      className="border outline-none py-2.5 px-5 bg-violet-input-bg rounded-10px border-violet-input-border w-full text-white"
                  />
                </div>
                <div className="w-full lg:w-6/12 flex flex-col justify-center items-center lg:items-start my-4">
                  <label htmlFor="amount" className="text-white text-lg mb-1">
                    Amount
                  </label>
                  <input
                      value={toInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      type="text"
                      id="amount"
                      className="border outline-none py-2.5 px-5 bg-violet-input-bg rounded-10px border-violet-input-border w-full text-white"
                  />
                </div>
                <ButtonComp
                    label={"Withdraw Fund"}
                    isPrimary={true}
                    isDisabled={isLoading || !toInput}
                    btnAction={handleWithdrawFund}
                    isLoading={isLoading}
                />
              </div>
            </form>
          </div>
        </div>
        <ToastNotification
            errorMsg={notiMsg}
            toastFor={notiMsg.toLowerCase()}
            setErrorMsg={setNotiMsg}
        />
      </div>
  );
};

export default OwnerPannelWithdrawFund;
