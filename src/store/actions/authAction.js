import axios from "axios";
import { USER_REGISTER_FAIL, USER_REGISTER_SUCCESS,USER_LOGIN_FAIL,USER_LOGIN_SUCCESS } from "../types/aythType";

export const userRegister = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/v1/fort/user-register", data, {
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
          token: response.data.token

        }
      });
    } catch (error) {
      const message = error.response.data.error || "Registration failed";
      console.error("❌", message);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: {
          error: error.response?.data.error,
        },
      });
    }
  };
};




//   User login
export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/v1/fort/user-login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("userToken", response.data.token);

      console.log("✅Login Success:", response.data);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token

        }
      });
    } catch (error) {
      const message = error.response.data.error || "Login failed";
      console.error("❌Login Error", message);
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: error.response?.data.error,
        },
      });
    }
  };
};
