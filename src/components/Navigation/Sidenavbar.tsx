import React, { useContext } from "react";
import { Navheader } from "./Navheader";
import { Store } from "../../context/NavBarContext";
import Bottomnav from "./Bottomnav";
import Scrollbody from "./Scrollbody";

function Sidenavbar() {
  const { open } = useContext(Store);

  return (
    <div className="flex flex-row h-screen">
      <div
        className={`bg-[#00a99d] p-2 pt-4 m-1 rounded-[20px] transition-all duration-300 
        ${open ? "w-72" : "w-16"} overflow-hidden`}
      >
        <Navheader />
        <Scrollbody />
        <Bottomnav />
      </div>
    </div>
  );
}

export default Sidenavbar;
