import axiosInstance from "../axiosInstance/axiosInstance";
import {
  ADD_FRIEND_FAIL,
  ADD_FRIEND_SUCCESS,
  DELETE_ALL_MESSAGES_FAIL,
  DELETE_ALL_MESSAGES_SUCCESS,
  GET_FRIENDS_SUCCESS,
  GET_MESSAGES_SUCCESS,
  SEND_MESSAGES_SUCCESS,
} from "../types/aythType";

export const addFriend = (fname) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/api/v1/fort/add-friends", {
      fname, // OR ID if you're using that
    });
    dispatch({ type: ADD_FRIEND_SUCCESS, payload: res.data.user.friends });
  } catch (error) {
    console.error(error);
    dispatch({
      type: ADD_FRIEND_FAIL,
      payload: error.response.data.message,
    });
    return false;
  }
};

export const getFriends = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/api/v1/fort/get-friends", {
      withCredentials: true,
    });
    console.log("from getfriendsss..", res.data.friends);

    dispatch({
      type: GET_FRIENDS_SUCCESS,
      payload: { friends: res.data.friends },
    });
  } catch (error) {
    console.error(error);
  }
};

export const sendMessages = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/fort/send-message",
      data
    );

    console.log("Message sent successfully", response.data.message);
    dispatch({
      type: SEND_MESSAGES_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    console.error(error.response.data);
  }
};

// Get messages and display to user
export const getMessages = (id) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/fort/get-message/${id}`
      );
      dispatch({
        type: GET_MESSAGES_SUCCESS,
        payload: {
          message: response.data.messages,
        },
      });
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};

export const sendImageMessage = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/api/v1/fort/send-image", data);
    dispatch({
      type: SEND_MESSAGES_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const seenMessages = (msg) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/api/v1/fort/seen-message", msg);
    console.log("Seen message response:", response.data);
  } catch (error) {
    console.log(error.response.data);
  }
};

export const updateMessages = (msg) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/fort/delivered-message",
      msg
    );
    console.log("Seen message response:", response.data);
  } catch (error) {
    console.log(error.response.data);
  }
};
