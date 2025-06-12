import React, { useEffect, useState } from "react";
import { FaCog, FaPhone } from "react-icons/fa";
import { LogOut, Phone, Cog } from "lucide-react";
import { FaEllipsisH } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} from "../../store/types/aythType.js";
import { useNavigate } from "react-router-dom";
import "../../css/ChatApp/SideBar.css";
import defaultUserLogo from "../../assets/defaultUser.png";
import EditProfileModal from "./modals/EditProfileModal.jsx";
import { userLogout } from "../../store/actions/authAction.js";

const SideBar = ({
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
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error, successMessage, myInfo } =
    useSelector((state) => state.auth);
  // console.log(isAuthenticated, myInfo);

  const [editProfile, setEditProfile] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/fort/login`);
    }
  });

  const onLogout = (e) => {
    e.preventDefault();
    // Clear localStorage
    localStorage.removeItem("userToken");
    localStorage.removeItem("myInfo");
    // Dispatch logout action to clear Redux state
    dispatch(userLogout());
    // Optionally, navigate to login page
    navigate("/fort/login");
  };
  // const onLogoutUser = (e) => {
  //   e.preventDefault();
  //   localStorage.clear();

  //   console.log(isAuthenticated);
  const updateProfile = () => {
    setEditProfile(!editProfile);
  };

  console.log("my Infooooooooooo", myInfo);

  return (
    <div className=" flex flex-col h-full gap-2">
      <div className="flex items-center justify-center">
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-black flex items-center justify-center">
          <img
            src={
              myInfo.image ? `/userProfilePic/${myInfo.image}` : defaultUserLogo
            }
            alt="pic"
            width={50}
            className="w-full h-full object-cover"
            onClick={updateProfile}
          />
        </div>
        {editProfile ? (
          <EditProfileModal
            onClose={() => setEditProfile(false)}
            isOpen={editProfile}
            changeProfileDetails={changeProfileDetails}
            setChangeProfileDetails={setChangeProfileDetails}
            handleChangeProfileDetails={handleChangeProfileDetails}
            hiddenChangeImageFileChange={hiddenChangeImageFileChange}
            hiddenChangeImageFileClick={hiddenChangeImageFileClick}
            hiddenChangeImageFileInput={hiddenChangeImageFileInput}
            changeProfilePicture={changeProfilePicture}
            setChangeProfilePicture={setChangeProfilePicture}
            changeDetails={changeDetails}
            myInfo={myInfo}
            setEditProfile={setEditProfile}
            friendProfileDetails={friendProfileDetails}
          />
        ) : (
          ""
        )}
      </div>
      <div className="user-sidebar h-full flex-col justify-between items-center py-4 px-2 hidden border bg-blue-600 rounded-xl w-full">
        <div className="sidebar-top">
          <div className="user-info flex flex-col items-center gap-4">
            <button className="hover:bg-gray-700 p-1 rounded-md shadow-slate-200 shadow-sm">
              <Phone className="fill-white text-white size-4" />
            </button>

            <button className="hover:bg-gray-700 p-1 rounded-md shadow-slate-200 shadow-sm">
              <Cog className="text-white size-5" />
            </button>
          </div>
        </div>

        <div className="sidebar-down">
          {/* Logout Button */}

          <div
            className="user-tools flex flex-col items-center gap-7"
            onClick={onLogout}
          >
            <button className="hover:bg-gray-700 p-1 rounded-md shadow-slate-200 shadow-sm">
              <LogOut className="text-white size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
