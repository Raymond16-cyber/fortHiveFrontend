import React, { useState } from "react";
import { FaAngleLeft, FaPhoneAlt, FaVideo } from "react-icons/fa";
import MessageBody from "../MessageBody/Message";
import MessageForm from "../MessageBody/MessageForm";
import { motion, AnimatePresence } from "framer-motion";
import ContactInfoPage from "../chatcontactList/ContactInfoPage";
import ParticularFriendInfoPU from "./ParticularFriendInfoPU";
import "../../../css/ChatApp/mobile/ChatContentPU.css";
import pic from "../../../assets/defaultUser.png";

const ChatContentPU = ({
  currentFriend,
  Friends,
  smallScreen,
  sendMessage,
  inputHandle,
  newMessage,
  messages,
  sendEmoji,
  hiddenFileInput,
  handleFileChange,
  handleFileClick,
  backToFriendList,
  userIsActive,
  showUserInfo,
  setShowUserInfo,
  typingMessages,
  friends,
  friendProfileDetails,
}) => {
  // Show User Profile Page

  // firend info
  const friendImage =
    currentFriend?.image || currentFriend?.friendInfo?.image || pic;
  const friendName = currentFriend?.fname || currentFriend?.friendInfo?.fname;
  const friendID = currentFriend?._id || currentFriend?.friendInfo?._id;
  const rightVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.2, duration: 0.6, ease: "easeOut" },
    },
  };
  return (
  <AnimatePresence>
    <motion.div
      className="ChatView w-full flex h-screen"
      variants={rightVariant}
      initial="hidden"
      animate="visible"
    >
      {showUserInfo ? (
        <ParticularFriendInfoPU
          currentFriend={currentFriend}
          friendImage={friendImage}
          friendName={friendName}
          userIsActive={userIsActive}
          setShowUserInfo={setShowUserInfo}
          messages={messages}
          friendProfileDetails={friendProfileDetails}
          friendID={friendID}
        />
      ) : (
        <div className="ChatVIewInner w-full h-screen flex flex-col overflow-y-auto justify-between bg-gray-50">
          {/* WhatsApp-like Header */}
          <div className="chatHeader bg-blue-600 flex justify-between px-3 sticky top-0 z-50 items-center py-2 shadow">
            <div className="flex items-center gap-3">
              <button
                onClick={backToFriendList}
                className="p-2 rounded-full hover:bg-blue-700 transition text-white"
              >
                <FaAngleLeft className="text-xl" />
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow">
                <img
                  src={
                    friendProfileDetails?._id === friendID &&
                    friendProfileDetails.image
                      ? `/userProfilePic/${friendProfileDetails.image}`
                      : friendImage
                      ? `/userProfilePic/${friendImage}`
                      : pic
                  }
                  alt="friendpic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                onClick={() => setShowUserInfo(true)}
                className="cursor-pointer flex flex-col"
              >
                <span className="font-semibold text-white text-base leading-tight">
                  {friendName}
                </span>
                {messages &&
                messages.some((msg) => msg.senderID === friendID) ? (
                  userIsActive?.some((user) => user.userId === friendID) ? (
                    typingMessages &&
                    typingMessages.msg &&
                    typingMessages?.senderID === friendID ? (
                      <span className="text-xs text-green-200 animate-pulse">typing...</span>
                    ) : (
                      <span className="text-xs text-white">online</span>
                    )
                  ) : (
                    <span className="text-xs text-gray-200">offline</span>
                  )
                ) : (
                  <span className="text-xs text-gray-200"></span>
                )}
              </div>
            </div>
            <div className="icons-contact flex gap-2">
              <button className="p-2 rounded-full hover:bg-green-700 transition text-white">
                <FaPhoneAlt />
              </button>
              <button className="p-2 rounded-full hover:bg-green-700 transition text-white">
                <FaVideo />
              </button>
            </div>
          </div>

          {/* Message Body */}
          <div className="chatBody flex-1 overflow-y-scroll w-full bg-gradient-to-b from-green-50 to-white">
            <MessageBody
              currentFriend={currentFriend}
              friendImage={friendImage}
              messages={messages}
              friendName={friendName}
              friendProfileDetails={friendProfileDetails}
              friendID={friendID}
            />
          </div>

          {/* Message Input */}
          <div className="sticky bottom-0 z-10 bg-white border-t">
            <div className="chatForm">
              <MessageForm
                inputHandle={inputHandle}
                newMessage={newMessage}
                sendMessage={sendMessage}
                sendEmoji={sendEmoji}
                hiddenFileInput={hiddenFileInput}
                handleFileChange={handleFileChange}
                handleFileClick={handleFileClick}
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  </AnimatePresence>
);
};

export default ChatContentPU;
