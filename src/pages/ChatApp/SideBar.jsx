import React, { useEffect, useState } from "react";
import { FaCog, FaPhone } from "react-icons/fa";
import { LogOut, Phone, Cog } from "lucide-react";
import { FaEllipsisH } from "react-icons/fa";
import { userLogout } from "../../store/actions/authAction.js";
import { useDispatch, useSelector } from "react-redux";
import {
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} from "../../store/types/aythType.js";
import { useNavigate } from "react-router-dom";
import "../../css/ChatApp/SideBar.css";
import defaultUserLogo from "../../assets/defaultUser.png";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error, successMessage, myInfo } =
    useSelector((state) => state.auth);
  // console.log(isAuthenticated, myInfo);

  const [state, setState] = useState(true);
  // const [editProfile, setEditProfile] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setState(false);
      navigate(`/fort/login`);
    }
  });

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout(state));
  };

  // const onLogoutUser = (e) => {
  //   e.preventDefault();
  //   localStorage.clear();

  //   console.log(isAuthenticated);

  return (
    <div className=" flex flex-col h-full gap-2">
      <img
        src={myInfo.image ? myInfo.image : defaultUserLogo}
        alt="pic"
        width={50}
      />
      <div className="user-sidebar h-full flex-col justify-between items-center py-4 px-2 hidden border bg-black rounded-xl w-full">
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
          <div className="user-tools flex flex-col items-center gap-7">
            <button className="hover:bg-gray-700 p-1 rounded-md shadow-slate-200 shadow-sm">
              <LogOut className="text-white size-5" onClick={onLogout} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
