import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaSearch } from "react-icons/fa";
import applogo from "../../../assets/favicon.png";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "../../../store/actions/friendAction";
import { toast } from "react-toastify";

const AddFriend = ({ goBack }) => {
  const [inputFriend, setInputFriend] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const { friends, error } = useSelector((state) => state.friends);
  console.log("from isA",friends);
  

  const showInputField = () => {
    setInputFriend(true);
  };
  const [fname, setFname] = useState("");
  const dispatch = useDispatch();

const handleAddFriend = async (e) => {
  e.preventDefault();
  if (!fname) {
    toast.warning("Please enter a username");
    return;
  }

  setAttempted(true); // mark that we're trying to add

  await dispatch(addFriend(fname));
  setFname("");
  setInputFriend(false);
  goBack();
};


useEffect(() => {
  if (!attempted) return;

  if (error) {
    toast.error(error);
  } else {
    toast.success("Friend added!", { toastId: "friend-added" });
  }

  setAttempted(false); // reset
}, [error, attempted]);


  return (
    <div className="col border w-full sm:w-3/12 md:3/12 flex flex-col items-center h-screen">
      {/* Top Section */}
      <div className="h-1/2 w-full">
        <div className="flex flex-col w-full gap-2 mt-0 h-1/2 bg-cyan-700 py-2">
          <div className="flex justify-between w-full p-1 items-center text-white">
            <FaArrowCircleLeft
              className="text-xl cursor-pointer"
              onClick={goBack}
            />
            <FaSearch
              className="font-bold text-sm cursor-pointer"
              onClick={showInputField}
            />
          </div>

          {/* Animated Search Field */}
          <AnimatePresence>
            {inputFriend && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="search-form w-full px-2"
              >
                <input
                  type="text"
                  placeholder="Add friend..."
                  className="w-full h-10 px-2 rounded-lg"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />

                <button onClick={handleAddFriend}>find</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col items-center h-1/2 justify-center">
        <div className="app-logo bg-cyan-700 rounded-full p-2">
          <img src={applogo} alt="App logo" width={70} />
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
