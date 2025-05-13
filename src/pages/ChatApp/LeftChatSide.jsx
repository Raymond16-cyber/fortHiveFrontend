import React, { useState } from "react";
import {
  FaEdit,
  FaEllipsisH,
  FaPhoneAlt,
  FaRocketchat,
  FaVideo,
} from "react-icons/fa";
import ContactInfoPage from "./ContactInfoPage";
import Message from "./Message";
import MessageForm from "./MessageForm";

const ChatContent = () => {
  const [chatwidth, setChatWidth] = useState(false);

  return chatwidth ? (
    <div className="right-side w-9/12 h-screen flex">

      {/* Chat Panel */}
      <div className="chat-container w-8/12 h-full border flex flex-col">
        {/* Header */}
        <div className="chat-header p-2 flex justify-between items-center bg-cyan-900 text-white">
          <div className="image-name-info flex items-center gap-2">
            <img src="/images/userimage.png" alt="" className="w-8" />
            <div>
              <h4>Daniel</h4>
              <p className="text-xs font-thin">last seen: {new Date().toLocaleString()}</p>
            </div>
          </div>
          <div className="icons-contact flex gap-4">
            <button><FaEllipsisH onClick={() => setChatWidth(!chatwidth)} /></button>
            <button><FaPhoneAlt /></button>
            <button><FaVideo /></button>
            <button><FaRocketchat /></button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto">
          <Message />
        </div>

        {/* Message Form */}
        <div className="border-t">
          <MessageForm />
        </div>
      </div>

      {/* Contact Info Sidebar */}
      <div className="user-info w-4/12 h-full overflow-y-auto">
        <ContactInfoPage />
      </div>
    </div>
  ) : (
    // Full-width Chat without sidebar
    <div className="chat-container w-full h-screen flex flex-col">
      {/* Header */}
      <div className="chat-header p-2 flex justify-between items-center bg-cyan-900 text-white">
        <div className="image-name-info flex items-center gap-2">
          <img src="/images/userimage2.png" alt="" width={65} />
          <div>
            <h4>Daniel</h4>
            <p className="text-xs font-thin">last seen: {new Date().toLocaleString()}</p>
          </div>
        </div>
        <div className="icons-contact flex gap-4">
          <button><FaEllipsisH className="text-white" onClick={() => setChatWidth(!chatwidth)} /></button>
          <button><FaPhoneAlt className="text-white" /></button>
          <button><FaVideo className="text-white" /></button>
          <button><FaRocketchat className="text-white" /></button>
        </div>
      </div>

      {/* Message List */}
      <div className="">
        <Message />
      </div>

      {/* Message Form */}
      <div className="border-t sticky ">
        <MessageForm />
      </div>
    </div>
  );
};

export default ChatContent;
