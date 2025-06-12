import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  FAIL_CLEAR,
  USER_REGISTER_SUCCESS,
  SUCCESS_CLEAR,
  USER_LOGIN_FAIL,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
  UPDATED_PROFILE_PIC,
  UPDATED_PROFILE_DETAILS,
  UPDATED_PROFILE_DETAILS_FAIL,
} from "../types/aythType";
import { jwtDecode } from "jwt-decode";

const authState = {
  myInfo: JSON.parse(localStorage.getItem("myInfo")) || {},
  token: localStorage.getItem("userToken") || "",
  loading: true,
  isAuthenticated: false,
  error: "",
  successMessage: "",
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
    case UPDATED_PROFILE_PIC:
      const updatedPicInfo = tokenDecode(payload.token);
      return {
        ...state,
        successMessage: true,
        myInfo: updatedPicInfo,
      };
    case UPDATED_PROFILE_DETAILS:
      const updatedUserInfo = tokenDecode(payload.token);
      return {
        ...state,
        successMessage: true,
        myInfo: updatedUserInfo,
      };
      case UPDATED_PROFILE_DETAILS_FAIL:
        return{
          ...state,
          successMessage: false,
          error: payload.error
        }
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        myInfo: {},
        error: null,
        isAuthenticated: false,
        successMessage: payload.successMessage,
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
