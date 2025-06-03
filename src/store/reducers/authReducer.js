import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  FAIL_CLEAR,
  USER_REGISTER_SUCCESS,
  SUCCESS_CLEAR,
  USER_LOGIN_FAIL,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
} from "../types/aythType";
import { jwtDecode } from "jwt-decode";

const authState = {
  loading: true,
  isAuthenticated: false,
  error: "",
  successMessage: "",
  myInfo: "",
};

const tokenDecode = (token) => {
  const tokenDecoded = jwtDecode(token);
  const expiresIn = new Date(tokenDecoded.exp * 1000);
  if (new Date() > expiresIn) {
    return null;
  }
  return tokenDecoded;
};

const getToken = localStorage.getItem("userToken");

if (getToken) {
  const getInfo = tokenDecode(getToken);
  if (getInfo) {
    authState.myInfo = getInfo;
    authState.loading = false;
    authState.isAuthenticated = true;
  }
}

console.log(getToken);

export const authReducer = (state = authState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      const myInfo = tokenDecode(payload.token);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        myInfo: myInfo,
        successMessage: payload.successMessage,
        error: "",
      };
      
    case USER_REGISTER_FAIL:
      case USER_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: payload.error,
        myInfo: "",
      };
      case USER_LOGOUT_SUCCESS:
        return {
          ...state,
          loading: false,
          myInfo: null,
          error: null,
          isAuthenticated: false,
          successMessage: "Logout Successful",

      };

    case SUCCESS_CLEAR:
      return {
        ...state,
        successMessage: "",
      };
    case FAIL_CLEAR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};
