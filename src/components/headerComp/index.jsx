import React, {useState} from "react";
import {routes} from "configs";
import {Link, useLocation} from "react-router-dom";
import {useScrollWindow} from "utils";
import {shortenAddress, useEthers} from "@usedapp/core";
import ToastNotification from "../toastComp";
import ButtonComp from "../buttonComp";

const HeaderComp = () => {
  const {pathname} = useLocation();
  const {
    account,
    chainId,
    deactivate,
    activateBrowserWallet
  } = useEthers();
  const COORDINATES_SCROLL = useScrollWindow();
  const [isShowHeaderMenu, setIsShowHeaderMenu] = useState(false);
  
  const handleConnect = () => {
    if (!account) {
      activateBrowserWallet();
    } else {
      deactivate();
    }
  };
  
  const onShowHeaderMenuBtnClick = () => {
    setIsShowHeaderMenu(!isShowHeaderMenu);
  };
  return (
    <>
      <nav
        className={`border-gray-200 px-2 sm:px-4 py-2.5 transition-all ease-in-out fixed top-0 left-0 w-full ${COORDINATES_SCROLL > 0 && "bg-violet text-white shadow-lg"}`}
      >
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Escrow
          </span>
          </a>
          <div className="flex md:order-2">
            <ButtonComp label={account ? shortenAddress(account) : "Connect Wallet"}
                        isPrimary={false}
                        btnAction={handleConnect}/>
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-0"
              onClick={onShowHeaderMenuBtnClick}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={`justify-between items-center w-full md:flex md:w-auto md:order-1 ${
              !isShowHeaderMenu && "hidden"
            }`}
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              {routes.map((val, index) => (
                <li key={index}>
                  <Link
                    to={val.path}
                    className={`block py-2 pr-4 pl-3 text-lg rounded md:bg-transparent md:p-0 ${
                      pathname === val.path &&
                      "bg-blue-700 text-white md:text-pink-head-alt"
                    }`}
                  >
                    {val.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      {
        chainId !== 80001 && (
          <ToastNotification errorMsg={"Wrong network. Please change your network."} isNotHide={true}/>
        )
      }
    </>
  );
};

export default HeaderComp;
