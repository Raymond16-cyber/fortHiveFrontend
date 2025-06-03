import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider as Providers } from "react-redux";
import store from "./store/store.js";
// import "@fontsource/inter"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Toaster } from "react-hot-toast";

const options = {
  duration: 6000,
  position: "top-center",
  
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Providers store={store}>
    <App />
    <ToastContainer {...options}/>
  </Providers>
);
