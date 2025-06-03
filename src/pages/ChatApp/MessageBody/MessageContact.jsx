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
}) => {
  console.log("from chatcontent", currentFriend);

  // firend info
  const friendImage =
    currentFriend?.image || currentFriend?.friendInfo?.image || pic;
  const friendName = currentFriend?.fname || currentFriend?.friendInfo?.fname;
  const friendID = currentFriend?._id || currentFriend?.friendInfo?._id;
  return (
    <div className="right-side w-9/12 h-screen sm:flex">
      {/* Chat Panel */}
      <div className="chat-container w-full h-screen border flex flex-col">
        {/*Chat Header */}
        <div className="chat-header p-2 flex justify-between items-center  bg-black text-white">
          <div
            className="image-name-info flex items-center gap-2 cursor-pointer"
            onClick={() => setShowUserInfo(true)}
          >
            <img src={friendImage} alt="friendpic" className="w-8" />
            <div>
              <h4>{friendName}</h4>
              {messages && messages.some((msg) => msg.senderID === friendID) ? (
                userIsActive?.some((user) => user.userId === friendID) ? (
                  typingMessages &&
                  typingMessages.msg &&
                  typingMessages?.senderID === friendID ? (
                    <p className="text-sm text-green-500">typing...</p>
                  ) : (
                    <p className="text-sm text-green-500">online</p>
                  )
                ) : (
                  <p className="text-sm text-gray-400">offline</p>
                )
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <div className="icons-contact flex gap-4">
            <button>
              <FaPhoneAlt />
            </button>
            <button>
              <FaVideo />
            </button>
          </div>
        </div>

        {/*Show Message Area */}
        <div className="h-full overflow-y-auto bg-white">
          <MessageBody
            currentFriend={currentFriend}
            messages={messages}
            friendImage={friendImage}
            friendName={friendName}
          />
        </div>

        {/* Message Form Send*/}
        <div className="border-t bg-slate-200 bottom-0 z-10">
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
            className="user-info w-5/12 h-screen overflow-y-auto transition-all "
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
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatContent;
