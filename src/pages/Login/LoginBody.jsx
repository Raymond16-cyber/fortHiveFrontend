import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/actions/authAction";
import { FAIL_CLEAR, SUCCESS_CLEAR } from "../../store/types/aythType.js";
import registerLogo from "../../assets/favicon.png";
import { motion } from "framer-motion";

const LoginBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error, successMessage, myInfo } =
    useSelector((state) => state.auth);
  const [showLoader, setShowLoader] = useState(false);

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
      setTimeout(() => navigate("/fort/users/home"), 3000);
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

  return (
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
              <span className="text-black hover:underline">Sign up now!!</span>
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default LoginBody;
