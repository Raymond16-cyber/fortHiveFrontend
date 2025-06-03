import axiosInstance from "../axiosInstance/axiosInstance";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} from "../types/aythType";

export const userRegister = (data) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post("/api/v1/fort/user-register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("userToken", response.data.token);

      console.log("✅ Registration Success:", response.data);
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      const message =
        error.response?.data?.errors || error.message || "Registration failed";
      console.error("❌", message);

      dispatch({
        type: USER_REGISTER_FAIL,
        payload: {
          error: message,
        },
      });
    }
  };
};

//   User login
export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post("/api/v1/fort/user-login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      },);

      console.log("from login action",response.data);
      
      localStorage.setItem("userToken", response.data.token);

      console.log("✅Login Success:", response.data);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Login failed";
      console.error("❌Login Error", message);

      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: message,
        },
      });
    }
  };
};

// user logout
export const userLogout = () => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/api/v1/fort/user-logout");

    if (response) {
      localStorage.removeItem("userToken");
      dispatch({
        type: USER_LOGOUT_SUCCESS,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
