import React, { useEffect, useRef } from "react";
import { FaTimes, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NewGroupModal = ({
  isOpen,
  onClose,
  setIsNewGroup,
  defaultGroup,
  FilterAddFriendsToGroup,
  setFilterFriends,
  selectedFriends,
  defaultfriendImage,
  setSelectedFriends,
  filteredFriends,
  handleSelectFriend,
  userAddedIcon,
}) => {
  const backdropRef = useRef();

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-end  justify-center bg-black bg-opacity-50 py-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className=" rounded-2xl shadow-xl p-6 w-full max-w-md relative bg-white"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="GroupInfo w-full flex flex-col justify-between gap-7">
              <div
                className="close w-full items-end"
                onClick={() => setIsNewGroup(false)}
              >
                <FaArrowLeft className="text-black" />
              </div>
              <div className="GroupImage items-center w-full flex justify-center">
                <div className="relative image w-fit hover:bg-slate-800">
                  <img src={defaultGroup} alt="" width={80} />
                  <div className="changeIcon absolute bottom-0 -right-1 items-center flex justify-center">
                    <div className="editInner bg-gray-700 rounded-full p-2 flex items-center justify-center">
                      <FaEdit className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="GroupNameDescription w-full flex items-center gap-3 flex-col">
                <div className="groupName w-full flex items-center">
                  <label
                    htmlFor="groupName"
                    className="text-nowrap font-bold text-black text-md"
                  >
                    Group Name:{" "}
                  </label>
                  <input
                    type="text"
                    id="groupName"
                    name="groupName"
                    placeholder="Enter group name"
                    className="border-black border-2 w-full rounded-2xl bg-white px-2 placeholder:text-gray-400"
                  />
                </div>
                <FilterAddFriendsToGroup setFilterFriends={setFilterFriends} />
                <div className="addFriends w-full">
                  <div className="addedFriends flex items-center">
                    {selectedFriends.length === 0 ? (
                      <div className="friends mb-8"></div>
                    ) : (
                      <div className="friends flex items-center w-full justify-between">
                        {selectedFriends.length > 0 && (
                          <div className="selected-friends flex space-x-2 mb-4">
                            {selectedFriends.map((f, idx) => (
                              <div>
                                <img
                                  key={idx}
                                  src={f.image ? f.image : defaultfriendImage}
                                  alt={f.fname}
                                  className="w-10 h-10 rounded-full border-2 border-green-400"
                                />
                                <h2 className="text-sm font-light">
                                  {f.fname}
                                </h2>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="clearAll">
                          <FaTrash
                            onClick={() => setSelectedFriends([])}
                            className="text-red-400"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="addFriends">
                    <div className="friends overflow-y-scroll">
                      {filteredFriends.map((friend, i) => (
                        <div
                          key={i}
                          className="shadow-lg rounded-full ring-2 w-full ring-white flex mt-2 items-center justify-between px-2"
                          onClick={() => {
                            handleSelectFriend(friend.friendInfo);
                          }}
                        >
                          <div className="imageName flex w-full">
                            <div className="friendImage">
                              <img
                                src={
                                  friend.friendInfo.image
                                    ? friend.friendInfo.image
                                    : defaultfriendImage
                                }
                                alt=""
                                width={60}
                                height={60}
                              />
                            </div>
                            <div className="friendNameInfo flex flex-col text-sm">
                              <div className="name">
                                <h4 className="font-bold">
                                  {friend.friendInfo.fname
                                    .charAt(0)
                                    .toUpperCase() +
                                    friend.friendInfo.fname.slice(1)}
                                </h4>
                              </div>
                              <div className="bio">
                                <p>
                                  {friend.friendInfo.bio
                                    ? friend.friendInfo.bio
                                    : "Lets Chat on fort....😁"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* {selectedFriends.friendInfo._id.includes(
                          friend.friendInfo._id
                        ) ||
                        selectedFriends.friendInfo._id.includes(friend._id) ? (
                          <div className="addedIcon">
                            <FaMarkdown />
                          </div>
                        ) : (
                          ""
                        )} */}
                          {selectedFriends.length > 0 &&
                          friend.friendInfo &&
                          selectedFriends.some(
                            (f) => f._id === friend.friendInfo._id
                          ) ? (
                            <div className="addedIcon flex items-end ">
                              <img
                                src={userAddedIcon}
                                width={20}
                                height={20}
                                alt=""
                                className="text-white bg-green-600 accent-white fill-white"
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewGroupModal;
