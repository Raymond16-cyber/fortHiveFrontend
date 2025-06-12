import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaPencilAlt } from "react-icons/fa";
import {
  editProfile,
  editProfilePic,
} from "../../../store/actions/EditProfileAction";
import { useDispatch, useSelector } from "react-redux";
import { Check } from "lucide-react";

const EditProfileModal = ({
  onClose,
  isOpen,
  changeProfileDetails,
  setChangeProfileDetails,
  handleChangeProfileDetails,
  hiddenChangeImageFileChange,
  hiddenChangeImageFileClick,
  hiddenChangeImageFileInput,
  changeProfilePicture,
  setChangeProfilePicture,
  setEditProfile,
  changeDetails,
}) => {
  const backdropRef = useRef();

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  // console.log("user info: from editprofmodal", myInfo);
  const { myInfo } = useSelector((state) => state.auth);

  console.log("myInfo from edit profile modal", myInfo);
console.log("changeProfileDetails from edit profile modal", changeProfileDetails);
  

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex bg-black bg-opacity-50 p-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className=" rounded-2xl shadow-xl p-6 w-full max-w-sm relative bg-white"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div
              className="items-center w-full flex justify-center"
              onClick={hiddenChangeImageFileClick}
            >
              <input
                type="file"
                name="profilepic"
                id="profilepic"
                className="hidden"
                ref={hiddenChangeImageFileInput}
                onChange={hiddenChangeImageFileChange}
              />
              <div className="image relative w-12 h-12 ">
                <img
                  src={
                    myInfo.image ? `/userProfilePic/${myInfo.image}` : <Check />
                  }
                  alt=""
                  className=" w-full h-full object-cover"
                />
                <div className="changeIcon absolute bottom-0 -right-1 items-center flex justify-center">
                  <div className="editInner bg-gray-700 rounded-full p-2 flex items-center justify-center">
                    <FaEdit className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* names */}
            <div className="names flex flex-col gap-3">
              <div className="fname flex flex-col">
                <label htmlFor="fname">My First Name</label>
                <input
                  type="text"
                  name="fname"
                  placeholder={
                    myInfo.fname.charAt(0).toUpperCase() + myInfo.fname.slice(1)
                  }
                  value={changeProfileDetails.fname}
                  id="fname"
                  onChange={handleChangeProfileDetails}
                  className="border-black border-2 w-full rounded-2xl bg-white px-2 placeholder:text-gray-400"
                />
              </div>

              <div className="lname flex flex-col">
                <label htmlFor="lname">My Last Name</label>
                <input
                  type="text"
                  name="lname"
                  placeholder={
                    myInfo.lname.charAt(0).toUpperCase() + myInfo.lname.slice(1)
                  }
                  value={changeProfileDetails.lname}
                  id="lname"
                  onChange={handleChangeProfileDetails}
                  className="border-black border-2 
                  w-full rounded-2xl bg-white px-2 placeholder:text-gray-400"
                />
              </div>

              <div className="bio relative mt-2">
                <textarea
                  name="bio"
                  id="bio"
                  value={changeProfileDetails.bio}
                  placeholder={
                    myInfo.bio ? myInfo.bio : "Lets Chat on fort....😁"
                  }
                  className="border-black border-2 w-full rounded-2xl bg-white px-2 placeholder:text-gray-400"
                  onChange={handleChangeProfileDetails}
                />
                <div className="bioLabel absolute -top-4 left-4 pt-1 bg-white">
                  <label htmlFor="bio" className="flex items-center text-sm">
                    My Bio <FaPencilAlt />
                  </label>
                </div>
              </div>
            </div>

            <div
              className="submit w-full flex justify-end rounded-full  items-end "
              onClick={changeDetails}
            >
              <button className="p-2 bg-green-400" onClick={() => setEditProfile(false)}>Change</button>  
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
