import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "configs";
import HeaderComp from "components/headerComp";
import { useEthers } from "@usedapp/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchEscrowAccount } from "store/escrowAccount/fetchEscrowAccount";
import { getEscrowAccount } from "store/escrowAccount/selector";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { account, chainId } = useEthers();
  const escrowAccount = useSelector(getEscrowAccount);

  useEffect(() => {
    dispatch(fetchEscrowAccount());
  }, [account]);

  const renderComponentHandler = (isPrivate, module, isExactUser) => {
    if (isPrivate) {
      if (isExactUser) {
        return escrowAccount === account ? module : <Navigate to="/" />;
      } else {
        return account && chainId === 80001 ? module : <Navigate to="/" />;
      }
    }
    return module;
  };
  return (
    <div className="min-h-screen w-screen bg-violet overflow-hidden">
      <HeaderComp />
      <div className="pt-16">
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={renderComponentHandler(
                route.isPrivate,
                route.module,
                route.isExactUser
              )}
              exact={route.isExact}
            >
              {route.children.length
                ? route.children.map((child, index) => (
                    <Route
                      key={index}
                      path={`${route.path}/${child.path}`}
                      element={child.module}
                    />
                  ))
                : ""}
            </Route>
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
