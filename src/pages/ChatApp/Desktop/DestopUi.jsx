import React from "react";
import SideBar from "../SideBar";
import ChatContent from "../MessageBody/MessageContact";
import AddFriend from "../AddFriend/AddFriend";
import FriendListPage from "../AfterSideBar/FriendListPage";
import applogo from "../../../assets/favicon.png";
import "../../../css/ChatApp/Desktop/DesktopUI.css"

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
  sendRequests
  
}) => {
  return (
    <div className="AppContent row flex w-full bg-white h-screen">
      <div className="SideBar p-2 bg-gray-200 h-screen">
        <SideBar />
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
