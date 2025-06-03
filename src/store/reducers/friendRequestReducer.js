const initialState = {
  pendingRequests: [],
  sentRequests: [],
  friends: [],
  error: null
};

export const friendReducer = (state = initialState, action)=>{
  switch (action.type) {
      case "FRIEND_REQUEST_SENT":
      return {
        ...state,
        sentRequests: [...state.sentRequests, action.payload],
      };
    case "FRIEND_REQUEST_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "BLOCK_USER":
      return {
        ...state,
        pendingRequests: state.pendingRequests.filter(
          (req) => req._id !== action.payload._id
        ),
      };
    case "SEND_FRIEND_REQUEST":
      return {
        ...state,
        sentRequests: [...state.sentRequests, action.payload.receiverId], // You sent
        error: null,
      };
    case "FRIEND_REQUEST_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "RECEIVE_FRIEND_REQUEST":
      return {
        ...state,
        pendingRequests: [...state.pendingRequests, action.payload],
      };

    case "ACCEPT_FRIEND_REQUEST":
      return {
        ...state,
        friends: [
          ...state.friends,
          action.payload.sender,
          action.payload.receiver,
        ],
        pendingRequests: state.pendingRequests.filter(
          (req) => req._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
}


