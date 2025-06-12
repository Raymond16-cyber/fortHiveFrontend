import axios from "axios";
import axiosInstance from "../axiosInstance/axiosInstance";
import {
  UPDATED_PROFILE_PIC,
  UPDATED_PROFILE_DETAILS,
  UPDATED_PROFILE_DETAILS_FAIL
} from "../types/aythType";

export const editProfile = (data) => {
  return async (dispatch) => {
    
    const response = await axiosInstance.post(
      "/api/v1/fort/edit-profile-details",
      data
    );
    try {
      dispatch({
        type: UPDATED_PROFILE_DETAILS,
        payload: {
          message: response.data.message,
          updatedUser: response.data.user,
          token: response.data.token,
        },
      });
      localStorage.setItem("userToken", response.data.token);
localStorage.setItem("myInfo", JSON.stringify(response.data.user));
    } catch (error) {
      const errorMessage = response.data.error;
      dispatch({
        type: UPDATED_PROFILE_DETAILS_FAIL,
        payload: {
          error: errorMessage,
        },
      });
    }
  };
};

export const editProfilePic = (data) => {
  return async (dispatch) => {
    const response = await axiosInstance.post("/api/v1/fort/edit-profile-pic", data);
    try {
      console.log("res.data", response.data);
      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token); // update token
        dispatch({
          type: UPDATED_PROFILE_PIC,
          payload: {
            message: response.data.message,
            image: response.data.pic,
            token: response.data.token,
          },
        });
      }
    } catch (error) {
      const message = response.data.error;
      dispatch({
        type: "UPDATED_PROFILE_PIC_FAIL",
        payload: {
          error: message,
        },
      });
    }
  };
};
