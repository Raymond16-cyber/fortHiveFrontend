import React, { useState } from "react";
import {
  FaEdit,
  FaEllipsisH,
  FaPhoneAlt,
  FaRocketchat,
  FaVideo,
} from "react-icons/fa";
import ContactInfoPage from "../chatcontactList/ContactInfoPage";
import MessageForm from "./MessageForm";
import MessageBody from "./Message";
import "../../../css/ChatApp/MessageContact.css";
import { motion, AnimatePresence } from "framer-motion";
import pic from "../../../assets/defaultUser.png";

const ChatContent = ({
  currentFriend,
  inputHandle,
  newMessage,
  sendMessage,
  messages,
  sendEmoji,
  handleFileChange,
  handleFileClick,
  hiddenFileInput,
  showUserInfo,
  setShowUserInfo,
  userIsActive,
  typingMessages,
  friends,
  friendProfileDetails,
}) => {
  console.log("from chatcontent", currentFriend);
  console.log("messages", messages);

  // firend info
  const friendImage =
    currentFriend?.image || currentFriend?.friendInfo?.image || pic;
  const friendName = currentFriend?.fname || currentFriend?.friendInfo?.fname;
  const friendID = currentFriend?._id || currentFriend?.friendInfo?._id;
 return (
  <div className="right-side w-9/12 h-screen flex ">
    {/* Chat Panel */}
    <div className="chat-container flex flex-col w-full h-full bg-white rounded-xl shadow-lg mx-6 overflow-hidden border">
      {/* Chat Header */}
      <div className="chat-header sticky top-0 z-10 flex justify-between items-center px-6 py-1 bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow">
        <div
          className="image-name-info flex items-center gap-4 cursor-pointer"
          onClick={() => setShowUserInfo(true)}
        >
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow">
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
          <div>
            <h4 className="font-bold text-lg">
              {friendProfileDetails?._id === friendID
                ? friendProfileDetails.fname
                : friendName}
            </h4>
            {messages && messages.some((msg) => msg.senderID === friendID) ? (
              userIsActive?.some((user) => user.userId === friendID) ? (
                typingMessages &&
                typingMessages.msg &&
                typingMessages?.senderID === friendID ? (
                  <p className="text-xs text-green-200 animate-pulse">typing...</p>
                ) : (
                  <p className="text-xs text-white">online</p>
                )
              ) : (
                <p className="text-xs text-gray-200">offline</p>
              )
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className="icons-contact flex gap-4">
          <button className="hover:bg-blue-600 p-2 rounded-full transition">
            <FaPhoneAlt />
          </button>
          <button className="hover:bg-blue-600 p-2 rounded-full transition">
            <FaVideo />
          </button>
        </div>
      </div>

      {/* Show Message Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
        <MessageBody
          currentFriend={currentFriend}
          messages={messages}
          friendImage={friendImage}
          friendName={friendName}
          friends={friends}
          friendProfileDetails={friendProfileDetails}
          friendID={friendID}
        />
      </div>

      {/* Message Form Send */}
      <div className="border-t bg-slate-100 px-6 py-3">
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

    {/* Contact Info Sidebar */}
    <AnimatePresence>
      {showUserInfo && (
        <motion.div
          className="user-info w-5/12 h-screen overflow-y-auto transition-all bg-white shadow-lg border-l"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
        >
          <ContactInfoPage
            currentFriend={currentFriend}
            userIsActive={userIsActive}
            showUserInfo={showUserInfo}
            setShowUserInfo={setShowUserInfo}
            friendName={friendName}
            friendImage={friendImage}
            messages={messages}
            friendID={friendID}
            friendProfileDetails={friendProfileDetails}
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};

export default ChatContent;
