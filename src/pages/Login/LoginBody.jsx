import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/actions/authAction";
import { FAIL_CLEAR, SUCCESS_CLEAR } from "../../store/types/aythType.js";
import registerLogo from "../../assets/favicon.png";

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
    <div className="min-h-screen w-full  flex items-center justify-center px-0  bg-white md:bg-cyan-900">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 md:p-12 flex flex-col md:flex-row-reverse items-center sm:p-0">
        {/* Left side (Image + Header) */}
        <div className="w-full md:w-1/2 flex flex-col  mb-6 md:mb-0">
          {/* <img src={registerLogo} alt="Logo" className="w-12 mb-4" /> */}
          <h1 className="text-3xl sm:text-4xl font-bold font-mono text-center text-cyan-900">
            Login to FortHive
          </h1>
          {/* <img src={man} alt="Illustration" className="w-3/4 mt-6 rounded-lg" /> */}
        </div>

        {/* Right side (Form) */}
        <form className="w-full md:w-1/2 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700 "
                placeholder="Enter your email"
                onChange={handleInput}
                value={state.email}
                name="email"
                required
              />
              <i className="bx bxs-envelope absolute right-3 top-3 text-lg text-gray-600 cursor-pointer" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                value={state.pword}
                onChange={handleInput}
                placeholder="Enter your password"
                minLength={8}
                name="pword"
                required
              />
              <i
                className={`bx ${
                  passwordVisible ? "bxs-show" : "bxs-hide"
                } absolute right-3 top-3 text-lg text-gray-600 cursor-pointer`}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link
              to="/fort/login/forgotpassword"
              className="text-cyan-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-800 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition"
            onClick={onLogin}
          >
            Login
          </button>
          <div className="signUpnow flex w-full justify-center text-center ">
            <Link to="/fort/register" className="text-cyan-700 ">
              Don't have an account?
              <span className="text-black hover:underline">Sign up now!!</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginBody;
