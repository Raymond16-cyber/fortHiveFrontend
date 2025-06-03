import React from "react";
import applogo from "../../assets/favicon.png";
import { FaUser, FaUserCircle } from "react-icons/fa";
import "../../css/Home.css";
import manCalling from "../../assets/HomeImages/man-talking-on-cellphone.jpg"
import manTexting from "../../assets/HomeImages/city-man-texting.jpg"
import womanTexting from "../../assets/HomeImages/woman-holding-mobile-phone.jpg"

const HomeHeader = () => {
  return (
    <div className="FortHeader flex flex-col items-center justify-around w-full  px-2 top-0 z-10 text-sm">
      {/* app logo */}

      <div className="headerNav flex justify-around w-full text-black mb-3 top-0 z-20 sticky bg-transparent">
        <div className="imageLogo">
          <img src={applogo} alt="" width={70} />
        </div>

        <div className="linksNav flex items-center gap-11 font-bold">
          <p>Product</p>
          <p>Services</p>
          <p>Contact</p>
        </div>

        <div className="accounts flex items-center gap-3 font-bold">
          <p>Accounts</p>
          <FaUserCircle className="text-2xl" />
        </div>
      </div>

      <div className="heroImageTexts w-full flex flex-col gap-5">
        <div className="w-full items-center flex justify-center flex-col gap-5">
          <div className="w-full flex flex-col items-center">
            <img src={applogo} alt="" width={100} />
            <h2 className=" text-4xl font-bold">
              Send messages swiftly with FORT
            </h2>
          </div>

          <div className="px-4 py-2 bg-gray-700 w-fit rounded-full flex justify-center shadow-slate-950 shadow-md ">
            <p className="items-center text-white">Download! it's free now</p>
          </div>
        </div>

        <div className="appInfo flex w-full px-32 justify-between relative">

          <div>
            <h1 className="appText text-7xl font-bold flex flex-col gap-4">
              <span className="text-black">Have Your</span>
              <span className="text-gray-700">Best Chat</span>
            </h1>
          </div>


          <div className="imageHeaderContainer">
            <div className="w-full border-black">
                <img src={manTexting} alt="" style={{width: "20rem", height: "17rem"}} className="rounded-lg" />

            </div>
            
            <div className="image2Container border-black absolute right-0 top-24">
                <img src={manCalling} alt="" className="rounded-lg z-10 w-72 h-56" />
            </div>

            {/* <div className="image2Container border-black absolute right-20 top-29">
                <img src={womanTexting} alt="" className="rounded-lg z-10 w-72 h-56" />
            </div> */}
          </div>


        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
