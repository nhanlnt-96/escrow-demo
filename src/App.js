import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/styles.scss";

import React from "react";
import MainLayout from "./layouts/MainLayout";
import Escrow from "./pages/Escrow";


function App() {
  return (
    <MainLayout>
      <Escrow/>
    </MainLayout>
  );
}

export default App;
