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
}) => {
  const [showMedia, setShowMedia] = useState(false);

  // function to show media
  const showContactMedia = () => {
    setShowMedia(!showMedia);
  };
  return (
    <div className="friend-info flex flex-col w-full text-xl p-2 cursor-default">
      {/* Header */}
      <div className="leaveFriendInfoPage h-7 flex items-center justify-between">
        <FaTimes
          className="text-slate-700 hover:text-red-400 text-lg hover:text-xl"
          onClick={() => setShowUserInfo(false)}
        />
        {messages && messages.some((msg) => msg.senderID === friendID) ? (
          ""
        ) : (
          <FaInfoCircle className="text-sm" />
        )}
      </div>
      <div className="image-name flex flex-col  w-full items-center justify-center mb-3">
        <div className="image">
          {/* the image i put below is placeholder,so on real time,it'd be {currentFriend.image} */}
          <img src={friendImage} alt="friendpic" width={100} />
        </div>
        <div className="name">
          <h4 className="font-bold">{friendName}</h4>
        </div>
        {messages && messages.some((msg) => msg.senderID === friendID) ? (
          userIsActive?.some((user) => user.userId === currentFriend._id) ? (
            <p className="text-sm text-green-700">online</p>
          ) : (
            <p className="text-sm text-gray-400">offline</p>
          )
        ) : (
          <div className="flex items-end w-full justify-end">
            <p></p>
          </div>
        )}
      </div>

      {/* Other Info */}
      <div className="other-info flex flex-col w-full text-lg">
        <div className="custom-chat flex items-center justify-between">
          <h3 className="text-black text-lg font-semibold">Customize Chat</h3>
          <FaCaretSquareUp />
        </div>

        <div className="privacy flex items-center justify-between">
          <h3 className="text-black text-lg font-semibold">Privacy and Support</h3>
          <FaCaretSquareUp  />
        </div>

        <div className="media flex flex-col">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-black text-lg font-semibold">Shared Media</h3>
            <FaCaretSquareUp
              onClick={showContactMedia}
              className={`text-black cursor-pointer transform transition-transform duration-300 ${
                showMedia ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {showMedia && (
            <div className="gallery w-full max-h-64 overflow-y-auto mt-2">
              <div className="grid grid-cols-3 gap-2 p-2 bg-slate-900 rounded">
                {messages && messages.length > 0 ? (
                  messages.map(
                    (message, index) =>
                      message?.message?.image && (
                        <img
                          key={index}
                          src={`/userSentImages/${message.message.image}`}
                          alt={`shared-${index}`}
                          className="w-full h-24 object-cover rounded"
                        />
                      )
                  )
                ) : (
                  <p className="text-white text-sm col-span-3">No media</p>
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
