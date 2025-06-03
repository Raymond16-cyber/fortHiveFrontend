import React from "react";
import registerLogo from "../../assets/favicon.png";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

const RegisterHeader = ({ smallScreen }) => {
  return smallScreen < 640 ? (
    <div className="ReturnHomeArrow flex flex-col gap-7 p-3 bg-gray-900 h-1/4">
      <div className=" rounded-full bg-gray-400 p-3 w-fit">
        <FaLongArrowAltLeft />
      </div>

      <div className="text-white">
        <div>
          <h1 className=" text-3xl">Register</h1>
        </div>
        <div>
          <p className="text-sm">Create an account.</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="registerHeader bg-cyan-900 mb-3 flex justify-between items-center p-12  h-16 text-white">
      <div className="chatLogo flex items-center">
        <img src={registerLogo} alt="headlogo" className=" w-14" />
        <h1 className="text-xl font-mono font-bold">Fort</h1>
      </div>
      <div className="loginSignUp flex gap-10 cursor-pointer">
        <Link to="/fort/login">
          <div className="Login">
            <h3>Login</h3>
          </div>
        </Link>
        <div className="SignUp border-white border-x-0 border-b-4 border-t-0 pb-2">
          <h3>Sign Up</h3>
        </div>
      </div>
    </div>
  );
};

export default RegisterHeader;
