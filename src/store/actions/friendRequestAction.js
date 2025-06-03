import axiosInstance from "../axiosInstance/axiosInstance";
export const sendFriendRequest = (fname) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/api/v1/friends/send-friend-request", {
      fname,
    });

    dispatch({
      type: "SEND_FRIEND_REQUEST",
      payload: res.data, // you could simplify this to just `res.data.receiverId`
    });
  } catch (error) {
    dispatch({
      type: "FRIEND_REQUEST_ERROR",
      payload: error?.response?.data?.message || "Something went wrong",
    });
  }
};

export const acceptFriendRequest = (requestId) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/api/v1/friends/accept-friend-request", {
      requestId,
    });
    dispatch({ type: "ACCEPT_FRIEND_REQUEST", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const blockFriendRequest = (requestId) => async (dispatch) => {
  const res = await axiosInstance.post("/api/v1/fort/block-user", { requestId });
  dispatch({ type: "BLOCK_USER", payload: res.data.request });
};


