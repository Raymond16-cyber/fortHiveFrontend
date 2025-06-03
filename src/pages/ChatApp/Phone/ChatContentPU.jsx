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
}) => {
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
          />
        ) : (
          <div className="ChatVIewInner w-full h-screen flex flex-col overflow-y-auto justify-between bg-slate-100">
            <div className="chatHeader text-black bg-white flex justify-between px-4 sticky top-0 z-999 items-center py-2 border-b border-slate-200">
              <div className="image-name-info flex items-center gap-4 ">
                <button
                  onClick={backToFriendList}
                  className="p-4 bg-slate-100 rounded-xl hover:bg-cyan-700 transition duration-300 ease-in-out flex items-center justify-center hover:text-white text-lg w-fit h-fit"
                >
                  <FaAngleLeft />
                </button>
                <img src={friendImage} alt="friendpic" className="w-8" />
                <div
                  onClick={() => setShowUserInfo(true)}
                  className=" cursor-pointer"
                >
                  <h4>{friendName}</h4>
                  {/* <p className="text-xs font-thin">
                  last seen: {new Date().toLocaleString()}
                </p> */}
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
                <button className="p-4 bg-slate-100 w-fit h-fit rounded-xl hover:bg-cyan-700 transition duration-300 ease-in-out flex items-center justify-center hover:text-white">
                  <FaPhoneAlt className="hover:bg-cyan-700" />
                </button>
                <button className="p-4 bg-slate-100 w-fit h-fit rounded-xl hover:bg-cyan-700 transition duration-300 ease-in-out flex items-center justify-center hover:text-white">
                  <FaVideo className="hover:bg-cyan-700" />
                </button>
              </div>
            </div>

            <div className="chatBody flex-1 overflow-y-scroll w-full">
              <MessageBody
                currentFriend={currentFriend}
                friendImage={friendImage}
                messages={messages}
              />
            </div>

            <div className="sticky bottom-0 z-10 bg-slate-100">
              <div className="chatForm :bg-slate-100">
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
            {/* <div>header</div>
            <div>body</div>
            <div>footer</div> */}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatContentPU;
