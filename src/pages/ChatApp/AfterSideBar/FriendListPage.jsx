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
  const name = `${friend.friendInfo.fname} ${friend.friendInfo.lname}`.toLowerCase();
  return name.includes(filterFriends.toLowerCase());
});

  console.log("filtered friends", userFriends);

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

  return (
    <div className="col border w-full sm:w-3/12 md:3/12 bg-white">
      <div className="leftSide flex flex-col px-2 h-screen gap-1 bg-gray-200">
        <div className="leftSideTop flex ">
          <div className="flex items-center w-full justify-between my-2">
            <div>
              <h2 className="font-bold text-2xl text-black">Chats</h2>
            </div>
            <div className="relative flex gap-3 items-center">
              <button
                className="hover:bg-black p-2 rounded-md hover:text-white shadow-lg"
                onClick={() => setHideOptions(!hideOptions)}
              >
                <FaEllipsisH className="text-black hover:text-white transition-all duration-300 ease-in-out transform " />
              </button>

              <div className="menu shadow-lg shadow-gray-200">
                {/* Only shows on Large screens */}
                <FaPlusCircle
                  className="hidden sm:flex "
                  onClick={AddFriends}
                />
              </div>
              <div
                className={
                  hideOptions
                    ? "themeLogout absolute top-10 left-24 -translate-x-1/2 whitespace-nowrap bg-black text-white z-30 px-2 w-fit font-bold gap-6"
                    : "themeLogoutshow flex flex-col"
                }
                ref={pickerRef}
              >
                <h3>Dark Mode </h3>
                {/* <div className="on flex items-center justify-between">
                  <label htmlFor="dark">ON</label>
                  <input type="radio" id="dark" value="dark" name="theme" />
                </div>
                <div className="off flex items-center gap-20">
                  <label htmlFor="white">OFF</label>
                  <input type="radio" id="white" value="white" name="theme" />
                </div> */}
                <p className="text-sm">Coming Soon....</p>
              </div>
            </div>
          </div>
        </div>

        {/* searchfriend */}
        <Filter setFilterFriends={setFilterFriends} />

        {/* Users active friends */}
        <div className="ActiveFriends mt-4 flex items-center gap-4 overflow-x-scroll px-4">
          {/* Add Story Box */}
          {/* <div className="flex flex-col items-center">
            <div className="p-4 bg-slate-100 rounded-full">
              <FaPlus />
            </div>
            <p className="text-sm font-medium mt-1">Add Story</p>
          </div> */}

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

        <div className="user-contact-scroll overflow-y-scroll">
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
    </div>
  );
};

export default FriendListPage;
