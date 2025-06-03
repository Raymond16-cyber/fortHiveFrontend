import React, { useState } from "react";
import FriendListPage from "../AfterSideBar/FriendListPage";
import FriendListPU from "./FriendListPU";
import ChatContentPU from "./ChatContentPU";
// import applogo from "../../../assets/favicon.png";

const PhoneUi = ({
  AddFriends,
  showMenuOptions,
  pickerRef,
  options,
  ActiveFriends,
  friends,
  setCurrentFriend,
  currentFriend,
  Friends,
  smallScreen,
  sendMessage,
  inputHandle,
  newMessage,
  messages,
  sendEmoji,
  hiddenFileInput,
  handleFileChange,
  handleFileClick,
  userIsActive,
  showUserInfo,
  setShowUserInfo,
  typingMessages,
  socketMessages,
  myInfo

}) => {
  const backToFriendList = () => {
    setCurrentFriend(!currentFriend);
  };

  return currentFriend ? (
    <ChatContentPU
      currentFriend={currentFriend}
      inputHandle={inputHandle}
      newMessage={newMessage}
      sendMessage={sendMessage}
      messages={messages}
      sendEmoji={sendEmoji}
      hiddenFileInput={hiddenFileInput}
      handleFileClick={handleFileClick}
      handleFileChange={handleFileChange}
      backToFriendList={backToFriendList}
      userIsActive={userIsActive}
      showUserInfo={showUserInfo}
      setShowUserInfo={setShowUserInfo}
      typingMessages={typingMessages}
    />
  ) : (
    <FriendListPU
      AddFriends={AddFriends}
      showMenuOptions={showMenuOptions}
      pickerRef={pickerRef}
      options={options}
      ActiveFriends={ActiveFriends}
      friends={friends}
      setCurrentFriend={setCurrentFriend}
      currentFriend={currentFriend}
      Friends={Friends}
      smallScreen={smallScreen}
      userIsActive={userIsActive}
      socketMessages={socketMessages}
      myInfo={myInfo}
      messages={messages}
      

    />
  );
};

export default PhoneUi;
