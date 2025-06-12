import React, { useRef, useState, useEffect } from "react";
import {
  FaEllipsisH,
  FaCog,
  FaSistrix,
  FaPlusCircle,
  FaPlus,
} from "react-icons/fa";
import { LogOut } from "lucide-react";
import Friends from "../chatcontactList/Friends";
import ActiveFriends from "../chatcontactList/ActiveFriends";
import "../../../css/ChatApp/FriendListPage.css";
import Filter from "../FilterFriends/Filter";

const FriendListPage = ({
  AddFriends,
  showMenuOptions,
  options,
  friends,
  setCurrentFriend,
  currentFriend,
  userIsActive,
  myInfo,
  changeProfileDetails,
  setChangeProfileDetails,
  handleChangeProfileDetails,
  hiddenChangeImageFileChange,
  hiddenChangeImageFileClick,
  hiddenChangeImageFileInput,
  friendProfileDetails,
}) => {
  const [hideOptions, setHideOptions] = useState(false);
  const [userFriends, setUserFriends] = useState(friends);
  const [filterFriends, setFilterFriends] = useState("");
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setHideOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredFriends = userFriends.filter((friend) => {
    console.log("from filter", friend);

    const name =
      `${friend.friendInfo.fname} ${friend.friendInfo.lname}`.toLowerCase();
    return name.includes(filterFriends.toLowerCase());
  });

  console.log("filtered friends", userFriends);
  console.log("currentFriend", currentFriend);

  useEffect(() => {
    setUserFriends(friends);
  }, [friends]);

  // const search = (e) => {
  //   const getFriendClass = document.getElementsByClassName("user-contact-scroll");
  //   const getFriendClass2 = document.getElementsByClassName("fdName");

  //   for (let i = 0; i < getFriendClass.length; i++) {
  //     const friend = getFriendClass[1]
  //   }
  // };

  console.log("friendProfileDetails", friendProfileDetails);

return (
  <div className="flex flex-col h-screen w-full sm:w-3/12 md:3/12   bg-gradient-to-br from-blue-50 to-white">
    {/* Header */}
    <div className="sticky top-0 z-10 bg-white shadow flex items-center justify-between px-6 py-4 border-b l">
      <h2 className="font-extrabold text-2xl text-blue-700 tracking-tight">Chats</h2>
      <div className="flex items-center gap-3">
        <button
          className="hover:bg-blue-100 p-2 rounded-full transition"
          onClick={() => setHideOptions(!hideOptions)}
        >
          <FaEllipsisH className="text-blue-700 text-lg" />
        </button>
        <button
          className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          onClick={AddFriends}
        >
          <FaPlus className="text-base" />
          <span className="text-sm font-semibold">Add Friend</span>
        </button>
        {/* Options Dropdown */}
        {hideOptions && (
          <div
            className="absolute right-6 top-16 bg-white border rounded-lg shadow-lg z-30 p-4 min-w-[180px]"
            ref={pickerRef}
          >
            <h3 className="font-semibold mb-2">Theme</h3>
            <p className="text-sm text-gray-500">Dark Mode Coming Soon...</p>
          </div>
        )}
      </div>
    </div>

    {/* Search */}
    <div className="px-6 py-3 bg-white border-b">
      <Filter setFilterFriends={setFilterFriends} />
    </div>

    {/* Active Friends */}
    <div className="flex items-center gap-4 px-6 py-4 bg-white border-b overflow-x-auto">
      {userIsActive && userIsActive.length > 0 ? (
        userIsActive.map((user) => (
          <ActiveFriends
            key={user.userId}
            user={user}
            currentFriend={currentFriend}
            setCurrentFriend={setCurrentFriend}
            userIsActive={userIsActive}
            friendProfileDetails={friendProfileDetails}
            userFriends={userFriends}
          />
        ))
      ) : (
        <p className="text-sm text-gray-400 ml-2">No Active Friends</p>
      )}
    </div>

    {/* Friends List */}
    <div className="flex-1 overflow-y-auto px-0 py-4 bg-gradient-to-br from-white to-blue-50">
      {filteredFriends.length === 0 ? (
        <div className="mx-8 mt-10 bg-white rounded-xl shadow p-8 text-center text-gray-400">
          {filterFriends.length === 0
            ? "You don't have any friends at the moment"
            : "No friends found matching your search."}
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-4">
          {filteredFriends.map((friend, i) => (
            <div
              key={i}
              onClick={() => setCurrentFriend(friend.friendInfo)}
              className={`transition-all duration-150 rounded-xl cursor-pointer shadow-sm border
                ${
                  currentFriend?._id === friend.friendInfo._id
                    ? "bg-blue-100 border-blue-500 ring-2 ring-blue-200"
                    : "bg-white hover:bg-blue-50 border-transparent"
                }
                `}
              style={{ minHeight: "72px" }}
            >
              <Friends
                friend={friend}
                myInfo={myInfo}
                friendProfileDetails={friendProfileDetails}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
};

export default FriendListPage;
