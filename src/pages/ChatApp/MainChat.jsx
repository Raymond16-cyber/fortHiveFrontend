import React, { useEffect, useRef, useState } from "react";
import "../../css/ChatApp/ChatApp.css";
import ActiveFriends from "./chatcontactList/ActiveFriends";
import Friends from "./chatcontactList/Friends";
import SideBar from "./SideBar";
import ChatContent from "./MessageBody/MessageContact";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  sendMessages,
  getMessages,
  sendImageMessage,
  seenMessages,
  updateMessages,
} from "../../store/actions/friendAction";
import AddFriend from "./AddFriend/AddFriend";
import FriendListPage from "./AfterSideBar/FriendListPage";
import { io } from "socket.io-client";
import { FaDesktop } from "react-icons/fa";
import DesktopUi from "./Desktop/DestopUi";
import PhoneUi from "./Phone/PhonUi";
import {
  DELIVERED_MESSAGES,
  GET_MESSAGES_SUCCESS_CLEAR,
  SEEN_ALL_MESSAGES,
  SEEN_MESSAGES,
  SEND_MESSAGES_SUCCESS,
  SEND_MESSAGES_SUCCESS_CLEAR,
  SOCKET_MESSAGES,
  UPDATE,
  UPDATE_FRIEND_MESSAGE,
} from "../../store/types/aythType";
import useSound from "use-sound";
import sendMessageSound from "../../assets/sounds/sendMessageSound.mp3";
import notificationSound from "../../assets/sounds/notificationSound.mp3";
import { toast } from "react-toastify";
import {
  editProfile,
  editProfilePic,
} from "../../store/actions/EditProfileAction";

const MainChat = () => {
  const pickerRef = useRef(null);
  const dispatch = useDispatch();
  const { myInfo } = useSelector((state) => state.auth);
  console.log("User Info", myInfo);

  const [options, setOptions] = useState(false);
  const [redirectAddFriend, setRedirectAddFriend] = useState(false);
  const [currentFriend, setCurrentFriend] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [smallScreen, setSmallScreen] = useState(window.innerWidth);
  const [userIsActive, setUserIsActive] = useState([]);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [socketMessages, setSocketMessages] = useState("");
  const [typingmessages, setTypingMessages] = useState("");

  const { friends, messages, sendMessageSuccess, message_get_success } =
    useSelector((state) => state?.friends);
  // Initializing use sounds
  const [playNotification] = useSound(notificationSound);
  const [playMessageSound] = useSound(sendMessageSound);

  const [changeProfileDetails, setChangeProfileDetails] = useState({
    fname: "",
    lname: "",
    bio: "",
    id: myInfo.id,
    status: "",
  });
  const [friendProfileDetails, setFriendProfileDetails] = useState({
    fname: "",
    lname: "",
    bio: "",
    image: "",
    status: "",
    _id: null,
  });
  const [changeProfilePicture, setChangeProfilePicture] = useState({
    formData: "",
    Nimage: myInfo.image,
    image: "",
  });
  // Initializing socket
  const socket = useRef();

  // const renderChatsForsmallScreen
  useEffect(() => {
    const screenSize = () => {
      const size = window.innerWidth;
      setSmallScreen(size);
      // console.log(smallScreen);
    };
    window.addEventListener("resize", screenSize);
    screenSize();
    return () => window.removeEventListener("resize", screenSize);
  });

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);
  // onchange for send message
  const inputHandle = (e) => {
    setNewMessage(e.target.value);
    socket.current.emit("typingmessage", {
      senderID: myInfo.id,
      receiverID: currentFriend._id,
      senderName: myInfo.fname,
      msg: e.target.value,
    });
  };

  // initialising emoji send
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const sendEmoji = (emoji) => {
    console.log(emoji);
    const emojiChar = decodeHTML(emoji.htmlCode);
    setNewMessage((prev) => prev + emojiChar);

    socket.current.emit("typingmessage", {
      senderID: myInfo.id,
      receiverID: currentFriend._id,
      senderName: myInfo.fname,
      msg: emojiChar,
    });

    setTypingMessages(emojiChar);
    // Clear the typing message after sending
    setTimeout(() => {
      setTypingMessages("");
      socket.current.emit("typingmessage", {
        senderID: myInfo.id,
        receiverID: currentFriend._id,
        senderName: myInfo.fname,
        msg: "",
      });
    }, 1000);
  };
  // Onclicking send message button
  const sendMessage = (e) => {
    e.preventDefault();
    playMessageSound();
    console.log(newMessage);
    const data = {
      senderName: myInfo.fname,
      receiverID: currentFriend._id,
      message: {
        text: newMessage,
        image: "",
      },
    };
    dispatch(sendMessages(data));
    setNewMessage("");

    // send message to socket
    socket.current.emit("sendMessage", {
      senderID: myInfo.id,
      senderName: myInfo.fname,
      receiverID: currentFriend._id,
      time: new Date(),
      message: {
        text: newMessage,
        image: "",
      },
    });

    // Clear the typing message
    setTypingMessages("");
    socket.current.emit("typingmessage", {
      senderID: myInfo.id,
      receiverID: currentFriend._id,
      senderName: myInfo.fname,
      msg: "",
    });
  };

  useEffect(() => {
    if (sendMessageSuccess) {
      const lastMsg = messages[messages.length - 1];
      console.log("Last sent message:", lastMsg);

      if (lastMsg) {
        socket.current.emit("sendMessage", lastMsg);
        dispatch({
          type: UPDATE_FRIEND_MESSAGE,
          payload: { msgInfo: lastMsg },
          status: "seen",
        });
      }

      dispatch({ type: SEND_MESSAGES_SUCCESS_CLEAR });
    }
  }, [sendMessageSuccess]);

  // send files
  const hiddenFileInput = useRef(null);

  const handleFileClick = () => {
    hiddenFileInput.current.click(); // Opens file dialog
  };
  const handleFileChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);

    if (fileUploaded) {
      playMessageSound();
      const imageName = fileUploaded.name;
      const newImageName = Date.now() + "_" + imageName;
      console.log("Renamed file:", newImageName);
      console.log("Uploaded file:", fileUploaded);

      socket.current.emit("sendMessage", {
        senderID: myInfo.id,
        senderName: myInfo.fname,
        receiverID: currentFriend._id,
        time: new Date(),
        message: {
          text: newMessage,
          image: "",
        },
      });

      //Passing to backend
      const formData = new FormData();
      formData.append("senderName", myInfo.fname);
      formData.append("receiverID", currentFriend._id);
      formData.append("image", fileUploaded);
      formData.append("imageName", newImageName);

      // dispatching data
      dispatch(sendImageMessage(formData));
    } else {
      console.log("No file selected.");
    }
  };

  console.log("current friend", currentFriend);

  // getting friends from redux
  // console.log("absolute user message", messages);

  // get user and friends message(s)

  console.log("user friends:", friends);
  // const debugState = useSelector((state) => state);
  // const { friends } = useSelector((state) => state.friends);

  const showMenuOptions = () => {
    setOptions(!options);
  };
  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useEffect(() => {
  //   dispatch(Friends());
  // }, []);

  // Friendlist DoM

  const goBack = () => setRedirectAddFriend(false);
  const AddFriends = () => setRedirectAddFriend(true);

  // useEffect(() => {
  //   if (!currentFriend && Array.isArray(friends) && friends.length > 0) {
  //     console.log("Setting current friend:", friends[0]);
  //     setCurrentFriend(friends[0].friendInfo);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []); // <-- Only run once on first render

  // get user messages
  useEffect(() => {
    dispatch(getMessages(currentFriend?._id));
    if (friends.length > 0) {
    }
    console.log("Fetching messages for", currentFriend?._id);
  }, [currentFriend?._id]);

  useEffect(() => {
    if (friends.length === 0) return;

    if (!socket.current) {
      socket.current = io("https://fort-socketbackend-1.onrender.com", {
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.current.on("messageSeenResponse", (msg) => {
        dispatch({
          type: SEEN_MESSAGES,
          payload: {
            msgInfo: msg,
          },
        });
      });

      // dispatch the msg ddelivered message to action
      socket.current.on("messageDeliveredResponse", (msg) => {
        dispatch({
          type: DELIVERED_MESSAGES,
          payload: {
            msgInfo: msg,
          },
        });
      });

      socket.current.on("seenSuccess", (data) => {
        dispatch({
          type: SEEN_ALL_MESSAGES,
          payload: data,
        });
      });

      console.log("the fri", friends);
      const friendIDs = friends
        .map((friend) => {
          if (typeof friend === "string") return friend;
          if (friend?.friendInfo?._id) return friend.friendInfo._id;
          if (friend?._id) return friend._id;
          return null;
        })
        .filter(Boolean); // removes null/undefined

      socket.current.emit("addUser", myInfo.id, myInfo, friendIDs);

      // receive online users
      socket.current.on("getUser", (users) => {
        const filteredActiveUsers = users
          .filter((user) => user.userId !== myInfo.id)
          .map((user) => ({
            ...user,
            userInfo: {
              ...user.userInfo,
              _id: user.userInfo._id || user.userInfo.id,
            },
          }));
        setUserIsActive(filteredActiveUsers);
        console.log("Active users updated:", filteredActiveUsers);
      });

      // messages
      socket.current.on("getMessage", (data) => {
        setSocketMessages(data);
      });

      socket.current.on("getTypedMessage", (data) => {
        setTypingMessages(data);
      });

      socket.current.on("updatedProfileDetails", (data) => {
        console.log("Received updatedProfileDetails from socket:", data);
        setFriendProfileDetails({
          fname: data?.newFirstName,
          lname: data?.newLastName,
          bio: data?.newBio,
          _id: data?.userID,
          image: data?.newImage,
          status: data?.newStatus,
        });

        setUserIsActive((prev) =>
          prev.map((user) =>
            user.userInfo &&
            (user.userInfo._id === data.userID ||
              user.userInfo.id === data.userID)
              ? {
                  ...user,
                  userInfo: {
                    ...user.userInfo,
                    image: data.newImage || user.userInfo.image,
                  },
                }
              : user
          )
        );
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [friends]);

  useEffect(() => {
    if (socketMessages && currentFriend) {
      if (
        socketMessages.senderID === currentFriend._id &&
        socketMessages.receiverID === myInfo.id
      ) {
        dispatch({
          type: SOCKET_MESSAGES,
          payload: {
            message: socketMessages,
          },
        });

        // seen message
        dispatch(seenMessages(socketMessages));
        socket.current.emit("messageSeen", socketMessages);

        dispatch({
          type: UPDATE_FRIEND_MESSAGE,
          payload: {
            msgInfo: socketMessages,
            status: "seen",
          },
        });
      }
    }

    setTypingMessages("");
  }, [socketMessages, currentFriend]);

  // toasting notifications
  useEffect(() => {
    if (
      socketMessages &&
      socketMessages.senderID !== currentFriend._id &&
      socketMessages.receiverID === myInfo.id
    ) {
      playNotification();
      toast.success(`${socketMessages.senderName} sent a new Message`);
      dispatch(updateMessages(socketMessages));
      socket.current.emit("messageDelivered", socketMessages);

      dispatch({
        type: UPDATE_FRIEND_MESSAGE,
        payload: {
          msgInfo: socketMessages,
          status: "delivered",
        },
      });
    }
  }, [socketMessages]);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (messages.length > 0) {
      if (lastMsg.senderID !== myInfo.id && lastMsg.status !== "seen") {
        dispatch({
          type: UPDATE,
          payload: {
            id: currentFriend?._id,
          },
        });
        socket.current.emit("seen", {
          senderID: currentFriend._id,
          receiverID: myInfo.id,
        });
        dispatch(seenMessages({ _id: lastMsg._id }));
      }
    }

    dispatch({
      type: GET_MESSAGES_SUCCESS_CLEAR,
    });
  }, [message_get_success]);

  //   Change profile image
  const hiddenChangeImageFileInput = useRef(null);

  const hiddenChangeImageFileClick = () => {
    hiddenChangeImageFileInput.current.click(); // Opens file dialog
  };

  const hiddenChangeImageFileChange = async (event) => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded) {
      const imageName = fileUploaded.name;
      const newImageName = Date.now() + "_" + imageName.replace(/\s+/g, ""); //remove inbetween whitespaces

      console.log("FILuPLOADED", fileUploaded);
      console.log("imgName", imageName);

      const formData = new FormData();
      formData.append("profilepic", fileUploaded); // ✅ send file
      formData.append("imageName", newImageName); // ✅ send new name

      setChangeProfilePicture({
        ...changeProfilePicture,
        formData: formData,
        image: newImageName,
      });
    }
  };

  //   other profile details
  const handleChangeProfileDetails = (e) => {
    const { name, value } = e.target;
    setChangeProfileDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeDetails = async () => {
    if (changeProfilePicture?.formData) {
      await dispatch(editProfilePic(changeProfilePicture.formData));
    }
    dispatch(editProfile(changeProfileDetails));

    console.log("the details", changeProfileDetails);
    const friendIDs = friends
      .map((friend) => {
        if (typeof friend === "string") return friend;
        if (friend?.friendInfo?._id) return friend.friendInfo._id;
        if (friend?._id) return friend._id;
        return null;
      })
      .filter(Boolean); // removes null/undefined
    socket.current.emit("editProfileDetails", {
      userID: changeProfileDetails.id,
      receiverID: friendIDs,
      newFirstName: changeProfileDetails.fname
        ? changeProfileDetails.fname
        : myInfo.fname,
      newLastName: changeProfileDetails.lname
        ? changeProfileDetails.lname
        : myInfo.lname,
      newBio: changeProfileDetails.bio ? changeProfileDetails.bio : myInfo.bio,
      newImage: changeProfilePicture.image
        ? changeProfilePicture.image
        : myInfo.image,
      newStatus: changeProfileDetails.status
        ? changeProfileDetails.status
        : myInfo.status,
    });
  };

  useEffect(() => {
    console.log("friendProfileDetails changed:", friendProfileDetails);
    console.log("active users images changed", userIsActive);
  }, [friendProfileDetails]);

  useEffect(() => {
    if (friendProfileDetails && friendProfileDetails._id) {
      localStorage.setItem(
        "friendProfileDetails",
        JSON.stringify(friendProfileDetails)
      );
    }
  }, [friendProfileDetails]);

  useEffect(() => {
    const savedDetails = localStorage.getItem("friendProfileDetails");
    if (savedDetails) {
      setFriendProfileDetails(JSON.parse(savedDetails));
    }
  }, []);

  return smallScreen < 640 ? (
    <PhoneUi
      AddFriends={AddFriends}
      showMenuOptions={showMenuOptions}
      pickerRef={pickerRef}
      options={options}
      friends={friends}
      setCurrentFriend={setCurrentFriend}
      currentFriend={currentFriend}
      Friends={Friends}
      smallScreen={smallScreen}
      inputHandle={inputHandle}
      newMessage={newMessage}
      sendMessage={sendMessage}
      messages={messages}
      sendEmoji={sendEmoji}
      hiddenFileInput={hiddenFileInput}
      handleFileClick={handleFileClick}
      handleFileChange={handleFileChange}
      userIsActive={userIsActive}
      showUserInfo={showUserInfo}
      setShowUserInfo={setShowUserInfo}
      typingMessages={typingmessages}
      socketMessages={socketMessages}
      myInfo={myInfo}
      changeProfileDetails={changeProfileDetails}
      setChangeProfileDetails={setChangeProfileDetails}
      handleChangeProfileDetails={handleChangeProfileDetails}
      hiddenChangeImageFileChange={hiddenChangeImageFileChange}
      hiddenChangeImageFileClick={hiddenChangeImageFileClick}
      hiddenChangeImageFileInput={hiddenChangeImageFileInput}
      changeProfilePicture={changeProfilePicture}
      setChangeProfilePicture={setChangeProfilePicture}
      changeDetails={changeDetails}
      friendProfileDetails={friendProfileDetails}
    />
  ) : (
    <DesktopUi
      goBack={goBack}
      showMenuOptions={showMenuOptions}
      pickerRef={pickerRef}
      options={options}
      ActiveFriends={ActiveFriends}
      friends={friends}
      setCurrentFriend={setCurrentFriend}
      Friends={Friends}
      currentFriend={currentFriend}
      inputHandle={inputHandle}
      newMessage={newMessage}
      sendMessage={sendMessage}
      messages={messages}
      sendEmoji={sendEmoji}
      hiddenFileInput={hiddenFileInput}
      handleFileChange={handleFileChange}
      handleFileClick={handleFileClick}
      redirectAddFriend={redirectAddFriend}
      userIsActive={userIsActive}
      showUserInfo={showUserInfo}
      setShowUserInfo={setShowUserInfo}
      typingMessages={typingmessages}
      myInfo={myInfo}
      AddFriends={AddFriends}
      changeProfileDetails={changeProfileDetails}
      setChangeProfileDetails={setChangeProfileDetails}
      handleChangeProfileDetails={handleChangeProfileDetails}
      hiddenChangeImageFileChange={hiddenChangeImageFileChange}
      hiddenChangeImageFileClick={hiddenChangeImageFileClick}
      hiddenChangeImageFileInput={hiddenChangeImageFileInput}
      changeProfilePicture={changeProfilePicture}
      setChangeProfilePicture={setChangeProfilePicture}
      changeDetails={changeDetails}
      friendProfileDetails={friendProfileDetails}
    />
  );
};

export default MainChat;
