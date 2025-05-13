import React from "react";
import { FaFileImage, FaGift, FaPaperPlane, FaPlus } from "react-icons/fa";

const MessageForm = () => {
  return (
    <div className="message-send-section sticky flex">
      <div className="file-hover-attachment">
        <div className="add-attachment">Add attachment</div>
        <FaPlus />
      </div>

      <div className="file-hover-image">
        <div className="add-image">Add image</div>
        <label htmlFor="pic">
          <FaFileImage />
        </label>
      </div>

      <div className="file-hover-gift">
        <div className="add-gift">Add Gift</div>
        <FaGift />
      </div>

      <div className="message-type">
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Send a message..."
          className="formcontrol"
        />

        <div className="file-hover-gift">
          <label htmlFor="emoji">
            <FaPaperPlane />
          </label>
        </div>
      </div>

      <div className="file">
        yoo
      </div>
    </div>
  );
};

export default MessageForm;
