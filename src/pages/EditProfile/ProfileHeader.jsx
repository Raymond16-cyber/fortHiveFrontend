import React from "react";
import registerLogo from "../../assets/favicon.png";
import { Link } from "react-router-dom";

const ProfileHeader = () => {
  return (
    <div className="registerHeader bg-cyan-900 mb-3 flex justify-between items-center p-12  h-16 text-white">
      <div className="chatLogo flex items-center">
        <img src={registerLogo} alt="headlogo" className=" w-14" />
        <h1 className="text-xl font-mono font-bold">
          Fort<span className=" font-light">Hive</span>
        </h1>
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

export default ProfileHeader;
