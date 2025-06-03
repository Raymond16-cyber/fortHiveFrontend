import React, { useState } from "react";
import { FaSistrix, FaTimes } from "react-icons/fa";

const Filter = ({ setFilterFriends }) => {
  const [friendEmptey, setFriendempty] = useState(true);

  const inputValue = (e) => {
    setFilterFriends(e.target.value);
    setFriendempty(false);
  };
  return (
    <div className="friendSearch w-full ">
      <div className="relative w-full">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search friends..."
          className="w-full pl-4 pr-10 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={inputValue}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-600"
        >
          {friendEmptey ? (
            <FaSistrix />
          ) : (
            <FaTimes
              onClick={(e) => {
                setFilterFriends("");
               
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Filter;
