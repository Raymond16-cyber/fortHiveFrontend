import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaUser, FaEllipsisH, FaHome, FaCog } from "react-icons/fa";
import defaultfriendImage from "../../../assets/defaultfriend.jpeg";
import ActiveFriends from "../chatcontactList/ActiveFriends";
import Friends from "../chatcontactList/Friends";
import NewChatModal from "./modals/NewChatModal";
import Filter from "../FilterFriends/Filter";
import NewGroupModal from "./modals/NewGroupModal";
import defaultGroup from "../../../assets/defaultGroup.avif";
import FilterAddFriendsToGroup from "../FilterFriends/filterAddFriendsToGroup";
import userAddedIcon from "../../../assets/userAdded.svg";
import NewEcoChatModal from "./modals/NewEcoChatModal";
import chatBox from "../../../assets/chatbox.svg";
import phoneBooks from "../../../assets/phonebook.svg";
import users from "../../../assets/users.svg";
import community from "../../../assets/community.svg";

const FriendListPU = ({
  AddFriends,
  showMenuOptions,
  pickerRef,
  options,
  messages,
  friends,
  setCurrentFriend,
  currentFriend,
  smallScreen,
  userIsActive,
  socketMessages,
  myInfo,
  friendProfileDetails,
  changeProfileDetails,
  showUserProfilePage,
  setShowUserProfilePage,
  handleShowUserProfilePage,
  setShowUserSettings
  
}) => {
  const [userFriends, setUserFriends] = useState(friends);
  const [filterFriends, setFilterFriends] = useState("");

  // know when to goback
  const [isNewConversation, setIsNewConversation] = useState(false);
  const [isNewContact, setIsNewContact] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isEcoChat, setIsNewEcoChat] = useState(false);

  // models
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  // User create actions states
  const [startNewConversation, setStartNewConversation] = useState(false);
  const [addNewContact, setAddNewContact] = useState(false);
  const [createNewGroup, setCreateNewGroup] = useState(false);
  const [createNewEcoChat, setCreateNewEcoChat] = useState(false);

  // user add friends to group
  const [selectedFriends, setSelectedFriends] = useState([]);

  // Show tooltips
  const [hovered, setHovered] = useState(false);

  const filteredFriends = userFriends.filter((friend) => {
    const name =
      `${friend.friendInfo.fname} ${friend.friendInfo.lname}`.toLowerCase();
    return name.includes(filterFriends.toLowerCase());
  });

  console.log("filtered friends", userFriends);
  console.log("the friends", friends);
  console.log("selected friends to group", selectedFriends);
  console.log("slogging filter friends", filterFriends);

  useEffect(() => {
    setUserFriends(friends);
  }, [friends]);

  const newConversation = () => {
    setStartNewConversation(true);
    setIsNewConversation(true);
  };
  const newContact = () => {
    setAddNewContact(true);
    setIsNewContact(true);
  };
  const newGroup = () => {
    setCreateNewGroup(true);
    // setIsNewChatModalOpen(false);
    setIsNewGroup(true);
  };
  const newEcoChat = () => {
    setCreateNewEcoChat(true);
    setIsNewEcoChat(true);
  };

  const handleSelectFriend = (friendInfo) => {
    setSelectedFriends((prev) => {
      const alreadySelected = prev.find((f) => f._id === friendInfo._id);
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {/* Sidebar */}
      <div className="w-16 bg-white border-r flex flex-col items-center py-4 space-y-6 shadow-md">
        <div className="relative group">
          <button className="p-3 rounded-full hover:bg-gray-200 transition">
            <FaHome className="text-xl text-gray-700" />
          </button>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs rounded px-2 py-1 shadow z-10 whitespace-nowrap">
            Home
          </span>
        </div>
        <div className="relative group">
          <button className="p-3 rounded-full hover:bg-gray-200 transition"
          onClick={handleShowUserProfilePage}>
            <FaUser className="text-xl text-gray-700" />
          </button>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs rounded px-2 py-1 shadow z-10 whitespace-nowrap">
            Profile
          </span>
        </div>
        <div className="relative group">
          <motion.button
            className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={() => setIsNewChatModalOpen(true)}
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="text-xl" />
          </motion.button>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs rounded px-2 py-1 shadow z-10 whitespace-nowrap">
            New Chat
          </span>
        </div>
        <div className="relative group mt-auto" 
        onClick={() => setShowUserSettings(true)}>
          <button className="p-3 rounded-full hover:bg-gray-200 transition">
            <FaCog className="text-xl text-gray-700" />
          </button>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs rounded px-2 py-1 shadow z-10 whitespace-nowrap">
            Settings
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
            Fort Chat
          </h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search friends..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={filterFriends}
              onChange={(e) => setFilterFriends(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Active Friends */}
        <div className="flex items-center gap-4 px-6 py-3 bg-white border-b overflow-x-auto">
          {/* User's own story */}
          <div className="flex flex-col items-center mr-2">
            <div className="w-12 h-12 rounded-full  border-2 border-blue-500 flex items-center justify-center relative">
              <img
                src={
                  friendProfileDetails._id === myInfo._id &&
                  friendProfileDetails.image
                    ? `/userProfilePic/${friendProfileDetails.image}`
                    : myInfo.image
                    ? `/userProfilePic/${myInfo.image}`
                    : defaultfriendImage
                }
                alt="pic"
                className="w-full h-full object-cover"
              />
              <button
                className="absolute bottom-0 -right-2 bg-blue-600 text-white rounded-full p-1 border-2 border-white"
                onClick={() => setIsNewChatModalOpen(true)}
              >
                <FaPlus className="text-xs" />
              </button>
            </div>
            <span className="text-xs mt-1 font-medium text-gray-700">
              Your Story
            </span>
          </div>
          {/* Active Friends */}
          {userIsActive && userIsActive.length > 0 ? (
            userIsActive.map((user) => (
              <ActiveFriends
                key={user.userId}
                user={user}
                currentFriend={currentFriend}
                setCurrentFriend={setCurrentFriend}
                userIsActive={userIsActive}
                friendProfileDetails={friendProfileDetails}
              />
            ))
          ) : (
            <span className="text-sm text-gray-400 ml-2">
              No Active Friends
            </span>
          )}
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto bg-gray-50 w-full">
          <div className="py-4 w-full px-0">
            {" "}
            {/* <-- changed from max-w-2xl mx-auto py-4 w-full */}
            <h2 className="text-lg font-semibold text-gray-700 mb-2 px-6">
              Chats
            </h2>
            {filteredFriends.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-400 mx-6">
                {filterFriends.length === 0
                  ? "You don't have any friends at the moment"
                  : "No friends found matching your search."}
              </div>
            ) : (
              filteredFriends.map((friend, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setCurrentFriend(
                      friendProfileDetails._id === currentFriend._id
                        ? friendProfileDetails
                        : friend.friendInfo
                    )
                  }
                  className={`flex items-center gap-4 px-6 py-3 rounded-lg mb-2 cursor-pointer w-full transition ${
                    currentFriend?._id === friend.friendInfo._id
                      ? "bg-blue-100 border-l-4 border-blue-500"
                      : "bg-white hover:bg-blue-50"
                  }`}
                >
                  <Friends
                    friend={friend}
                    myInfo={myInfo}
                    friendProfileDetails={friendProfileDetails}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isNewChatModalOpen && (
        <NewChatModal
          isOpen={isNewChatModalOpen}
          onClose={() => setIsNewChatModalOpen(false)}
          chatBox={chatBox}
          newContact={newContact}
          phoneBooks={phoneBooks}
          newGroup={newGroup}
          users={users}
          community={community}
          newEcoChat={newEcoChat}
          newConversation={newConversation}
        />
      )}
      {isNewGroup && (
        <NewGroupModal
          isOpen={createNewGroup}
          onClose={() => setCreateNewGroup(false)}
          setIsNewGroup={setIsNewGroup}
          defaultGroup={defaultGroup}
          FilterAddFriendsToGroup={FilterAddFriendsToGroup}
          setFilterFriends={setFilterFriends}
          selectedFriends={selectedFriends}
          defaultfriendImage={defaultfriendImage}
          setSelectedFriends={setSelectedFriends}
          filteredFriends={filteredFriends}
          handleSelectFriend={handleSelectFriend}
          userAddedIcon={userAddedIcon}
          friendProfileDetails={friendProfileDetails}
        />
      )}
      {isEcoChat && (
        <NewEcoChatModal
          isOpen={newEcoChat}
          onClose={() => setCreateNewEcoChat(false)}
          setIsNewEcoChat={setIsNewEcoChat}
          defaultCommunity={defaultGroup}
          FilterAddFriendsToGroup={FilterAddFriendsToGroup}
          setFilterFriends={setFilterFriends}
          selectedFriends={selectedFriends}
          setSelectedFriends={setSelectedFriends}
          defaultfriendImage={defaultfriendImage}
          filterFriends={filterFriends}
          filteredFriends={filteredFriends}
          handleSelectFriend={handleSelectFriend}
          userAddedIcon={userAddedIcon}
          friendProfileDetails={friendProfileDetails}
        />
      )}
    </div>
  );
};

export default FriendListPU;
