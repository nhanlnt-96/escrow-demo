import React, { useState } from "react";
import { routes } from "configs";
import { Link, useLocation } from "react-router-dom";
import { useScrollWindow } from "utils";
import { shortenAddress, useEthers } from "@usedapp/core";
import ToastNotification from "components/toastComp";
import ButtonComp from "components/buttonComp";
import { useSelector } from "react-redux";
import { getEscrowAccount } from "../../store/escrowAccount/selector";

const HeaderComp = () => {
  const escrowAccount = useSelector(getEscrowAccount);
  const { pathname } = useLocation();
  const { account, chainId, deactivate, activateBrowserWallet } = useEthers();
  const COORDINATES_SCROLL = useScrollWindow();
  const [isShowHeaderMenu, setIsShowHeaderMenu] = useState(false);
  const [expandNavbarMenu, setExpandNavbarMenu] = useState(null);

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

  const onExpandDropdownMenuBtnClick = (expandItem) => {
    if (expandNavbarMenu && expandNavbarMenu === expandItem) {
      setExpandNavbarMenu(null);
    } else {
      setExpandNavbarMenu(expandItem);
    }
  };

  return (
    <>
      <nav
        className={`border-gray-200 px-2 sm:px-4 py-2.5 transition-all ease-in-out fixed top-0 left-0 w-full text-white z-50 bg-violet-fixed-color ${
          COORDINATES_SCROLL > 0 && "bg-violet-fixed-color shadow-lg"
        }`}
      >
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Escrow
            </span>
          </a>
          <div className="flex xl:order-2">
            <ButtonComp
              label={account ? shortenAddress(account) : "Connect Wallet"}
              isPrimary={false}
              btnAction={handleConnect}
            />
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-0"
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
            className={`justify-between items-center w-full xl:flex xl:w-auto xl:order-1 ${
              !isShowHeaderMenu && "hidden"
            }`}
          >
            <ul className="flex flex-col mt-4 xl:flex-row xl:space-x-8 xl:mt-0 xl:text-sm xl:font-medium">
              {routes.map(
                (val, index) =>
                  ((val.isPrivate &&
                    (val.isExactUser
                      ? escrowAccount === account
                      : account && chainId === 80001)) ||
                    !val.isPrivate) && (
                    <React.Fragment key={index}>
                      {val.children.length ? (
                        <li
                          onClick={() => onExpandDropdownMenuBtnClick(val.path)}
                        >
                          <button
                            className={`py-2 pr-4 pl-3 w-full flex xl:justify-center items-center justify-start text-lg rounded xl:bg-transparent xl:p-0 hover:text-pink-head-alt ${
                              pathname.includes(val.path) &&
                              "bg-blue-700 text-white xl:text-pink-head-alt"
                            }`}
                          >
                            {val.label}
                            <svg
                              className="ml-1 w-4 h-4"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                          {expandNavbarMenu === val.path && (
                            <div className="absolute z-50 font-normal bg-violet-fixed-color rounded shadow">
                              <ul className="flex flex-col mt-4 xl:mt-0 space-y-2 xl:text-sm xl:font-medium p-4">
                                {val.children.map((child) => (
                                  <li
                                    key={child.path}
                                    onClick={() =>
                                      onExpandDropdownMenuBtnClick(val.path)
                                    }
                                  >
                                    <Link
                                      to={`${val.path}/${child.path}`}
                                      className={`block py-2 pr-4 pl-3 text-lg rounded xl:bg-transparent xl:p-0 hover:text-pink-head-alt ${
                                        pathname.includes(child.path) &&
                                        "bg-blue-700 text-white" +
                                          " xl:text-pink-head-alt"
                                      }`}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ) : (
                        <li
                          onClick={() => onExpandDropdownMenuBtnClick(val.path)}
                        >
                          <Link
                            to={val.path}
                            className={`block py-2 pr-4 pl-3 text-lg rounded xl:bg-transparent xl:p-0 hover:text-pink-head-alt ${
                              pathname === val.path &&
                              "bg-blue-700 text-white xl:text-pink-head-alt"
                            }`}
                          >
                            {val.label}
                          </Link>
                        </li>
                      )}
                    </React.Fragment>
                  )
              )}
            </ul>
          </div>
        </div>
      </nav>
      {chainId !== 80001 && (
        <ToastNotification
          errorMsg={"Wrong network. Please change your network."}
          isNotHide={true}
        />
      )}
    </>
  );
};

export default HeaderComp;
