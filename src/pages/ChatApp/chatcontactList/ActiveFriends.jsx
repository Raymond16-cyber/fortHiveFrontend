import React from "react";
import "../../../css/ChatApp/ActiveFriends.css";
import defaultUser from "../../../assets/defaultUser.png"; // Ensure this path is correct

const ActiveFriends = ({ user, currentFriend, setCurrentFriend }) => {
  const showMessages = () => {
    setCurrentFriend({
      email: user.userInfo.email,
      fname: user.userInfo.fname,
      lname: user.userInfo.lname,
      _id: user.userInfo.id,
    });
  };

  return (
    <div
      className="flex flex-col items-center cursor-pointer min-w-[70px]"
      onClick={showMessages}
    >
      <div className="relative w-[60px] h-[60px] rounded-full bg-black border-double">
        <img
          src={user.userInfo.image ? user.userInfo.image : defaultUser}
          alt="friend"
          className="w-full h-full object-cover rounded-full ring-black"
        />
        <div className="absolute bottom-1 -right-1 w-4 h-4 bg-white border-2 border-white rounded-full z-10 p-1 items-center justify-center flex">
          <div className="absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-95"></div>
        </div>
      </div>

      <p className="text-xs mt-1 text-center">{user.userInfo.fname}</p>
    </div>
  );
};

export default ActiveFriends;
