import React, { useState } from "react";
import { FaArrowLeft, FaCaretDown, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ParticularFriendInfoPU = ({
  currentFriend,
  userIsActive,
  setShowUserInfo,
  friendImage,
  friendName,
  messages,
  friendProfileDetails,
  friendID,
}) => {
  const [showMedia, setShowMedia] = useState(false);

  // function to show media
  const showContactMedia = () => {
    setShowMedia(!showMedia);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="friend-info flex flex-col w-full h-full bg-white"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 px-4 py-3 bg-blue-600 text-white shadow">
          <FaArrowLeft
            className="text-2xl cursor-pointer"
            onClick={() => setShowUserInfo(false)}
          />
          <span className="font-semibold text-lg">Contact Info</span>
        </div>

        <div className="officialStatus">
          {friendProfileDetails?._id === friendID ? (
            <p className="text-gray-700">
              { currentFriend.status === "online"
                ? "🟢"
                : friendProfileDetails.status ||
                  currentFriend.status === "offline"
                ? "⚪ "
                :  currentFriend.status === "away"
                ? "🟡"
                : "🔴"}{" "}
              <span>{currentFriend.status}</span>
            </p>
          ) : (
            <p className="text-gray-400">{currentFriend.status}</p>
          )}
        </div>

        {/* Avatar and Name */}
        <div className="flex flex-col items-center py-6 bg-gradient-to-b from-green-50 to-white">
          <div className="w-24 h-24 rounded-full  border-4 border-blue-600 shadow mb-2 relative">
            <img
              src={
                friendProfileDetails?._id === friendID &&
                friendProfileDetails.image
                  ? `/userProfilePic/${friendProfileDetails.image}`
                  : `/userProfilePic/${friendImage}`
              }
              alt="friendpic"
              className="w-full h-full object-cover"
            />

            <div className="absolute right-0 bottom-0 ">
              {friendProfileDetails?._id === friendID &&
              friendProfileDetails.status === "online"
                ? "🟢"
                : friendProfileDetails.status === "offline"
                ? "⚪"
                : friendProfileDetails.status === "away"
                ? "🟡"
                : "🔴"}
            </div>
          </div>
          <h4 className="font-bold text-xl text-gray-800 mb-1">
            {friendProfileDetails?._id === friendID
              ? friendProfileDetails.fname
              : friendName}
          </h4>
          {userIsActive?.some((user) => user.userId === currentFriend._id) ? (
            <span className="text-green-600 text-sm font-semibold">online</span>
          ) : (
            <span className="text-gray-400 text-sm font-semibold">offline</span>
          )}
        </div>

        {/* Info Sections */}
        <div className="flex-1 flex flex-col gap-4 px-4 py-4">
          {/* Customize Chat */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3">
            <span className="text-gray-700 font-medium">Customize Chat</span>
            <FaCaretDown className="text-blue-600" />
          </div>

          {/* Privacy and Support */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3">
            <span className="text-gray-700 font-medium">Privacy & Support</span>
            <FaCaretDown className="text-blue-600" />
          </div>

          {/* Shared Media */}
          <div className="bg-gray-100 rounded-lg px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-medium">Shared Media</span>
              <FaCaretDown
                onClick={showContactMedia}
                className={`text-blue-600 cursor-pointer transition-transform duration-300 ${
                  showMedia ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {showMedia && (
              <div className="gallery w-full max-h-48 overflow-y-auto mt-2">
                <div className="grid grid-cols-3 gap-2">
                  {messages &&
                  messages.length > 0 &&
                  messages.some((msg) => msg?.message?.image) ? (
                    messages.map(
                      (message, index) =>
                        message?.message?.image && (
                          <img
                            key={index}
                            src={`/userSentImages/${message.message.image}`}
                            alt={`shared-${index}`}
                            className="w-full h-20 object-cover rounded"
                          />
                        )
                    )
                  ) : (
                    <p className="text-gray-400 text-sm col-span-3">No media</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ParticularFriendInfoPU;
