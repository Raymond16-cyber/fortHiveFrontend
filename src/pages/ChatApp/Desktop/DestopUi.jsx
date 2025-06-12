import React, { useEffect } from "react";
import SideBar from "../SideBar";
import ChatContent from "../MessageBody/MessageContact";
import AddFriend from "../AddFriend/AddFriend";
import FriendListPage from "../AfterSideBar/FriendListPage";
import applogo from "../../../assets/favicon.png";
import "../../../css/ChatApp/Desktop/DesktopUI.css";

const DesktopUi = ({
  goBack,
  AddFriends,
  showMenuOptions,
  pickerRef,
  options,
  ActiveFriends,
  friends,
  setCurrentFriend,
  Friends,
  currentFriend,
  inputHandle,
  newMessage,
  sendMessage,
  messages,
  sendEmoji,
  hiddenFileInput,
  handleFileChange,
  myInfo,
  handleFileClick,
  redirectAddFriend,
  userIsActive,
  showUserInfo,
  setShowUserInfo,
  typingMessages,
  sendRequests,
  changeProfileDetails,
  setChangeProfileDetails,
  handleChangeProfileDetails,
  hiddenChangeImageFileChange,
  hiddenChangeImageFileClick,
  hiddenChangeImageFileInput,
  changeProfilePicture,
  setChangeProfilePicture,
  changeDetails,
  friendProfileDetails
}) => {
  return (
    <div className="AppContent row flex w-full bg-gradient-to-br from-blue-50 to-white  h-screen px-2">
      <div className="SideBar p-2 bg-gray-200 h-screen">
        <SideBar
          changeProfileDetails={changeProfileDetails}
          setChangeProfileDetails={setChangeProfileDetails}
          handleChangeProfileDetails={handleChangeProfileDetails}
          hiddenChangeImageFileChange={hiddenChangeImageFileChange}
          hiddenChangeImageFileClick={hiddenChangeImageFileClick}
          hiddenChangeImageFileInput={hiddenChangeImageFileInput}
          changeProfilePicture={changeProfilePicture}
          setChangeProfilePicture={setChangeProfilePicture}
          changeDetails={changeDetails}
          myInfo={myInfo}
          friendProfileDetails={friendProfileDetails}
          
        />
      </div>
      {redirectAddFriend ? (
        <AddFriend goBack={goBack} sendRequests={sendRequests} />
      ) : (
        <FriendListPage
          AddFriends={AddFriends}
          showMenuOptions={showMenuOptions}
          pickerRef={pickerRef}
          options={options}
          ActiveFriends={ActiveFriends}
          friends={friends}
          setCurrentFriend={setCurrentFriend}
          currentFriend={currentFriend}
          Friends={Friends}
          userIsActive={userIsActive}
          myInfo={myInfo}
          changeProfileDetails={changeProfileDetails}
          setChangeProfileDetails={setChangeProfileDetails}
          handleChangeProfileDetails={handleChangeProfileDetails}
          hiddenChangeImageFileChange={hiddenChangeImageFileChange}
          hiddenChangeImageFileClick={hiddenChangeImageFileClick}
          hiddenChangeImageFileInput={hiddenChangeImageFileInput}
          friendProfileDetails={friendProfileDetails}
          />
        )}
      {/* The chat body */}

      {currentFriend ? (
        <ChatContent
          currentFriend={currentFriend}
          inputHandle={inputHandle}
          newMessage={newMessage}
          sendMessage={sendMessage}
          messages={messages}
          sendEmoji={sendEmoji}
          hiddenFileInput={hiddenFileInput}
          handleFileClick={handleFileClick}
          handleFileChange={handleFileChange}
          showUserInfo={showUserInfo}
          setShowUserInfo={setShowUserInfo}
          userIsActive={userIsActive}
          typingMessages={typingMessages}
          friends={friends}
          friendProfileDetails={friendProfileDetails}
        />
      ) : (
        <div className="SubImage w-full items-center flex justify-center">
          <img src={applogo} alt="" width={400} />
        </div>
      )}
    </div>
  );
};

export default DesktopUi;
