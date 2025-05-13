import React from "react";
import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import "../../css/ChatApp/ChatApp.css";
import ActiveFriends from "./ActiveFriends";
import Friends from "./Friends";
import SideBar from "./SideBar";
import ChatContent from "./LeftChatSide";

const MainChat = () => {
  return (
    <div className="messenger w-full h-screen bg-white">
      <div className="row h-full flex w-full">
        <div className="side-bar">
        <SideBar />

        </div>
        <div className="col border w-full sm:w-3/12">
          <div className="leftSide flex flex-col px-2 h-screen gap-1">
            <div className="leftSideTop flex flex-row justify-between items-center">
              <div className="flex justify-center items-center">
                <h2 className="font-bold text-2xl ">Chats</h2>
              </div>
            </div>

            {/* searchfriend */}
            <div className="friendSearch w-full ">
              <div className="relative w-full">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search friends..."
                  className="w-full pl-4 pr-10 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-600"
                >
                  <FaSistrix />
                </button>
              </div>
            </div>

            {/* Users active friends */}
            <div className="activeFriends mb-2">
              <ActiveFriends />
            </div>

            <div className="user-contact-scroll  friends overflow-y-scroll">
              <div className="hoverFriend">
                <Friends />
              </div>
              <div className="hoverFriend">
                <Friends />
              </div>
              <div className="hoverFriend">
                <Friends />
              </div>
              <div className="hoverFriend">
                <Friends />
              </div>
              <div className="hoverFriend">
                <Friends />
              </div>
              <div className="hoverFriend">
                <Friends />
              </div>
              <div className="hoverFriend">
                <Friends />
              </div>
              <div className="hoverFriend">
                <Friends />
              </div>
              <div className="hoverFriend">
                <Friends />
              </div>
              <div className="hoverFriend">
                <Friends />
              </div>
              <div className="hoverFriend">
                <Friends />
              </div>
              <div className="hoverFriend">
                <Friends />
              </div>
            </div>
          </div>
        </div>



        

        <ChatContent />

      </div>
    </div>
  );
};

export default MainChat;
