import {
  ADD_FRIEND_FAIL,
  ADD_FRIEND_SUCCESS,
  UPDATE_FRIEND_MESSAGE,
  GET_FRIENDS_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_MESSAGES_SUCCESS,
  SEND_MESSAGES_SUCCESS,
  SOCKET_MESSAGES,
  SEND_MESSAGES_SUCCESS_CLEAR,
  SEEN_MESSAGES,
  DELIVERED_MESSAGES,
  UPDATE,
  GET_MESSAGES_SUCCESS_CLEAR,
  SEEN_ALL_MESSAGES,
} from "../types/aythType";

const initialState = {
  friends: [],
  messages: [],
  error: null,
  sendMessageSuccess: false,
  message_get_success: false,
};

export const friendsMessageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: payload.friends,
      };
    case ADD_FRIEND_SUCCESS:
      return {
        ...state,
        friends: payload, // updated list
        error: null,
      };
    case ADD_FRIEND_FAIL:
      return {
        ...state,
        error: payload,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: payload.message, //must be the same name as the initialized state aboves: messages:[],else,creates another instance.
        sendMessageSuccess: true,
        message_get_success: true,
      };
    case SEND_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, payload.message],
        sendMessageSuccess: true,
      };
    case SOCKET_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, payload.message],
      };
    // case UPDATE_FRIEND_MESSAGE: {
    //   const msg = payload?.msgInfo;

    //   if (!msg) return state; // If msgInfo is undefined, bail early

    //   const index = state.friends.findIndex(
    //     (friend) =>
    //       friend.friendInfo._id === msg.receiverID ||
    //       friend.friendInfo._id === msg.senderID
    //   );

    //   if (index === -1) return state;

    //   const updatedFriend = {
    //     ...state.friends[index],
    //     messageInfo: msg,
    //   };

    //   const updatedFriends = [
    //     ...state.friends.slice(0, index),
    //     updatedFriend,
    //     ...state.friends.slice(index + 1),
    //   ];

    //   return {
    //     ...state,
    //     friends: updatedFriends,
    //   };
    // }
    case UPDATE_FRIEND_MESSAGE: {
      const msg = payload?.msgInfo;
      if (!msg) return state;

      const friendIndex = state.friends.findIndex(
        (friend) =>
          friend.friendInfo._id === msg.receiverID ||
          friend.friendInfo._id === msg.senderID
      );

      if (friendIndex === -1) return state;

      const updatedFriend = {
        ...state.friends[friendIndex],
        messageInfo: {
          ...msg,
          status: payload.status || msg.status, // fallback if status isn't in payload
        },
      };

      return {
        ...state,
        friends: [
          ...state.friends.slice(0, friendIndex),
          updatedFriend,
          ...state.friends.slice(friendIndex + 1),
        ],
      };
    }

    case SEEN_MESSAGES: {
      const msg = payload?.msgInfo;
      if (!msg) return state;

      const friendIndex = state.friends.findIndex(
        (friend) =>
          friend.friendInfo._id === msg.receiverID ||
          friend.friendInfo._id === msg.senderID
      );

      if (friendIndex === -1) return state;

      const updatedFriend = {
        ...state.friends[friendIndex],
        messageInfo: {
          ...msg,
          status: "seen",
        },
      };

      return {
        ...state,
        friends: [
          ...state.friends.slice(0, friendIndex),
          updatedFriend,
          ...state.friends.slice(friendIndex + 1),
        ],
      };
    }

    case DELIVERED_MESSAGES: {
      const msg = payload?.msgInfo;
      if (!msg) return state;

      const friendIndex = state.friends.findIndex(
        (friend) =>
          friend.friendInfo._id === msg.receiverID ||
          friend.friendInfo._id === msg.senderID
      );

      if (friendIndex === -1) return state;

      const updatedFriend = {
        ...state.friends[friendIndex],
        messageInfo: {
          ...msg,
          status: "delivered",
        },
      };

      return {
        ...state,
        friends: [
          ...state.friends.slice(0, friendIndex),
          updatedFriend,
          ...state.friends.slice(friendIndex + 1),
        ],
      };
    }

    case UPDATE: {
      const id = payload?.id;
      if (!id) return state;

      const updatedFriends = state.friends.map((friend) => {
        if (friend.friendInfo._id === id) {
          return {
            ...friend,
            messageInfo: {
              ...friend.messageInfo,
              status: "seen",
            },
          };
        }
        return friend;
      });

      return {
        ...state,
        friends: updatedFriends,
      };
    }

    case SEND_MESSAGES_SUCCESS_CLEAR:
      return {
        ...state,
        sendMessageSuccess: false,
      };

    case GET_MESSAGES_SUCCESS_CLEAR:
      return {
        ...state,
        message_get_success: false,
      };

    case SEEN_ALL_MESSAGES:
      const id = payload?.receiverID;
      if (!id) return state;

      const updatedFriends = state.friends.map((friend) => {
        if (friend.friendInfo._id === id) {
          return {
            ...friend,
            messageInfo: {
              ...friend.messageInfo,
              status: "seen",
            },
          };
        }
        return friend;
      });

      return {
        ...state,
        friends: updatedFriends,
      };
    default:
      return state;
  }
};
