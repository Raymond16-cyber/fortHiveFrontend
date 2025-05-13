import React, { useEffect, useRef } from "react";
import "../../css/ChatApp/Message.css";

const Message = () => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8 h-[calc(100vh-150px)] gap-2">
      <div className="flex flex-col items-end">
        <div className="bg-cyan-900 text-white py-2 px-4 rounded-t-2xl rounded-bl-2xl max-w-xs">
          <p className="messagetext">How are you?</p>
        </div>
        <div className="text-xs text-gray-400 font-thin mt-1 pr-1">
          2 January 2025
        </div>
      </div>

      <div className="flex flex-col items-start ">
        <div className="flex items-start">
          <img
            src="/images/defaultUser.png"
            alt="User"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="bg-gray-200 text-black py-2 px-4 rounded-t-2xl rounded-br-2xl max-w-xs">
            <p className="message-text">I am fine</p>
          </div>
        </div>
        <div className="text-xs text-gray-500 font-thin mt-1 pl-10">
          3 January 2025
        </div>
      </div>

      {/* repeat messages... (unchanged) */}

      <div ref={messageEndRef} />
    </div>
  );
};

export default Message;
