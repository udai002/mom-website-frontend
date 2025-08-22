import React, { useContext } from "react";
import { Navheader } from "./Navheader";
import { Store } from  "../../context/NavBarContext";

import Bottomnav from "./Bottomnav";
import Scrollbody from "./Scrollbody";

function Sidenavbar() {
  const context = useContext(Store);
  if (!context) {
    throw new Error("Sidenavbar must be used within a Store.Provider");
  }
  const { open, setOpen } = context;
  console.log("..........", open);
  function handleOpenOptions() {
    setOpen(true);
  }
  return (
    
    <>
    {open==true?<>  <div className="flex flex-row h-screen">
      <div className="bg-[#00a99d] p-2 pt-4 m-3 rounded-[20px]  ">
        <Navheader />
        <Scrollbody />
        <Bottomnav />
      </div>
    </div></>:<><div className="mt-10 m-10  ">
          <img
            className="size-[30px] "
            src="/Arrow.png"
            onClick={handleOpenOptions}
          ></img>
        </div></>}

      
    </>

  );
}

export default Sidenavbar;