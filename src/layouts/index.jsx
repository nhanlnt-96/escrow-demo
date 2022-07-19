import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "configs";
import HeaderComp from "../components/headerComp";
import ChooseCurrencyPopup from "../components/chooseCurrencyPopup";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-screen bg-violet overflow-hidden">
      <HeaderComp />
      <div className="pt-16">
        <Routes>
          {routes.map((val, index) => (
            <Route
              key={index}
              path={val.path}
              element={val.module}
              exact={val.isExact}
            />
          ))}
        </Routes>
      </div>
      <ChooseCurrencyPopup />
    </div>
  );
};

export default MainLayout;
