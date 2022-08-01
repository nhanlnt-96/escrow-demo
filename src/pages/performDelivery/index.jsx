import React, { useState } from "react";
import SectionBanner from "components/sectionBanner";
import ButtonComp from "components/buttonComp";
import ToastNotification from "components/toastComp";
import { getItem, performDelivery } from "utils";
import { useEthers } from "@usedapp/core";

const PerformDelivery = () => {
  const { account, library } = useEthers();
  const [itemIdInput, setItemIdInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notiMsg, setNotiMsg] = useState("");

  const handlePerformDelivery = async () => {
    setIsLoading(true);
    const itemId = parseInt(itemIdInput);
    if (isNaN(itemId)) {
      setNotiMsg("Input Correctly");
      setIsLoading(false);
      return;
    }

    const item = await getItem(itemId);
    if (item.provider !== account) {
      setNotiMsg("Service not awarded to you");
      setIsLoading(false);
      return;
    }
    if (item.provided) {
      setNotiMsg("Service already provided");
      setIsLoading(false);
      return;
    }
    if (item.confirmed) {
      setNotiMsg("Service already confirmed");
      setIsLoading(false);
      return;
    }

    const res = await performDelivery(library.provider, account, itemId);
    if (JSON.stringify(res).toLowerCase() === '"success"') {
      setNotiMsg(res);
      setItemIdInput("");
    } else {
      setNotiMsg("Failed. Try again.");
    }
    setIsLoading(false);
  };
  return (
    <div className="perform-delivery">
      <SectionBanner title={"Perform Delivery"} />
      <div className="container px-3 xl:px-0 mx-auto">
        <div className="bg-violet-light rounded-3xl p-3 md:p-8 relative md:-top-100px">
          <h3 className="mb-8 font-bold text-2xl md:text-3xl text-center text-white">
            Perform Delivery
          </h3>
          <form className="space-y-6 flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full lg:w-6/12 flex flex-col justify-center items-center lg:items-start my-4">
                <label htmlFor="itemId" className="text-white text-lg mb-1">
                  Item id
                </label>
                <input
                  value={itemIdInput}
                  onChange={(e) => setItemIdInput(e.target.value)}
                  type="text"
                  id="itemId"
                  className="border outline-none py-2.5 px-5 bg-violet-input-bg rounded-10px border-violet-input-border w-full text-white"
                />
              </div>
              <ButtonComp
                label={"Perform Delivery"}
                isPrimary={true}
                isDisabled={isLoading || !itemIdInput}
                btnAction={handlePerformDelivery}
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

export default PerformDelivery;
