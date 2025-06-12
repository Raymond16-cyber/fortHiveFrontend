import React, { useState } from "react";
import FriendListPage from "../AfterSideBar/FriendListPage";
import FriendListPU from "./FriendListPU";
import ChatContentPU from "./ChatContentPU";
import UserProfilePage from "./UserProfilePage/UserProfilePage";
import UserSettings from "./UserSettings/UserSettings";
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
  myInfo,
  friendProfileDetails,
  changeProfileDetails,
  setChangeProfileDetails,
  handleChangeProfileDetails,
  hiddenChangeImageFileChange,
  hiddenChangeImageFileClick,
  hiddenChangeImageFileInput,
  changeProfilePicture,
  setChangeProfilePicture,
  changeDetails,
}) => {
  const backToFriendList = () => {
    setCurrentFriend(!currentFriend);
  };

  // Show User Profile Page
  const [showUserProfilePage, setShowUserProfilePage] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const handleShowUserProfilePage = () => {
    setShowUserProfilePage(true);
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
      friends={friends}
      friendProfileDetails={friendProfileDetails}
      myInfo={myInfo}
    />
  ) : showUserProfilePage ? (
    <UserProfilePage
      changeProfileDetails={changeProfileDetails}
      setChangeProfileDetails={setChangeProfileDetails}
      handleChangeProfileDetails={handleChangeProfileDetails}
      hiddenChangeImageFileChange={hiddenChangeImageFileChange}
      hiddenChangeImageFileClick={hiddenChangeImageFileClick}
      hiddenChangeImageFileInput={hiddenChangeImageFileInput}
      changeProfilePicture={changeProfilePicture}
      setChangeProfilePicture={setChangeProfilePicture}
      changeDetails={changeDetails}
      friendProfileDetails={friendProfileDetails}
      setShowUserProfilePage={setShowUserProfilePage}
    />
  ) : showUserSettings ? (
    <UserSettings
      handleShowUserProfilePage={handleShowUserProfilePage}
      setShowUserSettings={setShowUserSettings}
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
      changeProfileDetails={changeProfileDetails}
      setChangeProfileDetails={setChangeProfileDetails}
      handleChangeProfileDetails={handleChangeProfileDetails}
      hiddenChangeImageFileChange={hiddenChangeImageFileChange}
      hiddenChangeImageFileClick={hiddenChangeImageFileClick}
      hiddenChangeImageFileInput={hiddenChangeImageFileInput}
      changeProfilePicture={changeProfilePicture}
      setChangeProfilePicture={setChangeProfilePicture}
      changeDetails={changeDetails}
      friendProfileDetails={friendProfileDetails}
      handleShowUserProfilePage={handleShowUserProfilePage}
      showUserProfilePage={showUserProfilePage}
      setShowUserProfilePage={setShowUserProfilePage}
      setShowUserSettings={setShowUserSettings}
    />
  );
};

export default PhoneUi;
