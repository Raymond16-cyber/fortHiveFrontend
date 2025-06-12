import React from "react";
import ParticularFriendInfo from "./ParticularFriendInfo";



const ContactInfoPage = ({ currentFriend,userIsActive,setShowUserInfo,friendName,friendImage,messages,friendID, friendProfileDetails }) => {
  return (
    <div className="user-info-right-side-bar w-full bg-gray-200 h-screen">
      <ParticularFriendInfo currentFriend={currentFriend} userIsActive={userIsActive} setShowUserInfo={setShowUserInfo} friendName={friendName} friendImage={friendImage} messages={messages} friendID={friendID} friendProfileDetails={friendProfileDetails} />
    </div>
  );
};

export default ContactInfoPage;
