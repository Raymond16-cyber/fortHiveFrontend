import React,{useState,useEffect} from "react";
import RegisterHeader from "./RegisterHeader.jsx";
import RegisterBody from "./RegisterBody.jsx";
import RegisterFooter from "./RegisterFooter.jsx";

const MainRegister = () => {
   const [smallScreen, setSmallScreen] = useState(window.innerWidth);
    useEffect(() => {
      const screenSize = () => {
        const size = window.innerWidth;
        setSmallScreen(size);
        // console.log(smallScreen);
      };
      window.addEventListener("resize", screenSize);
      screenSize();
      return () => window.removeEventListener("resize", screenSize);
    }, []);
  return (
    <div className="registerPage flex flex-col w-full h-screen bg-gray-200">
      <RegisterHeader smallScreen={smallScreen}  />
      <RegisterBody smallScreen={smallScreen} />
      <RegisterFooter />
    </div>
  );
};

export default MainRegister;
