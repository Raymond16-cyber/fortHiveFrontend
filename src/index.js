import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider as Providers } from "react-redux";
import store from "./store/store.js";
import { positions, transitions  } from "react-alert";

import { Toaster } from "react-hot-toast";
const options = {
  timeout: 6000,
  position: positions.TOP_CENTER,
  transition: transitions.SCALE,
  // reverseOrder: false
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Providers store={store}>

      <App />
      <Toaster {...options} />

  </Providers>
);
