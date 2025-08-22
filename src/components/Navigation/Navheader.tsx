import React, { useContext} from "react";

import { Store } from "../../context/NavBarContext";

export const Navheader = () => {
  // const [openBar, setOpenBar] = useState(false);
  const {open ,setOpen}=useContext(Store) 

  console.log("...in Navheader",open)

  

function handleOpenOptions() {
  // setOpenBar(!openBar);
  setOpen(false)
}
  return (
    <>
      <div className="flex gap-4 overflow-hidden m-3y">
       <div className="border-b-[1px]  flex flex-row gap-4 p-2 ">
        <div className=" ">
          <h1 className="text-[#00a99d] bg-white  rounded-[15px] px-3 py-1 text-[25px] font-semibold text-center ">
            m
          </h1>
        </div>
        <div className="text-white flex-row  ">
          <h1>MOM PHARMACY</h1>
          <h1>DashBoard</h1>
        </div>
        <div className="mt-4 ">
          <img
            className="size-[30px] "
            src="./Arrow.png"
            onClick={handleOpenOptions}
          ></img>
        </div>
        </div>
      </div>

    </>
  );
};