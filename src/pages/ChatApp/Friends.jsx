import React, { useState } from "react";
import "../../css/ChatApp/Friends.css"

const Friends = () => {
  return (
    <div className="friend flex flex-row items-center gap-2 p-2 border border-x-0 hover:bg-slate-200 active:bg-slate-300 cursor-pointer">
      <div className="friend-img">
        <div className="image">
          <img src="/images/defaultfriend.jpeg" alt="" width={65}/>
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
            <h4 className=" font-medium">Uche</h4>
        </div>
      </div>
    </div>
  );
};

export default Friends;
