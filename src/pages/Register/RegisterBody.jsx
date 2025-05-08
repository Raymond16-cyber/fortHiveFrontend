import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../store/actions/authAction.js";
import {
  FAIL_CLEAR,
  SUCCESS_CLEAR,
} from "../../store/types/aythType.js";

import registerLogo from "../../assets/favicon.png";
import man from "../../assets/manChat.jpg";
import "../../css/Register.css";

const RegisterBody = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error, successMessage,myInfo} = useSelector(
    (state) => state.auth
  );

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showLoaderLogin, setShowLoaderLogin] = useState(false);

  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    pword: "",
    confirmPword: "",
    rememberMe: false,
  });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const onRegister = (e) => {
    e.preventDefault();
    const { fname, lname, email, pword, confirmPword, rememberMe } = state;

    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);
    formData.append("password", pword);
    formData.append("confirmPassword", confirmPword);
    formData.append("remember", rememberMe);

    dispatch(userRegister(formData));
  };

  const onClickRemember = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      setShowLoader(true);
      setTimeout(() => navigate("/fort/users/edit-profile"), 3000);
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: SUCCESS_CLEAR });
    }
    if (Array.isArray(error)) {
      error.forEach((err) => toast.error(err));
    } else if (typeof error === "string" && error) {
      toast.error(error);
      dispatch({ type: FAIL_CLEAR });

    }
  }, [successMessage, error, isAuthenticated, navigate, dispatch]);
  const GoLogin = () => {
    setShowLoaderLogin(true);
    setTimeout(() => navigate("/fort/login"), 2000);
  };
  if (showLoaderLogin) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <img
          src={registerLogo} // Replace with your spinner if needed
          alt="Loading..."
          className="loader w-20 h-20 animate-spin"
        />
      </div>
    );
  }

  if (showLoader) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <img
          src={registerLogo} // Replace with your spinner if needed
          alt="Loading..."
          className="loader w-20 h-20 animate-spin"
        />
      </div>
    );
  }


  return (
    <div className="min-h-screen w-full flex items-center justify-center px-0 bg-white md:bg-cyan-900 mb-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 md:p-12 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center mb-6 md:mb-0">
          <img src={registerLogo} alt="Logo" className="w-12 mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold font-mono text-center text-cyan-900">
            Register
          </h1>
          <img src={man} alt="Illustration" className="w-3/4 mt-6 rounded-lg" />
        </div>

        <form className="w-full md:w-1/2 space-y-4" onSubmit={onRegister}>
          {[
            { id: "fname", label: "First Name", name: "fname" },
            { id: "lname", label: "Last Name", name: "lname" },
            { id: "email", label: "Email", name: "email", type: "email" },
          ].map(({ id, label, name, type = "text" }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium">
                {label}
              </label>
              <div className="relative">
                <input
                  id={id}
                  type={type}
                  name={name}
                  value={state[name]}
                  onChange={handleInput}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                  placeholder={`Enter your ${label}`}
                />
              </div>
            </div>
          ))}

          {["pword", "confirmPword"].map((field, i) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium">
                {i === 0 ? "Password" : "Confirm Password"}
              </label>
              <div className="relative">
                <input
                  id={field}
                  type={passwordVisible ? "text" : "password"}
                  name={field}
                  value={state[field]}
                  onChange={handleInput}
                  placeholder={
                    i === 0 ? "Create a password" : "Repeat your password"
                  }
                  minLength={8}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                />
                {i === 0 && (
                  <i
                    className={`bx ${
                      passwordVisible ? "bxs-show" : "bxs-hide"
                    } absolute right-3 top-3 text-lg text-gray-600 cursor-pointer`}
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2" htmlFor="rem">
              <input
                id="rem"
                type="checkbox"
                className="accent-cyan-700"
                name="rememberMe"
                onChange={onClickRemember}
                checked={state.rememberMe}
              />
              <span>Remember Me</span>
            </label>
            {/* <Link to="/fort/login" className="text-cyan-700 hover:underline"> */}
            <span onClick={GoLogin} className="text-cyan-700 hover:underline cursor-pointer">
              Already have an account?
            </span>
            {/* </Link> */}
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-800 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterBody;
