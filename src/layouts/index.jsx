import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "configs";
import HeaderComp from "components/headerComp";
import { useEthers } from "@usedapp/core";

const MainLayout = () => {
  const { account, chainId } = useEthers();

  const renderComponentHandler = (isPrivate, module) => {
    if (isPrivate) {
      return account && chainId === 80001 ? module : <Navigate to="/" />;
    }
    return module;
  };
  return (
    <div className="min-h-screen w-screen bg-violet overflow-hidden">
      <HeaderComp />
      <div className="pt-16">
        <Routes>
          {routes.map((val, index) => (
            <Route
              key={index}
              path={val.path}
              element={renderComponentHandler(val.isPrivate, val.module)}
              exact={val.isExact}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
