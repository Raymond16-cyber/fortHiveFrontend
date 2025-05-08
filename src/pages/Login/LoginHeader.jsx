import React from "react";
import registerLogo from "../../assets/favicon.png";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className="registerHeader bg-cyan-900 mb-3 flex justify-between items-center p-12  h-16 text-white">
      <div className="chatLogo flex items-center">
        <img src={registerLogo} alt="headlogo" className=" w-14" />
        <h1 className="text-xl font-mono font-bold">
          Fort<span className=" font-light">Hive</span>
        </h1>
      </div>
      <div className="loginSignUp flex gap-10 cursor-pointer">
        <div className="Login border-white border-x-0 border-b-4 border-t-0 pb-2">
          <h3>Login</h3>
        </div>

        <Link to="/fort/register">
          <div className="SignUp ">
            <h3>Sign Up</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LoginHeader;
