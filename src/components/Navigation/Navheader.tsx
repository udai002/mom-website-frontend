import React, { useContext } from "react";
import { Store } from "../../context/NavBarContext";
import Sidebar from "../../assets/sidebar.png";

export const Navheader = () => {
  const { open, setOpen } = useContext(Store);

  function handleToggle() {
    setOpen(!open);
  }

  return (
    <div className="relative border-b flex items-center justify-between p-2">
    
      <div className="flex items-center gap-3 -ml-2">
        <h1 className="text-[#00a99d] bg-white rounded-[15px] px-3 py-1 text-[25px] font-semibold text-center">
          m
        </h1>
        {open && (
          <div className="text-white leading-tight">
            <h1 className="font-bold">MOM PHARMACY</h1>
            <h1 className="text-sm">Dashboard</h1>
          </div>
        )}
      </div>

      
      <img
        className={`size-[40px] cursor-pointer absolute -right-4 top-1/2 -translate-y-1/2 
         p-1 rounded-full shadow-md transition-transform duration-300
        ${open ? "" : "rotate-180"}`}
        src={Sidebar}
        onClick={handleToggle}
        alt="toggle"
      />
    </div>
  );
};
