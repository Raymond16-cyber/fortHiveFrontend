import React, { useEffect, useState, useRef } from "react";
import {
  FaPlus,
  FaFileImage,
  FaGift,
  FaPaperPlane,
  FaSmile,
  FaTimes,
  FaLink,
  FaFile,
  FaFolder,
} from "react-icons/fa";
import "../../../css/ChatApp/MessageForm.css";

const MessageForm = ({
  inputHandle,
  newMessage,
  sendMessage,
  sendEmoji,
  handleFileChange,
  handleFileClick,
  hiddenFileInput,
}) => {
  const [emojis, setEmojis] = useState([]);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chooseAttchment, setChooseAttachment] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const res = await fetch("https://emojihub.yurace.pro/api/all");
        const data = await res.json();
        setEmojis(data.slice(0, 50)); // Load more if you want
      } catch (error) {
        console.error("Emoji API failed:", error);
      }
    };

    fetchEmojis();
  }, []);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
        setChooseAttachment(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmojiClick = (htmlCode) => {
    const parser = new DOMParser();
    const emojiDoc = parser.parseFromString(htmlCode, "text/html");
    const emojiChar = emojiDoc.body.textContent || "";
    setMessage((prev) => prev + emojiChar);
  };

  // Hide emoji picker
  const hideEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const showAttchmentBox = () => {
    setChooseAttachment(!chooseAttchment);
  };
  //Setting attchmenmt show

  return (
    <div className="message-send-section sticky p-4 bg-blue-600 text-white flex items-center gap-3">
      {/* supposed to be near below the 'select an image,but position does not matter' */}
      <div className="">
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleFileChange}
          style={{ display: "none" }} // hides the input
        />
      </div>

      <div
        className="choose-attchment bg-white w-fit p-3 rounded-xl"
        onClick={showAttchmentBox}
      >
        <FaLink className="text-black" />
        {chooseAttchment ? (
          <div
            ref={pickerRef}
            className="attachmentShow absolute bottom-20 left-12 bg-slate-700 border border-slate-500 rounded-lg p-2 h-24 w-48 overflow-y-auto shadow-lg z-10 flex justify-between items-center"
          >
            <div className=" bg-slate-300 p-3 rounded-xl h-10 items-center relative group inline-block">
              <FaFileImage className="text-cyan-900" />

              <div
                className="tooltip absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 z-50
 "
              >
                Select an image
              </div>
            </div>
            <div
              className=" bg-slate-300 p-3 rounded-xl h-10 relative group inline-block"
              onClick={handleFileClick}
            >
              <FaFolder className="text-cyan-900" />

              <div className="tooltip absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 z-50">
                Send a file
              </div>
            </div>

            <div className=" bg-slate-300 p-3 rounded-xl h-10 relative group inline-block">
              <FaPlus className="text-cyan-900" />

              <div className="tooltip absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 z-50">
                Send Gift
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* Container needs to be relative for absolute emoji box */}
      <div className="relative w-full">
        {/* Input Row */}

        <div className="flex items-center space-x-2">
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Send a message..."
            className="formcontrol w-full text-black p-2 rounded-xl selection:bg-black selection:text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-black relative"
            value={newMessage}
            onChange={inputHandle}
          />

          {/* Emoji Button */}
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="absolute right-16 z-20"
          >
            <FaSmile className="text-2xl text-yellow-300 hover:scale-110 transition" />
          </button>

          <button
            onClick={sendMessage}
            className="send-message-button bg-white w-fit p-3 rounded-xl"
          >
            <FaPaperPlane className="text-xl text-black" />
          </button>
        </div>

        {/* Emoji Picker Floating Box */}
        {showEmojiPicker && (
          <div
            ref={pickerRef}
            id="emoji-scroll"
            className="emoji-scroll absolute bottom-20 right-12 bg-slate-700 border border-slate-500 rounded-lg p-3 w-72 h-60 overflow-y-auto shadow-lg z-10 flex flex-row-reverse"
          >
            <div className="bg-red-600 h-6 p-1 " onClick={hideEmojiPicker}>
              <FaTimes />
            </div>
            <div className="flex gap-2 flex-wrap">
              {emojis.map((emoji, index) => (
                <span
                  key={index}
                  className="cursor-pointer text-xl hover:scale-125 transition-transform "
                  onClick={() => {
                    handleEmojiClick(emoji.htmlCode?.[0]);
                    sendEmoji(emoji);
                  }}
                  dangerouslySetInnerHTML={{ __html: emoji.htmlCode?.[0] }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageForm;
