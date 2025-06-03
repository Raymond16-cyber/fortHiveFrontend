import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../store/actions/authAction.js";
import { FAIL_CLEAR, SUCCESS_CLEAR } from "../../store/types/aythType.js";

import registerLogo from "../../assets/favicon.png";
import man from "../../assets/manChat.jpg";
import "../../css/Register.css";

const RegisterBody = ({ smallScreen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, isAuthenticated, error, successMessage, myInfo } =
    useSelector((state) => state.auth);

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
      setTimeout(() => navigate(`/fort/${state.fname}/home`), 3000);
      console.log(params);
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

  const containerVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const leftVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.3, duration: 0.6, ease: "easeOut" },
    },
  };

  const rightVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.5, duration: 0.6, ease: "easeOut" },
    },
  };

  return smallScreen < 640 ? (
    <AnimatePresence>
      <motion.div
        className="bg-black h-3/4 w-full p-4 flex flex-col justify-between"
        variants={containerVariant}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          className="form-container flex flex-col"
          onSubmit={onRegister}
        >
          {[
            {
              id: "fname",
              label: "First Name",
              name: "fname",
              icon: "bx-user",
            },
            { id: "lname", label: "Last Name", name: "lname", icon: "bx-user" },
            {
              id: "email",
              label: "Email",
              name: "email",
              type: "email",
              icon: "bx-envelope",
            },
          ].map(({ id, label, name, type = "text", icon }) => (
            <motion.div
              key={id}
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="relative w-full mt-4 text-white">
                <input
                  id={id}
                  type={type}
                  name={name}
                  value={state[name]}
                  onChange={handleInput}
                  className="peer w-full border border-gray-300 bg-transparent text-white rounded-3xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:border-transparent transition duration-200 placeholder:opacity-0 placeholder:text-transparent"
                  placeholder=" "
                  required
                  autoComplete="off"
                />
                <label
                  htmlFor={id}
                  className="absolute left-4 top-4 text-sm text-white transition-all duration-200 bg-black px-1
      peer-placeholder-shown:top-4 
      peer-placeholder-shown:text-sm 
      peer-placeholder-shown:text-gray-400 
      peer-focus:top-1 
      peer-focus:text-xs 
      peer-focus:text-cyan-700
      peer-placeholder-shown:opacity-100
      peer-valid:opacity-0
      peer-focus:-translate-y-6"
                  style={{ zIndex: 10 }}
                >
                  {label}
                </label>
                <i
                  className={`bx ${icon} absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer hover:animate-bounce`}
                />
              </div>
            </motion.div>
          ))}
          {["pword", "confirmPword"].map((field, i) => (
            <motion.div
              key={field}
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="relative mt-4 text-white">
                <input
                  id={field}
                  type={passwordVisible ? "text" : "password"}
                  name={field}
                  value={state[field]}
                  onChange={handleInput}
                  placeholder=" "
                  minLength={8}
                  required
                  autoComplete="off"
                  autoFocus={i === 0}
                  className="peer w-full border border-gray-300 bg-transparent text-white rounded-3xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:border-transparent transition duration-200 placeholder:opacity-0 placeholder:text-transparent "
                />
                {i === 0 && (
                  <i
                    className={`bx ${
                      passwordVisible ? "bxs-show" : "bxs-hide"
                    } absolute right-3 top-3 text-lg text-gray-600 cursor-pointer`}
                    onClick={togglePasswordVisibility}
                  />
                )}
                <label
                  htmlFor={field}
                  className="absolute left-4 top-4 text-sm text-white transition-all duration-200 bg-black px-1
      peer-placeholder-shown:top-4 
      peer-placeholder-shown:text-sm 
      peer-placeholder-shown:text-gray-400 
      peer-focus:top-1 
      peer-focus:text-xs 
      peer-focus:text-cyan-700
      peer-placeholder-shown:opacity-100
      peer-valid:opacity-0
      peer-focus:-translate-y-6"
                  style={{ zIndex: 10 }}
                >
                  {i === 0 ? "Password" : "Confirm Password"}
                </label>
              </div>
            </motion.div>
          ))}

          <div className="registerLogin text-white flex flex-col items-center justify-between mt-4 w-full">
            <div className="flex items-center justify-between w-full flex-col gap-3">
              <div className="w-full">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="accent-cyan-700"
                />
                <label htmlFor="rememberMe" className="ml-2">
                  Remember Me
                </label>
              </div>
              <div className="w-full text-center border border-gray-300 p-2 bg-gray-900 rounded-full">
                <button type="submit">Register</button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <a href="/fort/login" className="text-cyan-700">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  ) : (
    <div className="w-full flex items-center justify-center px-0 bg-white md:bg-cyan-900 mb-4">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 md:p-12 flex flex-col md:flex-row items-center"
      >
        <motion.div
          variants={leftVariant}
          className="w-full md:w-1/2 flex flex-col items-center mb-6 md:mb-0"
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={registerLogo}
            alt="Logo"
            className="w-12 mb-4"
          />
          <h1 className="text-3xl sm:text-4xl font-bold font-mono text-center text-cyan-900">
            Register
          </h1>
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={man}
            alt="Illustration"
            className="w-3/4 mt-6 rounded-lg"
          />
        </motion.div>

        <motion.form
          variants={rightVariant}
          className="w-full md:w-1/2 space-y-4"
          onSubmit={onRegister}
        >
          {/* form inputs remain the same... */}
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
            <span
              onClick={GoLogin}
              className="text-cyan-700 hover:underline cursor-pointer"
            >
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
        </motion.form>
      </motion.div>
    </div>
  );
};

export default RegisterBody;
