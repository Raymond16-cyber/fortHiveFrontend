import React, { useState } from "react";
import { FaSistrix, FaTimes } from "react-icons/fa";

const FilterAddFriendsToGroup = ({ setFilterFriends }) => {
  const [friendEmptey, setFriendempty] = useState(true);

  const inputValue = (e) => {
    setFilterFriends(e.target.value);
    setFriendempty(false);
  };
  return (
    <div className="groupName w-full flex items-center">
      <label
        htmlFor="friendName"
        className="text-nowrap font-bold text-black text-md"
      >
        Friend Name:{" "}
      </label>
      <input
        type="text"
        id="friendName"
        name="friendName"
        placeholder="Search for friend....."
        className="border-black border-2 w-full rounded-2xl bg-white px-2 placeholder:text-gray-400"
        onChange={inputValue}
      />
    
    </div>
  );
};

export default  FilterAddFriendsToGroup;
