import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "../../store/actions/authAction";
import { FAIL_CLEAR, SUCCESS_CLEAR } from "../../store/types/aythType.js";
import registerLogo from "../../assets/favicon.png";
import { motion, AnimatePresence } from "framer-motion";
import googleLogo from "../../assets/googleimg.png";
import facebookLogo from "../../assets/facebookimg.png";

const LoginBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error, successMessage, myInfo } =
    useSelector((state) => state.auth);
  // console.log(myInfo);

  const [showLoader, setShowLoader] = useState(false);
  const [smallScreen, setSmallScreen] = useState(window.innerWidth);
  useEffect(() => {
    const screenSize = () => {
      const size = window.innerWidth;
      setSmallScreen(size);
      // console.log(smallScreen);
    };
    window.addEventListener("resize", screenSize);
    screenSize();
    return () => window.removeEventListener("resize", screenSize);
  }, []);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [state, setState] = useState({
    email: "",
    pword: "",
  });

  //Password visiility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      setShowLoader(true);
      setTimeout(() => navigate(`/fort/${myInfo.id}/home`), 3000);
    }else{
      navigate("/fort/login")
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

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin(state));
  };

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

  return smallScreen < 640 ? (
    <AnimatePresence>
      <motion.div
        className="bg-black h-3/4 w-full p-4 flex flex-col justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="form flex flex-col p-4  w-full">
          {[
            {
              label: "Email",
              id: "email",
              type: "email",
              value: state.email,
              name: "email",
              icon: "bxs-envelope",
              onChange: handleInput,
            },
            {
              label: "Password",
              id: "password",
              type: passwordVisible ? "text" : "password",
              value: state.pword,
              name: "pword",
              icon: passwordVisible ? "bxs-show" : "bxs-hide",
              onChange: handleInput,
              onIconClick: togglePasswordVisibility,
            },
          ].map((field, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className=" w-full"
            >
              <div className="relative w-full mt-6">
                {/* Input */}
                <input
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder=" "
                  required
                  className="peer w-full border border-gray-300 bg-transparent text-white rounded-3xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:border-transparent transition duration-200 placeholder:opacity-0 placeholder:text-transparent"
                />

                {/* Label that disappears on input */}
                <label
                  htmlFor={field.id}
                  className="absolute left-4 top-3 text-sm text-white transition-opacity duration-200 peer-placeholder-shown:opacity-100  peer-valid:opacity-0 peer-focus:-translate-y-6 bg-black px-1 peer-focus:px-2 peer-focus:text-cyan-700 peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 pointer-events-none"
                  style={{ zIndex: 1 }}
                >
                  {field.label}
                </label>

                {/* Right-side Icon */}
                <i
                  className={`bx ${field.icon} absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer hover:animate-bounce`}
                  onClick={field.onIconClick}
                />
              </div>
            </motion.div>
          ))}
          <div className="forgotPassword flex justify-end mt-4">
            <Link
              to="/fort/login/forgotpassword"
              className="text-cyan-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-cyan-800 text-white py-2 rounded-3xl font-semibold hover:bg-cyan-700 transition mt-6"
            onClick={onLogin}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Login
          </motion.button>
        </div>

        <div className="otherLoginOptions text-white flex flex-col gap-4">
          {/* other logins */}
          <div className="loginOptions">
            <div className="orLoginwith relative flex items-center justify-center mb-4">
              <hr className="w-full border-gray-300" />
              <p className="absolute bg-black px-2 text-sm text-gray-400">
                or login with
              </p>
            </div>

            <div className="socialLinks flex justify-between">
              <div className="google flex items-center gap-2 cursor-pointer border rounded-full py-4 px-7">
                <img src={googleLogo} alt="Google logo" className="w-6 h-6" />
                Google
              </div>
              <div className="facebook flex items-center gap-2 cursor-pointer border rounded-full py-4 px-7">
                <img
                  src={facebookLogo}
                  alt="Facebook logo"
                  className="w-6 h-6"
                />
                Facebook
              </div>
            </div>
          </div>

          <div className="goToRegister">
            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/fort/register" className="text-cyan-700">
                Sign up now!!
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  ) : (
    <AnimatePresence>
      <motion.div
        className="min-h-screen w-full flex items-center justify-center px-0 bg-white md:bg-cyan-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 md:p-12 flex flex-col md:flex-row-reverse items-center sm:p-0"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Left side (Image + Header) */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col mb-6 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold font-mono text-center text-cyan-900">
              Login to FortHive
            </h1>
          </motion.div>

          {/* Right side (Form) */}
          <motion.form
            className="w-full md:w-1/2 space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {[
              {
                label: "Email",
                id: "email",
                type: "email",
                value: state.email,
                name: "email",
                icon: "bxs-envelope",
                onChange: handleInput,
              },
              {
                label: "Password",
                id: "password",
                type: passwordVisible ? "text" : "password",
                value: state.pword,
                name: "pword",
                icon: passwordVisible ? "bxs-show" : "bxs-hide",
                onChange: handleInput,
                onIconClick: togglePasswordVisibility,
              },
            ].map((field, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <label htmlFor={field.id} className="block text-sm font-medium">
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    id={field.id}
                    type={field.type}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    onChange={field.onChange}
                    value={field.value}
                    name={field.name}
                    required
                  />
                  <i
                    className={`bx ${field.icon} absolute right-3 top-3 text-lg text-gray-600 cursor-pointer`}
                    onClick={field.onIconClick}
                  />
                </div>
              </motion.div>
            ))}

            <motion.div
              className="flex items-center justify-between text-sm"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to="/fort/login/forgotpassword"
                className="text-cyan-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-cyan-800 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition"
              onClick={onLogin}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              Login
            </motion.button>

            <motion.div
              className="signUpnow flex w-full justify-center text-center"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link to="/fort/register" className="text-cyan-700">
                Don't have an account?{" "}
                <span className="text-black hover:underline">
                  Sign up now!!
                </span>
              </Link>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginBody;
