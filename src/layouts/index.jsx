import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "configs";
import Header from "../components/Header";
import HeaderComp from "../components/headerComp";

const MainLayout = () => {
  return (
    <>
      <HeaderComp />
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
    </>
  );
};

export default MainLayout;
