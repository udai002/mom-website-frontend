import React, { useContext } from "react";
import { Navheader } from "./Navheader";
import { Store } from "../../context/NavBarContext";
import Bottomnav from "./Bottomnav";
import Scrollbody from "./Scrollbody";
import Sidebar from "../../assets/sidebar.png";

function Sidenavbar() {
  const { open, setOpen } = useContext(Store);

  function handleToggle() {
    setOpen(!open);
  }

  return (
    <div className="flex flex-row h-screen w-auto">
      <div
        className={`bg-[#00a99d]  pt-4 rounded-[20px] transition-all duration-300 ease-in-out
        ${open ? "w-72 p-4" : "w-16"} overflow-hidden`}
      >
        <Navheader />
        <Scrollbody />
        <Bottomnav />
      </div>

   
      <img
        className={`cursor-pointer p-1 rounded-full transition-transform duration-300
          ${open ? "w-10 h-10 top-6 right-6 relative" : "w-8 h-8 relative right-3 top-6 rotate-180"}`}
        src={Sidebar}
        onClick={handleToggle}
        alt="toggle"
      />
    </div>
  );
}

export default Sidenavbar;
