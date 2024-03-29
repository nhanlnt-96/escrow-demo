import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DAppProvider } from "@usedapp/core";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";

ReactDOM.render(
  <DAppProvider config={{}}>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </DAppProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
