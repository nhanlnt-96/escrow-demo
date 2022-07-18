import React from "react";
import {Route, Routes} from "react-router-dom";
import {routes} from "configs";
import HeaderComp from "../components/headerComp";

const MainLayout = () => {
  return (
    <div className="w-screen h-screen">
      <HeaderComp/>
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
  );
};

export default MainLayout;
