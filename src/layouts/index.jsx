import React from "react";
import {Route, Routes} from "react-router-dom";
import {routes} from "configs";
import HeaderComp from "../components/headerComp";

const MainLayout = () => {
  // TODO: change height of parent div
  return (
    <div className="w-screen h-screen relative">
      <HeaderComp/>
      <div className="mt-16">
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
      {/*<ChooseCurrencyPopup />*/}
    </div>
  );
};

export default MainLayout;
