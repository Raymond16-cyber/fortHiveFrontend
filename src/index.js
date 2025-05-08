import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider as Providers } from "react-redux";
import store from "./store/store.js";

import { Toaster } from "react-hot-toast";

const options = {
  duration: 6000, // use 'duration' not 'timeout' for react-hot-toast
  position: "top-center",
  // react-hot-toast handles transitions internally; no 'transition' option needed
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Providers store={store}>
    <App />
    <Toaster {...options} />
  </Providers>
);
