import React, { useState, useEffect } from "react";
import LoginHeader from "./LoginHeader";
import LoginBody from "./LoginBody";
import LoginFooter from "./LoginFooter";

const MainLogin = () => {
  return (
    <div className="flex flex-col h-screen">
      <LoginHeader />
      <LoginBody />
      <LoginFooter />
    </div>
  );
};

export default MainLogin;
