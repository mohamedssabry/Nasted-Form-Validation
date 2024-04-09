import React, { useState } from "react";
import toggleSidebarIcon from "../../../assets/icons/toggleSidebarIcon.svg";
import user from "../../../assets/images/user.png";
import Sidebar from "../Sidebar/Sidebar";
import { SlArrowDown } from "react-icons/sl";

function HeaderSidebarApp({ onSidebarToggle }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onSidebarToggle(!isSidebarOpen);
  };

  return (
    <div>
      <header
        className={`flex justify-between items-center  p-4 pr-10 ${
          isSidebarOpen ? "w-4/5" : "w-11/12"
        }`}
      >
        <div className="flex items-center gap-3 ">
          <img src={user} alt="" />
          <span className="font-sans text-gray-400 font-bold">
            محمد صبرى حافظ
          </span>
          <SlArrowDown size={9} className="text-gray-400 mt-1" />
        </div>
        <div className={`${isSidebarOpen ? "mr-3" : "mr-6"}`}>
          <img src={toggleSidebarIcon} alt="" onClick={toggleSidebar} />
        </div>
      </header>
      <div
        className={`fixed top-0 right-28 h-full p-4 font-sans text-2xl ${
          isSidebarOpen ? "hidden " : "w-12 bg-gray-100"
        }`}
      ></div>
      <Sidebar isOpen={isSidebarOpen} />
    </div>
  );
}

export default HeaderSidebarApp;
