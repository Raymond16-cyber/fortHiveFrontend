import React from "react";
import "../../css/Register.css";
import { Link } from "react-router-dom";

const RegisterFooter = () => {
  return (
    <footer className="hidden sm:flex">
      <div className="footerlinks flex  flex-row justify-between items-center w-full h-20 px-0 bg-gray-400 md:px-20">
        <div className="copyright">
          <p>Made in Nigeria. &copy;2025 Fort Raymond</p>
        </div>
        <div className="Docs flex gap-3 cursor-pointer">
          <p>Terms of service</p>
          <p>Privacy Policy</p>
        </div>
        <div className="socialLinks flex items-center gap-3 text-3xl cursor-pointer justify-center">
          <Link>
            <i className="bx bxl-facebook-square"></i>
          </Link>
          <Link></Link>
          <i className="bx bxl-github"></i>
          <Link>
            <i className="bx bxl-instagram-alt"></i>
          </Link>
          <Link>
            <i className="bx bxl-linkedin-square"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default RegisterFooter;
