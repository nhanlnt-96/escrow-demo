import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "configs";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Routes>
        {routes.map((val, index) => (
          <Route path={val.path} element={val.module} exact={val.isExact} />
        ))}
      </Routes>
    </>
  );
};

export default MainLayout;
