import React from "react";
import { FaCog, FaPhone } from "react-icons/fa";
import { LogOut,Phone,Cog } from "lucide-react";
import { FaEllipsisH } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="h-screen flex flex-col justify-between items-center py-4 w-8">
      <div className="sidebar-top">
        <div className="user-info flex flex-col items-center gap-7">
          <img src="/images/defaultUser.png" alt="" width={50} />

          <button className="hover:bg-slate-200 p-1 rounded-md">
            <Phone className="fill-cyan-900 text-white"/>
          </button>

          <button className="hover:bg-slate-200 p-1 rounded-md">
            <Cog  className="text-cyan-900"/>
          </button>

          <button className="hover:bg-slate-200 p-2 rounded-md">
            <FaEllipsisH />
          </button>
        </div>
      </div>
      <div className="sidebar-down">
        <div className="user-tools flex flex-col items-center gap-7">
          <button className="hover:bg-slate-200 p-1 rounded-md">
            <LogOut className="text-cyan-900" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
