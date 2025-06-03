import React, { useState } from "react";
import { FaArrowLeft, FaCaretSquareUp, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ParticularFriendInfoPU = ({
  currentFriend,
  userIsActive,
  setShowUserInfo,
  friendImage,
  friendName,
  messages,
}) => {
  const [showMedia, setShowMedia] = useState(false);

  // function to show media
  const showContactMedia = () => {
    setShowMedia(!showMedia);
  };

  const friendID = currentFriend?._id || currentFriend?.friendInfo?._id;
  return (
    <AnimatePresence>
      <motion.div
        className="friend-info flex flex-col w-full text-xl p-2"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
      >
        <div>
          <FaArrowLeft
            className="text-gray-400"
            onClick={() => setShowUserInfo(false)}
          />
          {messages && messages.some((msg) => msg.senderID === friendID) ? (
            ""
          ) : (
            <FaInfoCircle className="text-sm" />
          )}
        </div>
        <div className="image-name flex flex-col  w-full items-center justify-center">
          <div className="image">
            {/* the image i put below is placeholder,so on real time,it'd be {currentFriend.image} */}
            <img src={friendImage} alt="friendpic" width={100} />
          </div>
          <div className="name">
            <h4 className="">{friendName}</h4>
          </div>
          {/* Online/Offline Status */}
          {userIsActive?.some((user) => user.userId === currentFriend._id) ? (
            <p className="text-sm text-green-500">online</p>
          ) : (
            <p className="text-sm text-gray-400">offline</p>
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
      </motion.div>
    </AnimatePresence>
  );
};

export default ParticularFriendInfoPU;
