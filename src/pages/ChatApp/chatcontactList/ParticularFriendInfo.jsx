import React, { useState } from "react";
import { FaCaretSquareUp, FaInfoCircle, FaTimes } from "react-icons/fa";

const ParticularFriendInfo = ({
  currentFriend,
  userIsActive,
  setShowUserInfo,
  friendName,
  friendImage,
  messages,
  friendID,
  friendProfileDetails,
  pic = "/userProfilePic/defaultUser.png", // default image path
}) => {
  const [showMedia, setShowMedia] = useState(false);

  // function to show media
  const showContactMedia = () => {
    setShowMedia(!showMedia);
  };
  return (
  <div className="friend-info flex flex-col w-full h-full bg-white rounded-xl shadow-lg px-8 py-6 text-base">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <button
        className="p-2 rounded-full hover:bg-red-100 transition"
        onClick={() => setShowUserInfo(false)}
        title="Close"
      >
        <FaTimes className="text-slate-700 text-lg" />
      </button>
      <FaInfoCircle className="text-blue-400 text-xl" />
    </div>

    {/* Avatar and Name */}
    <div className="flex flex-col items-center mb-6">
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg mb-2">
        <img
          src={
            friendProfileDetails?._id === friendID && friendProfileDetails.image
              ? `/userProfilePic/${friendProfileDetails.image}`
              : friendImage
              ? `/userProfilePic/${friendImage}`
              : pic
          }
          alt="friendpic"
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="font-extrabold text-xl text-blue-700 mb-1">
        {friendProfileDetails?._id === friendID
          ? friendProfileDetails.fname
          : friendName}
      </h4>
      {messages && messages.some((msg) => msg.senderID === friendID) ? (
        userIsActive?.some((user) => user.userId === currentFriend._id) ? (
          <span className="text-green-600 text-sm font-semibold">Online</span>
        ) : (
          <span className="text-gray-400 text-sm font-semibold">Offline</span>
        )
      ) : (
        <span className="text-gray-300 text-xs">No recent activity</span>
      )}
    </div>

    {/* Sections */}
    <div className="flex flex-col gap-6">
      {/* Customize Chat */}
      <div className="flex items-center justify-between border-b pb-3">
        <span className="text-gray-700 font-semibold">Customize Chat</span>
        <FaCaretSquareUp className="text-blue-400" />
      </div>

      {/* Privacy and Support */}
      <div className="flex items-center justify-between border-b pb-3">
        <span className="text-gray-700 font-semibold">Privacy & Support</span>
        <FaCaretSquareUp className="text-blue-400" />
      </div>

      {/* Shared Media */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-semibold">Shared Media</span>
          <FaCaretSquareUp
            onClick={showContactMedia}
            className={`text-blue-400 cursor-pointer transform transition-transform duration-300 ${
              showMedia ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        {showMedia && (
          <div className="gallery w-full max-h-64 overflow-y-auto mt-2">
            <div className="grid grid-cols-3 gap-2 p-2 bg-slate-100 rounded-lg">
              {messages && messages.length > 0 ? (
                messages.some((msg) => msg?.message?.image) ? (
                  messages.map(
                    (message, index) =>
                      message?.message?.image && (
                        <img
                          key={index}
                          src={`/userSentImages/${message.message.image}`}
                          alt={`shared-${index}`}
                          className="w-full h-24 object-cover rounded shadow"
                        />
                      )
                  )
                ) : (
                  <p className="text-gray-400 text-sm col-span-3">No media</p>
                )
              ) : (
                <p className="text-gray-400 text-sm col-span-3">No media</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default ParticularFriendInfo;
