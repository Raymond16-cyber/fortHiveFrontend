import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaCamera,
  FaCheck,
  FaEdit,
  FaLongArrowAltLeft,
  FaPencilAlt,
  FaTimes,
} from "react-icons/fa";
import defaultUser from "../../../../assets/defaultUser.png";
import { useSelector } from "react-redux";

const UserProfilePage = ({
  changeProfileDetails,
  setChangeProfileDetails,
  handleChangeProfileDetails,
  hiddenChangeImageFileChange,
  hiddenChangeImageFileClick,
  hiddenChangeImageFileInput,
  changeProfilePicture,
  setChangeProfilePicture,
  changeDetails,
  friendProfileDetails,
  setShowUserProfilePage,
}) => {
  const [editing, setEditing] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [status, setStatus] = useState(false);

  //   confirm image Change
  const [confirmImageChange, setConfirmImageChange] = useState(false);
  //   Save change details
  const [saveChanges, setSaveChanges] = useState(false);

  const backdropRef = useRef();

  const onClose = () => {
    setEditing(false);
    setSaveChanges(false);
  };

  const isOpen = editing;

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

  const { myInfo } = useSelector((state) => state.auth);

  console.log("my Info from prof.", myInfo);

  useEffect(() => {
    console.log("user status", changeProfileDetails.status);
  }, [changeProfileDetails.status]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-1">
      <div className="w-full flex justify-start items-start mb-4">
        <div className="goBackTOListPage">
          <button
            className="p-3 rounded-full hover:bg-blue-200 transition duration-300 ease-in-out hover:text-white"
            onClick={() => {
              setShowUserProfilePage(false);
            }}
          >
            <FaLongArrowAltLeft className="text-blue-900 text-xl" />
          </button>
        </div>
      </div>
      {/* Profile Picture */}

      <div
        className="relative w-28 h-28 rounded-full  border-4 border-blue-400 shadow mb-4"
        onClick={() => {
          hiddenChangeImageFileClick();
        }}
      >
        <input
          type="file"
          name="profilepic"
          id="profilepic"
          className="hidden"
          ref={hiddenChangeImageFileInput}
          onChange={(e) => {
            hiddenChangeImageFileChange(e);
            setConfirmImageChange(true);
          }}
        />
        <img
          src={myInfo.image ? `/userProfilePic/${myInfo.image}` : defaultUser}
          alt="profile"
          className="w-full h-full object-cover"
        />
        <button
          className="absolute bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-green-700 transition"
          title="Change Picture"
        >
          <FaCamera />
        </button>
      </div>
      {confirmImageChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex items-center gap-4 bg-blue-100 rounded-lg shadow px-6 py-4">
            <p className="text-gray-700 font-semibold mr-2">
              Confirm Image Change?
            </p>
            <button
              className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => {
                setConfirmImageChange(false);
                changeDetails();
              }}
            >
              <FaCheck />
            </button>
            <button
              className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => setConfirmImageChange(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Name and Edit */}
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-2xl font-bold text-gray-800">
          {myInfo.fname.charAt(0).toUpperCase() + myInfo.fname.slice(1)}
        </h2>
        <button
          className="text-blue-600 hover:text-green-800"
          onClick={() => setEditing(true)}
          title="Edit Profile"
        >
          <FaEdit />
        </button>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-lg shadow px-6 py-4 w-full max-w-md mb-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-gray-500 text-sm">Email:</span>
          <div className="text-gray-800">{myInfo.email}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">Phone:</span>
          {myInfo.phone ? (
            <div>{myInfo.phone}</div>
          ) : (
            <div className="text-gray-400 italic text-sm">Not Set</div>
          )}
        </div>
      </div>

      {/* More Info or Settings */}
      <div className="bg-white rounded-lg shadow px-6 py-4 w-full max-w-md mb-4">
        <h3 className="text-lg font-semibold mb-2 text-blue-700">About</h3>
        <div className="flex items-center justify-between w-full gap-1">
          {/* <p className="text-gray-700"> */}
          {/* You can add an about/bio field here */}
          {/* {myInfo.bio || "This user has not set a bio yet."}
          </p> */}
          <input
            type="text"
            placeholder={myInfo.bio || "This user has not set a bio yet."}
            className=" w-full bg-white px-2 placeholder:text-gray-400 rounded-lg"
            value={changeProfileDetails.bio}
            disabled
          />

          <div
            className="editBio px-2 py-2 hover:bg-slate-200 rounded-lg"
            onClick={() => setEditBio(true)}
          >
            <FaPencilAlt />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow px-6 py-4 w-full max-w-md flex flex-col items-start mb-4">
        <h3 className="text-lg font-semibold mb-2 text-blue-700">Status</h3>

        <div className="status">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Status:</span>
            <div className="text-gray-800">
              {myInfo.status || (
                <div
                  className="text-white italic text-sm px-4 py-2 bg-slate-400 rounded-lg"
                  onClick={() => setStatus(true)}
                >
                  <p className="">Set Status</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal  */}
      {editing && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          ref={backdropRef}
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <div className="editProfile">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              {/* Add your edit form here */}
            </div>

            <div className="changingDetails">
              <div className="fname flex items-center">
                <label htmlFor="fname" className="text-nowrap">
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  placeholder={
                    myInfo.fname.charAt(0).toUpperCase() + myInfo.fname.slice(1)
                  }
                  value={changeProfileDetails.fname}
                  id="fname"
                  onChange={(e) => {
                    handleChangeProfileDetails(e);
                    setSaveChanges(true);
                  }}
                  className="border-black border-2 w-full bg-white px-2 placeholder:text-gray-400"
                />
              </div>

              {/* Lastname */}
              <div className="lname flex items-center mt-4">
                <label htmlFor="lname" className="text-nowrap">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  placeholder={
                    myInfo.lname.charAt(0).toUpperCase() + myInfo.lname.slice(1)
                  }
                  value={changeProfileDetails.lname}
                  id="lname"
                  onChange={(e) => {
                    handleChangeProfileDetails(e);
                    setSaveChanges(true);
                  }}
                  className="border-black border-2 w-full bg-white px-2 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="closeButton flex justify-between mt-4">
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-green-700"
                onClick={() => setEditing(false)}
              >
                Close
              </button>

              {saveChanges && (
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => {
                    changeDetails();
                    setSaveChanges(false);
                    setEditing(false);
                  }}
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Bio */}
      {editBio && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          ref={backdropRef}
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Edit Bio</h2>
            <textarea
              name="bio"
              id="bio"
              value={changeProfileDetails.bio}
              placeholder={myInfo.bio ? myInfo.bio : "Lets Chat on fort....😁"}
              className="border-black border-2 w-full rounded-2xl bg-white px-2 placeholder:text-gray-400 items-center flex justify-center py-1"
              onChange={(e) => {
                handleChangeProfileDetails(e);
                setSaveChanges(true);
              }}
            />
            <div className="editBioBtn flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-green-700"
                onClick={() => {
                  changeDetails();
                  setEditBio(false);
                  setSaveChanges(false);
                }}
              >
                Save Bio
              </button>
              <button
                className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-900"
                onClick={() => setEditBio(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Modal */}
      {status && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          ref={backdropRef}
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Choose Official Status</h2>

            <select
            name="status"
              value={changeProfileDetails.status}
              onChange={(e) => {
                handleChangeProfileDetails(e);
                setSaveChanges(true);
              }}
              className="w-full bg-white px-2 placeholder:text-gray-400 rounded-lg mb-4"
            >
              <option value="online">🟢 Online</option>
              <option value="away">🟡 Away</option>
              <option value="busy">🔴 Busy</option>
              <option value="offline">⚪ Offline</option>
            </select>

            <div className="statusBtn flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-green-700"
                onClick={() => {
                  changeDetails();
                  setStatus(false);
                  setSaveChanges(false);
                }}
              >
                Save Status
              </button>
              <button
                className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-900"
                onClick={() => setStatus(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
