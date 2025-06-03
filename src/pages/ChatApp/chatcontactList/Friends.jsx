import React, { useState } from "react";
import "../../../css/ChatApp/Friends.css";
import defaultUserImage from "../../../assets/defaultUser.png";
import defaultfriendImage from "../../../assets/defaultfriend.jpeg";
import { FaAngleRight, FaCheck, FaCheckDouble } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import moment, { min } from "moment";
import seenUnseenLogo from "../../../assets/seenUnseenIcon.svg"; // Ensure this path is correct
import seenIcon from "../../../assets/seenIcon.svg";
import unseenIcon from "../../../assets/unseenIcon.svg";

const Friends = ({
  friend,
  smallScreen,
  socketMessages,
  messages,
  myInfo,
  currentFriend,
}) => {
  console.log("Checking for user Friends:", friend);
  console.log("FRIEND:", friend.friendInfo.fname, friend.messageInfo);

  const { friendInfo, messageInfo } = friend;

  if (!friend || !friendInfo) {
    return null; // or some kind of loading fallback or default UI
  }

  const friendID = friendInfo._id;

  const containerVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return smallScreen < 640 ? (
    <AnimatePresence>
      <motion.div
        className="friend flex items-center gap-2 p-2  hover:bg-slate-200 active:bg-slate-300 cursor-pointer justify-between"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="imagename flex items-center gap-5 w-full">
          <div className="friend-img">
            <div className="image shadow-lg rounded-full ring-2 ring-white">
              <img
                src={friendInfo.image ? friendInfo.image : defaultfriendImage}
                alt="/images/defaultfriend.jpeg"
                width={60}
                height={60}
                className=""
              />
            </div>
          </div>

          <div className="friend-name-seen flex flex-col w-full">
            <div className="friend-name flex flex-row items-center justify-between w-full">
              <h4
                className={
                  messageInfo?.senderID !== myInfo.id &&
                  messageInfo?.status !== "seen"
                    ? "unseenMessage fdName"
                    : "fdName"
                }
              >
                {friendInfo.fname}
              </h4>
              <span
                className="text-green-500 text-sm"
                style={{ fontSize: "0.7rem" }}
              >
                {messageInfo
                  ? moment(messageInfo.createdAt).startOf("minute").fromNow()
                  : moment(friendInfo.createdAt).startOf("minute").fromNow()}
              </span>
            </div>

            <div className="friend-message flex flex-row items-center gap-2 justify-between">
              <div>
                {messageInfo && messageInfo.senderID === myInfo?.id ? (
                  <span className="text-gray-500 text-sm">You: </span>
                ) : (
                  <span className="text-gray-500 text-sm">
                    {friendInfo.fname}:{" "}
                  </span>
                )}

                {messageInfo && messageInfo?.message?.text ? (
                  <span
                    className={
                      messageInfo?.senderID !== myInfo.id &&
                      messageInfo?.status !== "seen"
                        ? "unseenMessage"
                        : ""
                    }
                  >
                    {messageInfo?.message?.text?.length > 10
                      ? messageInfo?.message?.text?.slice(0, 10) + "..."
                      : messageInfo?.message?.text}
                  </span>
                ) : messageInfo?.message?.image ? (
                  <span
                    className={
                      messageInfo?.senderID !== myInfo.id &&
                      messageInfo?.status !== "seen"
                        ? "unseenMessage"
                        : ""
                    }
                  >
                    📷 image
                  </span>
                ) : (
                  <span className="text-gray-500 text-sm">
                    Connected you...
                  </span>
                )}
              </div>

              {myInfo?.id === messageInfo?.senderID ? (
                <div className="seenIcon rounded-full w-5 h-5 flex items-center justify-center">
                  {messageInfo?.status === "seen" ? (
                    <img
                      src={
                        currentFriend?.image
                          ? currentFriend.image
                          : defaultUserImage
                      }
                      className=""
                    />
                  ) : messageInfo?.status === "delivered" ? (
                    <div className="delivered">
                      <img src={seenIcon} className="text-gray-300" />
                    </div>
                  ) : (
                    <div className="unseen">
                      <FaCheck className=" text-sm" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="unSeenIcon">
                  {messageInfo?.status !== undefined &&
                  messageInfo?.status !== "seen" ? (
                    <div className="w-4 h-4 flex items-center justify-center bg-slate-700 rounded-full">
                      {" "}
                      <p></p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="goToMessage">
          <FaAngleRight className="text-black text-xl" />
        </div>
      </motion.div>
    </AnimatePresence>
  ) : (
    <div className="friend flex flex-row items-center gap-4 p-2  hover:bg-slate-200 active:bg-slate-300 cursor-pointer">
      <div className="friend-img">
        <div className="image shadow-md rounded-full ring-2 ring-cyan-700">
          <img
            src={friendInfo.image ? friendInfo.image : defaultUserImage}
            alt="/images/defaultfriend.jpeg"
            width={65}
            height={65}
            className=""
          />
        </div>
      </div>

      <div className="friend-name-seen w-full flex flex-col gap-1">
        <div className="friend-name flex flex-row items-center justify-between w-full">
          <h4
            className={
                  messageInfo?.senderID !== myInfo.id &&
                  messageInfo?.status !== "seen"
                    ? "unseenMessage fdName"
                    : "fdName"
                }
          >
            {friendInfo.fname}
          </h4>
          <span
            className="text-green-500 text-sm"
            style={{ fontSize: "0.7rem" }}
          >
            {messageInfo
              ? moment(messageInfo.createdAt).startOf("minute").fromNow()
              : moment(friendInfo.createdAt).startOf("minute").fromNow()}
          </span>
        </div>

        <div className="friend-message flex flex-row items-center gap-2 justify-between">
          <div>
            {messageInfo && messageInfo.senderID === myInfo?.id ? (
              <span className="text-gray-500 text-sm">You: </span>
            ) : (
              <span className="text-gray-500 text-sm">
                {friendInfo.fname}:{" "}
              </span>
            )}
            {messageInfo && messageInfo?.message?.text ? (
              <span
                className={
                  messageInfo?.senderID !== myInfo.id &&
                  messageInfo?.status !== "seen"
                    ? "unseenMessage"
                    : ""
                }
              >
                {messageInfo?.message?.text?.length > 10
                  ? messageInfo?.message?.text?.slice(0, 10) + "..."
                  : messageInfo?.message?.text}
              </span>
            ) : messageInfo?.message?.image ? (
              <span
                className={
                  messageInfo?.senderID !== myInfo.id &&
                  messageInfo?.status !== "seen"
                    ? "unseenMessage"
                    : ""
                }
              >
                📷 image
              </span>
            ) : (
              <span className="text-gray-500 text-sm">Connected you...</span>
            )}
          </div>

          {myInfo?.id === messageInfo?.senderID ? (
            <div className="seenIcon rounded-full w-5 h-5 flex items-center justify-center">
              {messageInfo?.status === "seen" ? (
                <img
                  src={
                    currentFriend?.image
                      ? currentFriend.image
                      : defaultUserImage
                  }
                  className=""
                />
              ) : messageInfo?.status === "delivered" ? (
                <div className="delivered">
                  <img src={seenIcon} className="text-gray-300" />
                </div>
              ) : (
                <div className="unseen">
                  <FaCheck className=" text-sm" />
                </div>
              )}
            </div>
          ) : (
            <div className="unSeenIcon">
              {messageInfo?.status !== undefined &&
              messageInfo?.status !== "seen" ? (
                <div className="w-4 h-4 flex items-center justify-center bg-slate-700 rounded-full">
                  {" "}
                  <p></p>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
