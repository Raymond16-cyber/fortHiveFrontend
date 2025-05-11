import React from "react";
import "../../css/ChatApp/Friends.css"

const Friends = () => {
  return (
    <div className="friend flex flex-row">
      <div className="friend-img">
        <div className="image">
          <img src="/images/defaultfriend.jpeg" alt="" width={70}/>
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
            <h4>Miracle</h4>
        </div>
      </div>
    </div>
  );
};

export default Friends;
