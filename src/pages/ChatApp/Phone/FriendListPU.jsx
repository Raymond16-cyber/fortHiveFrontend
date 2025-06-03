import React, { useState, useEffect } from "react";
import {
  FaEllipsisH,
  FaSearch,
  FaPlus,
  FaHome,
  FaUser,
  FaTimes,
  FaEdit,
  FaTrash,
  FaInfo,
  FaArrowLeft,
} from "react-icons/fa";
import defaultfriendImage from "../../../assets/defaultfriend.jpeg";
import ActiveFriends from "../chatcontactList/ActiveFriends";
import Friends from "../chatcontactList/Friends";
import NewChatModal from "./modals/NewChatModal";
import chatBox from "../../../assets/chatbox.svg";
import phoneBooks from "../../../assets/phonebook.svg";
import users from "../../../assets/users.svg";
import community from "../../../assets/community.svg";
import Filter from "../FilterFriends/Filter";
import NewGroupModal from "./modals/NewGroupModal";
import defaultGroup from "../../../assets/defaultGroup.avif";
import FilterAddFriendsToGroup from "../FilterFriends/filterAddFriendsToGroup";
import userAddedIcon from "../../../assets/userAdded.svg";
import NewEcoChatModal from "./modals/NewEcoChatModal";

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

  const filteredFriends = userFriends.filter((friend) => {
    const name =
      `${friend.friendInfo.fname} ${friend.friendInfo.lname}`.toLowerCase();
    return name.includes(filterFriends.toLowerCase());
  });

  console.log("filtered friends", userFriends);
  console.log("the friends", friends);
  console.log("selected friends to group", selectedFriends);

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

      if (alreadySelected) {
        return prev.filter((f) => f._id !== friendInfo._id);
      } else {
        return [...prev, friendInfo];
      }
    });
  };

  return (
    <div className="w-full bg-white h-screen flex flex-col relative overflow-hidden justify-between">
      {/* Header */}
      <div className="friendListHeader w-full flex justify-between items-center px-4 py-2 bg-white border-b border-white shadow-sm top-0 sticky z-10  flex-col">
        <div className="w-full flex justify-between items-center  bg-white border-b border-white">
          <div className="appName">
            <h1 className="text-2xl font-semibold">Fort</h1>
          </div>
          <div>
            <div className="relative w-6 h-6">
              {/* Search Icon */}
              <FaSearch
                onClick={() => setShowSearchInput(true)}
                className={`absolute top-0 left-0 w-full h-full text-xl text-black transition-all duration-300 ease-in-out transform 
        ${
          showSearchInput
            ? "opacity-0 scale-90 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
              />

              {/* Close Icon */}
              <FaTimes
                onClick={() => setShowSearchInput(false)}
                className={`absolute top-0 left-0 w-full h-full text-xl text-black transition-all duration-300 ease-in-out transform 
        ${
          showSearchInput
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
              />
            </div>
          </div>
        </div>

        <div className=" w-full">
          {showSearchInput ? (
            <Filter setFilterFriends={setFilterFriends} />
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col px-2 h-screen gap-1 w-full relative ">
        {/* friendlist area body */}
        <div className="chatBody gap-4 flex flex-col">
          {/* Online friend Status */}
          <div className="mt-4 flex items-center gap-4 overflow-x-auto px-4">
            {/* Add Story Box */}
            <div className="flex flex-col items-center">
              <div className="p-4 bg-slate-100 rounded-full">
                <FaPlus />
              </div>
              <p className="text-sm font-medium mt-1">Add Story</p>
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
                />
              ))
            ) : (
              <p className="text-sm text-gray-400 ml-2">No Active Friends</p>
            )}
          </div>

          <div className="friendlistChat flex justify-between items-center px-4 py-2 bg-white border-b border-white">
            <div>
              <h3 className="font-semibold">Chats</h3>
            </div>
            <div>
              <button>
                <FaEllipsisH className="text-lg font-medium" />
              </button>
            </div>
          </div>

          <div className="friendlist flex flex-col gap-1">
            {/* Friendslist */}
            {filteredFriends.length === 0 ? (
              <div className="border-t-2 mt-6 border-b-2 p-6">
                <p className="text-gray-400">
                  {filterFriends.length === 0
                    ? "You don't have any friends at the moment"
                    : "No friends found matching your search."}
                </p>
              </div>
            ) : (
              filteredFriends.map((friend, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentFriend(friend.friendInfo)}
                  className={
                    currentFriend?._id === friend.friendInfo._id
                      ? "current-friend-active"
                      : "current-friend"
                  }
                >
                  <Friends friend={friend} myInfo={myInfo} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* friendlist area footer */}
        <div className="chatFooter absolute right-9 bottom-16 rounded-full bg-black p-6 shadow-lg">
          <FaPlus className="text-white" />
        </div>
      </div>

      <div className="chatFooter bottom-0 sticky w-full flex justify-around items-center py-3 border z-10 shadow-sm bg-white border-t-gray-200">
        <div>
          <FaHome className="text-lg font-medium" />
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer bg-black text-white px-7 py-2 rounded-3xl hover:bg-gray-800 transition duration-300 ease-in-out"
          onClick={() => setIsNewChatModalOpen(true)}
        >
          <FaPlus className="text-sm font-medium" />
          <span className="text-md font-medium">New Chat</span>
        </div>

        {isNewGroup ? (
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
          />
        ) : isEcoChat ? (
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
           



        />
        ) : (
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

        <div>
          <FaUser className="text-lg font-medium" />
        </div>
      </div>
    </div>
  );
};

export default FriendListPU;
