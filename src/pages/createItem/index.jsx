import React, { useMemo, useState } from "react";
import { useEthers } from "@usedapp/core";
import { createItem, useWindowSize } from "utils";
import ToastNotification from "components/toastComp";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonComp from "components/buttonComp";
import SectionBannerImageDefault from "../../assets/images/section-header.png";
import ArrowRightIcon from "../../assets/icons/arrow-right.png";
import { Parallax } from "react-parallax";

const CreateItem = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [purposeInput, setPurposeInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [notiMsg, setNotiMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentWidth = useWindowSize();
  const currentPath = useMemo(() => {
    return pathname?.replace("/", "").split("/");
  }, [pathname]);

  const { account, library } = useEthers();

  const onCapitalizeHandler = (word) => {
    return word
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ");
  };

  const handleCreateItem = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const value = parseFloat(valueInput);
    if (purposeInput === "" || value === 0 || isNaN(value)) {
      setIsLoading(false);
      setNotiMsg("Fill the fields");
      return;
    }
    if (value < 0.001) {
      setNotiMsg("Value should be more than 0.001");
      setIsLoading(false);
      return;
    }
    const res = await createItem(
      library.provider,
      account,
      purposeInput,
      value
    );
    if (JSON.stringify(res).toLowerCase() === '"success"') {
      setNotiMsg(res);
      setPurposeInput("");
      setValueInput("");
      setInterval(() => {
        navigate("/");
      }, 3000);
      clearInterval();
    } else {
      setNotiMsg("Failed. Try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="create-items">
      <Parallax
        bgImage={currentWidth >= 768 ? SectionBannerImageDefault : ""}
        className="w-full h-40 md:h-80 xl:h-480px section-banner__parallax"
      >
        <div className="w-full h-full container mx-auto flex flex-col justify-center items-center md:items-start text-white px-3 xl:px-0">
          <h6 className="font-bold text-2xl md:text-5xl xl:text-6xl">
            Create Item
          </h6>
          <p className="text-lg flex justify-start items-center mt-2.5">
            Home
            {pathname !== "/" &&
              currentPath.map((path, index) => (
                <React.Fragment key={index}>
                  <img
                    src={ArrowRightIcon}
                    alt="arrow-right-icon"
                    className="mx-2"
                  />
                  <span className="after:content-['*']">
                    {onCapitalizeHandler(path.replace("-", " "))}
                  </span>
                </React.Fragment>
              ))}
          </p>
        </div>
      </Parallax>
      {/*<div className="container px-3 xl:px-0 mx-auto">*/}
      <div className="container px-3 xl:px-0 mx-auto">
        <div className="bg-violet-light rounded-3xl p-3 md:p-8 relative md:-top-100px">
          <h3 className="mb-8 font-bold text-2xl md:text-3xl text-center text-white">
            Create New Item
          </h3>
          <form className="space-y-6 flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full lg:w-6/12 flex flex-col justify-center items-center lg:items-start">
                <label htmlFor="purpose" className="text-white text-lg mb-1">
                  Purpose
                </label>
                <input
                  onChange={(e) => setPurposeInput(e.target.value)}
                  type="text"
                  id="purpose"
                  className="border outline-none py-2.5 px-5 bg-violet-input-bg rounded-10px border-violet-input-border w-full text-white"
                />
              </div>
              <div className="w-full lg:w-6/12 flex flex-col justify-center items-center lg:items-start my-4">
                <label htmlFor="value" className="text-white text-lg mb-1">
                  Value
                </label>
                <input
                  onChange={(e) => setValueInput(e.target.value)}
                  type="text"
                  id="value"
                  className="border outline-none py-2.5 px-5 bg-violet-input-bg rounded-10px border-violet-input-border w-full text-white"
                />
              </div>
              <ButtonComp
                label={"Create Item"}
                isPrimary={true}
                isDisabled={isLoading || !purposeInput || !valueInput}
                btnAction={handleCreateItem}
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

export default CreateItem;
